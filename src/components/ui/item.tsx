import * as React from "react"
import { cn } from "@/lib/utils"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  active?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, title, description, icon, action, active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 rounded-lg border p-3 transition-colors",
          active && "border-primary bg-primary/5",
          !active && "border-transparent hover:bg-muted",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground truncate">{description}</p>
          )}
        </div>
        {action}
      </div>
    )
  }
)
Item.displayName = "Item"

export { Item }
