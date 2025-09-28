"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface Reply {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  replies: Reply[];
}

interface ChatContextType {
  comments: Comment[];
  addComment: (author: string, text: string) => void;
  addReply: (commentId: number, author: string, text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "RG",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "Feb 11, 10:48 PM",
      replies: [] // <--- replies stored here
    },
  ]);

  const addComment = (author: string, text: string): void => {
    const newComment: Comment = {
      id: Date.now(),
      author,
      text,
      time: new Date().toLocaleString(),
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
  };

  const addReply = (commentId: number, author: string, text: string): void => {
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
    );
  };

  const contextValue = useMemo(() => ({
    comments,
    addComment,
    addReply,
  }), [comments]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
