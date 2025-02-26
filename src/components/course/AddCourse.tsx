"use client"

import { useStorebatchMutation } from "@/Redux/Api/batch/batchApi"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { toast } from "sonner"

type FileData = {
  batch_image: File | null

}

const initialFormData = {
  title: "",
  subtitle: "",


}

export default function addBatch() {
  const [formData, setFormData] = useState(initialFormData)
  const [files, setFiles] = useState<FileData>({

    batch_image: null,
  })
  const [storBatch] = useStorebatchMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: keyof FileData) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${type.toUpperCase()} file size should not exceed 5MB`)
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        toast.error(`Please upload a valid ${type.toUpperCase()} file (JPEG, PNG, or PDF)`)
        return
      }

      setFiles((prev) => ({
        ...prev,
        [type]: file,
      }))
      toast.success(`${type.toUpperCase()} file uploaded successfully`)
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

 

    setIsSubmitting(true)

    try {
      // Prepare the data to be sent as JSON (excluding files)
      const dataToSend = {
        ...formData,
        application_status: "pending",
      }

      // Log to inspect the form data
      console.log("Form data being sent (JSON):", dataToSend) 

      // Send the form data as JSON using fetch or your API method
      const response = await storBatch({
        data: JSON.stringify(dataToSend),
        batch_image: files.batch_image,
      }).unwrap()

      console.log("API response:", response) // Log the response

      toast.success("Batch submitted successfully!")

      // Reset form
      setFormData(initialFormData)
      setFiles({ batch_image: null})
    } catch (error) {
      toast.error("Failed to submit Batach. Please try again.")
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div>
        
    </div>
  )
}
