import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface TestCase {
    id: string;
    input: string;
    output: string;
    actualOutput?: string;
    passed: boolean;
}

interface TestCaseResultsProps {
    testCases?: TestCase[];
    error?: string;
    passedCount?: number;
    totalCount?: number;
    showDetails?: boolean;
}

export function TestCaseResults({
    testCases,
    error,
    passedCount,
    totalCount,
    showDetails = true // Default to true to maintain backward compatibility
}: TestCaseResultsProps) {
    if (error) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Error</p>
                </div>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (!testCases || testCases.length === 0) {
        return (
            <div className="text-center py-4 text-muted-foreground">
                Submit your code to see test results
            </div>
        );
    }

    const displayedPassedCount = passedCount ?? testCases.filter(tc => tc.passed).length;
    const displayedTotalCount = totalCount ?? testCases.length;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Test Results: {displayedPassedCount}/{displayedTotalCount} Passed</h3>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium">Test Case Details</h4>
                <div className="space-y-2">
                    {testCases.map((testCase, index) => (
                        <div key={testCase.id || index} className="border rounded-md p-3">
                            <div className="flex justify-between items-center">
                                <h5 className="font-medium flex items-center gap-2">
                                    {testCase.passed ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}
                                    <span>Test Case {index + 1}</span>
                                </h5>
                                <span className={`text-sm ${testCase.passed ? "text-green-600" : "text-red-600"} font-medium`}>
                                    {testCase.passed ? "Passed" : "Failed"}
                                </span>
                            </div>
                            
                            {showDetails && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground">Input:</p>
                                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{testCase.input}</pre>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground">Expected Output:</p>
                                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{testCase.output}</pre>
                                        </div>
                                    </div>
                                    
                                    {testCase.actualOutput !== undefined && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground">Your Output:</p>
                                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{testCase.actualOutput}</pre>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 