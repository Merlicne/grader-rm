import { Problem } from "../model/problem";
import { ProblemRepository } from "../service/problem";

class ProblemRepositoryMock implements ProblemRepository {
    private problems: Problem[] = [
        {
            id: "problem1",
            name: "Fibonacci Sequence",
            description: "Write a function that returns the nth number in the Fibonacci sequence. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
            difficulty: "easy",
        },
        {
            id: "problem2",
            name: "Sorting Algorithm",
            description: "Write a function that sorts a list of integers in ascending order.",
            difficulty: "medium",
        },
        {
            id: "problem3",
            name: "Binary Search",
            description: "Write a function that implements the binary search algorithm.",
            difficulty: "hard",
        },
    ];

    getProblemById(id: string): Problem | undefined {
        return this.problems.find((problem) => problem.id === id);
    }

    getProblems(): Problem[] {
        return this.problems;
    }
    
    createProblem(problem: Problem): Problem {
        problem.id = `problem${this.problems.length + 1}`;
        this.problems.push(problem);
        return problem;
    }
    
    updateProblem(problem: Problem): Problem {
        const index = this.problems.findIndex((p) => p.id === problem.id);
        if (index !== -1) {
            this.problems[index] = problem;
        }
        return problem;
    }
    
    deleteProblem(id: string): void {
        const index = this.problems.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.problems.splice(index, 1);
        }
    }
}

export { ProblemRepositoryMock };


