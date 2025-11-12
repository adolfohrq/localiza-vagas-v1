import type React from "react"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <div className="container max-w-7xl mx-auto flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

