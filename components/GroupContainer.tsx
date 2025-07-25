import React from "react";
import Image from "next/image";

const GroupContainer = () => {
  return (
    <div className="group hover:scale-[105%] aspect-[1.5/1] h-50 lg:h-75 overflow-hidden rounded-xl border-2 transition-all duration-200 ease-out">
      <div className="relative h-full w-full">
        <Image
          src={"https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
          alt="Group img"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute float bottom-0 bg-white/50 w-full h-[30%] z-10 p-2 lg:p-4">
          <p className="font-semibold text-primary text-xl lg:text-2xl">
            Title
          </p>
          <div className="flex flex-row gap-3">
            <StatusCounter color="green-500" count={20} />
            <StatusCounter color="yellow-500" count={20} />
            <StatusCounter color="gray-500" count={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupContainer;

const StatusCounter = ({ color, count }: { color: string; count: number }) => {
  return (
    <div
      className="flex flex-row text-sm lg:text-lg items-center font-semibold text-primary gap-1
            "
    >
      <span className={`text-${color}`}>•</span>
      {count}
    </div>
  );
};
