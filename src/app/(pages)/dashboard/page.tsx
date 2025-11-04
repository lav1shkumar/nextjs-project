"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import { useRouter } from "next/navigation";

export default function Dashboard(){

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection />

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
            />
            <ActiveSessions
            />
          </div>

          <RecentSessions sessions isLoading />
        </div>
      </div>

      <CreateSessionModal
        isOpen
        onClose
        roomConfig
        setRoomConfig
        onCreateRoom
        isCreating
      />
    </>
  );
}
