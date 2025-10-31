"use client";

import { WobbleCard } from "./wobble-card";
import { Button } from "./button";

interface messageCardProps {
  key?: number;
  message: string;
  time: string;
}

const MessageCard: React.FC<messageCardProps> = ({ message, time, key }) => (
  <WobbleCard
    containerClassName="h-50 w-full bg-black"
    key={key}
    className="flex-row bg-black"
  >
    <div className="flex absolute top-5 left-5 right-5 bottom-10 gap-5 items-center justify-between">
      <h2 className="font-semibold tracking-[-0.015em] text-white break-words">
        {message}
      </h2>
      <Button
        variant={"default"}
        className="h-10 w-20 bg-red-400 hover:bg-gray-400 transition-colors duration-200 ease-in-out"
      >
        Delete
      </Button>
    </div>
    <div className="absolute top-40 right-5">
      <p className="text-white font-sans text-sm ">{time}</p>
    </div>
  </WobbleCard>
);

export default MessageCard;
