import { useCallback } from "react";
import etcNames from "@/constants/etc_names.json";

const useGetEngName = () => {
  const getEngName = useCallback((name: string) => {
    const match = etcNames.find((item) => item.name === name);
    return match ? match.eng_name : name;
  }, []);

  return getEngName;
};

export default useGetEngName;
