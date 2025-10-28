"use client"
import MyReportCard from '@/components/MyReportCard';
import MyRequestCard from '@/components/MyRequestCard';
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useMyRequest } from '@/context/MyRequestContext';
import { useRequests } from '@/context/RequestContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {

  const router = useRouter();

    const { requests } = useRequests();
        const { myRequests } = useMyRequest()
    
        const [selected, setSelected] = useState("Most votes")
        const [open, setOpen] = useState(false)
        const [count, setCount] = useState(1);
        const [isUpvoted, setIsUpvoted] = useState(false);
        const [active, setActive] = useState("requests");
        
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

         <div className="flex flex-1 pt-[68px]">

        
        <div className=" flex-1 overflow-y-auto h-[calc(100vh-68px)] px-4">
          <div>

            <div className='h-[calc(100vh-68px)] flex-1 flex flex-col z-50  bg-white'>

                 <div className='flex justify-between items-center mr-10 mb-6 fixed bg-white w-[calc(100%-40px)] z-50 pt-1'>

                    <div className='flex text-sm items-center mt-4 gap-2'>
        
                        <div onClick={()=> router.push("/")} className='flex items-center border cursor-pointer border-gray-300 px-5 py-2 rounded-md text-sm text-[#565A5E] hover:bg-[#E8EFFC] hover:border-white hover:text-[#265BD1]'>
                          <ChevronLeft size={16}/> 
                          <p>Go back</p>
                        </div>
        
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


                 <div className="mx-auto relative mt-20">

                  <div className='flex gap-6'>
                    <p
                    onClick={() => setActive("requests")} 
                    className={`text-sm w-fit mb-4 cursor-pointer ${active === "requests" ? "border-b-2 border-[#265BD1] text-[#265BD1]" : ""}`}>My Requests
                    </p>

                    <p
                    onClick={() => setActive("reports")} 
                    className={`text-sm w-fit mb-4 cursor-pointer ${active === "reports" ? "border-b-2 border-[#265BD1] text-[#265BD1]" : ""}`}>My Reports
                    </p>

                  </div>

                   {/* Requests-------------------------------- */}

                   {active === "requests" && (
                    myRequests.length === 0 ? (
                     <p className="text-sm text-gray-500">
                       You have not submitted any requests yet.
                     </p>
                   ) : (
                     myRequests.map((req) => (
                       <MyRequestCard key={req.id} request={req} />
                     ))
                   ))}

                    {/* Reports-------------------------------- */}

                    {active === "reports" && (
                      myRequests.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          You do not have any reports yet.
                        </p>
                      ) : (
                        myRequests.map((request) => (
                          <MyReportCard key={request.id} request={request} />
                        ))
                      )
                    )}

                 </div>

            </div>

        </div>
        </div>
      </div>
         
        
      
    </div>
  )
}

export default page
