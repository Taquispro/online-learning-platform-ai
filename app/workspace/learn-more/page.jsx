"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const LearnMorePage = () => {
  return (
    <div className="bg-orange-50 text-gray-800 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold">AI Course Creator Platform</h1>
        <p className="mt-2 text-lg">
          Smart course generation and personalized learning made simple.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto py-16 px-6 space-y-16">
        {/* Section: What is this */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">
            What is this platform?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our AI-powered platform helps educators, creators, and learners
            quickly generate personalized courses, complete with structured
            chapters, AI thumbnails, and embedded multimedia — making online
            education easier and smarter.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-600 mb-6">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Auto Course Generation",
                desc: "Generate structured courses by just entering your topic.",
              },
              {
                title: "AI Image & Banner Prompting",
                desc: "Generate creative thumbnails and banners using intelligent image prompts.",
              },
              {
                title: "YouTube Video Integration",
                desc: "Automatically attach relevant videos to chapters.",
              },
              {
                title: "Chapter-Wise Learning",
                desc: "Mark progress as you complete chapters, and resume anytime.",
              },
              {
                title: "Responsive UI/UX",
                desc: "Works seamlessly across devices with modern UI elements.",
              },
              {
                title: "Built for Educators & Learners",
                desc: "Optimized to create learning experiences with minimal effort.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-orange-500 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg text-orange-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the team */}
        <section>
          <h2 className="text-3xl font-semibold text-orange-600 mb-6">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmad Taqueveem",
                role: "Full Stack Developer",
                image: "https://i.pravatar.cc/150?img=3",
              },
              {
                name: "Ahmad TAqueveem",
                role: "Frontend Designer",
                image: "https://i.pravatar.cc/150?img=3",
              },
              {
                name: "Ahmad Taqueveem",
                role: "Backend & AI Integration",
                image: "https://i.pravatar.cc/150?img=3",
              },
            ].map((dev, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow text-center"
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-semibold text-lg">{dev.name}</h4>
                <p className="text-sm text-gray-600">{dev.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-orange-500 text-white py-12 px-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Start Creating AI Courses Today
          </h2>
          <p className="mb-6 text-sm opacity-90">
            It’s free, easy, and smart. Build your next course in minutes.
          </p>
          <Button
            className="bg-white text-orange-600 font-semibold hover:bg-gray-100 transition"
            onClick={() => (window.location.href = "/workspace")}
          >
            Get Started
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500">
        &copy; 2025 (Taquispro) AI Course Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LearnMorePage;
