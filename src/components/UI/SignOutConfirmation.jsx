import useAuth from "@/hooks/Auth/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/UI/shadcn/dialog";
import { Loader2 } from "lucide-react"; // Assuming you use lucide-react icons

export default function SignOutConfirmation({ isOpen, onCancel }) {
  const { handleLogout, handleCloseSignoutConfirmation, isSigningOut } =
    useAuth();

  const handleSignOut = async () => {
    try {
      // Pass skipConfirmationClose: true to prevent closing the dialog during logout
      // The dialog will be closed after navigation completes
      await handleLogout({ skipConfirmationClose: true });
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={isSigningOut ? undefined : handleCloseSignoutConfirmation}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isSigningOut ? "Signing Out..." : "Confirm Sign Out"}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isSigningOut
              ? "Please wait while we sign you out securely..."
              : "Are you sure you want to sign out?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-4 sm:justify-end mt-6">
          <button
            onClick={handleCloseSignoutConfirmation}
            tabIndex={0}
            className="px-4 py-2 text-sm text-primary"
            disabled={isSigningOut}
            aria-label="Cancel sign out"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none flex items-center justify-center min-w-[80px]"
            tabIndex={0}
            aria-label="Confirm sign out"
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Out
              </>
            ) : (
              "Sign Out"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
