import type React from "react"
interface AdminDashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminDashboardShell({ children, className, ...props }: AdminDashboardShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container space-y-6 p-6 pb-16" {...props}>
        {children}
      </div>
    </div>
  )
}

