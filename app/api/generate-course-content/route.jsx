import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML 

and give response in JSON format. 

Schema:{

chapterName:<>,

{

topic:<>,

content:<>

}

}

: User Input:

`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async (chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + JSON.stringify(chapter),
          },
        ],
      },
    ];
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    // console.log(response.candidates[0].content.parts[0].text);
    const rawResp = response.candidates[0].content.parts[0].text;

    const rawJson = rawResp.replace("```json", "").replace("```", "");
    const jsonResp = JSON.parse(rawJson);
    //Generate Youtube
    const youtubeData = await getYoutubeVideo(chapter?.chapterName);
    console.log({
      youtubeVideo: youtubeData,
      courseData: jsonResp,
    });

    return {
      youtubeVideo: youtubeData,
      courseData: jsonResp,
    };
  });
  const courseContent = await Promise.all(promises);
  const dbResp = await db
    .update(coursesTable)
    .set({
      courseContent: courseContent,
    })
    .where(eq(coursesTable.cid, courseId))
    .returning();
  // console.log(dbResp);
  return NextResponse.json({
    courseName: courseTitle,
    courseContent: courseContent,
  });
}
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const getYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY, //Youtube Api key
  };
  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListResp = resp.data.items;
  const youtubeVideoList = [];
  youtubeVideoListResp.forEach((item) => {
    const data = {
      videoId: item.id?.videoId,
      title: item?.snippet?.title,
    };
    youtubeVideoList.push(data);
  });
  // console.log("youtubeVideoList", youtubeVideoList);
  return youtubeVideoList;
};
