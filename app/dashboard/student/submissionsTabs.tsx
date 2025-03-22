"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { submissionService, problemService } from "@/server/registry"
import { Submission } from "@/server/model/submission"

interface ProblemSubmission {
    submission: Submission;
    problemName: string;
    totalScore: number;
    passed: boolean;
}

// Main component
export default function SubmissionsTabs() {
    const [submissions, setSubmissions] = useState<ProblemSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get all submissions (since we only have one user in this demo)
        const allSubmissions = submissionService.getSubmissionsByUserId("user1");

        const processedSubmissions = allSubmissions.map(submission => {
            const problem = problemService.getProblemById(submission.problem_id);
            const results = submissionService.getSubmissionResults(submission.id);
            const totalScore = results.reduce((sum, result) => sum + result.score, 0);
            const passed = totalScore >= 70;

            return {
                submission,
                problemName: problem ? problem.name : 'Unknown Problem',
                totalScore,
                passed
            };
        });

        // Sort by date, newest first
        processedSubmissions.sort((a, b) =>
            new Date(b.submission.created_at).getTime() - new Date(a.submission.created_at).getTime()
        );

        setSubmissions(processedSubmissions);
        setLoading(false);
    }, []);

    return (
        <TabsContent value="submissions" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Submissions</CardTitle>
                    <CardDescription>View all code submissions</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-2 text-sm text-muted-foreground">Loading submissions...</p>
                            </div>
                        </div>
                    ) : submissions.length > 0 ? (
                        <div className="space-y-4">
                            {submissions.map(submission => (
                                <SubmissionItem
                                    key={submission.submission.id}
                                    submission={submission}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoSubmissions />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
}

// SubmissionItem component
function SubmissionItem({ submission }: { submission: ProblemSubmission }) {
    const formattedDate = new Date(submission.submission.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="rounded-md border">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium">Problem: {submission.problemName}</h3>
                        <p className="text-sm text-muted-foreground">Submitted on {formattedDate}</p>
                    </div>
                    <Badge className={submission.passed ? "bg-green-500" : "bg-red-500"}>
                        {submission.passed ? "Passed" : "Failed"}
                    </Badge>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    {submission.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">Score: {submission.totalScore}/100</span>
                </div>
            </div>
            <div className="border-t p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Code Snippet</h4>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            View Code
                        </Button>
                        <Button variant="outline" size="sm">
                            View Details
                        </Button>
                    </div>
                </div>
                <div className="mt-2">
                    <pre className="text-xs bg-black text-white p-2 rounded overflow-x-auto max-h-20">
                        {submission.submission.code.substring(0, 100)}
                        {submission.submission.code.length > 100 ? '...' : ''}
                    </pre>
                </div>
            </div>
        </div>
    );
}

// NoSubmissions component
function NoSubmissions() {
    return (
        <div className="p-8 text-center">
            <div className="text-muted-foreground mb-2">No submissions yet</div>
            <p className="text-sm">Once you submit code, your submissions will appear here.</p>
        </div>
    );
}