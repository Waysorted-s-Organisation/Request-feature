"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  EllipsisIcon, SquarePen } from "lucide-react"
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface MyRequest {
  id: string;
  title: string;
  description: string;
  details: string;
  status: string;
  votes: number;
  type: string;
  board: string;
  date: string;
}

interface MyRequestCardProps {
  request: MyRequest;
}

const MyRequestCard: React.FC<MyRequestCardProps> = ({ request }) => {
  const [count, setCount] = useState<number>(request.votes || 1)
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false)

  const handleClick = () => {
    if (isUpvoted) {
      setCount((prev) => prev - 1)
      setIsUpvoted(false)
    } else {
      setCount((prev) => prev + 1)
      setIsUpvoted(true)
    }
  }

  const formattedCount = count.toString().padStart(2, "0")

  return (
    <div className="flex h-[109px] w-[791px] border-b border-gray-200 items-center">
      {/* Upvote Box */}
      <div
        onClick={handleClick}
        className={`w-[54px] h-[54px] cursor-pointer border rounded-md flex flex-col items-center justify-center group transition-colors duration-200
          ${
            isUpvoted
              ? "border-[#265BD1] bg-[#E8EFFC]"
              : "bg-white border-[#565A5E]"
          }`}
      >
        <i className="fa-solid fa-caret-up text-xl text-[#565A5E] transform transition-transform duration-200 group-hover:-translate-y-1"></i>
        <p className="text-black">{formattedCount}</p>
      </div>

      {/* Request Info */}
      <div className="px-4 flex justify-between w-full">
        <div>
          <h1 className="font-semibold text-sm">{request.title}</h1>
          <p className="text-xs text-[#565A5E]">{request.description}</p>

          <div className="flex items-center gap-2 mt-3">
            <button className="text-xs text-[#565A5E] rounded-md bg-[#F3F3F3] px-2 py-1 items-center flex gap-1">
              <i className="fa-solid fa-square text-[6px]"></i>
              Your request
            </button>
            <button className="text-xs text-[#F24E1E] rounded-md bg-[#FFE8E8] px-2 py-1 items-center flex gap-1">
              <i className="fa-solid fa-square text-[6px]"></i>
              {request.status || "Under Review"}
            </button>
          </div>
        </div>

        {/* Manage Request Button */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="hover:bg-[#E8EFFC] hover:text-[#265BD1]"
              >
                <EllipsisIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[640px] sm:max-w-[750px] rounded-l-lg">
              <SheetHeader>
                <SheetTitle className="mt-20 ml-5 text-sm text-[#565A5E]">
                  {request.date}
                </SheetTitle>
                <SheetDescription asChild className="ml-5">
                  <div className="flex flex-col gap-4 my-1">
                    {/* Top Card Inside Sheet */}
                    <div className="flex h-[109px] w-full items-center">
                      <div className="w-[54px] h-[54px] bg-[#F3F3F3] border border-[#565A5E] rounded-md flex flex-col items-center justify-center group">
                        <i className="fa-solid fa-caret-up text-xl text-[#565A5E] transform transition-transform duration-200 group-hover:-translate-y-1"></i>
                        <p className="text-black">{formattedCount}</p>
                      </div>

                      <div className="px-4 flex justify-between w-full">
                        <div>
                          <h1 className="font-semibold text-sm">
                            {request.title}
                          </h1>
                          <p className="text-xs text-[#565A5E]">
                            {request.details}
                          </p>

                          <div className="flex items-center gap-2 mt-3">
                            <button className="text-xs text-[#565A5E] rounded-md bg-[#F3F3F3] px-2 py-1 items-center flex gap-1">
                              <i className="fa-solid fa-square text-[6px]"></i>
                              Your request
                            </button>
                            <button className="text-xs text-[#F24E1E] rounded-md bg-[#FFE8E8] px-2 py-1 items-center flex gap-1">
                              <i className="fa-solid fa-square text-[6px]"></i>
                              {request.status || "Under Review"}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center mr-5 p-2 rounded-md  w-[36px] h-[36px]">
                          <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="border px-2 py-1 rounded-sm flex items-center hover:text-[#265BD1] gap-2 focus:outline-none focus:ring-0">
                            <EllipsisIcon />
                          </button>
                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent className={"mr-2 cursor-pointer"}>
                          <DropdownMenuItem className="px-3 py-1 hover:bg-[#E8EFFC] rounded-md" onClick={() => {}}>
                            Edit request
                          </DropdownMenuItem>
                          <DropdownMenuItem className="px-3 py-1 hover:bg-[#E8EFFC] rounded-md" onClick={() => {}}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-2 border-b pb-3 border-gray-200 text-sm text-gray-600">
                      {request.description}
                    </p>

                    {/* Comments Section Placeholder */}
                    <div className="flex flex-1 mt-40 items-center justify-center flex-col">
                      <h1 className="text-md text-black">No comments Yet!</h1>
                      <p className="text-black text-xs">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Nobis, alias?
                      </p>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default MyRequestCard
