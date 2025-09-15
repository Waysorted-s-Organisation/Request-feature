import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-white h-[calc(100vh-68px)] w-[225px] z-50 border-r border-gray-200 p-5 flex flex-col justify-between ">

      <div>
        <div className="text-sm text-[#565A5E] p-2 flex items-center my-3 cursor-pointer rounded-md hover:bg-[#E8EFFC] hover:text-[#265BD1]">
          <ChevronLeft size={16} /> 
          <p >Back home</p>
        </div>

        <div>
          <h1 className="font-bold text-sm my-2 ">Features Board</h1>
          <div>
            <p className="text-xs text-[#565A5E] hover:bg-[#F3F3F3] w-full h-full py-2 px-2 rounded-sm">
              Figma Plugin: Palletable
            </p>
            <p className="text-xs text-[#565A5E] hover:bg-[#F3F3F3] w-full h-full py-2 px-2 rounded-sm">
              Waystudio
            </p>
            <p className="text-xs text-[#565A5E] hover:bg-[#F3F3F3] w-full h-full py-2 px-2 rounded-sm">
              Waychallenge
            </p>
          </div>
        </div>
      </div>

      <Button className="bg-[#265BD1] w-fit ">Have query ?</Button>

    </div>
  );
};

export default Sidebar;
