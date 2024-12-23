import React from "react";
import FilterHeader from "./components/FilterHeader";
import Filter from "./components/Filter";

export default function IdentityPage() {
  return (
    <div className="flex font-sans text-primary-100 font-bold mt-4">
      <div className="w-[300px] min-w-[300px] hidden lg:block mt-2">
        {" "}
        <FilterHeader />
        <Filter />
      </div>
    </div>
  );
}
