"use client"
import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react"

interface MyRequest {
  id: string;
  title: string;
  description: string;
  details: string;
  status: string;
  votes: number;
  date: string;
  type: string;
  board: string;
}

interface MyRequestContextType {
  myRequests: MyRequest[];
  addMyRequest: (newRequest: Omit<MyRequest, 'id' | 'votes' | 'date'> & Partial<Pick<MyRequest, 'votes'>>) => void;
}

const MyRequestContext = createContext<MyRequestContextType | undefined>(undefined)

export const MyRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [myRequests, setMyRequests] = useState<MyRequest[]>([
        {
            id: "my-req-1",
            title: "Gradient Contrast Checker",
            description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloribus eum quisquam deserunt.",
            details: "Figma Plugin: Palletable",
            status: "Under Review",
            votes: 1,
            date: "January 26, 2024 at 02:45 AM",
            type: "Feature Request",
            board: "General",
        },
    ])
    
    // ✅ Function to add a new request
    const addMyRequest = useCallback((newRequest: Omit<MyRequest, 'id' | 'votes' | 'date' | 'type' | 'board'> & Partial<Pick<MyRequest, 'votes' | 'type' | 'board'>>) => {
        const requestWithId: MyRequest = {
            ...newRequest,
            id: `my-req-${myRequests.length + 1}`,
            votes: newRequest.votes || 0,
            date: new Date().toLocaleString(),
            type: newRequest.type || "Feature Request",
            board: newRequest.board || "General",
        }
        setMyRequests((prev) => [...prev, requestWithId])
    }, [myRequests.length])
    
  const contextValue: MyRequestContextType = useMemo(() => ({ 
    myRequests, 
    addMyRequest 
  }), [myRequests, addMyRequest]);
    
    return (
        <MyRequestContext.Provider value={contextValue}>
      {children}
    </MyRequestContext.Provider>
  )
}

export const useMyRequest = (): MyRequestContextType => {
  const context = useContext(MyRequestContext);
  if (context === undefined) {
    throw new Error('useMyRequest must be used within a MyRequestProvider');
  }
  return context;
};