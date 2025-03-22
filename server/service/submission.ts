import { Submission, SubmissionResult } from "../model/submission";

export interface SubmissionRepository {
    getSubmissionById(id: string): Submission | undefined;
    getSubmissionsByUserId(userId: string): Submission[];
    getSubmissionsByProblemId(problemId: string): Submission[];
    createSubmission(submission: Submission): Submission;
    getSubmissionResults(submissionId: string): SubmissionResult[];
    addSubmissionResult(result: SubmissionResult): SubmissionResult;
}

export class SubmissionService {
    private submissionRepo: SubmissionRepository;

    constructor(submissionRepo: SubmissionRepository) {
        this.submissionRepo = submissionRepo;
    }

    getSubmissionById(id: string): Submission | undefined {
        return this.submissionRepo.getSubmissionById(id);
    }

    getSubmissionsByUserId(userId: string): Submission[] {
        return this.submissionRepo.getSubmissionsByUserId(userId);
    }

    getSubmissionsByProblemId(problemId: string): Submission[] {
        return this.submissionRepo.getSubmissionsByProblemId(problemId);
    }

    createSubmission(submission: Submission): Submission {
        return this.submissionRepo.createSubmission(submission);
    }

    getSubmissionResults(submissionId: string): SubmissionResult[] {
        return this.submissionRepo.getSubmissionResults(submissionId);
    }

    addSubmissionResult(result: SubmissionResult): SubmissionResult {
        return this.submissionRepo.addSubmissionResult(result);
    }
}
