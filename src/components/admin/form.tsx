"use client";
import { useState } from "react";
import { uploadImageAction } from "@/src/lib/admin";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function getImageDimensions(
    file: File,
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  async function handleUpload(e: React.SubmitEvent) {
    e.preventDefault();
    if (!file || !altText) return;
    setIsUploading(true);

    try {
      const { width, height } = await getImageDimensions(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", altText);
      formData.append("width", width.toString());
      formData.append("height", height.toString());

      await uploadImageAction(formData);

      setFile(null);
      setAltText("");
      alert("Upload successful!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleUpload}
      className="max-w-md mx-auto p-6 rounded-xl border border-mist-500 shadow-sm"
    >
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-mist-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Alt Text (For Accessibility & SEO)
        </label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="e.g. Neon sign in Tokyo at night"
          className="w-full px-3 py-2 border border-mist-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isUploading || !file}
        className="w-full bg-mist-900 text-mist-50 py-2 rounded-lg hover:bg-mist-800 disabled:opacity-50 transition-colors"
      >
        {isUploading ? "Uploading to R2..." : "Upload Image"}
      </button>
    </form>
  );
}
