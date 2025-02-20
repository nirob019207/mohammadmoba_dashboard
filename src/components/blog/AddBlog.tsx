"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUploadMutation } from "@/Redux/Api/uploadApi";
import Image from "next/image";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { useAddblogMutation, useUpdateBlogMutation } from "@/Redux/Api/blogApi";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const blogId = searchParams.get("id");
  const blogTitle = searchParams.get("title") || "";
  const blogImage = searchParams.get("image") || "";
  const blogDesc = searchParams.get("description") || "";
  console.log("dslkf", blogDesc);

  const [addBlog] = useAddblogMutation();
  const [upload] = useUploadMutation();
  const [updateBlogFn,{isLoading}] = useUpdateBlogMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    blogImage || null
  );
  const [imageName, setImageName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (blogId) {
      setFormData({
        title: blogTitle,
        image: blogImage,
        description: blogDesc, // Fetch the existing description data if available
      });
      // You can fetch the existing description from an API if needed
    }
  }, [blogId, blogTitle, blogImage]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    setImagePreview(URL.createObjectURL(file));

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const response = await upload(formDataImage).unwrap();
      const imageUrl = response?.data?.url;
      if (imageUrl) {
        setImageName(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("No image URL provided in the response.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload image");
    }
  };

  const handleCancelImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (blogId) {
        await updateBlogFn({ id: blogId, data: formData }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await addBlog(formData).unwrap();
        toast.success("Product added successfully!");
        setFormData({ title: "", image: "", description: "" });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      router.push("/blog");
    } catch (error: any) {
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">
        {blogId ? "Edit Blog" : "Create Blog"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium">Blog Image</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg aspect-square flex flex-col items-center justify-center bg-[#0B1120] relative">
              {imagePreview ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
                >
                  Select
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Product Name
              </label>
              <input
                id="name"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-1 bg-gray-800 rounded-md">
              <Editor
                apiKey="4kjrncewwa4057zz04om0mle4q3to49bypq57bh6qgq5f0n3"
                value={
                  formData.description ||
                  "<h1>Product Description</h1><p>Write something here...</p>"
                }
                init={{
                  height: 600,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | " +
                    "bullist numlist outdent indent | h1 h2 h3 h4 h5 p | blockquote | help",
                  skin: "oxide-dark",
                  content_css: "dark",
                  content_style:
                    "body { font-family:Arial, sans-serif; font-size:14px; } h1 { font-size:24px; } h2 { font-size:20px; } p { font-size:14px; } ul { margin-left:20px; } li { list-style-type: disc; }",
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {blogId ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
