"use server"

import { db } from "@/db/index";
import { coursesTable } from "@/db/schema/courses";
import { revalidatePath } from "next/cache";

export async function addCourse(formData: FormData) {
    const rawFormData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
    }

    if(!rawFormData.title || !rawFormData.description) {
        return { error: "Title and description are required" };
    }

    const course = await db.insert(coursesTable).values(rawFormData).returning();

    revalidatePath("/courses");

    return { success: "Course added successfully", course };
}