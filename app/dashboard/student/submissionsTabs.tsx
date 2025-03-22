"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { submissionService, problemService } from "@/server/registry"
import { Submission } from "@/server/model/submission"
import { ProblemSubmission } from "./interfaces"
import { SubmissionItem } from "./components/SubmissionItem"
import { NoSubmissions } from "./components/NoSubmissions"

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