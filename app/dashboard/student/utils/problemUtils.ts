import { Problem, Testcase } from "../interfaces";
import { problemService, testcaseService } from "@/server/registry";

export function fetchAllProblems(): Problem[] {
    return problemService.getProblems();
}

export function fetchTestcasesForProblem(problemId: string): Testcase[] {
    return testcaseService.getTestcasesByProblemId(problemId);
}

export function findProblemById(problemId: string, problems: Problem[]): Problem | null {
    return problems.find(p => p.id === problemId) || null;
}


export function initializeProblemSelection() {
    const problems = fetchAllProblems();
    
    if (problems.length > 0) {
        const initialProblemId = problems[0].id;
        const initialProblem = problems[0];
        const initialTestcases = fetchTestcasesForProblem(initialProblemId);
        
        return {
            problems,
            initialProblemId,
            initialProblem,
            initialTestcases
        };
    }
    
    return {
        problems: [],
        initialProblemId: "",
        initialProblem: null,
        initialTestcases: []
    };
} 