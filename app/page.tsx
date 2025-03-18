import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Code Grader</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Automated Code Grading Platform
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Submit your code, get instant feedback, and improve your programming skills. Our platform provides
                  automated grading with detailed test cases and criteria.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login?role=student">
                    <Button size="lg">Student Login</Button>
                  </Link>
                  <Link href="/login?role=teacher">
                    <Button size="lg" variant="outline">
                      Teacher Login
                    </Button>
                  </Link>
                  <Link href="/login?role=admin">
                    <Button size="lg" variant="outline">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg border bg-background p-2">
                  <div className="bg-muted rounded-md p-4">
                    <div className="h-6 w-3/4 rounded bg-muted-foreground/20 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted-foreground/20"></div>
                      <div className="h-4 w-5/6 rounded bg-muted-foreground/20"></div>
                      <div className="h-4 w-4/6 rounded bg-muted-foreground/20"></div>
                    </div>
                    <div className="mt-6 h-32 rounded bg-muted-foreground/10 p-2">
                      <div className="h-4 w-3/4 rounded bg-muted-foreground/20"></div>
                      <div className="mt-2 h-20 rounded bg-muted-foreground/10"></div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="h-8 w-24 rounded bg-primary/70"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 Code Grader. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-500 hover:underline dark:text-gray-400">
              Terms
            </Link>
            <Link href="#" className="text-gray-500 hover:underline dark:text-gray-400">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 hover:underline dark:text-gray-400">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

