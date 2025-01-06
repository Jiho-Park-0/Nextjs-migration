import React from "react";
import FilterHeader from "@/components/dictionary/FilterHeader";
import EgoFilter from "@/components/dictionary/ego/EgoFilter";
import FilterModal from "@/components/dictionary/FilterModal";
import TopTitleAndThumnailList from "@/components/dictionary/ego/TopTitleAndThumnailList";

export default function EgoPage() {
  return (
    <div className="flex font-sans text-primary-100 font-bold mt-4">
      <div className="w-[300px] min-w-[300px] hidden lg:block mt-2">
        <FilterHeader />
        <EgoFilter />
      </div>
      <FilterModal />
      <div>
        <TopTitleAndThumnailList />
      </div>
    </div>
  );
}
