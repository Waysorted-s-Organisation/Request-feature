"use client"
import { Button } from '@/components/ui/button'
import Card from '@/components/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRequests } from '@/context/RequestContext'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { ArrowBigDownIcon, ChevronDown, Edit2Icon, SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import { useMyRequest } from '@/context/MyRequestContext'
import MyRequestCard from './MyRequestCard'

const Main = () => {

    const { requests } = useRequests();
    const { myRequests } = useMyRequest()

    const [selected, setSelected] = useState("Most votes")
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(1);
    const [isUpvoted, setIsUpvoted] = useState(false);
    
      const handleClick = () => {
        if (isUpvoted) {
          setCount(count - 1);
        } else {
          setCount(count + 1);
        }
        setIsUpvoted(!isUpvoted);
      };
    
    const formattedCount = String(count).padStart(2, "0");

  return (
    <div className='h-[calc(100vh-68px)] flex-1 flex flex-col z-50 m-5'>

        <div className='flex justify-between items-center mr-5 mb-6'>

            <div className='flex text-sm items-center mt-4 gap-2'>

                <p>Show</p>
                 <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                          <button className="border px-2 py-1 rounded-sm flex items-center hover:text-[#265BD1] gap-2 focus:outline-none focus:ring-0">
                            {selected}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                            />
                          </button>
                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelected("Most votes")}>
                            Most votes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelected("Recently added")}>
                            Recently added
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelected("Random")}>
                            Random
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className='flex gap-1' >
                <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border  px-2 py-1 items-center flex gap-1'>
                    <i className="fa-solid fa-square text-[6px] text-[#265BD1]"></i>
                    Planned
                </button>
                <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border  px-2 py-1 items-center flex gap-1'>
                    <i className="fa-solid fa-square text-[6px] text-[#01A04E]"></i>
                    In Progress
                </button>
                <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border  px-2 py-1 items-center flex gap-1'>
                    <i className="fa-solid fa-square text-[6px] text-[#7531F9]"></i>
                    Released
                </button>
                <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border  px-2 py-1 items-center flex gap-1'>
                    <i className="fa-solid fa-square text-[6px] text-[#565A5E]"></i>
                    Not done
                </button>
            </div>

        </div>


        <div>
            
        {/* My requests  */}
            <div className="space-y-4">
              {myRequests.length === 0 ? (
                <p className="text-sm text-gray-500">
                  You have not submitted any requests yet.
                </p>
              ) : (
                // myRequests.map((req) => (
                //   <MyRequestCard key={req.id} request={req} />
                // ))
                <MyRequestCard key={myRequests.at(-1).id} request={myRequests.at(-1)} />

              )}
            </div>

            {/* Other users Requests  */}

            <div>
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
    </div>
  )
}

export default Main
