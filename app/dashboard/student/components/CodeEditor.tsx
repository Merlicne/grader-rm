import Editor from "@monaco-editor/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (lang: string) => void;
}

export function CodeEditor({ 
    code, 
    setCode, 
    language, 
    setLanguage 
}: CodeEditorProps) {
    return (
        <div className="space-y-2">
            <div className="pb-2">
                <Select 
                    value={language} 
                    onValueChange={(value) => setLanguage(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="border rounded-md overflow-hidden">
                <Editor
                    height="300px"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-light"
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                    }}
                />
            </div>
        </div>
    );
} 