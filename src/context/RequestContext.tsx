"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Request {
  id: number;
  title: string;
  description: string;
  status: string;
  details: string;
  votes: number;
}

interface RequestContextType {
  requests: Request[];
  addRequest: (title: string, description: string) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      title: "Gradient Contrast Checker",
      description: "Figma Plugin: Palletable",
      status: "Planned",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      votes: 1,
    },
  ]);

  const addRequest = (title: string, description: string) => {
    const newRequest: Request = {
      id: Date.now(),
      title,
      description,
      status: "Planned",
      details: description,
      votes: 1,
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const contextValue: RequestContextType = { requests, addRequest };

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = (): RequestContextType => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};
