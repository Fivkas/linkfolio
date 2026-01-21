'use client' // Because it has buttons and interactivity

import { createLink } from "@/app/actions/createLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export default function CreateLinkForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={ref}
      action={async (formData) => {
        await createLink(formData); // Calls the Server
        ref.current?.reset();       // Cleans the form
      }}
      className="flex flex-col gap-4 p-6 border rounded-xl bg-white shadow-sm"
    >
      <h3 className="font-semibold text-lg">Add a new link</h3>
      
      <div className="flex gap-2">
        <Input 
          name="title" 
          placeholder="Title (e.g. My Instagram)" 
          required 
        />
        <Input 
          name="url" 
          placeholder="URL (e.g. https://instagram.com/...)" 
          required 
        />
      </div>
      
      <Button type="submit">Add Link</Button>
    </form>
  );
}