"use client"
import React, { createContext, useContext, useState } from "react"

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "RG",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "Feb 11, 10:48 PM",
      replies: [] // <--- replies stored here
    },
  ])

  const addComment = (author, text) => {
    const newComment = {
      id: Date.now(),
      author,
      text,
      time: new Date().toLocaleString(),
      replies: [],
    }
    setComments((prev) => [...prev, newComment])
  }

  const addReply = (commentId, author, text) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  author,
                  text,
                  time: new Date().toLocaleString(),
                },
              ],
            }
          : c
      )
    )
  }

  return (
    <ChatContext.Provider value={{ comments, addComment, addReply }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
