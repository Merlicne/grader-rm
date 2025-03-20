"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

interface TestCaseDataProps {
    id: number
    problem: string
    input: string
    expectedOutput: string
    visibility: string
}

function TestCaseData({ testCase }: { testCase: TestCaseDataProps }) {
    return (
        <TableRow>
            <TableCell className="font-medium">{testCase.problem}</TableCell>
            <TableCell>{testCase.input}</TableCell>
            <TableCell>{testCase.expectedOutput}</TableCell>
            <TableCell>{testCase.visibility}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default function TestCasesTab() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddTestCaseOpen, setIsAddTestCaseOpen] = useState(false)

    const testCases = [
        {
            id: 1,
            problem: "Fibonacci Sequence",
            input: "5",
            expectedOutput: "5",
            visibility: "Public",
        },
        {
            id: 2,
            problem: "Fibonacci Sequence",
            input: "10",
            expectedOutput: "55",
            visibility: "Hidden",
        },
        {
            id: 3,
            problem: "Sorting Algorithm",
            input: "[5,3,1,4,2]",
            expectedOutput: "[1,2,3,4,5]",
            visibility: "Public",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Test Cases</h2>
                <Dialog open={isAddTestCaseOpen} onOpenChange={setIsAddTestCaseOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Test Case
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Test Case</DialogTitle>
                            <DialogDescription>Create a new test case for a programming problem.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="problem">Problem</Label>
                                <Select>
                                    <SelectTrigger id="problem">
                                        <SelectValue placeholder="Select problem" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fibonacci">Fibonacci Sequence</SelectItem>
                                        <SelectItem value="sorting">Sorting Algorithm</SelectItem>
                                        <SelectItem value="binary">Binary Search</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="input">Input</Label>
                                <Input id="input" placeholder="Enter test case input" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="output">Expected Output</Label>
                                <Input id="output" placeholder="Enter expected output" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="visibility">Visibility</Label>
                                <Select>
                                    <SelectTrigger id="visibility">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="hidden">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddTestCaseOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Test Case</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Test Case List</CardTitle>
                    <CardDescription>Manage test cases for programming problems</CardDescription>
                    <div className="relative mt-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search test cases..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Problem</TableHead>
                                <TableHead>Input</TableHead>
                                <TableHead>Expected Output</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testCases.map((testCase) => (
                                <TestCaseData key={testCase.id} testCase={testCase} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 