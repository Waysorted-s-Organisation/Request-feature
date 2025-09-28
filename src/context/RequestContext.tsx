"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface LocalRequest {
  id: number;
  title: string;
  description: string;
  status: string;
  details: string;
  votes: number;
}

interface LocalRequestContextType {
  requests: LocalRequest[];
  addRequest: (title: string, description: string) => void;
}

const RequestContext = createContext<LocalRequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<LocalRequest[]>([
    {
      id: 1,
      title: "Gradient Contrast Checker",
      description: "Figma Plugin: Palletable",
      status: "Planned",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      votes: 1,
    },
  ]);

  const addRequest = (title: string, description: string): void => {
    const newRequest: LocalRequest = {
      id: Date.now(),
      title,
      description,
      status: "Planned",
      details: description,
      votes: 1,
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const contextValue = useMemo(() => ({
    requests,
    addRequest,
  }), [requests]);

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = (): LocalRequestContextType => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};
