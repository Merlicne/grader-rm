import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { Criteria } from "@/server/model/criteria"

interface CriteriaRowProps {
    criteria: Criteria;
    problemName: string;
    onDelete: (id: string) => void;
}

export function CriteriaRow({ 
    criteria, 
    problemName, 
    onDelete 
}: CriteriaRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">{criteria.description.split(":")[0]}</TableCell>
            <TableCell>{criteria.description.split(":")[1]}</TableCell>
            <TableCell>{criteria.weight}%</TableCell>
            <TableCell>{problemName}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(criteria.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
} 