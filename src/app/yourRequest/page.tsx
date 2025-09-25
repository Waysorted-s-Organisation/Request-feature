"use client"
import MyRequestCard from '@/components/MyRequestCard';
import Navbar from '@/components/Navbar'
import { useMyRequest } from '@/context/MyRequestContext';
import { useRequests } from '@/context/RequestContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const page = () => {

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
    <div>
         <div className="fixed top-0 left-0 w-full h-[68px] z-50">
           <Navbar />
         </div>
         
        <div className=' flex flex-1 pt-[68px]'>

            <div className='h-[calc(100vh-68px)] flex-1 flex flex-col z-50 m-5 bg-white'>

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

                 <div className="mx-auto">
                   {myRequests.length === 0 ? (
                     <p className="text-sm text-gray-500">
                       You have not submitted any requests yet.
                     </p>
                   ) : (
                     myRequests.map((req) => (
                       <MyRequestCard key={req.id} request={req} />
                     ))
                   )}
                 </div>

            </div>

        </div>
      
    </div>
  )
}

export default page
