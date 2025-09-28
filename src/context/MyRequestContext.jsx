"use client"
import { createContext, useContext, useState } from "react"

const MyRequestContext = createContext()


export const MyRequestProvider = ({ children }) => {
    const [files, setFiles] = useState([])

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

    // ✅ Edit existing request description + update date
    const editMyRequest = (id, updates) => {
      const now = new Date();
      const formattedDate = `Updated on ( ${now.toLocaleString("en-US", {
        month: "long",   // January
        day: "numeric",  // 26
        year: "numeric", // 2024
        hour: "2-digit", // 02
        minute: "2-digit",
        hour12: true,    // AM/PM
      })} )`;
    
      setMyRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                ...(typeof updates === "string"
                  ? { description: updates }
                  : updates),
                date: formattedDate,
              }
            : req
        )
      );
    };



    // ✅ Delete request
    const deleteMyRequest = (id) => {
      setMyRequests((prev) => prev.filter((req) => req.id !== id))
    }

    
    return (
    <MyRequestContext.Provider value={{ files, setFiles, myRequests, addMyRequest, editMyRequest, deleteMyRequest }}>
      {children}
    </MyRequestContext.Provider>
  )
}

export const useMyRequest = () => useContext(MyRequestContext)