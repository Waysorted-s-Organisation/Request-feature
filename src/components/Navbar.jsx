"use client"
import React, { useEffect, useState } from "react"
import { Bell, PlusIcon, SearchIcon, Sun } from "lucide-react"
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
import { useMyRequest } from "@/context/MyRequestContext"
import ProfileDropdown from "@/components/ProfileDropdown"
import Notification from "@/components/Notification"
import { useRouter } from "next/navigation"

// ---- Placeholder for your upload component ----
const BugUploadDialog = ({ open, onOpenChange }) => {
  const { files, setFiles } = useMyRequest()
  // const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  // 🔑 Reset when dialog opens
  useEffect(() => {
    if (open) {
      setFiles([])
      setUploading(false)
    }
  }, [open])

  function handleFiles(e) {
    const newFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...newFiles].slice(0, 2))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm text-[#565A5E]">
            Request a feature or report a bug
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium">Upload and attach files</p>

          {/* Upload box */}
          <label className="flex flex-col bg-[#F3F3F3] items-center justify-center border-2 border-dashed border-[#CFD0D1] rounded-md p-6 text-sm cursor-pointer hover:border-blue-400 transition">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFiles}
            />
            <img src="/upload.png" alt="" className="py-4"/>
            <p className="text-[#265BD1]">Click to Upload <span className="text-[#565A5E]">an Image</span></p>
            <span className="text-gray-400 text-xs">(Max. file size 25 MB)</span>
          </label>

          {files.length > 0 && (
            <div className="space-y-2 w-full">
              
              {uploading ? (
                <>
                  <p className="text-sm text-gray-500">
                    {files.length} files uploading...
                  </p>
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="border rounded-md p-2 flex flex-col items-start justify-between text-sm"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <img src="/upload.png" alt=""/>
                        {file.name}
                      </div>
                        {file.size && (
                          <p className="text-xs text-gray-400 mb-1">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        )}
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-1 bg-[#265BD1] w-[100%]" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="border rounded-md p-2 flex items-start justify-between text-sm"
                    >
                      <div className="flex-col items-center gap-2">
                        <div className="flex items-center gap-2 mb-2 ">
                          <img src="./upload.png" alt="" />
                          {file.name}
                        </div>
                        {file.size && (
                          <p className="text-xs text-gray-400 mb-1">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== idx))
                        }
                        className="text-black text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between mt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-1/2 mr-2"
            >
              Skip for now
            </Button>
            <Button
              className="bg-[#265BD1] w-1/2"
              onClick={() => {
                setUploading(true)
                setTimeout(() => {
                  setUploading(false)
                  onOpenChange(false)
                }, 2000)
                setSuccessOpen(true)
              }}
            >
              Submit report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
// -----------------------------------------------

const Navbar = () => {
  const [type, setType] = useState("feature")
  const [mainOpen, setMainOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [bugDialogOpen, setBugDialogOpen] = useState(false)

  const { addMyRequest } = useMyRequest()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const router = useRouter()

  return (
    <div className="bg-white z-50 h-[68px] w-screen border-b border-gray-200 flex justify-between items-center px-5">
      <div><img src="/Waysorted.svg" alt="logo" /></div>

      <div className="flex items-center gap-1">
        <button className="border bg-white p-1 rounded-md w-[36px] h-[36px] flex items-center justify-center">
          <Sun size={16} />
        </button>

        <div className="flex items-center hover:bg-[#F3F3F3] border rounded-md w-[241px] h-[36px] px-2">
          <SearchIcon size={16} />
          <Input
            placeholder="Search..."
            className="border-none shadow-none px-1 focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
        </div>

        {/* Main Request Dialog */}
        <Dialog open={mainOpen} onOpenChange={setMainOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#265BD1] text-white">
              <PlusIcon size={12} /> Request a feature
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
              <div className="space-y-2">
                <p className="text-sm font-medium">I would like to:</p>
                <RadioGroup
                  defaultValue="feature"
                  onValueChange={setType}
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

              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  className="bg-[#F3F3F3]"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <Button
                className="bg-[#265BD1] hover:bg-blue-700 text-white"
                onClick={() => {
                  addMyRequest({
                    title,
                    description: desc,
                    details: "Submitted from Navbar",
                    status:
                      type === "bug" ? "Bug Reported" : "Under Review",
                  })
                  setMainOpen(false)
                  if (type === "bug") {
                    setBugDialogOpen(true)   // 🚀 open bug upload
                  } else {
                    setSuccessOpen(true)     // ✅ open success
                  }
                  setTitle("")
                  setDesc("")
                }}
              >
                Submit request
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success dialog (feature only) */}
        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent className="max-w-md text-center">
            <DialogHeader>
              <DialogTitle className="text-sm text-[#565A5E]">
                Request a feature or report a bug
              </DialogTitle>
            </DialogHeader>
            <Separator />
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
                    <a onClick={() => router.push("/yourRequest")} className="cursor-pointer text-[#265BD1]">
                      click here
                    </a>{" "}
                    to track the status of your request
                  </div>
          </DialogContent>
        </Dialog>

        {/* Bug upload dialog */}
        <BugUploadDialog open={bugDialogOpen} onOpenChange={setBugDialogOpen} />

        <Notification />
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default Navbar
