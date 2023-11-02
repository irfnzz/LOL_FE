import { Building } from "lucide-react"

export function List({ item }) {
  return (
    <div className="relative flex grow flex-row items-center rounded-[10px] border-[1px] border-gray-200 bg-slate-100 bg-clip-border dark:bg-white">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-black p-3 text-white">{item.id}</div>
      </div>
      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">
          Available cubicle
        </p>
        <h4 className="text-navy-700 text-xl font-bold dark:text-black">
          {item.number}
        </h4>
      </div>
    </div>
  )
}
