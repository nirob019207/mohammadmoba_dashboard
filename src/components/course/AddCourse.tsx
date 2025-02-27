"use client";

import { useStorecourseMutation } from "@/Redux/Api/course/courseApi";
import { useGetAllProfessorQuery } from "@/Redux/Api/professor/professorApi";
import { Professor } from "@/types/interface";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

type FileData = {
  course_image: File | null;
};

const initialFormData = {
  name: "",
  description: "",
  status: "",
  professor_id: "",
};

export default function AddCourse() {
  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState<FileData>({ course_image: null });
  const { data: professor } = useGetAllProfessorQuery({});
  const professorData = professor?.data.professors?.data;
  const router = useRouter();

  const [storBatch] = useStorecourseMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof FileData
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Batch image size should not exceed 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF).");
        return;
      }

      setFiles((prev) => ({
        ...prev,
        [type]: file,
      }));
      toast.success("Batch image uploaded successfully");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!files.course_image) {
      toast.error("Please upload a batch image");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        professor_id: formData.professor_id,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("course_image", files.course_image);

      const response = await storBatch({
        data: JSON.stringify(dataToSend),
        formDataToSend,
      }).unwrap();

      router.push("/course");

      toast.success("Batch submitted successfully!");

      setFormData(initialFormData);
      setFiles({ course_image: null });
    } catch (error) {
      toast.error("Failed to submit Batch. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (type: keyof FileData) => {
    setFiles((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add New Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
          method="post"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter batch name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter batch description"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Professor Selection */}
          <div>
            <label
              htmlFor="professor_id"
              className="block text-sm font-medium text-gray-700"
            >
              Professor
            </label>
            <select
              name="professor_id"
              value={formData.professor_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Instructor</option>
              {professorData?.map((professor: Professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.first_name} {professor.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
              {files.course_image ? (
                <div className="space-y-1 text-center relative w-full">
                  <div className="flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(files.course_image)}
                      alt="Preview"
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                  <div className="flex text-sm text-gray-600 justify-center items-center mt-2">
                    <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      {files.course_image.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile("course_image")}
                    className="absolute top-0 right-0 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="course_image"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="course_image"
                        name="course_image"
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, "course_image")}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WebP up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setFiles({ course_image: null });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
