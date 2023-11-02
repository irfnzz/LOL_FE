"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { List } from "@/components/ui/list"

export default function IndexPage() {
  const [data, setData] = useState()
  const dummy = [
    { name: "Floor 23", id: 23, number: 2 },
    { name: "Floor 24", id: 24, number: 4 },
    { name: "Floor 25", id: 25, number: 3 },
    { name: "Floor 26", id: 26, number: 4 },
    { name: "Floor 27", id: 27, number: 2 },
  ]

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    // WebSocket event listeners
    socket.onopen = () => {
      console.log("WebSocket connection opened")
    }

    socket.onmessage = (event) => {
      console.log("Received message:", event.data)
    }

    socket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close()
    }
  }, []) // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Toilet list based on floor
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-8">
        {dummy.map((item, key) => {
          return (
            <Link key={`${key}-list`} href={`/floors/${item.id}`}>
              <List item={item} />
            </Link>
          )
        })}
      </div>
    </>
  )
}
