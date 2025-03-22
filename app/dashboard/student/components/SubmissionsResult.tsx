import { AlertCircle } from "lucide-react"
import { SubmissionsResultProps } from "../interfaces"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import generate from "@/server/action/gemini";

export function SubmissionsResult({ 
    criteriaEvaluations, 
    overallScore, 
    feedback, 
    error,
    problemId,
    code,
    onEvaluationComplete
}: SubmissionsResultProps) {

    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluationError, setEvaluationError] = useState<string | null>(null);
    const pathname = usePathname();
    const isStudent = pathname.includes("student");

    const handleEvaluate = async () => {
        if (!problemId || !code) {
            setEvaluationError("Problem ID and code are required for evaluation");
            return;
        }

        setIsEvaluating(true);
        setEvaluationError(null);

        try {
            const response = await generate(problemId, code);
            let result;
            
            try {
                result = JSON.parse(response);
                
                // Check if there's an error in the response
                if (result.error) {
                    throw new Error(result.error);
                }
                
                // Call the callback with the evaluation results
                if (onEvaluationComplete) {
                    onEvaluationComplete({
                        criteriaEvaluations: result.CriteriaEvaluations,
                        overallScore: result.OverallScore,
                        feedback: result.Feedback
                    });
                }
            } catch (parseError) {
                throw new Error("Failed to parse evaluation results");
            }
        } catch (err) {
            setEvaluationError(err instanceof Error ? err.message : "Failed to evaluate code");
        } finally {
            setIsEvaluating(false);
        }
    };

    if (error || evaluationError) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Error</p>
                </div>
                <p className="text-sm">{error || evaluationError}</p>
                {evaluationError && (
                    <Button onClick={() => setEvaluationError(null)} variant="outline" size="sm">
                        Dismiss
                    </Button>
                )}
            </div>
        );
    }

    if (!criteriaEvaluations) {
        if (isStudent) {
            return (
                <div className="text-center py-4 text-muted-foreground">
                    Processing your code...
                </div>
            );
        }
        // button to evaluate code
        return (
            <Button 
                onClick={handleEvaluate} 
                disabled={isEvaluating || !code || !problemId}
            >
                {isEvaluating ? (
                    <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>
                        Evaluating...
                    </>
                ) : (
                    "Evaluate Code"
                )}
            </Button>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className={`text-lg font-medium ${overallScore && overallScore == 100 ? 'text-green-500' : overallScore && overallScore < 20 ? 'text-red-500' : 'text-yellow-500'}`}>
                    Overall Score: {overallScore}/100
                </h3>
                <p className="text-sm text-muted-foreground">{feedback}</p>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium">Criteria Breakdown</h4>
                <div className="space-y-2">
                    {criteriaEvaluations.map((criteria, index) => (
                        <div key={index} className="border rounded-md p-3">
                            <div className="flex justify-between items-center">
                                <h5 className="font-medium">{criteria.Criteria}</h5>    
                                <span className={`text-sm ${criteria.Score == 100 ? 'text-green-500' : criteria.Score < 20 ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {criteria.Score}/100
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{criteria.Justification}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 