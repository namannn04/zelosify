import useAuth from "@/hooks/Auth/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/UI/shadcn/dialog";

export default function SignOutConfirmation({ isOpen, onCancel }) {
  const { handleLogout, handleCloseSignoutConfirmation } = useAuth();

  const handleSignOut = async () => {
    try {
      await handleLogout();
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseSignoutConfirmation}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Confirm Sign Out
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Are you sure to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-4 sm:justify-end mt-6">
          <button
            onClick={handleCloseSignoutConfirmation}
            tabIndex={0}
            className="px-4 py-2 text-sm text-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none"
            tabIndex={0}
            aria-label="Confirm sign out"
          >
            Sign Out
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
