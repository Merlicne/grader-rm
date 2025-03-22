import { TestCase, Testcase } from "../interfaces";
import generate from "@/server/action/gemini";

interface SubmissionResult {
    criteriaEvaluations?: any[];
    overallScore?: number;
    feedback?: string;
    error?: string;
}

interface TestCaseResult {
    testCases?: TestCase[];
    passedCount?: number;
    totalCount?: number;
    error?: string;
}

interface CodeValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

/**
 * Validates submitted code
 * @param code The code to validate
 * @returns Validation result with error message if invalid
 */
export function validateSubmittedCode(code: string): CodeValidationResult {
    if (code.length === 0 || code.trim() === "") {
        return {
            isValid: false,
            errorMessage: "Please enter a code to evaluate."
        };
    }

    if (code.length > 3000) {
        return {
            isValid: false,
            errorMessage: "Code is too long. Please shorten it to 3000 characters or less."
        };
    }

    return { isValid: true };
}

/**
 * Creates mock test case results based on real test cases
 * Used only for demonstration purposes
 * @param testcases The real test cases to base mock results on
 * @returns Test case results with pass/fail status
 */
export function createMockTestCaseResults(testcases: Testcase[]): TestCase[] {
    return testcases.map((tc, index) => {
        // Simulate some test cases passing and some failing
        const passed = Math.random() > 0.3;
        return {
            id: tc.id,
            input: tc.input,
            output: tc.output,
            // Generate a realistic looking output
            actualOutput: passed ? tc.output : `Error: unexpected result${Math.random() > 0.5 ? ' at line 3' : ''}`,
            passed
        };
    });
}

/**
 * Submits code for evaluation
 * @param problemId The ID of the problem being solved
 * @param code The code submitted for evaluation
 * @param testcases The test cases for the problem
 * @returns Promise with submission and test case results
 */
export async function submitCodeForEvaluation(
    problemId: string, 
    code: string,
    testcases: Testcase[]
): Promise<{ testCaseResult: TestCaseResult }> {
    try {
        const mockTestCases = createMockTestCaseResults(testcases);
        const passedCount = mockTestCases.filter(tc => tc.passed).length;
        
        const testCaseResult: TestCaseResult = {
            testCases: mockTestCases,
            passedCount,
            totalCount: mockTestCases.length
        };
        
        return { testCaseResult };
    } catch (error) {
        console.error("Failed to evaluate code:", error);
        const errorMessage = typeof error === 'string' 
            ? error 
            : "An error occurred while evaluating the code. Please try again later.";
            
        return {
            testCaseResult: { error: errorMessage }
        };
    }
} 