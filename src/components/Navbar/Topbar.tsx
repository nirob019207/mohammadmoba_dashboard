"use client";

import Image from "next/image";
import React from "react";
import { FiBell } from "react-icons/fi";

const Topbar = () => {
  const user = {
    name: "Nurullah Bhuiyan",
    profile_picture: "",
  };
  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, <span className="font-bold">{user.name}!</span>
          </h2>
          <p className="text-slate-700">
            Track your manage and LMS platform performance
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-slate-300 bg-slate-200">
          <FiBell className="text-gray-600 text-2xl" />
        </button>
        <button className="rounded-full overflow-hidden border">
          <Image
            src={
              user?.profile_picture
                ? user.profile_picture
                : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"
            }
            alt={`${user.name}`}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
