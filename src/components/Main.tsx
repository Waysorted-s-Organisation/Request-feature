"use client";
import Card from '@/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRequests } from '@/context/RequestContext';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useMyRequest } from '@/context/MyRequestContext';
import MyRequestCard from './MyRequestCard';

type SortOption = "Most votes" | "Recently added" | "Random";

const Main: React.FC = () => {
    const { requests } = useRequests();
    const { myRequests } = useMyRequest();

    const [selected, setSelected] = useState<SortOption>("Most votes");
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='h-[calc(100vh-68px)] flex-1 flex flex-col z-50 px-5 pt-5'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex text-sm items-center mt-4 gap-2'>
                    <p>Show</p>
                    <DropdownMenu open={open} onOpenChange={setOpen} className={"cursor-pointer"}>
                        <DropdownMenuTrigger asChild>
                            <button className="border border-gray-200 bg-white text-[#565A5E] px-2 py-1 rounded-sm flex items-center gap-2 hover:border-[#265BD1] hover:text-[#265BD1] focus:outline-none focus:ring-0 transition-colors">
                                {selected}
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                                />
                            </button>
                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent className="cursor-pointer bg-white border-gray-200 shadow-md">
                            <DropdownMenuItem 
                                onClick={() => setSelected("Most votes")}
                                className="hover:bg-[#E8EFFC]"
                                inset={false}
                            >
                                Most votes
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => setSelected("Recently added")}
                                className="hover:bg-[#E8EFFC]"
                                inset={false}
                            >
                                Recently added
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => setSelected("Random")}
                                className="hover:bg-[#E8EFFC]"
                                inset={false}
                            >
                                Random
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex gap-1'>
                    <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border border-gray-200 bg-white px-2 py-1 items-center flex gap-1 transition-colors'>
                        <i className="fa-solid fa-square text-[6px] text-[#265BD1]"></i>
                        {' '}
                        Planned
                    </button>
                    <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border border-gray-200 bg-white px-2 py-1 items-center flex gap-1 transition-colors'>
                        <i className="fa-solid fa-square text-[6px] text-[#01A04E]"></i>
                        {' '}
                        In Progress
                    </button>
                    <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border border-gray-200 bg-white px-2 py-1 items-center flex gap-1 transition-colors'>
                        <i className="fa-solid fa-square text-[6px] text-[#7531F9]"></i>
                        {' '}
                        Released
                    </button>
                    <button className='text-sm text-[#565A5E] rounded-md hover:bg-[#F3F3F3] border border-gray-200 bg-white px-2 py-1 items-center flex gap-1 transition-colors'>
                        <i className="fa-solid fa-square text-[6px] text-[#565A5E]"></i>
                        {' '}
                        Not done
                    </button>
                </div>
            </div>

            <div className="space-y-0 w-full">
                {/* My requests  */}
                {myRequests.length > 0 && (
                    <div className="mb-0">
                        <MyRequestCard 
                            key={myRequests[myRequests.length - 1]?.id} 
                            request={myRequests[myRequests.length - 1]!} 
                            showManageText={true} 
                        />
                    </div>
                )}

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
    );
};

export default Main;
