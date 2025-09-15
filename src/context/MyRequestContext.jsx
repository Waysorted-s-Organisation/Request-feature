"use client"
import { createContext, useContext, useState } from "react"

const MyRequestContext = createContext()


export const MyRequestProvider = ({ children }) => {
    const [myRequests, setMyRequests] = useState([
        {
            id: "my-req-1",
            title: "Gradient Contrast Checker",
            description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloribus eum quisquam deserunt.",
            details: "Figma Plugin: Palletable",
            status: "Under Review",
            votes: 1,
            date: "January 26, 2024 at 02:45 AM",
        },
    ])
    
    // ✅ Function to add a new request
    const addMyRequest = (newRequest) => {
        const requestWithId = {
            ...newRequest,
            id: `my-req-${myRequests.length + 1}`,
            votes: newRequest.votes || 0,
            date: new Date().toLocaleString(),
        }
        setMyRequests((prev) => [...prev, requestWithId])
    }
    
    return (
        <MyRequestContext.Provider value={{ myRequests, addMyRequest }}>
      {children}
    </MyRequestContext.Provider>
  )
}

export const useMyRequest = () => useContext(MyRequestContext)