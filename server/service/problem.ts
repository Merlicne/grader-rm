import { Problem } from "../model/problem";

export interface ProblemRepository {
    getProblemById(id: string): Problem | undefined;
    getProblems(): Problem[];
    createProblem(problem: Problem): Problem;
    updateProblem(problem: Problem): Problem;
    deleteProblem(id: string): void;
}

export class ProblemService {
    private problemRepo: ProblemRepository;

    constructor(problemRepo: ProblemRepository) {
        this.problemRepo = problemRepo;
    }

    getProblemById(id: string): Problem | undefined {
        return this.problemRepo.getProblemById(id);
    }

    getProblems(): Problem[] {
        return this.problemRepo.getProblems();
    }
}