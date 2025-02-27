"use client";

import { useStoreProfMutation } from "@/Redux/Api/admin_professor/admin_professorApi";

import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

type FileData = {
  profile_picture: File | null;
};

const initialFormData = {
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
  designation: "",
  address: "",
  postal_code: "",
  employee_id: "",
  blood_group: "",
  gender: "",
  user_status: "",
  description: "",
};

const AddProf = () => {
    const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState<FileData>({ profile_picture: null });
  const router = useRouter();

  const [storProf] = useStoreProfMutation();
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
    console.log(file);
    console.log("File selected:", file);
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

    if (!files.profile_picture) {
      toast.error("Please upload a batch image");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email_address: formData.email_address,
        phone_number: formData.phone_number,
        designation: formData.designation,
        address: formData.address,
        postal_code: formData.postal_code,
        employee_id: formData.employee_id,
        blood_group: formData.blood_group,
        gender: formData.gender,
        user_status: formData.user_status,
        description: formData.description,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("profile_picture", files.profile_picture);

      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      console.log(dataToSend.toString());

      const response = await storProf({
        data: JSON.stringify(dataToSend),
        formDataToSend,
      }).unwrap();

      console.log("API response:", response);
      router.push("batch");

      toast.success("Batch submitted successfully!");

      setFormData(initialFormData);
      setFiles({ profile_picture: null });
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
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add New Professor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/data"
            method="post"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter Designation"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                placeholder="Enter Postal Code"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                placeholder="Enter Employee ID"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <input
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleInputChange}
                placeholder="Enter Blood Group"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Male">Female</option>

                <option value="Female">Female</option>
               
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="user_status"
                    value="Active"
                    checked={formData.user_status === "Active"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Active</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="user_status"
                    value="Inactive"
                    checked={formData.user_status === "Inactive"}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
                {files.profile_picture ? (
                  <div className="space-y-1 text-center relative w-full">
                    <div className="flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(files.profile_picture)}
                        alt="Preview"
                        className="h-32 w-auto object-contain"
                      />
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center items-center mt-2">
                      <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        {files.profile_picture.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("profile_picture")}
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
                        htmlFor="profile_picture"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="profile_picture"
                          name="profile_picture"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileChange(e, "profile_picture")
                          }
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

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                  setFiles({ profile_picture: null });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  
}
export default AddProf;
