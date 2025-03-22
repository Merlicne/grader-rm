import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { SubmissionWithScore } from "../interfaces"

interface SubmissionRowProps {
    submissionWithScore: SubmissionWithScore;
    problemName: string;
    formattedDate: string;
}

export function SubmissionRow({ 
    submissionWithScore, 
    problemName, 
    formattedDate 
}: SubmissionRowProps) {
    const { submission, totalScore, maxScore } = submissionWithScore;
    
    return (
        <TableRow>
            <TableCell className="font-medium">{submission.user_id}</TableCell>
            <TableCell>{problemName}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>{totalScore}/{maxScore}</TableCell>
            <TableCell className="text-right">
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </TableCell>
        </TableRow>
    );
} 