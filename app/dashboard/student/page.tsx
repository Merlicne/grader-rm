"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, LogOut, CheckCircle, AlertCircle } from "lucide-react"
import generate from "@/server/action/gemini"

export default function StudentDashboard() {
  const [code, setCode] = useState("")

  function handleSubmit() {
    generate(code).then((response) => {
      console.log(response)
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Code Grader</h1>
          <nav className="ml-auto flex items-center gap-4">
            <span className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Student</span>
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
        <Tabs defaultValue="submit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="submit">Submit Code</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          </TabsList>
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
                      <Select defaultValue="problem1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a problem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="problem1">Problem 1: Fibonacci Sequence</SelectItem>
                          <SelectItem value="problem2">Problem 2: Sorting Algorithm</SelectItem>
                          <SelectItem value="problem3">Problem 3: Binary Search</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Fibonacci Sequence</h3>
                      <p className="text-sm text-muted-foreground">
                        Write a function that returns the nth number in the Fibonacci sequence. The Fibonacci sequence
                        is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt; 1.
                      </p>
                      <div className="rounded-md bg-muted p-3">
                        <h4 className="text-sm font-medium">Example:</h4>
                        <p className="text-xs">
                          Input: n = 5<br />
                          Output: 5<br />
                          Explanation: F(5) = F(4) + F(3) = 3 + 2 = 5
                        </p>
                      </div>
                    </div>
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
                      <Select defaultValue="python">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      placeholder="Write your code here..."
                      className="font-mono min-h-[200px]"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSubmit}>Submit Code</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
                <CardDescription>View your previous code submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Problem 1: Fibonacci Sequence</h3>
                          <p className="text-sm text-muted-foreground">Submitted on March 15, 2025</p>
                        </div>
                        <Badge className="bg-green-500">Passed</Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Score: 100/100</span>
                      </div>
                    </div>
                    <div className="border-t p-4 bg-muted/50">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Test Results</h4>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Problem 2: Sorting Algorithm</h3>
                          <p className="text-sm text-muted-foreground">Submitted on March 10, 2025</p>
                        </div>
                        <Badge variant="outline" className="bg-red-500">
                          Failed
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Score: 60/100</span>
                      </div>
                    </div>
                    <div className="border-t p-4 bg-muted/50">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Test Results</h4>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

