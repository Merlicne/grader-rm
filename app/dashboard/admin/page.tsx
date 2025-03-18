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
                    <TableRow>
                      <TableCell className="font-medium">Fibonacci Sequence</TableCell>
                      <TableCell>Easy</TableCell>
                      <TableCell>1s</TableCell>
                      <TableCell>256MB</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Sorting Algorithm</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>2s</TableCell>
                      <TableCell>256MB</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Binary Search</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>1s</TableCell>
                      <TableCell>256MB</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Fibonacci Sequence</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>Public</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Fibonacci Sequence</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>55</TableCell>
                      <TableCell>Hidden</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Sorting Algorithm</TableCell>
                      <TableCell>[5,3,1,4,2]</TableCell>
                      <TableCell>[1,2,3,4,5]</TableCell>
                      <TableCell>Public</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Correctness</TableCell>
                      <TableCell>Code produces correct output for all test cases</TableCell>
                      <TableCell>60%</TableCell>
                      <TableCell>Fibonacci Sequence</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Efficiency</TableCell>
                      <TableCell>Code runs within the specified time limit</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell>Fibonacci Sequence</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Code Quality</TableCell>
                      <TableCell>Code is well-structured and follows best practices</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell>Fibonacci Sequence</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>Fibonacci Sequence</TableCell>
                      <TableCell>March 15, 2025</TableCell>
                      <TableCell>100/100</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>Sorting Algorithm</TableCell>
                      <TableCell>March 14, 2025</TableCell>
                      <TableCell>85/100</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mike Johnson</TableCell>
                      <TableCell>Binary Search</TableCell>
                      <TableCell>March 12, 2025</TableCell>
                      <TableCell>90/100</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sarah Williams</TableCell>
                      <TableCell>Fibonacci Sequence</TableCell>
                      <TableCell>March 10, 2025</TableCell>
                      <TableCell>75/100</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
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

