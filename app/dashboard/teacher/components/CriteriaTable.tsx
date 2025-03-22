import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Criteria } from "@/server/model/criteria"
import { CriteriaRow } from "./CriteriaRow"
import { EmptyState } from "./EmptyState"

interface CriteriaTableProps {
    filteredCriteria: Criteria[];
    getProblemName: (problemId: string) => string;
    onDelete: (id: string) => void;
}

export function CriteriaTable({ 
    filteredCriteria, 
    getProblemName, 
    onDelete 
}: CriteriaTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCriteria.length === 0 ? (
                    <EmptyState colSpan={5} message="No criteria found" />
                ) : (
                    filteredCriteria.map(criteria => (
                        <CriteriaRow
                            key={criteria.id}
                            criteria={criteria}
                            problemName={getProblemName(criteria.problem_id)}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </TableBody>
        </Table>
    );
} 