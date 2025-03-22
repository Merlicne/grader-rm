

export interface Submission {
    id: string;
    problem_id: string;
    user_id: string;
    code: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface SubmissionResult {
    id: string;
    submission_id: string;
    criteria_id: string;
    result: string;
    score: number;
}
