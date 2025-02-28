"use client";
import { Batch } from "@/types/interface";
import Image from "next/image";
import batchImage from "@/assests/courseImage.png";
import Link from "next/link";
import { useGetProfessorBatchesQuery } from "@/Redux/Api/professor/professorApi";

export interface IProfessorBatchCardProps {
  redirectTo: "professor-batches-student" | "professor-materials";
}
export default function ProfessorBatchCard({
  redirectTo,
}: IProfessorBatchCardProps) {
  const { data, isLoading } = useGetProfessorBatchesQuery(undefined);
  const batches: Batch[] = data?.data?.batch_data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {batches.map((item: Batch, index: number) => (
        <Link href={`/${redirectTo}/${item.id}`} key={index}>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={
                item.batch_image
                  ? `${process.env.NEXT_PUBLIC_STORAGE}/${item.batch_image}`
                  : batchImage
              }
              width={250}
              height={150}
              alt="Course Image"
              className="mx-auto w-full h-full"
            />
            <div className="absolute inset-0 h-full w-full z-10 flex justify-center items-center bg-black/20">
              <h1 className="text-4xl py-2 px-4 rounded-full bg-white/20 backdrop-blur-md text-white z-10">
                {item.title}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
