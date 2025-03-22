import { Testcase } from "../model/testcase";
import { TestcaseRepository } from "../service/testcase";

export class TestcaseRepositoryMock implements TestcaseRepository {
    private testcases: Testcase[] = [
        // Fibonacci test cases (problem1)
        {
            id: "test1",
            problem_id: "problem1",
            input: "0",
            output: "0"
        },
        {
            id: "test2",
            problem_id: "problem1",
            input: "1",
            output: "1"
        },
        {
            id: "test3",
            problem_id: "problem1",
            input: "5",
            output: "5"
        },
        {
            id: "test4",
            problem_id: "problem1",
            input: "10",
            output: "55"
        },
        // Sorting Algorithm test cases (problem2)
        {
            id: "test5",
            problem_id: "problem2",
            input: "[5, 3, 8, 1, 2]",
            output: "[1, 2, 3, 5, 8]"
        },
        {
            id: "test6",
            problem_id: "problem2",
            input: "[10, 9, 8, 7, 6, 5]",
            output: "[5, 6, 7, 8, 9, 10]"
        },
        {
            id: "test7",
            problem_id: "problem2",
            input: "[]",
            output: "[]"
        },
        // Binary Search test cases (problem3)
        {
            id: "test8",
            problem_id: "problem3",
            input: "[1, 2, 3, 4, 5], 3",
            output: "2"
        },
        {
            id: "test9",
            problem_id: "problem3",
            input: "[10, 20, 30, 40, 50, 60], 40",
            output: "3"
        },
        {
            id: "test10",
            problem_id: "problem3",
            input: "[1, 2, 3, 4, 5], 6",
            output: "-1"
        }
    ];

    getTestcaseById(id: string): Testcase | undefined {
        return this.testcases.find(test => test.id === id);
    }

    getTestcasesByProblemId(problemId: string): Testcase[] {
        return this.testcases.filter(test => test.problem_id === problemId);
    }

    createTestcase(testcase: Testcase): Testcase {
        this.testcases.push(testcase);
        return testcase;
    }
} 