import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        if (!file.type?.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "Only image files are allowed" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
        await mkdir(uploadDir, { recursive: true });

        const extension = file.name.split(".").pop();
        const fileName = `${randomUUID()}.${extension}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            filePath: `/uploads/products/${fileName}`,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Upload failed",
            },
            { status: 500 }
        );
    }
}