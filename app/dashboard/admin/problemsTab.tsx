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

interface ProblemDataProps {
    id: number
    title: string
    difficulty: string
    timeLimit: string
    memoryLimit: string
}

function ProblemData({ problem }: { problem: ProblemDataProps }) {
    return (
        <TableRow>
            <TableCell className="font-medium">{problem.title}</TableCell>
            <TableCell>{problem.difficulty}</TableCell>
            <TableCell>{problem.timeLimit}</TableCell>
            <TableCell>{problem.memoryLimit}</TableCell>
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

export default function ProblemsTab() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddProblemOpen, setIsAddProblemOpen] = useState(false)

    const problems = [
        {
            id: 1,
            title: "Fibonacci Sequence",
            difficulty: "Easy",
            timeLimit: "1s",
            memoryLimit: "256MB",
        },
        {
            id: 2,
            title: "Sorting Algorithm",
            difficulty: "Medium",
            timeLimit: "2s",
            memoryLimit: "256MB",
        },
        {
            id: 3,
            title: "Binary Search",
            difficulty: "Medium",
            timeLimit: "1s",
            memoryLimit: "256MB",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Programming Problems</h2>
                <Dialog open={isAddProblemOpen} onOpenChange={setIsAddProblemOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Problem
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Problem</DialogTitle>
                            <DialogDescription>Create a new programming problem for students to solve.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Problem Title</Label>
                                <Input id="title" placeholder="e.g., Fibonacci Sequence" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Problem Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the problem in detail..."
                                    className="min-h-[100px]"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="difficulty">Difficulty Level</Label>
                                <Select>
                                    <SelectTrigger id="difficulty">
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
                                <Input id="timeLimit" type="number" placeholder="1" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
                                <Input id="memoryLimit" type="number" placeholder="256" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddProblemOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Problem</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Problem List</CardTitle>
                    <CardDescription>Manage programming problems for assignments</CardDescription>
                    <div className="relative mt-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search problems..."
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
                                <TableHead>Title</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead>Time Limit</TableHead>
                                <TableHead>Memory Limit</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {problems.map((problem) => (
                                <ProblemData key={problem.id} problem={problem} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 