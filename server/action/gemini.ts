"use server";
import { GoogleGenerativeAI, ObjectSchema, SchemaType } from "@google/generative-ai";
import { problemService, criteriaService } from "../registry";

// API key with fallback handling
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

// Enhanced schema with detailed criteria evaluation
const schema: ObjectSchema = {
    description: "Detailed grader for code submissions",
    type: SchemaType.OBJECT,
    properties: {
        CriteriaEvaluations: {
            description: "Detailed evaluation for each criteria",
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    Criteria: {
                        type: SchemaType.STRING,
                        description: "The criteria being evaluated"
                    },
                    Score: {
                        type: SchemaType.INTEGER,
                        description: "Score for this criteria (0-100)"
                    },
                    Justification: {
                        type: SchemaType.STRING,
                        description: "Brief explanation with specific code references for why this score was given"
                    },
                    Weight: {
                        type: SchemaType.INTEGER,
                        description: "Weight of this criteria (0-100)"
                    }
                }
            }
        },
        Feedback: {
            type: SchemaType.STRING,
            description: "Concise, constructive feedback highlighting strengths and areas for improvement"
        }
    }
};

const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-pro",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2, // Lower temperature for more consistent evaluations
    },
});

// More concise grader prompt with detailed instructions
const graderPrompt = `
# Code Submission Grader

You are an expert programming instructor evaluating Python code submissions. 
Your task is to provide brief and objective assessments based on specific criteria.

## Evaluation Instructions:
1. Focus only on the most important aspects of each criterion
2. Keep all explanations concise (max 100 characters per justification)
3. Be objective in your scoring

## Scoring Guidelines:
- 100: Excellent implementation
- 75-99: Good with minor issues
- 50-74: Satisfactory with significant issues
- 25-49: Partial implementation with major flaws
- 0-24: Does not solve the problem

Important: Keep all responses very brief and only provide scoring for the criteria mentioned in the criteria section.
`;

// Simplified example to save tokens
const example = ``;

export default async function generate(problemId: string, code: string) {
    try {
        // Get problem and criteria
        const problem = problemService.getProblemById(problemId)?.description;
        if (!problem) {
            return JSON.stringify({
                error: "Problem not found",
                success: false
            });
        }
        
        const criteria = criteriaService.getCriteriaByProblemId(problemId);
        if (!criteria.length) {
            return JSON.stringify({
                error: "No criteria found for this problem",
                success: false
            });
        }

        // Construct prompt
        const prompt = [
            graderPrompt,
            "EXAMPLE: " + example,
            "PROBLEM: " + problem,
            "CRITERIA:",
            ...criteria.map(criterion => `- ${criterion.weight}% ${criterion.description}`), // Limit each criterion
            "CODE: \n```python\n" + code + "\n```",
        ];

        console.log("Sending evaluation request to Gemini...");
        // console.log(prompt);
        
        // Get response with timeout handling
        const responsePromise = model.generateContent(prompt);
        return (await responsePromise).response.text();
    } catch (error) {
        console.error("Error in code evaluation:", error);
        return JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error occurred during evaluation",
            success: false
        });
    }
}

/**
 * Generates evaluation results using Gemini model with provided criteria
 * @param problemId ID of the problem being evaluated
 * @param code Code to evaluate
 * @param criteria Array of criteria objects with weight and description
 * @returns JSON string containing evaluation results
 */
export async function generateWithCriteria(
    problemId: string, 
    code: string, 
    criteria: Array<{ weight: number; description: string }>
) {
    try {
        // Get problem description
        const problem = problemService.getProblemById(problemId)?.description;
        if (!problem) {
            return JSON.stringify({
                error: "Problem not found",
                success: false
            });
        }

        if (!criteria.length) {
            return JSON.stringify({
                error: "No criteria provided for evaluation",
                success: false
            });
        }

        // Construct prompt
        const prompt = [
            graderPrompt,
            "EXAMPLE: " + example,
            "PROBLEM: " + problem,
            "CRITERIA:",
            ...criteria.map(criterion => `- ${criterion.weight}% ${criterion.description}`),
            "CODE: \n```python\n" + code + "\n```",
        ];

        console.log("Sending evaluation request to Gemini with custom criteria...");
        
        // Get response with timeout handling
        const responsePromise = model.generateContent(prompt);
        return (await responsePromise).response.text();
    } catch (error) {
        console.error("Error in code evaluation:", error);
        return JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error occurred during evaluation",
            success: false
        });
    }
}