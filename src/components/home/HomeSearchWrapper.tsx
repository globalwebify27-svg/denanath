"use client";

import React, { useState } from "react";
import { useHospital } from "@/context/HospitalContext";
import SearchModal from "./SearchModal";
import FloatingActionStrip from "./FloatingActionStrip";

export default function HomeSearchWrapper() {
  const { doctors, departments } = useHospital();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <FloatingActionStrip setIsSearchOpen={setIsSearchOpen} />
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        doctors={doctors}
        departments={departments}
      />
    </>
  );
}
