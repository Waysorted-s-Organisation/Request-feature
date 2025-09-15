"use client";
import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Gradient Contrast Checker",
      description: "Figma Plugin: Palletable",
      status: "Planned",
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      votes: 1,
    },
  ]);

  const addRequest = (title, description) => {
    const newRequest = {
      id: Date.now(),
      title,
      description,
      status: "Planned",
      details: description,
      votes: 1,
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => useContext(RequestContext);
