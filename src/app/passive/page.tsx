import React from "react";
import FilterHeader from "@/components/dictionary/FilterHeader";
import PassiveFilter from "@/components/dictionary/passive/PassiveFilter";
import FilterModal from "@/components/dictionary/FilterModal";
import IdentityThumnailList from "@/components/dictionary/identity/IdentityThumnailList";

export default function IdentityPage() {
  return (
    <div className="flex font-sans text-primary-100 font-bold mt-4">
      <div className="w-[300px] min-w-[300px] hidden lg:block mt-2">
        <FilterHeader />
        <PassiveFilter />
      </div>
      <FilterModal />
      <div className="flex-auto md:pl-10">{/* <IdentityThumnailList /> */}</div>
    </div>
  );
}
