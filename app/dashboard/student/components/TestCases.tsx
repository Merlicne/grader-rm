import { Testcase } from "../interfaces"

interface TestCasesProps {
    testcases: Testcase[];
}

export function TestCases({ testcases }: TestCasesProps) {
    if (testcases.length === 0) return null;
    
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Example Test Cases</h3>
            <div className="space-y-4">
                {testcases.slice(0, 3).map((testcase, index) => (
                    <div key={testcase.id} className="space-y-2">
                        <div className="font-mono text-xs p-2 bg-secondary/50 rounded-md">
                            <div><span className="font-semibold">Input:</span> {testcase.input}</div>
                            <div><span className="font-semibold">Output:</span> {testcase.output}</div>
                        </div>
                    </div>
                ))}
                {testcases.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                        {testcases.length - 3} more test cases not shown
                    </div>
                )}
            </div>
        </div>
    );
} 