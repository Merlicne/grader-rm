"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Problem, Testcase, SubmissionsResultProps, TestCaseResultsProps } from "./interfaces"
import { ProblemSelector } from "./components/ProblemSelector"
import { ProblemDescription } from "./components/ProblemDescription"
import { TestCases } from "./components/TestCases"
import { CodeEditor } from "./components/CodeEditor"
import { TestCaseResults } from "./components/TestCaseResults"

// Import utility functions
import { 
    fetchTestcasesForProblem, 
    findProblemById, 
    initializeProblemSelection 
} from "./utils/problemUtils"
import { createSubmitCodeHandler } from "./utils/eventHandlers"

export default function SubmitCodeTab() {
    const [code, setCode] = useState("print('Hello world')")
    const [problemId, setProblemId] = useState("")
    const [problems, setProblems] = useState<Problem[]>([])
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
    const [testcases, setTestcases] = useState<Testcase[]>([])
    const [testCaseResult, setTestCaseResult] = useState<TestCaseResultsProps>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [language, setLanguage] = useState("python");
    
    // Load problems on component mount
    useEffect(() => {
        const { 
            problems, 
            initialProblemId, 
            initialProblem, 
            initialTestcases 
        } = initializeProblemSelection();
        
        setProblems(problems);
        setProblemId(initialProblemId);
        setSelectedProblem(initialProblem);
        setTestcases(initialTestcases);
    }, []);
    
    // Update selected problem when problemId changes
    useEffect(() => {
        const problem = findProblemById(problemId, problems);
        if (problem) {
            setSelectedProblem(problem);
            // Fetch testcases for the selected problem
            const problemTestcases = fetchTestcasesForProblem(problemId);
            setTestcases(problemTestcases);
        }
    }, [problemId, problems]);

    // Create the code submission handler with current state
    const handleSubmitCode = useCallback(
        createSubmitCodeHandler({
            selectedProblem,
            problemId,
            code,
            testcases,
            // setSubmissionResult,
            setTestCaseResult,
            setIsSubmitting
        }),
        [selectedProblem, problemId, code, testcases]
    );
    
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
                
                {/* Test Cases Results Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Test Results</CardTitle>
                        <CardDescription>How your code performed on test cases</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitting ? (
                            <div className="flex justify-center items-center h-20">
                                <p className="text-primary">Analyzing your code...</p>
                            </div>
                        ) : (
                            <>
                                <TestCaseResults 
                                    {...testCaseResult} 
                                    showDetails={false} 
                                />
                                <div className="text-center mt-4 text-sm text-muted-foreground">
                                    For detailed evaluation and criteria breakdown, view your submission in the "My Submissions" tab.
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                
                {/* No longer need the criteria card here, it's moved to the detail page */}
            </div>
        </TabsContent>
    )
}

