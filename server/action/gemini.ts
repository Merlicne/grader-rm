"use server";
import { GoogleGenerativeAI, ObjectSchema, SchemaType } from "@google/generative-ai";
import { Description } from "@radix-ui/react-dialog";


const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const schema: ObjectSchema = {
    description: "Grader for code submissions",
    type: SchemaType.OBJECT,
    properties: {
        Description: {
            type: SchemaType.ARRAY,
            description: "Criteria score description",
            items: {
                type: SchemaType.STRING,
            },
        },
        Score: {
            type: SchemaType.NUMBER,
            description: "Score for the submission (%)",
        },
    }
};

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
    },
});

const graderPrompt = `
# Grader for code submissions
The code will be python code that solves a problem. The code will be graded based on the following criteria:
1. Syntax 80% 
2. Logic 20%
`

export default async function generate(code: string) {
    const prompt = [
        graderPrompt,
        code,
    ] 
    const response = await model.generateContent(prompt);
    return response.response.text();
}