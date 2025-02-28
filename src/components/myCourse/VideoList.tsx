"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetmatQuery } from "@/Redux/Api/mycourse/mycourseApi";
import { Download, FileText, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const NEXT_PUBLIC_STORAGE = "http://10.0.10.59:8003";

export default function VideoList() {
  const param = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetmatQuery(param.id);

  const singleMaterial = data?.data?.materials ?? [];
  const singleId = Number.parseInt(param.singleId as string, 10);

  // State to track the current video, title, and assignment
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentAssignment, setCurrentAssignment] = useState<string | null>(
    null
  );
  const [currentMaterial, setCurrentMaterial] = useState<any>(null);

  // Find and set the initial material when component mounts or data changes
  useEffect(() => {
    if (singleMaterial.length > 0) {
      // Try to find the material with the matching singleId
      const selectedMaterial = singleMaterial.find(
        (mate: any) => mate.id === singleId
      );

      // Update state with the selected material if found
      if (selectedMaterial) {
        updateCurrentMaterial(selectedMaterial);
      }
      // If no matching material found but we have materials with videos, use the first one
      else if (singleId === undefined || isNaN(singleId)) {
        const firstVideoMaterial = singleMaterial.find(
          (mate: any) => mate.video_path
        );
        if (firstVideoMaterial) {
          updateCurrentMaterial(firstVideoMaterial);
        } else {
          // Fallback to first material if no videos available
          updateCurrentMaterial(singleMaterial[0]);
        }
      }
    }
  }, [singleMaterial, singleId]);

  // Function to update all current material state
  const updateCurrentMaterial = (material: any) => {
    setCurrentMaterial(material);
    setCurrentTitle(material.title || "");
    setCurrentSubtitle(material.subtitle || "");
    setCurrentDescription(material.description || "");

    // Set video path if available
    if (material.video_path) {
      setCurrentVideo(`${NEXT_PUBLIC_STORAGE}/${material.video_path}`);
    } else {
      setCurrentVideo(null);
    }

    // Set assignment path if available
    if (material.assignment_path) {
      setCurrentAssignment(
        `${NEXT_PUBLIC_STORAGE}/${material.assignment_path}`
      );
    } else {
      setCurrentAssignment(null);
    }
  };

  // Handle click on a material in the sidebar
  const handleVideoClick = (material: any) => {
    updateCurrentMaterial(material);
    // No URL updates here
  };

  // Handle assignment download
  const handleDownloadAssignment = () => {
    if (currentAssignment) {
      window.open(currentAssignment, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 bg-white">
      {/* Video player and content section */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Video player */}
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {currentVideo ? (
            <video controls autoPlay className="w-full h-full">
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="text-center">
                <PlayCircle className="h-16 w-16 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No video available</p>
              </div>
            </div>
          )}
        </div>

        {/* Video title and info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold">
              {currentTitle || "No Title Available"}
            </h1>
            {currentSubtitle && (
              <p className="text-gray-500">{currentSubtitle}</p>
            )}
          </div>

          {currentDescription && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-sm text-gray-700">{currentDescription}</p>
            </div>
          )}

          {/* Assignment section */}
          {currentMaterial && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold mb-4">Assignment</h2>

              {currentAssignment ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span>Assignment available</span>
                  </div>
                  <Button
                    onClick={handleDownloadAssignment}
                    className="flex items-center space-x-1"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No assignment available for this lecture.
                </p>
              )}

              {currentMaterial.submited_assignment_path && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <span>Submitted assignment</span>
                    </div>
                    <div className="text-sm font-medium">
                      Marks: {currentMaterial.marks || "Not graded"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Course materials sidebar */}
      <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Course Materials</h2>
          <span className="text-sm text-gray-500">
            Lectures ({singleMaterial.length})
          </span>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {singleMaterial.map((material: any) => (
            <div
              key={material.id}
              className={`p-3 bg-white rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
                currentMaterial?.id === material.id
                  ? "border-l-4 border-blue-500"
                  : ""
              }`}
              onClick={() => handleVideoClick(material)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium line-clamp-1">{material.title}</h3>
                {material.video_path ? (
                  <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
              {material.subtitle && (
                <p className="text-xs text-gray-500 mt-1">
                  {material.subtitle}
                </p>
              )}
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{material.total_time}</span>
                {material.assignment_path && (
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" /> Assignment
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
