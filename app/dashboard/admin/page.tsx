"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, LogOut, Plus, Search, Edit, Trash2 } from "lucide-react"

export default function AdminDashboard() {
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

  const criteria = [
    {
      id: 1,
      name: "Correctness",
      description: "Code produces correct output for all test cases",
      weight: "60%",
      problem: "Fibonacci Sequence",
    },
    {
      id: 2,
      name: "Efficiency",
      description: "Code runs within the specified time limit",
      weight: "20%",
      problem: "Fibonacci Sequence",
    },
    {
      id: 3,
      name: "Code Quality",
      description: "Code is well-structured and follows best practices",
      weight: "20%",
      problem: "Fibonacci Sequence",
    },
  ]

  const results = [
    {
      id: 1,
      student: "John Doe",
      problem: "Fibonacci Sequence",
      submissionDate: "March 15, 2025",
      score: "100/100",
    },
    {
      id: 2,
      student: "Jane Smith",
      problem: "Sorting Algorithm",
      submissionDate: "March 14, 2025",
      score: "85/100",
    },
    {
      id: 3,
      student: "Mike Johnson",
      problem: "Binary Search",
      submissionDate: "March 12, 2025",
      score: "90/100",
    },
    {
      id: 4,
      student: "Sarah Williams",
      problem: "Fibonacci Sequence",
      submissionDate: "March 10, 2025",
      score: "75/100",
    },
  ]
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Code Grader</h1>
          <nav className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Admin</span>
            </span>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Tabs defaultValue="problems" className="space-y-4">
          <TabsList>
            <TabsTrigger value="problems">Manage Problems</TabsTrigger>
            <TabsTrigger value="testcases">Manage Test Cases</TabsTrigger>
            <TabsTrigger value="criteria">Manage Criteria</TabsTrigger>
            <TabsTrigger value="results">Grading Results</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-4">
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
                    {
                      problems.map((problem) => (
                        <ProblemData key={problem.id} problem={problem} />
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testcases" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Test Cases</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Test Case
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Test Case List</CardTitle>
                <CardDescription>Manage test cases for problem validation</CardDescription>
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
                    {
                      testCases.map((testCase) => (
                        <TestCaseData key={testCase.id} testCase={testCase} />
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Grading Criteria</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Criteria
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Criteria List</CardTitle>
                <CardDescription>Manage grading criteria for programming assignments</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search criteria..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Problem</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      criteria.map((criteria) => (
                        <CriteriaData key={criteria.id} criteria={criteria} />
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Grading Results</h2>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search student or problem..."
                  className="pl-8 w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Problem</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      results.map((result) => (
                        <ResultData key={result.id} result={result} />
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

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
  );
}

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
  );
}

interface CriteriaDataProps {
    id: number
    name: string
    description: string
    weight: string
    problem: string
}

function CriteriaData({ criteria }: { criteria: CriteriaDataProps }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{criteria.name}</TableCell>
      <TableCell>{criteria.description}</TableCell>
      <TableCell>{criteria.weight}</TableCell>
      <TableCell>{criteria.problem}</TableCell>
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
  );
}

interface ResultDataProps {
    id: number
    student: string
    problem: string
    submissionDate: string
    score: string
}

function ResultData({ result }: { result: ResultDataProps }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{result.student}</TableCell>
      <TableCell>{result.problem}</TableCell>
      <TableCell>{result.submissionDate}</TableCell>
      <TableCell>{result.score}</TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}