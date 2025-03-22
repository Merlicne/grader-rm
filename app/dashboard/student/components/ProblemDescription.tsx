import { Badge } from "@/components/ui/badge"
import { Problem } from "../interfaces"

interface ProblemDescriptionProps {
    problem: Problem | null;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
    if (!problem) return null;
    
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">{problem.name}</h3>
            <div className="flex items-center">
                <Badge variant={
                    problem.difficulty === "Easy" ? "secondary" :
                    problem.difficulty === "Medium" ? "outline" : "destructive"
                }>
                    {problem.difficulty}
                </Badge>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm">
                {problem.description}
            </div>
        </div>
    );
} 