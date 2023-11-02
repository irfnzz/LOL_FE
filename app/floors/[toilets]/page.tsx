import { Cubicle } from "@/components/ui/cubicle"

export default function Toilets() {
  const dummy = [
    { id: 1, occupied: true },
    { id: 2, occupied: false },
    { id: 3, occupied: true },
    { id: 4, occupied: true },
  ]
  return (
    <div className="flex max-w-[100vw] flex-col items-start gap-2">
      <div className="grid w-full grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-4">
        {dummy.map((index, key) => {
          return <Cubicle item={index} key={`${index}-cubicle`} />
        })}
      </div>
    </div>
  )
}
