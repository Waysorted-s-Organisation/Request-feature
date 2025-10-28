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

  // inside ChatContext.js
const updateComment = (id, newText) => {
  setComments((prev) =>
    prev.map((c) => (c.id === id ? { ...c, text: newText } : c))
  )
}

const deleteComment = (id) => {
  setComments((prev) => prev.filter((c) => c.id !== id))
}

const updateReply = (commentId, replyId, newText) => {
  setComments((prev) =>
    prev.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId ? { ...r, text: newText } : r
            ),
          }
        : c
    )
  )
}

const deleteReply = (commentId, replyId) => {
  setComments((prev) =>
    prev.map((c) =>
      c.id === commentId
        ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
        : c
    )
  )
}


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
    <ChatContext.Provider value={{ comments, addComment, addReply, updateComment, deleteComment, updateReply, deleteReply }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
