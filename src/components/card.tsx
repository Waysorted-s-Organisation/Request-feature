import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import Chat from "./chat";
import { EllipsisIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface CardProps {
  title: string;
  description: string;
  details: string;
  status: string;
  votes: number;
}

const Card: React.FC<CardProps> = ({ title, description, details, status, votes }) => {
  const [count, setCount] = useState<number>(votes || 1);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  const handleClick = (): void => {
    if (isUpvoted) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const formattedCount: string = String(count).padStart(2, "0");

  return (
    <div className="flex h-[109px] w-full max-w-[791px] border-b border-gray-200 items-center">
      {/* Upvote box */}
      <div
        onClick={() => {
          setCount(isUpvoted ? count - 1 : count + 1);
          setIsUpvoted(!isUpvoted);
        }}
        className={`w-[54px] h-[54px] cursor-pointer border rounded-md flex flex-col items-center justify-center group
        ${isUpvoted ? "border-[#265BD1] bg-[#E8EFFC]" : "border-[#565A5E] bg-white"}`}
      >
        <i className="fa-solid fa-caret-up text-xl text-[#265BD1] group-hover:-translate-y-1"></i>
        <p className="text-black">{formattedCount}</p>
      </div>

      {/* Content section wrapped in SheetTrigger */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="px-4 cursor-pointer">
            {/* Title  */}
            <h1 className="font-semibold text-sm text-black">{title}</h1>
            {/* Description  */}
            <p className="text-xs text-[#565A5E]">{description}</p>

            <div className="flex items-center gap-2 mt-3">
              <button className="text-xs text-[#265BD1] rounded-md bg-[#E8EFFC] px-2 py-1 items-center flex gap-1">
                <i className="fa-solid fa-square text-[6px]"></i>
                {status}
              </button>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent className="w-[640px] sm:max-w-[750px] rounded-l-lg">
          <SheetHeader className="">
            <SheetTitle className="mt-20 ml-5 text-sm text-[#565A5E]">
              January 26, 2024 at 02:45 AM
              {/* {new Date().toLocaleString()}  */}
            </SheetTitle>
            <SheetDescription asChild className="ml-5">
              <div className="flex flex-col gap-4 my-1">
                <div className="flex h-[109px] w-full items-center">

                  <div className="w-[54px] h-[54px] bg-[#F3F3F3] border border-[#565A5E] rounded-md flex flex-col items-center justify-center group">
                    <i className="fa-solid fa-caret-up text-xl text-[#565A5E] transform transition-transform duration-200 group-hover:-translate-y-1"></i>
                    <p className="text-black">01</p>
                  </div>

                  <div className="px-4 flex justify-between w-full">
                    <div>
                      <h1 className="font-semibold text-sm text-black">
                        {title}
                      </h1>
                      <p className="text-xs text-[#565A5E]">
                        {description}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button className="text-xs text-[#265BD1] rounded-md bg-[#E8EFFC] px-2 py-1 items-center flex gap-1">
                          <i className="fa-solid fa-square text-[6px]"></i>
                          {status}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mr-2 cursor-pointer">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="border px-1 py-1 rounded-sm flex items-center hover:text-[#265BD1] hover:bg-[#E8EFFC] gap-2 focus:outline-none focus:ring-0">
                            <EllipsisIcon />
                          </button>
                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent className={" cursor-pointer border border-gray-200 shadow-md rounded-md mt-2 mr-5"}>
                          <DropdownMenuItem className="px-3 pr-3 py-1 hover:bg-[#E8EFFC] rounded-md " inset={false}>
                            Copy Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </div>

                </div>

                <p className="mb-2 border-b pb-3 border-gray-200">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum eos obcaecati culpa id dignissimos dolor recusandae
                  ex, ducimus.
                </p>

                <div className="flex flex-1 items-center justify-center flex-col">
                  <Chat/>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Card;
