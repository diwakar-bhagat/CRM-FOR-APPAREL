import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();
    const urlEndpoint = (process.env.IMAGEKIT_URL_ENDPOINT ?? process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)?.trim();

    if (!privateKey || !urlEndpoint) {
      return NextResponse.json({ success: false, error: "ImageKit is not configured" }, { status: 503 });
    }

    if (!privateKey.startsWith("private_")) {
      return NextResponse.json(
        { success: false, error: "ImageKit private key is invalid. Use IMAGEKIT_PRIVATE_KEY=private_xxx in Vercel." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "Only image uploads are allowed" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "Image must be 8MB or smaller" }, { status: 400 });
    }

    const uploadForm = new FormData();
    uploadForm.set("file", file);
    uploadForm.set("fileName", file.name || `design-${Date.now()}`);
    uploadForm.set("folder", "/cta-apparels/design-vault");
    uploadForm.set("useUniqueFileName", "true");

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
      },
      body: uploadForm,
    });

    const payload = (await response.json()) as { url?: string; fileId?: string; name?: string; message?: string };
    if (!response.ok || !payload.url) {
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            success: false,
            error: "ImageKit rejected the upload credentials. Check IMAGEKIT_PRIVATE_KEY in Vercel and redeploy.",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { success: false, error: payload.message ?? "Image upload failed" },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: payload.url,
        fileId: payload.fileId,
        name: payload.name,
        urlEndpoint,
      },
      url: payload.url,
      fileId: payload.fileId,
      name: payload.name,
    });
  } catch (error) {
    console.error("[upload:imagekit] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Image upload failed" }, { status: 500 });
  }
}
