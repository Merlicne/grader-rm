import { Testcase } from "../model/testcase";

export interface TestcaseRepository {
    getTestcaseById(id: string): Testcase | undefined;
    getTestcasesByProblemId(problemId: string): Testcase[];
    createTestcase(testcase: Testcase): Testcase;
}

export class TestcaseService {
    private testcaseRepo: TestcaseRepository;

    constructor(testcaseRepo: TestcaseRepository) {
        this.testcaseRepo = testcaseRepo;
    }

    getTestcaseById(id: string): Testcase | undefined {
        return this.testcaseRepo.getTestcaseById(id);
    }

    getTestcasesByProblemId(problemId: string): Testcase[] {
        return this.testcaseRepo.getTestcasesByProblemId(problemId);
    }

    createTestcase(testcase: Testcase): Testcase {
        return this.testcaseRepo.createTestcase(testcase);
    }
}
