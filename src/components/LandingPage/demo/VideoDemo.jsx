"use client"

import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/UI/shadcn/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/UI/shadcn/button"

export default function VideoDemo({
  open,
  onOpenChange,
  videoUrl = "https://www.youtube.com/watch?v=W61RodRVO2Y",
  title = "Zelosify Demo Video",
}) {
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false)

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&\s?]+)/)
    return match ? match[1] : null
  }

  const videoId = extractVideoId(videoUrl)
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  const youtubeWatchUrl = `https://youtu.be/${videoId}`

  const handleOpenInNewTab = useCallback(() => {
    window.open(youtubeWatchUrl, "_blank")
  }, [youtubeWatchUrl])

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(youtubeWatchUrl)
      setCopiedMessageVisible(true)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }, [youtubeWatchUrl])

  useEffect(() => {
    let timer
    if (copiedMessageVisible) {
      timer = setTimeout(() => {
        setCopiedMessageVisible(false)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [copiedMessageVisible])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black rounded-2xl shadow-lg border-none [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 bg-black text-white">
          <Button
            onClick={handleOpenInNewTab}
            className="mr-2 bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 text-sm"
          >
            Open in New Tab
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 text-sm"
          >
            Close
          </Button>
        </div>

        {/* Video */}
        <div className="relative w-full pb-[56.25%] h-0 bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={youtubeEmbedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}
