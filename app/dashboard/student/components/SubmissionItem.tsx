import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import { ProblemSubmission } from "../interfaces"
import Link from "next/link"

export function SubmissionItem({ submission }: { submission: ProblemSubmission }) {
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
                        <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                        >
                            <Link href={`/dashboard/student/submission/${submission.submission.id}`}>
                                View Details
                            </Link>
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