"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-orange-600">Velocity AI</h1>
        <div className="space-x-4">
          {isSignedIn ? (
            <Button
              onClick={() => router.push("/workspace")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Go to Workspace
            </Button>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-orange-600 mb-6 leading-tight">
          Build AI-Powered Courses
          <br className="hidden md:block" />
          In Seconds
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
          Instantly generate fully structured, multimedia-rich courses with
          chapters, topics, AI thumbnails, and smart recommendations.
        </p>
        {!isSignedIn && (
          <SignUpButton mode="modal">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full flex items-center gap-2 shadow-lg">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
          </SignUpButton>
        )}
        {isSignedIn && (
          <Button
            onClick={() => router.push("/workspace")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full shadow-lg"
          >
            Go to Workspace
          </Button>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "One-Click Course Creation",
              desc: "Generate chapters, topics, durations, and images using AI.",
            },
            {
              title: "Smart Banner Generator",
              desc: "Use creative prompts to build engaging course thumbnails in seconds.",
            },
            {
              title: "Progressive Learning UI",
              desc: "Track chapter progress and continue where you left off.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-orange-50 border border-orange-100 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 bg-gray-50">
        &copy; 2025 Velocity Ai(Taquospro). Crafted with ❤️ for learners and
        creators.
      </footer>
    </div>
  );
}
