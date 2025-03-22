import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddCriteriaButtonProps {
    onClick?: () => void;
}

export function AddCriteriaButton({ onClick }: AddCriteriaButtonProps) {
    return (
        <Button onClick={onClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Criteria
        </Button>
    );
} 