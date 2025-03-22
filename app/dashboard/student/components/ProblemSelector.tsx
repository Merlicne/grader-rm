import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Problem } from "../interfaces"

interface ProblemSelectorProps {
    problems: Problem[];
    problemId: string;
    setProblemId: (id: string) => void;
}

export function ProblemSelector({ 
    problems, 
    problemId, 
    setProblemId 
}: ProblemSelectorProps) {
    return (
        <div className="space-y-2">
            <Select 
                value={problemId} 
                onValueChange={(value) => setProblemId(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a problem" />
                </SelectTrigger>
                <SelectContent>
                    {problems.map(problem => (
                        <SelectItem key={problem.id} value={problem.id}>
                            Problem {problem.id.slice(-1)}: {problem.name} ({problem.difficulty})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
} 