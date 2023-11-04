"use client"

import { use, useEffect, useState } from "react"

import { Cubicle } from "@/components/ui/cubicle"
import { List } from "@/components/ui/list"

interface ApiData {
  status: boolean
}

const getData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sample/status`
  )
  const status = await data.json()

  return status
}

export default function IndexPage() {
  const [connectionFailed, setConnectionFailed] = useState(false)
  const [wsData, setwsData] = useState(["status", false])
  const [activeFloor, setActiveFloor] = useState(false)
  const [apiData, setApiData] = useState<ApiData | null>(null)
  const [dummy, setDummy] = useState([
    { name: "Floor 23", id: 23, number: 4 },
    { name: "Floor 24", id: 24, number: 4 },
    { name: "Floor 25", id: 25, number: 4 },
    { name: "Floor 26", id: 26, number: 4 },
    { name: "Floor 27", id: 27, number: 4 },
  ])

  useEffect(() => {
    setDummy((prevDummy) => {
      // Find the index of the object with id 23
      const index = prevDummy.findIndex((item) => item.id === 23)

      // If found, update the number
      if (index !== -1) {
        const newDummy = [...prevDummy]

        if (connectionFailed) {
          newDummy[index].number = apiData?.status ? 3 : 4
        } else if (wsData[1]) {
          newDummy[index].number = 3
        } else {
          newDummy[index].number = 4
        }

        return newDummy
      }

      // If not found, return the previous state
      return prevDummy
    })
  }, [wsData, connectionFailed, apiData])

  useEffect(() => {
    let connectionTimeout: NodeJS.Timeout
    let connectionAttempts = 0 // Initialize connectionAttempts
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`)

    // WebSocket event listeners
    socket.onopen = () => {
      console.log("WebSocket connection opened")
      connectionAttempts = 0 // Reset connectionAttempts when connection is successful
    }

    socket.onmessage = (event) => {
      console.log("Received message:", event.data)
      setwsData(JSON.parse(event.data))

      // Set a timeout to call the API if no data is received within 10 seconds
      connectionTimeout = setTimeout(() => {
        if (!event?.data) {
          console.log("No data received after 10 seconds")
          setConnectionFailed(true) // Set connectionFailed to true
        }
      }, 10000) // 10 seconds
    }

    socket.onerror = (error) => {
      console.error(`WebSocket error: ${error}`)
      connectionAttempts++ // Increment connectionAttempts

      if (connectionAttempts >= 2) {
        // Only call API after the second failed attempt
        connectionTimeout = setTimeout(() => {
          console.log("WebSocket connection failed")
          setConnectionFailed(true) // Set connectionFailed to true
        }, 10000) // 10 seconds
      }
    }

    socket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close()
      clearTimeout(connectionTimeout)
    }
  }, []) // Empty dependency array ensures this effect runs once on mount

  useEffect(() => {
    if (connectionFailed) {
      const getApiData = use(getData())
      setApiData(getApiData)
    }
  }, [connectionFailed])

  const handleClick = () => {
    setActiveFloor((prevState) => !prevState)
  }

  return (
    <>
      {!activeFloor ? (
        <>
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Toilet list based on floor
            </h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-8">
            {dummy.map((item, key) => {
              return (
                <List item={item} key={`${key}-list`} onClick={handleClick} />
              )
            })}
          </div>
        </>
      ) : null}

      {activeFloor ? (
        <>
          <a
            className="cursor-pointer text-black dark:text-white"
            onClick={handleClick}
          >
            Back
          </a>
          <Cubicle data={dummy} />
        </>
      ) : null}
    </>
  )
}
