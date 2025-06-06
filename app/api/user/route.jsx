import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { email, name } = await req.json();

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users?.length === 0) {
    const result = await db
      .insert(usersTable)
      .values({
        // ✅ FIXED HERE
        name,
        email,
      })
      .returning();

    console.log(result);
    return NextResponse.json(result[0]);
  }

  return NextResponse.json(users[0]);
}
