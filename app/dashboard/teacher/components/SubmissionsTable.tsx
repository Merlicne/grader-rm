import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Problem } from "@/server/model/problem"
import { SubmissionWithScore } from "../interfaces"
import { SubmissionRow } from "./SubmissionRow"
import { EmptyState } from "./EmptyState"

interface SubmissionsTableProps {
    filteredSubmissions: SubmissionWithScore[];
    problems: Problem[];
    formatDate: (date: Date) => string;
    getProblemName: (problemId: string) => string;
}

export function SubmissionsTable({ 
    filteredSubmissions, 
    problems, 
    formatDate, 
    getProblemName 
}: SubmissionsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredSubmissions.length === 0 ? (
                    <EmptyState colSpan={5} message="No submissions found" />
                ) : (
                    filteredSubmissions.map((submissionWithScore) => (
                        <SubmissionRow 
                            key={submissionWithScore.submission.id}
                            submissionWithScore={submissionWithScore}
                            problemName={getProblemName(submissionWithScore.submission.problem_id)}
                            formattedDate={formatDate(submissionWithScore.submission.created_at)}
                        />
                    ))
                )}
            </TableBody>
        </Table>
    );
} 