import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "",
      outline: "border rounded-md",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({ className, variant, size, ...props }: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { ButtonGroup, buttonGroupVariants }
