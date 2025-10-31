"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import MessageCard from "@/components/ui/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const messages = [
  {
    msg: "Thank you for showing care, clarity, and craftsmanship. Your work consistently raises the bar and inspires the team.",
    date: "13 OCT 2020 2:00PM",
  },
  {
    msg: "Your dedication and leadership make others better. You elevate outcomes with consistency, quality, and kindness.",
    date: "22 NOV 2020 10:15AM",
  },
  {
    msg: "Grateful for your resilience and positivity. You adapt, communicate clearly, and build trust that drives team momentum.",
    date: "05 DEC 2020 6:40PM",
  },
  {
    msg: "You push for better solutions while ensuring reliability. Your speed, care, and kindness make collaboration smoother.",
    date: "17 JAN 2021 9:05AM",
  },
  {
    msg: "Appreciate your ownership—clarifying, acting, and improving as you go. You support, share knowledge, and unblock the team.",
    date: "28 FEB 2021 11:30AM",
  },
  {
    msg: "Your attention to detail and collaboration raise the team’s quality. You bring clarity and empathy, even in crunch time.",
    date: "09 MAR 2021 4:55PM",
  },
  {
    msg: "Thanks for making cross-team work clear and actionable. You align stakeholders and give credit to others, building trust.",
    date: "21 APR 2021 1:20PM",
  },
  {
    msg: "You treat feedback as a chance to grow. Your adaptable mindset and steady improvement set an example for progress.",
    date: "30 MAY 2021 3:10PM",
  },
  {
    msg: "Your composure under pressure defines a path forward. You handle setbacks calmly and create psychological safety.",
    date: "12 JUN 2021 8:35AM",
  },
  {
    msg: "Your curiosity uncovers hidden constraints and improves outcomes. The way you question makes the work smarter.",
    date: "24 JUL 2021 7:50PM",
  },
  {
    msg: "Thank you for being reliable and accountable. You deliver, communicate early, and offer help without neglecting your own work.",
    date: "02 AUG 2021 12:25PM",
  },
  {
    msg: "Your mentoring accelerates growth. You offer frameworks and meet people where they are, building stronger teams.",
    date: "15 SEP 2021 9:45AM",
  },
  {
    msg: "You keep quality high and processes efficient. Clear PRs and documentation make codebases scale and teams confident.",
    date: "27 OCT 2021 5:05PM",
  },
  {
    msg: "You collaborate with empathy and adapt your approach to keep discussions productive and decisions strong.",
    date: "08 NOV 2021 6:10PM",
  },
  {
    msg: "Your initiative turns ideas into results. You execute quickly and share outcomes, building a culture of learning.",
    date: "19 DEC 2021 2:40PM",
  },
  {
    msg: "You focus on usability and user experience. Your improvements make products delightful and reduce support.",
    date: "11 JAN 2022 11:00AM",
  },
  {
    msg: "You simplify complexity with clear breakdowns and communication, empowering faster and more confident decisions.",
    date: "22 FEB 2022 4:15PM",
  },
  {
    msg: "Your persistence in tough projects turns challenges into long-term wins through steady focus and learning.",
    date: "03 MAR 2022 9:20AM",
  },
  {
    msg: "You balance independence with teamwork, initiating and validating while being open to feedback that maintains quality.",
    date: "14 APR 2022 1:55PM",
  },
  {
    msg: "Your steady encouragement and positivity keep team morale high and motivate progress during tough stretches.",
    date: "25 MAY 2022 3:35PM",
  },
];

export default function Dashboard() {
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);

  function handlecheck(e: boolean) {
    setIsAcceptingMessages(e);
  }

  return (
    <div>
      <div className="bg-black flex w-full h-20 items-center justify-between">
        <h2 className="text-white font-bold ml-15 font-mono text-xl">
          Example
        </h2>
        <h1 className="text-white font-mono text-lg">Welcome, lavish!</h1>
        <Button
          className="mr-15 hover:bg-gray-300 border-0 transition-colors duration-200 ease-in-out"
          variant={"outline"}
        >
          Sign Out
        </Button>
      </div>
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold mt-15 ml-15 font-sans">
          User Dashboard
        </h2>
        <p className="text-lg mt-3 ml-15 font-sans">Copy Your Unique Link</p>
        <div className="flex gap-1 items-center justify-between mt-3">
          <input
            className="ml-15 bg-gray-100 h-12 w-full rounded-md text-xl pl-5"
            disabled
            value="https://truefeedback.in/u/wopey74832"
          />
          <Button className="h-12 mr-15" variant={"default"}>
            Copy
          </Button>
        </div>
        <div className="flex items-center mt-5 gap-5 w-full">
          <Switch
            name="switch"
            className="scale-130 ml-17"
            onCheckedChange={handlecheck}
          ></Switch>
          <Label className="text-lg">
            Accept Messages: {isAcceptingMessages ? "yes" : "no"}
          </Label>
        </div>
      </div>
      <hr className="my-5 mx-15"></hr>
      <h4 className="text-xl font-sans text-center font-bold pt-2">Messages</h4>
      <ScrollArea className="w-[80%] mx-auto my-10 h-200 border-3 rounded-md">
        <div className="grid lg:grid-cols-2 w-full min-h-100 mx-auto mt-3 gap-3 px-3">
          {messages.map((data, index) => (
            <MessageCard
              key={index}
              message={data.msg}
              time={data.date}
            ></MessageCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
