import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Velocity Ai",
  description:
    "Velocity AI is an innovative online platform that enables users to effortlessly create AI-powered, multimedia-rich learning courses in seconds. With one-click course generation, smart banner image creation, and a progressive learning interface, AICourseGen helps educators and creators design engaging courses with chapters, topics, and AI-generated visuals. Whether you’re a beginner or expert, our platform offers seamless sign-in, smart recommendations, and a user-friendly workspace to streamline your course creation process. Join AICourseGen today to revolutionize online learning with artificial intelligence!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
