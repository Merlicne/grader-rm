"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import generate from "@/server/action/gemini"
import Editor from "@monaco-editor/react";
import { getProblems } from "@/server/repository/problemRepoMock"

interface Problem {
    id: string;
    name: string;
    description: string;
    difficulty: string;
}

export default function SubmitCodeTab() {
    const [code, setCode] = useState("print('Hello world')")
    const [problemId, setProblemId] = useState("")
    const [problems, setProblems] = useState<Problem[]>([])
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
    const [submissionResult, setSubmissionResult] = useState<SubmissionsResultProps | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [language, setLanguage] = useState("python");
    
    useEffect(() => {
        const mockProblems: Problem[] = getProblems();
        
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
        }
    }, [problemId, problems]);

    function handleSubmitCode() {
        if (!selectedProblem) return;
        
        setIsSubmitting(true);
        generate(problemId, code)
            .then((response) => {
                const result = JSON.parse(response);
                console.log(result);
                setSubmissionResult({
                    description: result.Description,
                    score: result.Score
                });
                alert("Code submitted successfully.");

            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while submitting the code.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }
    return (

        <TabsContent value="submit" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Problem Description</CardTitle>
                        <CardDescription>Select a problem to solve</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
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
                            {selectedProblem && (
                                <div className="space-y-2">
                                    <h3 className="font-medium">{selectedProblem.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedProblem.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Submit Your Solution</CardTitle>
                        <CardDescription>Write your code and submit</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
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
                            <div className="border-gray-300 border-2 rounded-md">
                                <Editor
                                    height="300px"
                                    language={language}
                                    theme="vs-light"
                                    options={{
                                        minimap: {
                                            enabled: false
                                        },
                                        wordWrap: "on",
                                    }}
                                    value={code}
                                    onChange={(value) => setCode(value || "")}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            className="w-full" 
                            onClick={handleSubmitCode} 
                            disabled={isSubmitting || !selectedProblem}
                        >
                            {isSubmitting ? "Submitting the code..." : "Submit Code"}
                        </Button>
                    </CardFooter>
                </Card>
                {/* submission result */}
                <Card>
                    <CardHeader>
                        <CardTitle>Submission Result</CardTitle>
                        <CardDescription>View the result of your code submission</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitting ? (
                            <div className="flex justify-center items-center h-20">
                                <p className="text-primary">Submitting the code...</p>
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

interface SubmissionsResultProps {
    description?: string[];
    score?: number;
}

function SubmissionsResult(result: SubmissionsResultProps) {

    if (!result) {
        return null;
    }

    return (
        <div>
            <h3 className="text-black">Submission Result</h3>
            <ul>
                {result.description?.map((desc, index) => (
                    <li><p className="text-red-300">{index + 1}. {desc}</p></li>
                ))}
            </ul>
            {/* <p>Score: <p className="text-red-300">{result.score}</p></p> */}
            <p>Score: <span className="text-red-300">{result.score}</span></p>
        </div>
    );
}