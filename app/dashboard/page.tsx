import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import CreateLinkForm from "@/components/CreateLinkForm";
import { Card, CardContent } from "@/components/ui/card";
import { type Link as LinkModel } from "@prisma/client"; // Renamed to avoid conflict with Next.js Link component
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link"; // Next.js Link component for navigation
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  // 1. Get the current authenticated user from Clerk
  const user = await currentUser();

  // 2. Redirect if not logged in
  if (!user) redirect("/sign-in");

  // 3. Determine the Public Profile URL
  // If the user has a username, use it (e.g., /share/fivkas).
  // If not (e.g., old account), fallback to the user ID (e.g., /share/user_123...).
  const shareLink = user.username 
    ? `/share/${user.username}` 
    : `/share/${user.id}`;

  // 4. Fetch user's links from database (ordered by newest first)
  const links = await prisma.link.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-600">LinkFolio 🔗</h1>
        
        <div className="flex items-center gap-4">
            {/* Share Button: Opens the public profile in a new tab */}
            <Link href={shareLink} target="_blank">
              <Button variant="outline">Share Profile</Button>
            </Link>
            
            {/* Clerk User Button (Logout, Profile, Manage Account, etc.) */}
            <UserButton />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-2xl mx-auto space-y-8">
        
        {/* Form to create new links */}
        <CreateLinkForm />

        {/* List of Links */}
        <div className="space-y-4">
            <h3 className="font-semibold text-slate-500 pl-1">Your Links</h3>
            
            {links.length === 0 ? (
                <div className="text-center p-8 text-slate-400">
                    No links yet. Add one above! 👆
                </div>
            ) : (
                links.map((link: LinkModel) => (
                    <Card key={link.id} className="overflow-hidden">
                        <CardContent className="p-4 flex justify-between items-center gap-4">
                            
                            {/* Left Side: Title and URL */}
                            {/* min-w-0 prevents text from pushing the button off-screen (flexbox fix) */}
                            <div className="flex-1 min-w-0"> 
                                <h4 className="font-bold truncate">{link.title}</h4>
                                <p className="text-sm text-slate-500 truncate">{link.url}</p>
                            </div>

                            {/* Right Side: Date & Delete Button */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-400 hidden sm:block">
                                    {link.createdAt.toLocaleDateString()}
                                </span>
                                
                                {/* The Delete Action Component */}
                                <DeleteButton id={link.id} />
                            </div>

                        </CardContent>
                    </Card>
                ))
            )}
        </div>
      </main>
    </div>
  );
}