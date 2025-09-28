"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, FileText, HelpCircle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileDropdown() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Trigger button (profile circle) */}
        <Button className="rounded-md w-[36px] h-[36px] bg-[#E8EFFC] text-[#265BD1] p-0 hover:bg-[#E8EFFC] cursor-pointer">
          RG
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-58 mr-2 p-1">
        {/* Username + Email */}
        <DropdownMenuLabel className="flex flex-col items-start">
          <div className="flex gap-2">

            <div className="w-[36px] h-[36px] text-[#265BD1] bg-[#E8EFFC] rounded-md flex items-center justify-center">RG</div>

            <div>
              <p className="font-bold">USERNAME</p>
              <p className="text-xs text-gray-500">guptarishabh181@gmail.com</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Workspace */}
        <div className="px-2 py-2">
          <p className="text-xs text-gray-500 mb-1">Your Workspace &nbsp; <span className="text-[#265BD1] bg-[#E8EFFC] p-1 rounded-sm">Unlock's soon</span> </p>
          
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] rounded-md"> <img src="./lock.svg" alt="" /></div>
            <div className="flex flex-col ">
              <a href="#" className="text-sm text-[#265BD1] font-medium">Waystudio</a>
              <p className="text-xs text-gray-500">All tools in one way!</p>

            </div>
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* Profile Options */}
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" /> Account settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {router.push('/yourRequest')}}>
          <FileText className="mr-2 h-4 w-4" /> Your requests
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" /> Help
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 text-red-500" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
