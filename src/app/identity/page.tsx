import React from "react";
import FilterHeader from "@/components/identity/FilterHeader";
import Filter from "@/components/identity/Filter";
import FilterModal from "@/components/identity/FilterModal";
import TopTitleAndThumnailList from "@/components/identity/TopTitleAndThumnailList";

export default function IdentityPage() {
  return (
    <div className="flex font-sans text-primary-100 font-bold mt-4">
      <div className="w-[300px] min-w-[300px] hidden lg:block mt-2">
        <FilterHeader />
        <Filter />
      </div>
      <FilterModal />
      <div className="flex-auto md:pl-10">
        <TopTitleAndThumnailList />
      </div>
    </div>
  );
}
