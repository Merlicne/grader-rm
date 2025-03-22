import { Submission } from "@/server/model/submission";
import { Problem } from "@/server/model/problem";
import { Criteria } from "@/server/model/criteria";

export interface SubmissionWithScore {
    submission: Submission;
    totalScore: number;
    maxScore: number;
} 