"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { SubmissionsResult } from "../../../student/components/SubmissionsResult"
import { TestCaseResults } from "../../../student/components/TestCaseResults"
import { TestCase } from "../../../student/interfaces"

// Mock data for the submission detail page
const MOCK_SUBMISSIONS = [
    {
        id: "submission-1",
        user_id: "user1",
        problem_id: "problem-1",
        code: `def sum_two_numbers(a, b):
    return a + b

# Test the function
print(sum_two_numbers(5, 3))  # Output: 8
print(sum_two_numbers(-1, 1)) # Output: 0
print(sum_two_numbers(0, 0))  # Output: 0`,
        created_at: new Date("2023-06-15T14:30:00"),
        status: "completed"
    },
    {
        id: "submission-2",
        user_id: "user1",
        problem_id: "problem-2",
        code: `def is_palindrome(text):
    # Remove spaces and convert to lowercase
    text = text.replace(" ", "").lower()
    # Check if the string reads the same forward and backward
    return text == text[::-1]

# Test the function
print(is_palindrome("racecar"))  # Output: True
print(is_palindrome("hello"))    # Output: False
print(is_palindrome("A man a plan a canal Panama"))  # Output: True`,
        created_at: new Date("2023-06-16T10:15:00"),
        status: "completed"
    },
    {
        id: "submission-3",
        user_id: "user1",
        problem_id: "problem-3",
        code: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Test the function
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")`,
        created_at: new Date("2023-06-18T09:30:00"),
        status: "pending_evaluation"
    }
];

const MOCK_PROBLEMS = [
    {
        id: "problem-1",
        name: "Sum Two Numbers",
        description: "Write a function that takes two numbers as arguments and returns their sum."
    },
    {
        id: "problem-2",
        name: "Palindrome Checker",
        description: "Write a function that checks if a given string is a palindrome."
    },
    {
        id: "problem-3",
        name: "Fibonacci Sequence",
        description: "Write a function that returns the nth number in the Fibonacci sequence."
    }
];

const MOCK_TEST_CASES: Record<string, TestCase[]> = {
    "problem-1": [
        {
            id: "test-1-1",
            input: "5, 3",
            output: "8",
            actualOutput: "8",
            passed: true
        },
        {
            id: "test-1-2",
            input: "-1, 1",
            output: "0",
            actualOutput: "0",
            passed: true
        },
        {
            id: "test-1-3",
            input: "0, 0",
            output: "0",
            actualOutput: "0",
            passed: true
        }
    ],
    "problem-2": [
        {
            id: "test-2-1",
            input: '"racecar"',
            output: "True",
            actualOutput: "True",
            passed: true
        },
        {
            id: "test-2-2",
            input: '"hello"',
            output: "False",
            actualOutput: "False",
            passed: true
        },
        {
            id: "test-2-3",
            input: '"A man a plan a canal Panama"',
            output: "True",
            actualOutput: "False", // Intentional failure for demonstration
            passed: false
        }
    ],
    "problem-3": [
        {
            id: "test-3-1",
            input: "0",
            output: "0",
            actualOutput: "0",
            passed: true
        },
        {
            id: "test-3-2",
            input: "1",
            output: "1",
            actualOutput: "1", 
            passed: true
        },
        {
            id: "test-3-3",
            input: "5",
            output: "5",
            actualOutput: "5",
            passed: true
        }
    ]
};

const MOCK_CRITERIA = {
    "problem-1": [
        {
            Criteria: "Correctness",
            Score: 100,
            Justification: "All test cases pass correctly."
        },
        {
            Criteria: "Efficiency",
            Score: 90,
            Justification: "The solution has optimal time complexity."
        },
        {
            Criteria: "Code Quality",
            Score: 85,
            Justification: "The code is well-structured but could use more comments."
        }
    ],
    "problem-2": [
        {
            Criteria: "Correctness",
            Score: 70,
            Justification: "One test case fails. The solution doesn't handle spaces correctly in all cases."
        },
        {
            Criteria: "Efficiency",
            Score: 80,
            Justification: "The solution has good time complexity but could be optimized further."
        },
        {
            Criteria: "Code Quality",
            Score: 90,
            Justification: "The code is well-structured with good variable names and comments."
        }
    ]
    // problem-3 has no evaluation criteria yet - it will show the "Evaluate Code" button
};

export default function SubmissionDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [submissionData, setSubmissionData] = useState<any>(null);
    const [problemName, setProblemName] = useState("");
    const [problemId, setProblemId] = useState("");
    const [testCaseResults, setTestCaseResults] = useState<{
        testCases?: TestCase[];
        passedCount?: number;
        totalCount?: number;
    }>({});
    const [criteriaResults, setCriteriaResults] = useState<{
        criteriaEvaluations?: any[];
        overallScore?: number;
        feedback?: string;
    }>({});

    useEffect(() => {
        // Simulate loading delay for a more realistic experience
        const timer = setTimeout(() => {
            const submissionId = params.id as string;
            const submission = MOCK_SUBMISSIONS.find(s => s.id === submissionId);

            if (!submission) {
                setIsLoading(false);
                return;
            }

            setSubmissionData(submission);

            // Get problem info
            const problem = MOCK_PROBLEMS.find(p => p.id === submission.problem_id);
            if (problem) {
                setProblemName(problem.name);
                setProblemId(problem.id);
            }

            // Get test case results
            const testCases = MOCK_TEST_CASES[submission.problem_id] || [];
            const passedCount = testCases.filter(tc => tc.passed).length;

            setTestCaseResults({
                testCases,
                passedCount,
                totalCount: testCases.length
            });
            
            // Get criteria evaluation if available
            if (MOCK_CRITERIA[submission.problem_id as keyof typeof MOCK_CRITERIA]) {
                const criteriaEvaluations = MOCK_CRITERIA[submission.problem_id as keyof typeof MOCK_CRITERIA];
                const totalScore = criteriaEvaluations.reduce((sum: number, c: { Score: number }) => sum + c.Score, 0) / criteriaEvaluations.length;

                setCriteriaResults({
                    criteriaEvaluations,
                    overallScore: Math.round(totalScore),
                    feedback: totalScore > 80
                        ? "Your solution is excellent! Great job understanding the problem."
                        : "Your solution is good but could use some improvements."
                });
            } else {
                // No evaluation available yet - this will show the "Evaluate Code" button
                setCriteriaResults({});
            }

            setIsLoading(false);
        }, 1000); // Simulate 1 second loading time

        return () => clearTimeout(timer);
    }, [params.id, router]);

    const handleEvaluationComplete = (results: {
        criteriaEvaluations: any[];
        overallScore: number;
        feedback: string;
    }) => {
        setCriteriaResults(results);
    };

    if (isLoading) {
        return (
            <div className="container py-6 space-y-4">
                <div className="flex justify-center items-center h-40">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-sm text-muted-foreground">Loading submission details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!submissionData) {
        return (
            <div className="container py-6 space-y-4">
                <p>Submission not found</p>
                <Button asChild>
                    <Link href="/dashboard/student">Back to Dashboard</Link>
                </Button>
            </div>
        );
    }

    const submissionDate = new Date(submissionData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="container py-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/student">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Submission Details</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{problemName}</CardTitle>
                    <CardDescription>Submitted on {submissionDate}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Your Code</h3>
                            <pre className="text-xs bg-muted p-4 rounded overflow-x-auto max-h-96">
                                {submissionData.code}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Test Results Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Test Results</CardTitle>
                        <CardDescription>How your code performed on test cases</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TestCaseResults {...testCaseResults} showDetails={false} />
                    </CardContent>
                </Card>

                {/* Criteria Evaluation Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Criteria Evaluation</CardTitle>
                        <CardDescription>Detailed feedback on your solution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SubmissionsResult 
                            {...criteriaResults} 
                            problemId={problemId}
                            code={submissionData?.code}
                            onEvaluationComplete={handleEvaluationComplete}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 