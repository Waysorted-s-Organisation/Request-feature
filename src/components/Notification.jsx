import React from 'react'
import { DropdownMenu } from './ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Bell } from 'lucide-react'

const Notification = () => {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='border bg-white p-1 hover:bg-[#E8EFFC] rounded-md w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:border-white hover:text-[#265BD1] focus:outline-none'><Bell size={16}/> </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='px-2 py-2 mt-4 mr-12 items-center flex justify-center focus:outline-none' sideOffset={5}>
                <div className='bg-white w-[300px] flex justify-center items-center p-4 border border-gray-200 rounded-md'>
                    <p className='text-gray-500 text-sm'>You have no notifications!</p>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
      
    </div>
  )
}

export default Notification
