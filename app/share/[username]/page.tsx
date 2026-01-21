import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { clerkClient } from "@clerk/nextjs/server";

interface PublicProfileProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function PublicProfilePage({ params }: PublicProfileProps) {
  
  // 1. Get the username from the URL parameters
  const { username } = await params;

  // 2. Initialize Clerk Client
  const client = await clerkClient();

  // 3. CRITICAL CHANGE: We cannot use getUser(id) because we have a username.
  // Instead, we use getUserList to search for the user by their username.
  const userList = await client.users.getUserList({
    username: [username],
  });

  // 4. The API returns a list (array), so we take the first result.
  const user = userList.data[0];

  // 5. If no user is found with that username, show a 404 message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
        <h1 className="text-xl text-red-500">User @{username} not found.</h1>
        <Link href="/">
            <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  // 6. Now that we have the REAL user object, we can use user.id to query the database
  const links = await prisma.link.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col items-center py-16 px-4">
      
      {/* Profile Image */}
      <div className="w-24 h-24 bg-white rounded-full p-1 mb-6 shadow-xl border-4 border-white/30 overflow-hidden">
        <img 
            src={user.imageUrl} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* User Name */}
      <h1 className="text-2xl font-bold text-white mb-8">
        @{user.username}
      </h1>

      {/* Links List */}
      <div className="w-full max-w-md space-y-4">
        {links.length === 0 ? (
            <p className="text-white/80 text-center">No links yet.</p>
        ) : (
            links.map((link) => (
            <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
            >
                <Card className="hover:shadow-lg cursor-pointer">
                    <CardContent className="p-4 text-center font-semibold text-slate-800">
                        {link.title}
                    </CardContent>
                </Card>
            </a>
            ))
        )}
      </div>

      <div className="mt-12 text-white/60 text-sm">
        Powered by <span className="font-bold">LinkFolio</span>
      </div>
    </div>
  );
}