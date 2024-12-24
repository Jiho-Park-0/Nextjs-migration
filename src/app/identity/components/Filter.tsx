import FilterButtonGroup from "./FilterButtonGroup";
import sinners from "@/app/constants/sinners.json";
import resource from "@/app/constants/resource.json";
import attackType from "@/app/constants/attackType.json";
import keyword from "@/app/constants/keyword.json";
import affiliation from "@/app/constants/affiliation.json";
import etcKeyword from "@/app/constants/etcKeyword.json";

const Filter = () => {
  return (
    <div className="bg-primary-500 w-full rounded p-4 flex flex-col gap-2">
      <FilterButtonGroup
        title="수감자"
        content={sinners}
        src="/assets/profile/logo/"
        propertyToSaveTo="sinner"
      />
      <FilterButtonGroup
        title="자원"
        content={resource}
        src="/assets/resource/"
        propertyToSaveTo="resources"
      />
      <FilterButtonGroup
        title="유형"
        content={attackType}
        src="/assets/attackType/"
        propertyToSaveTo="types"
      />
      <FilterButtonGroup
        title="시즌"
        content={[
          { name: "1" },
          { name: "2" },
          { name: "3" },
          { name: "4" },
          { name: "5" },
        ]}
        src=""
        buttonType="text"
        propertyToSaveTo="season"
      />
      <FilterButtonGroup
        title="등급"
        content={[{ name: "1" }, { name: "2" }, { name: "3" }]}
        src="/assets/common/"
        propertyToSaveTo="grade"
      />
    </div>
  );
};

export default Filter;
