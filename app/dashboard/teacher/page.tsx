"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { UserCircle, LogOut, Plus, Search, Edit, Trash2 } from "lucide-react"

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Code Grader</h1>
          <nav className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Teacher</span>
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
        <Tabs defaultValue="criteria" className="space-y-4">
          <TabsList>
            <TabsTrigger value="criteria">Manage Criteria</TabsTrigger>
            <TabsTrigger value="results">Grading Results</TabsTrigger>
          </TabsList>
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

