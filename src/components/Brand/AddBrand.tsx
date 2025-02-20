"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUploadMutation } from "@/Redux/Api/uploadApi";
import Image from "next/image";
import { X } from "lucide-react";
import { useAddBrandMutation, useUpdateBrandMutation } from "@/Redux/Api/brandApi";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddBrand() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const brandId = searchParams.get("id");
  const brandName = searchParams.get("name") || "";
  const brandImage = searchParams.get("image") || "";

  const [addBrand] = useAddBrandMutation();
  const [upload] = useUploadMutation();
  const [updateBrandFn, { isLoading }] = useUpdateBrandMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(brandImage || null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // ✅ Follow the exact logic of the blog component
  useEffect(() => {
    if (brandId) {
      setFormData({
        name: brandName,
        image: brandImage,
      });
      setImagePreview(brandImage); // Ensure the existing image is shown
    }
  }, [brandId, brandName, brandImage]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    setImagePreview(URL.createObjectURL(file)); // Show preview before upload

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const response = await upload(formDataImage).unwrap();
      const imageUrl = response?.data?.url;
      if (imageUrl) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (brandId) {
        await updateBrandFn({ id: brandId, data: formData }).unwrap();
        toast.success("Brand updated successfully!");
      } else {
        await addBrand(formData).unwrap();
        toast.success("Brand added successfully!");
        setFormData({ name: "", image: "" });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      router.push("/brand");
    } catch (error: any) {
      toast.error("Failed to add brand");
    }
  };

  return (
    <div className="text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">
        {brandId ? "Edit Brand" : "Create Brand"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Brand Image</label>
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

          {/* Brand Name Input */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Brand Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {brandId ? "Update Brand" : "Add Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}
