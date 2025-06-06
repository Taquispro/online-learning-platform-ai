import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { desc, eq, ne, sql } from "drizzle-orm"; // ✅ Required for .where(eq(...))
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const keywordData = await req.json();
  const user = await currentUser();
  if (courseId == 0) {
    const keyword = keywordData.keyword; // Replace with actual keyword or pass dynamically
    const result = await db
      .select()
      .from(coursesTable)
      .where(
        sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb AND ${
          coursesTable.name
        } ILIKE ${"%" + keyword + "%"}`
      );
    console.log(result);
    return NextResponse.json(result);
  }
  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));
    console.log(result);
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(coursesTable.id));
    // console.log(result);
    return NextResponse.json(result);
  }
}
