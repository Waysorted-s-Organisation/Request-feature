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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {  EllipsisIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useMyRequest } from "@/context/MyRequestContext"

const MyReportCard = ({ request }) => {

    const { editMyRequest, deleteMyRequest } = useMyRequest()

  const [count, setCount] = useState(request.votes || 1)
  const [isUpvoted, setIsUpvoted] = useState(false)

  // ✅ Edit state
  const [isEditing, setIsEditing] = useState(false)
  const [tempDesc, setTempDesc] = useState(request.description)

  const formattedCount = count.toString().padStart(2, "0")

  return (
    <div className="flex h-[109px] w-[791px] border-b border-gray-200 items-center">

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
                className="hover:bg-[#E8EFFC] hover:text-[#265BD1] "
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
                          <button className="bg-[#F3F3F3] px-2 py-2 rounded-lg cursor-pointer flex items-center hover:text-[#265BD1] hover:bg-[#E8EFFC] gap-2 focus:outline-none focus:ring-0">
                            <EllipsisIcon />
                          </button>
                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent className={"mr-10 cursor-pointer "}>
                          <DropdownMenuItem className="px-3 py-1 hover:bg-[#E8EFFC] text-xs rounded-md" onClick={() => setIsEditing(true)}>
                            Edit request
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="px-3 py-1 hover:bg-[#E8EFFC] text-xs rounded-md"
                              >
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Requested Feature</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this request? This will permanently
                                  remove it and you’ll need to resubmit if required.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                          
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => deleteMyRequest(request.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                        </DropdownMenuContent>
                </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Editable Description */}
                    <div className="mb-2 border-b pb-3 border-gray-200 text-sm text-gray-600">
                      {isEditing ? (
                        <div className="flex flex-col gap-1">
                          <textarea
                            // autoFocus 
                            value={tempDesc}
                            onChange={(e) => setTempDesc(e.target.value)}
                            className="w-full p-2 rounded-md outline-none resize-none caret-[#265BD1] "
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                editMyRequest(request.id, tempDesc)
                                setIsEditing(false)
                              }}
                              className={"bg-[#265BD1] text-white px-5"}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setTempDesc(request.description)
                                setIsEditing(false)
                              }}
                              className={"bg-[#F3F3F3] text-black px-5"}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="cursor-text">{request.description}</p>
                      )}
                    </div>

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

export default MyReportCard
