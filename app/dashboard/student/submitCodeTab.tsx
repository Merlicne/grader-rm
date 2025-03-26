"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import generate, { generateWithCriteria } from "@/server/action/gemini"
import Editor from "@monaco-editor/react";
import { problemService, testcaseService } from "@/server/registry"


// Interfaces
interface Problem {
    id: string;
    name: string;
    description: string;
    difficulty: string;
}

interface Testcase {
    id: string;
    problem_id: string;
    input: string;
    output: string;
}

interface SubmissionsResultProps {
    criteriaEvaluations?: {
        Criteria: string;
        Weight: number;
        Score: number;
        Justification: string;
    }[];
    overallScore?: number;
    feedback?: string;
    error?: string;
}

interface TemporaryCriterion {
    weight: number;
    description: string;
}

// Main component
export default function SubmitCodeTab() {
    const [code, setCode] = useState("print('Hello world')")
    const [problemId, setProblemId] = useState("")
    const [problems, setProblems] = useState<Problem[]>([])
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
    const [testcases, setTestcases] = useState<Testcase[]>([])
    const [submissionResult, setSubmissionResult] = useState<SubmissionsResultProps>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [language, setLanguage] = useState("python");
    const [useCustomCriteria, setUseCustomCriteria] = useState(false);
    const [temporaryCriteria, setTemporaryCriteria] = useState<TemporaryCriterion[]>([
        { weight: 40, description: "Correctness" },
        { weight: 30, description: "Efficiency" },
        { weight: 30, description: "Code Quality" }
    ]);
    
    // Load problems on component mount
    useEffect(() => {
        const mockProblems: Problem[] = problemService.getProblems();
        setProblems(mockProblems);
        
        if (mockProblems.length > 0) {
            setProblemId(mockProblems[0].id);
            setSelectedProblem(mockProblems[0]);
        }
    }, []);
    
    // Update selected problem when problemId changes
    useEffect(() => {
        const problem = problems.find(p => p.id === problemId);
        if (problem) {
            setSelectedProblem(problem);
            // Fetch testcases for the selected problem
            const problemTestcases = testcaseService.getTestcasesByProblemId(problemId);
            setTestcases(problemTestcases);
        }
    }, [problemId, problems]);

    // Handle adding new criterion
    const handleAddCriterion = () => {
        setTemporaryCriteria([...temporaryCriteria, { weight: 0, description: "" }]);
    };

    // Handle removing criterion
    const handleRemoveCriterion = (index: number) => {
        setTemporaryCriteria(temporaryCriteria.filter((_, i) => i !== index));
    };

    // Handle criterion update
    const handleCriterionUpdate = (index: number, field: keyof TemporaryCriterion, value: string | number) => {
        const newCriteria = [...temporaryCriteria];
        newCriteria[index] = { ...newCriteria[index], [field]: value };
        setTemporaryCriteria(newCriteria);
    };

    // Handle code submission
    function handleSubmitCode() {
        if (!selectedProblem) return;
        
        setSubmissionResult({});
        if (code.length === 0 || code.trim() === "") {
            setSubmissionResult({
                error: "Please enter a code to evaluate."
            });
            return;
        }

        if (code.length > 3000) {
            setSubmissionResult({
                error: "Code is too long. Please shorten it to 3000 characters or less."
            });
            return;
        }

        setIsSubmitting(true);
        
        // Use the appropriate generate function based on whether custom criteria is enabled
        const evaluationPromise = useCustomCriteria
            ? generateWithCriteria(problemId, code, temporaryCriteria)
            : generate(problemId, code);
        
        evaluationPromise
            .then((response) => {
                try {
                    const result = JSON.parse(response);
                    console.log("Evaluation result:", result);
                    
                    if (result.error) {
                        setSubmissionResult({
                            error: result.error
                        });
                        
                        if (result.error.includes("timed out")) {
                            alert("The evaluation took too long. Try again later.");
                        } else {
                            alert("Error: " + result.error);
                        }
                    } else {
                        let overallScore = 0;
                        let totalWeight = 0;
                        for (const evaluation of result.CriteriaEvaluations) {
                            // Calculate score as a percentage of the maximum possible score
                            const scorePercentage = (evaluation.Score / 100.0);
                            overallScore += scorePercentage * evaluation.Weight;
                            totalWeight += evaluation.Weight;
                        }
                        // Normalize the score to 100 if weights don't sum to 100
                        const normalizedScore = totalWeight > 0 ? (overallScore / totalWeight) * 100 : 0;
                        setSubmissionResult({
                            criteriaEvaluations: result.CriteriaEvaluations,
                            overallScore: normalizedScore,
                            feedback: result.Feedback
                        });
                        alert("Code evaluated successfully.");
                    }
                } catch (error) {
                    console.error("Failed to parse response:", error, response);
                    setSubmissionResult({
                        error: "Failed to parse evaluation result. The model response was invalid."
                    });
                    alert("Failed to parse evaluation result.");
                }
            })
            .catch((error) => {
                console.error("Submission error:", error);
                setSubmissionResult({
                    error: "An error occurred while evaluating the code. Please try again later."
                });
                alert("An error occurred while submitting the code.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }
    
    return (
        <TabsContent value="submit" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 md:min-h-[600px]">
                {/* Problem Description Card */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Problem Description</CardTitle>
                        <CardDescription>Select a problem to solve</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-auto">
                        <div className="space-y-4">
                            <ProblemSelector 
                                problems={problems} 
                                problemId={problemId} 
                                setProblemId={setProblemId} 
                            />
                            
                            {selectedProblem && (
                                <>
                                    <ProblemDescription problem={selectedProblem} />
                                    <TestCases testcases={testcases} />
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
                
                {/* Code Editor Card */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Submit Your Solution</CardTitle>
                        <CardDescription>Write your code and submit</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CodeEditor 
                            code={code} 
                            setCode={setCode} 
                            language={language} 
                            setLanguage={setLanguage} 
                        />
                    </CardContent>
                    <CardFooter>
                        <Button 
                            className="w-full" 
                            onClick={handleSubmitCode} 
                            disabled={isSubmitting || !selectedProblem}
                        >
                            {isSubmitting ? "Evaluating..." : "Submit Code"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Custom Criteria Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Evaluation Criteria</CardTitle>
                        <CardDescription>Customize evaluation criteria (optional)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="useCustomCriteria"
                                    checked={useCustomCriteria}
                                    onChange={(e) => setUseCustomCriteria(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="useCustomCriteria">Use custom criteria</Label>
                            </div>

                            {useCustomCriteria && (
                                <div className="space-y-4">
                                    {temporaryCriteria.map((criterion, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <div className="flex-grow space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        type="number"
                                                        value={criterion.weight}
                                                        onChange={(e) => handleCriterionUpdate(index, 'weight', parseInt(e.target.value))}
                                                        className="w-20"
                                                        min="0"
                                                        max="100"
                                                        placeholder="Weight %"
                                                    />
                                                    <Input
                                                        value={criterion.description}
                                                        onChange={(e) => handleCriterionUpdate(index, 'description', e.target.value)}
                                                        placeholder="Criterion description"
                                                    />
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleRemoveCriterion(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={handleAddCriterion}
                                        className="w-full"
                                    >
                                        Add Criterion
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                
                {/* Submission Result Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Evaluation Results</CardTitle>
                        <CardDescription>Automated feedback on your solution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitting ? (
                            <div className="flex justify-center items-center h-20">
                                <p className="text-primary">Analyzing your code...</p>
                            </div>
                        ) : (
                            <SubmissionsResult {...submissionResult} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}

// Problem selector and description component
function ProblemSelector({ 
    problems, 
    problemId, 
    setProblemId 
}: { 
    problems: Problem[], 
    problemId: string, 
    setProblemId: (id: string) => void 
}) {
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

// Problem description component
function ProblemDescription({ 
    problem 
}: { 
    problem: Problem | null 
}) {
    if (!problem) return null;
    
    return (
        <div className="space-y-2">
            <h3 className="font-medium">{problem.name}</h3>
            <p className="text-sm text-muted-foreground">
                {problem.description}
            </p>
        </div>
    );
}

// Test cases component
function TestCases({ 
    testcases 
}: { 
    testcases: Testcase[] 
}) {
    if (testcases.length === 0) return null;
    
    return (
        <div className="mt-4">
            <h4 className="font-medium mb-2">Sample Test Cases</h4>
            <div className="space-y-3">
                {testcases.map((testcase) => (
                    <div key={testcase.id} className="border rounded-md p-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-xs font-medium text-gray-500">Input:</span>
                                <pre className="mt-1 text-xs bg-white p-2 rounded border">{testcase.input}</pre>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500">Expected Output:</span>
                                <pre className="mt-1 text-xs bg-white p-2 rounded border">{testcase.output}</pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Code editor component
function CodeEditor({ 
    code, 
    setCode, 
    language, 
    setLanguage 
}: { 
    code: string, 
    setCode: (code: string) => void, 
    language: string, 
    setLanguage: (lang: string) => void 
}) {
    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="space-y-2">
                <Select 
                    value={language} 
                    onValueChange={(value) => setLanguage(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="border-gray-300 border-2 rounded-md flex-grow">
                <Editor
                    height="100%"
                    className="min-h-[300px]"
                    language={language}
                    theme="vs-light"
                    options={{
                        minimap: {
                            enabled: false
                        },
                        wordWrap: "on",
                        automaticLayout: true
                    }}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                />
            </div>
        </div>
    );
}

// Submission result component
function SubmissionsResult({ criteriaEvaluations, overallScore, feedback, error }: SubmissionsResultProps) {

    const totalWeight = criteriaEvaluations?.reduce((sum, evaluation) => sum + evaluation.Weight, 0) || 0;

    if (error) {
        return (
            <div className="p-4 border rounded-md bg-red-50 text-red-600">
                <h3 className="font-medium mb-2">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!criteriaEvaluations && overallScore === undefined && !feedback) {
        return (
            <div className="text-center py-6 text-gray-500">
                <p>Submit your code to see evaluation results</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {overallScore !== undefined && (
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">Overall Score:</h3>
                    <div className="text-xl font-bold">
                        <span className={overallScore >= 80 ? "text-green-600" : overallScore >= 60 ? "text-yellow-600" : "text-red-600"}>
                            {overallScore.toFixed(1)}%
                        </span>
                    </div>
                </div>
            )}
            
            {feedback && (
                <div className="p-3 bg-blue-50 rounded-md">
                    <h3 className="font-medium mb-1">Feedback:</h3>
                    <p className="text-sm">{feedback}</p>
                </div>
            )}
            
            {criteriaEvaluations && criteriaEvaluations.length > 0 && (
                <div>
                    <h3 className="font-medium mb-2">Criteria Evaluation:</h3>
                    <div className="space-y-3">
                        {criteriaEvaluations.map((evaluation, index) => (
                            <div key={index} className="border rounded-md p-3">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">{evaluation.Criteria} ({(evaluation.Weight / (totalWeight / 100)).toFixed(1)}%)</span>
                                    <div className="flex flex-col items-end">
                                        <span className={evaluation.Score >= 80 ? "text-green-600" : evaluation.Score >= 60 ? "text-yellow-600" : "text-red-600"}>
                                            {evaluation.Score.toFixed(1)}%
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {((evaluation.Score / 100.0) * evaluation.Weight / (totalWeight / 100)).toFixed(1)}% of 100%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">{evaluation.Justification}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

