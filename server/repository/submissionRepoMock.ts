import { Submission, SubmissionResult } from "../model/submission";
import { SubmissionRepository } from "../service/submission";

export class SubmissionRepositoryMock implements SubmissionRepository {
    private submissions: Submission[] = [
        {
            id: "sub1",
            problem_id: "problem1",
            user_id: "user1",
            code: "function solution(a, b) { return a + b; }",
            status: "completed",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: "sub2",
            problem_id: "problem2",
            user_id: "user1",
            code: "function solution(a, b) { return a * b; }",
            status: "completed",
            created_at: new Date(),
            updated_at: new Date()
        }
    ];

    private submissionResults: SubmissionResult[] = [
        {
            id: "res1",
            submission_id: "sub1",
            criteria_id: "crit1",
            result: "passed",
            score: 10
        },
        {
            id: "res2",
            submission_id: "sub1",
            criteria_id: "crit2",
            result: "failed",
            score: 0
        },
        {
            id: "res3",
            submission_id: "sub2",
            criteria_id: "crit1",
            result: "passed",
            score: 10
        }
    ];

    getSubmissionById(id: string): Submission | undefined {
        return this.submissions.find(sub => sub.id === id);
    }

    getSubmissionsByUserId(userId: string): Submission[] {
        return this.submissions.filter(sub => sub.user_id === userId);
    }

    getSubmissionsByProblemId(problemId: string): Submission[] {
        return this.submissions.filter(sub => sub.problem_id === problemId);
    }

    createSubmission(submission: Submission): Submission {
        this.submissions.push(submission);
        return submission;
    }

    getSubmissionResults(submissionId: string): SubmissionResult[] {
        return this.submissionResults.filter(res => res.submission_id === submissionId);
    }

    addSubmissionResult(result: SubmissionResult): SubmissionResult {
        this.submissionResults.push(result);
        return result;
    }
}
