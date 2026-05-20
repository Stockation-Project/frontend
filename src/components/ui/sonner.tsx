import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon, CircleAlert, CircleCheckBig, TriangleAlert } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <div className="flex items-center justify-center mt-1.5 w-7 h-7 pl-1 pr-0.5 rounded-sm bg-white shadow-brand-600 !shadow-[0_0_70px] border border-border-primary">
            <CircleCheckBig className="size-4 text-brand-700 bg-brand-100 rounded-full" />
          </div>
        ),
        info: (
          <div className="flex items-center justify-center mt-1.5 w-7 h-7 pl-1 pr-0.5 rounded-sm bg-white shadow-brand-600 !shadow-[0_0_70px] border border-border-primary">
            <InfoIcon className="size-4 text-blue-500 bg-blue-200 rounded-full" />
          </div>
        ),
        warning: (
          <div className="flex items-center justify-center mt-1.5 w-7 h-7 pl-1 pr-0.5 rounded-sm bg-white shadow-yellow-600 !shadow-[0_0_70px] border border-border-primary">
            <TriangleAlert className="size-4 text-yellow-500 bg-yellow-200 rounded-full" />
          </div>
        ),
        error: (
          <div className="flex items-center justify-center mt-1.5 w-7 h-7 pl-1 pr-0.5 rounded-sm bg-white shadow-red-600 !shadow-[0_0_70px] border border-border-primary">
            <CircleAlert className="size-4 text-red-500 bg-red-200 rounded-full" />
          </div>
        ),
        loading: (
          <div className="flex items-center justify-center mt-1.5 w-7 h-7 pl-1 pr-0.5 rounded-sm bg-white shadow-brand-600 !shadow-[0_0_70px] border border-border-primary">
            <Loader2Icon className="size-4 text-brand-700 bg-brand-200 rounded-full animate-spin" />
          </div>
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !gap-4 !p-4 !items-start !rounded-md !border !border-border-primary !bg-background-primary !text-text-primary shadow-lg !overflow-hidden font-['Zalando_Sans_SemiExpanded']",
          content: "!gap-0.5 ",
          description: "!text-xs !text-text-muted",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
