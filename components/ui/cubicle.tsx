import { cn } from "@/lib/utils"

export function Cubicle({ item }) {
  const color = item.occupied ? "bg-red-500" : "bg-green-500"
  return (
    <div
      className={cn(
        "flex h-72 items-center justify-center rounded-xl border text-card-foreground shadow",
        color
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white font-bold dark:text-black">
        {item.id}
      </div>
    </div>
  )
}
