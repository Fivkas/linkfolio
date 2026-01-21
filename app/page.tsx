import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      
      {/* Hero Section */}
      <div className="max-w-2xl text-center space-y-8">
        
        {/* Logo / Icon */}
        <div className="text-6xl mb-4">🔗</div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Share your world with <br />
          <span className="text-indigo-600">one link.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Join generic creators using LinkFolio for their link in bio. 
          One link to help you share everything you create, curate, and sell.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          
          {/* Sign Up Button */}
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-indigo-600 hover:bg-indigo-700">
              Get Started for Free
            </Button>
          </Link>

          {/* Sign In Link */}
          <Link href="/sign-in">
             <Button variant="ghost" size="lg" className="text-slate-600 hover:text-indigo-600">
              Already have an account?
            </Button>
          </Link>

        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-slate-400 text-sm">
        © 2024 LinkFolio. Built with Next.js & Clerk.
      </footer>
    </div>
  );
}