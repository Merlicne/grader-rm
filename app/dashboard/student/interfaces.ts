export interface Problem {
    id: string;
    name: string;
    description: string;
    difficulty: string;
}

export interface Testcase {
    id: string;
    problem_id: string;
    input: string;
    output: string;
}

export interface SubmissionsResultProps {
    criteriaEvaluations?: {
        Criteria: string;
        Score: number;
        Justification: string;
    }[];
    overallScore?: number;
    feedback?: string;
    error?: string;
    problemId?: string;
    code?: string;
    onEvaluationComplete?: (results: {
        criteriaEvaluations: any[];
        overallScore: number;
        feedback: string;
    }) => void;
}

export interface ProblemSubmission {
    submission: any; // Replace with actual Submission type when available
    problemName: string;
    totalScore: number;
    passed: boolean;
}

export interface TestCase {
    id: string;
    input: string;
    output: string;
    actualOutput?: string;
    passed: boolean;
}

export interface TestCaseResultsProps {
    testCases?: TestCase[];
    overallScore?: number;
    feedback?: string;
    error?: string;
    passedCount?: number;
    totalCount?: number;
    showDetails?: boolean;
} 