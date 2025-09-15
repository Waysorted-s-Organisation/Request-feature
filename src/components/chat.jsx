import React, { useEffect, useRef, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/context/ChatContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const Chat = () => {
  const { comments, addComment, addReply } = useChat()
  const [input, setInput] = useState("")
  const [replyingTo, setReplyingTo] = useState(null) // track which comment we're replying to
  const [replyInput, setReplyInput] = useState("")
  const scrollRef = useRef(null)

  const handleSend = () => {
    if (input.trim() === "") return
    addComment("You", input)
    setInput("")
  }

  const handleReplySend = (commentId) => {
    if (replyInput.trim() === "") return
    addReply(commentId, "You", replyInput)
    setReplyInput("")
    setReplyingTo(null)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [comments])

  return (
    <div className="w-full mx-auto pr-5 flex flex-col justify-between h-[390px]">
      {/* comment list  */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-4">
        <h2 className="text-md font-medium mb-4">Comments</h2>

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="space-y-2">
              {/* Comment */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#265BD1] text-sm">
                  {c.author.slice(0, 2).toUpperCase()}
                </div>

                {/* Comment Box */}
                <div className="p-3 rounded-md bg-gray-100 text-sm w-full relative">
                  <p className="text-gray-800">{c.text}</p>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    {c.time} ·{" "}
                    <button
                      onClick={() => setReplyingTo(c.id)}
                      className="text-[#2575d6] text-xs hover:underline"
                    >
                      Reply
                    </button>

                    <div className="">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button>
                                <MoreHorizontal size={16} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit Request</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                              <DropdownMenuItem>Copy link</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                    </div>

                  </div>
                </div>
              </div>

              {/* Replies */}
              {c.replies?.length > 0 && (
                <div className="ml-12 space-y-2">
                  {c.replies.map((r) => (
                    <div key={r.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm">
                        {r.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="p-3 rounded-md bg-gray-100 text-sm w-full relative flex flex-col items-start gap-2">
                        <p className="text-gray-800">{r.text}</p>
                        <div className="w-full flex gap-2 items-center">
                        <p className="text-xs text-gray-500 mt-1">{r.time}</p>

                        <div className="">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button>
                                <MoreHorizontal size={16} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit Request</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                              <DropdownMenuItem>Copy link</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              {replyingTo === c.id && (
                <div className="ml-12 mt-2 flex flex-col gap-2">
                  <Textarea
                    placeholder="Write a reply..."
                    className="text-sm"
                    rows={2}
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                  />
                  <button
                    onClick={() => handleReplySend(c.id)}
                    className="self-start bg-[#265BD1] hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-md"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div>
        <h2 className="text-md font-medium mt-6 mb-2">Comments</h2>
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Write a comment..."
            className="text-sm"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="self-start bg-[#265BD1] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
