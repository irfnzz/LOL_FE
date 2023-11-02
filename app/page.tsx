"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { List } from "@/components/ui/list"

export default function IndexPage() {
  const [data, setData] = useState()
  const [ws, setWS] = useState(null)
  const dummy = [
    { name: "Floor 23", id: 23, number: 2 },
    { name: "Floor 24", id: 24, number: 4 },
    { name: "Floor 25", id: 25, number: 3 },
    { name: "Floor 26", id: 26, number: 4 },
    { name: "Floor 27", id: 27, number: 2 },
  ]

  // useEffect(() => {
  //   // WebSocket connection URL
  //   const socketUrl =
  //     "wss://3iy02674sg.execute-api.ap-southeast-1.amazonaws.com/dev/@connections"

  //   // Create a new WebSocket instance
  //   const socket = new WebSocket(socketUrl)

  //   socket.onerror = (err) => console.error(err)
  //   socket.onopen = () => setWS(socket)
  //   socket.onmessage = (msg) => setData(JSON.parse(msg.data))
  // }, []) // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Toilet list based on floor
        </h1>
      </div>
      <div class="grid w-full grid-cols-1 gap-8">
        {dummy.map((item, key) => {
          return (
            <Link key={key} href={`/floors/${item.id}`}>
              <List item={item} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
