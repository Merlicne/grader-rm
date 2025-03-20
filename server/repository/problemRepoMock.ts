

interface Problem {
    id: string;
    name: string;
    description: string;
    difficulty: string;
}

interface Testcase {
    id: string;
    input: string;
    output: string;
}

interface Criteria {
    id: string;
    problem_id: string;
    description: string;
    weight: number;
}

const problems: Problem[] = [
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

const criteria: Criteria[] = [
    {
        id: "criteria1",
        problem_id: "problem1",
        description: "Syntax 80%: forgot to add a colon, missing indentation",
        weight: 80,
    },
    {
        id: "criteria2",
        problem_id: "problem1",
        description: "Logic 20%: using the correct formula to calculate the nth Fibonacci number, don't forget to handle the base cases",
        weight: 20,
    },
    {
        id: "criteria3",
        problem_id: "problem2",
        description: "Syntax 80%: The code must be written in python and must be syntactically correct",
        weight: 80,
    },
    {
        id: "criteria4",
        problem_id: "problem2",
        description: "Logic 20%: The code must use the correct logic to solve the problem",
        weight: 20,
    },
    {
        id: "criteria5",
        problem_id: "problem3",
        description: "Syntax 80%: The code must be written in python and must be syntactically correct",
        weight: 80,
    },
    {
        id: "criteria6",
        problem_id: "problem3",
        description: "Logic 20%: The code must use the correct logic to solve the problem",
        weight: 20,
    },
];

function getProblems() {
    return problems;
}

function getProblemById(id: string) {
    return problems.find((problem) => problem.id === id);
}

function getCriteriaByProblemId(problem_id: string) {
    return criteria.filter((c) => c.problem_id === problem_id);
}

export { problems, criteria, getProblems,  getProblemById, getCriteriaByProblemId };