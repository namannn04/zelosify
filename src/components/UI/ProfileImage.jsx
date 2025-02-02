import React from "react";
import img from "../../assets/images/blog01.png";

export default function ProfileImage({ className }) {
  return (
    <div className="relative">
      <img
        src={img}
        alt="Profile"
        className={`rounded-full bg-gray-100 border ${className || ""}`}
      />
    </div>
  );
}
