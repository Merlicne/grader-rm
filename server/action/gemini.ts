"use server";
import { GoogleGenerativeAI, ObjectSchema, SchemaType } from "@google/generative-ai";
import { Description } from "@radix-ui/react-dialog";
import { getCriteriaByProblemId, getProblemById } from "../repository/problemRepoMock";


const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const schema: ObjectSchema = {
    description: "Grader for code submissions",
    type: SchemaType.OBJECT,
    properties: {
        Description: {
            description: "list of Criteria score descriptions",
            type: SchemaType.ARRAY,
            items: {
                description: "concise and brief description of the criteria",
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
The code will be python code that solves a problem the code must trying to perfectly solve the problem. The code will be graded based on the criteria with problem prompt and example code.
`

const example = ``

export default async function generate(problemId:string, code: string) {

    const problem = getProblemById(problemId)?.description;
    if (!problem) {
        return "Problem not found";
    }
    const criteria = getCriteriaByProblemId(problemId).map(c => c.description);


    const prompt = [
        graderPrompt,
        example,
        "PROBLEM: "+problem,
        "CRITERIA:",...criteria,
        "CODE: \n"+code,
    ] 

    console.log(prompt);

    const response = await model.generateContent(prompt);
    return response.response.text();
}