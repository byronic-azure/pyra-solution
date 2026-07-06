import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, error, helperText, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        {children}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)
Field.displayName = "Field"

export { Field }
