import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const Page: React.FC = () => {
  return (
    <div className="h-screen w-7xl flex flex-col">
      
      <div className="fixed top-0 left-0 w-full h-[68px] z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-[68px]">
        
        <div className="fixed left-0 top-[68px] h-[calc(100vh-68px)] w-[225px] border-r bg-white">
          <Sidebar />
        </div>

        
        <div className="ml-[225px] flex-1 overflow-y-auto h-[calc(100vh-68px)] px-4">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Page;
