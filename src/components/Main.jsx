"use client"
import { useState } from 'react'
import Card from '@/components/card'
import MyRequestCard from './MyRequestCard'
import { useRequests } from '@/context/RequestContext'
import { useMyRequest } from '@/context/MyRequestContext'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const Main = () => {
  const { requests } = useRequests()
  const { myRequests } = useMyRequest()

  const [selected, setSelected] = useState("Most votes")
  const [open, setOpen] = useState(false)

  const [active, setActive] = useState("Planned")

  const statusButtons = [
    { label: "Planned", color: "#265BD1" },
    { label: "In Progress", color: "#01A04E" },
    { label: "Released", color: "#7531F9" },
    { label: "Not done", color: "#565A5E" },
  ]

  return (
    <div className="relative w-full">
      
      {/* Fixed Header */}
      <div
        id="fixed-header"
        className="fixed top-[58px] left-[225px] right-0 z-40 flex justify-between items-center bg-white px-5 py-8"
      >
        {/* Left: Filter Dropdown */}
        <div className="flex items-center gap-2 text-sm">
          <p>Show</p>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`border px-2 py-1 rounded-sm flex items-center gap-2 focus:outline-none focus:ring-0 transition-colors duration-200 ${
                  open ? "bg-gray-100" : "bg-transparent"
                } hover:text-[#265BD1]`}
              >
                {selected}
                <ChevronDown size={16} className={`${open ? "rotate-180" : ""} transition-transform duration-300`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cursor-pointer">
              <DropdownMenuItem onClick={() => setSelected("Most votes")}>Most votes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelected("Recently added")}>Recently added</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelected("Random")}>Random</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Status buttons */}
        <div className="flex gap-1">
          {statusButtons.map(({ label, color }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`text-sm text-[#565A5E] rounded-md border px-2 py-1 flex items-center gap-1 transition-colors duration-200 ${
                active === label ? "bg-[#F3F3F3]" : "bg-transparent"
              } hover:text-[${color}]`}
            >
              <i className="fa-solid fa-square text-[6px]" style={{ color }}></i>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="pt-[90px] space-y-4 w-[850px] mx-auto">
        {/* My Requests */}
        {myRequests.length === 0 ? (
          <p className="text-sm text-gray-500">You have not submitted any requests yet.</p>
        ) : (
          <MyRequestCard key={myRequests.at(-1).id} request={myRequests.at(-1)} showManageText={true} />
        )}

        {/* Other Users Requests */}
        {requests.map((req) => (
          <Card
            key={req.id}
            title={req.title}
            description={req.description}
            details={req.details}
            status={req.status}
            votes={req.votes}
          />
        ))}

        {requests.map((req) => (
          <Card
            key={req.id}
            title={req.title}
            description={req.description}
            details={req.details}
            status={req.status}
            votes={req.votes}
          />
        ))}
        
      </div>

    </div>
  )
}

export default Main
