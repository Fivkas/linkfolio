'use client'

import { deleteLink } from "@/app/actions/deleteLink";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // Import trash icon
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"     // Make it subtle (no background)
      size="icon"         // Square button for icon
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
      disabled={isPending} // Disable while deleting
      onClick={() => {
        // Confirm before deleting
        if (confirm("Are you sure you want to delete this link?")) {
          startTransition(async () => {
            await deleteLink(id);
          });
        }
      }}
    >
      {isPending ? (
        <span className="animate-spin">⏳</span> // Simple loading spinner
      ) : (
        <Trash2 size={18} />
      )}
    </Button>
  );
}