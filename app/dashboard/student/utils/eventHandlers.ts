import { Problem, Testcase, TestCaseResultsProps } from "../interfaces";
import { validateSubmittedCode, submitCodeForEvaluation } from "./submissionUtils";

interface SubmitCodeHandlerProps {
    selectedProblem: Problem | null;
    problemId: string;
    code: string;
    testcases: Testcase[];
    setTestCaseResult: (result: TestCaseResultsProps) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export function createSubmitCodeHandler(props: SubmitCodeHandlerProps) {
    // Return a function that can be used as an event handler
    return async () => {
        const {
            selectedProblem,
            problemId,
            code,
            testcases,
            setTestCaseResult,
            setIsSubmitting
        } = props;

        if (!selectedProblem) return;
        setTestCaseResult({});
        const validation = validateSubmittedCode(code);
        if (!validation.isValid) {
            setTestCaseResult({ error: validation.errorMessage });
            return;
        }

        setIsSubmitting(true);
        
        try {
            const { testCaseResult: newTestCaseResult } = await submitCodeForEvaluation(problemId, code, testcases);
            setTestCaseResult(newTestCaseResult);
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = "An unexpected error occurred. Please try again later.";
            setTestCaseResult({ error: errorMessage });
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
} 