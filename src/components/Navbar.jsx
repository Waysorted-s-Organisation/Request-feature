"use client"
import React, { useState } from 'react'
import { Bell, PlusIcon, SearchIcon, Sun } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import { useRequests } from '@/context/RequestContext'   // ❌ no longer needed
import { useMyRequest } from '@/context/MyRequestContext'  // ✅ use my requests
import ProfileDropdown from '@/components/ProfileDropdown'
import Notification from '@/components/Notification'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [type, setType] = useState("feature")
  const [open, setOpen] = useState(false)

  // const { addRequest } = useRequests();  // ❌ for all users
  const { addMyRequest } = useMyRequest()  // ✅ for logged-in user's requests

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  return (
    <div className='bg-white z-50 h-[68px] w-screen border-b border-gray-200 flex justify-between items-center px-5'>
      <div><img src="/Waysorted.svg" alt="logo" /></div>
      <div className='flex items-center gap-1'>
        <button className='border bg-white p-1 rounded-md w-[36px] h-[36px] flex items-center justify-center'>
          <Sun size={16}/> 
        </button>

        {/* Search box */}
        <div className='flex items-center hover:bg-[#F3F3F3] border rounded-md w-[241px] h-[36px] px-2'>
          <SearchIcon size={16}/>
          <Input placeholder="Search..." className="border-none shadow-none px-1 focus:outline-none focus:ring-0 focus-visible:ring-0" />
        </div> 

        {/* Request a feature / bug dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#265BD1] text-white">
              <PlusIcon size={12}/> Request a feature 
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm text-[#565A5E]">
                Request a feature or report a bug
              </DialogTitle>
            </DialogHeader>

            <Separator />

            <div className="space-y-4">
              {/* Radio buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium">I would like to:</p>
                <RadioGroup
                  defaultValue="feature"
                  onValueChange={(val) => setType(val)}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature">Request a feature</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug">Report a Bug</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Select Board */}
              <div className="space-y-2">
                <Label>Select Board</Label>
                <Select>
                  <SelectTrigger className="w-full bg-[#F3F3F3]">
                    <SelectValue placeholder="Figma Plugin" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="figma">Figma Plugin</SelectItem>
                    <SelectItem value="web">Web App</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  {type === "bug" ? "Issue" : "Title"}
                </Label>
                <Input
                  id="title"
                  className="bg-[#F3F3F3]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />          
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea 
                  id="desc" 
                  className="bg-[#F3F3F3]" 
                  value={desc} 
                  onChange={(e)=>setDesc(e.target.value)} 
                />
              </div>

              {/* Submit */}
              <Button 
                onClick={() => {
                  // addRequest(title, desc);   // ❌ sends request to global context (all users)
                  addMyRequest({
                    title,
                    description: desc,
                    details: "Submitted from Navbar", // you can pass board info here
                    status: type === "bug" ? "Bug Reported" : "Under Review",
                  })  // ✅ sends request only to logged-in user's context

                  setOpen(true) // open success dialog
                  setTitle("")
                  setDesc("")
                }} 
                className="bg-[#265BD1] hover:bg-blue-700 text-white"
              >
                Submit request
              </Button>

              {/* Success Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md text-center">
                  <DialogHeader>
                    <DialogTitle className="text-sm text-[#565A5E]">
                      Request submitted
                    </DialogTitle>
                  </DialogHeader>
                  <Separator/>
        
                  <div className="flex flex-col items-center space-y-4 py-6">
                    <img
                      src="/success.svg"
                      alt="Success"
                      className="w-[59px] h-[59px]"
                    />
                    <p className="text-green-600 font-semibold text-lg">Success!</p>
                    <p className="text-gray-500">
                      Your request has been added to <b>My Requests</b>.
                    </p>
                  </div>
        
                  <div className="bg-[#E8EFFC] w-full p-2 rounded-md text-sm text-gray-600">
                    You can{" "}
                    <a href="/my-requests" className="text-[#265BD1]">
                      click here
                    </a>{" "}
                    to track the status of your request
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </DialogContent>
        </Dialog>

        <Notification/>
        <ProfileDropdown/>
      </div>
    </div>
  )
}
 
export default Navbar
