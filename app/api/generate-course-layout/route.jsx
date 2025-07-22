import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const PROMPT = `Genrate Learning Course depends on following details: In which Make sure to add Course Name, Description,Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, , Topic under each chapters , Duration for each chapters etc, in JSON format only

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",

"bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ],
     
      }
    ]
  }
}

, User Input: 

`;

export async function POST(req) {
  const { courseId, ...formData } = await req.json();
  // To run this code you need to install the following dependencies:
  // npm install @google/genai mime
  // npm install -D @types/node
  const user = await currentUser();
  const { has } = await auth();
  const hasStarterAccess = has({ plan: "starter" });
  const hasPremiumAccess = has({ plan: "premium" });
  console.log(hasPremiumAccess);
  console.log(hasStarterAccess);

  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];
  //if user already created any course?
  // Get user's courses
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userCourses = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.userEmail, userEmail));

  if (hasPremiumAccess) {
    // ✅ Premium: No limit
    // No action needed
  } else if (hasStarterAccess) {
    // ✅ Starter: Max 3 courses
    if (userCourses.length >= 20) {
      return NextResponse.json({ resp: "limit reached" });
    }
  } else {
    // ✅ Free user: Max 1 course
    if (userCourses.length >= 10) {
      return NextResponse.json({ resp: "limit reached" });
    }
  }
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  console.log(response.candidates[0].content.parts[0].text);
  const rawResp = response.candidates[0].content.parts[0].text;
  const rawJson = rawResp.replace("```json", "").replace("```", "");
  const jsonResp = JSON.parse(rawJson);
  const imagePrompt = jsonResp.course.bannerImagePrompt;

  //generate Image
  const bannerImageURL = await generateImage(imagePrompt);
  //Save to database
  const result = await db.insert(coursesTable).values({
    ...formData,
    coursejson: jsonResp,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageURL: bannerImageURL,
  });
  return NextResponse.json({ courseId });
}
async function generateImage(imagePrompt) {
  try {
    const BASE_URL = "https://aigurulab.tech";
    const result = await axios.post(
      BASE_URL + "/api/generate-image",
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: "flux",
        aspectRatio: "16:9",
      },
      {
        headers: {
          "x-api-key": process.env.AI_GURU_LAB_API,
          "Content-Type": "application/json",
        },
      }
    );
    return result.data.image;
  } catch (e) {
    console.error("Image generation failed:", e);
    return null;
  }
}
