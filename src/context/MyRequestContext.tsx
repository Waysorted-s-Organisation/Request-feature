"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface MyRequest {
  id: string;
  title: string;
  description: string;
  details: string;
  status: string;
  votes: number;
  date: string;
}

interface MyRequestContextType {
  files: File[];
  setFiles: (files: File[]) => void;
  myRequests: MyRequest[];
  addMyRequest: (newRequest: Partial<MyRequest>) => void;
  editMyRequest: (id: string, updates: string | Partial<MyRequest>) => void;
  deleteMyRequest: (id: string) => void;
}

const MyRequestContext = createContext<MyRequestContextType | undefined>(undefined);

export const MyRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<File[]>([]);

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
        },
    ]);
    
    // ✅ Function to add a new request
    const addMyRequest = (newRequest: Partial<MyRequest>): void => {
        const requestWithId: MyRequest = {
            id: `my-req-${myRequests.length + 1}`,
            title: newRequest.title || "",
            description: newRequest.description || "",
            details: newRequest.details || "",
            status: newRequest.status || "Pending",
            votes: newRequest.votes || 0,
            date: new Date().toLocaleString(),
        };
        setMyRequests((prev) => [...prev, requestWithId]);
    };

    // ✅ Edit existing request description + update date
    const editMyRequest = (id: string, updates: string | Partial<MyRequest>): void => {
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
    const deleteMyRequest = (id: string): void => {
      setMyRequests((prev) => prev.filter((req) => req.id !== id));
    };

    const contextValue = useMemo(() => ({
      files,
      setFiles,
      myRequests,
      addMyRequest,
      editMyRequest,
      deleteMyRequest,
    }), [files, myRequests]);
    
    return (
    <MyRequestContext.Provider value={contextValue}>
      {children}
    </MyRequestContext.Provider>
  );
};

export const useMyRequest = (): MyRequestContextType => {
  const context = useContext(MyRequestContext);
  if (context === undefined) {
    throw new Error('useMyRequest must be used within a MyRequestProvider');
  }
  return context;
};