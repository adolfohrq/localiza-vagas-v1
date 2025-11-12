import type React from "react"
interface CandidateDashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CandidateDashboardShell({ children, className, ...props }: CandidateDashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 space-y-6 p-6">{children}</div>
    </div>
  )
}

