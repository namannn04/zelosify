"use client";

import { Maximize, Plus, Settings, Trash } from "lucide-react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/shadcn/alert-dialog";
import { Button } from "@/components/UI/shadcn/button";

export default function ChatHeader({
  isLoading,
  handleCreateNewChat,
  activeConversationId,
  handleDeleteConversation,
  isDeletingConversation,
}) {
  const createChatRef = useRef(null);
  const deleteChatRef = useRef(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Prevent duplicate new chat requests
  const handleNewChat = async () => {
    if (isLoading || createChatRef.current) return;

    createChatRef.current = true;
    try {
      await handleCreateNewChat();
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      createChatRef.current = null;
    }
  };

  // Handle delete conversation
  const handleDeleteChat = async () => {
    if (
      isDeletingConversation ||
      deleteChatRef.current ||
      activeConversationId === "newChat"
    )
      return;

    deleteChatRef.current = true;
    try {
      await handleDeleteConversation(activeConversationId);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      deleteChatRef.current = null;
    }
  };

  // Handle opening delete confirmation dialog
  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  // Check if delete button should be shown (not on new chat)
  const showDeleteButton =
    activeConversationId && activeConversationId !== "newChat";

  return (
    <div className="flex items-center justify-between p-4 border-b border-border rounded-t-lg text-sm">
      <h2 className="text-2xl font-bold">Zelosify AI Chat</h2>
      <div className="flex items-center gap-2">
        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Maximize className="w-5 h-5 text-secondary" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Maximize
          </span>
        </div>

        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Settings className="w-5 h-5 text-secondary" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Settings
          </span>
        </div>

        {showDeleteButton && (
          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogTrigger asChild>
              <div className="group relative">
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeletingConversation}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash className="w-5 h-5 text-secondary" />
                </button>
                <span className="w-[90px] absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
                  Delete Chat
                </span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this conversation? This action
                  <span className="text-sm text-destructive-foreground">
                    {" "}
                    cannot be undone.
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={"mt-4"}>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteChat}
                  disabled={isDeletingConversation}
                  className="bg-foreground text-background"
                >
                  {isDeletingConversation ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Button
          onClick={handleNewChat}
          disabled={isLoading}
          className="px-4 py-2 rounded-full "
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
}
