"use client";

import { getAllIdentity } from "@/api/dictionaryApi";
import { queryClient } from "@/api/queryClient";
import SelectIdentity from "@/components/deck/SelectIdentity";
import ShowIdentity from "@/components/deck/ShowIdentity";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const DeckMaking = () => {
  const [mine, setMine] = useState<number[]>([]);
  const [isResult, setIsResult] = useState(false);

  const { data } = useQuery({
    queryKey: ["allIdentity"],
    queryFn: () => getAllIdentity(),
    retry: 1,
    placeholderData: () => {
      const cachedData = queryClient.getQueryData(["allIdentity"]);
      return cachedData || [];
    },
    staleTime: 1000 * 60 * 60 * 24, // 하루
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isResult ? (
        <ShowIdentity identities={data} mine={mine} setIsResult={setIsResult} />
      ) : (
        <SelectIdentity
          identities={data}
          setMine={setMine}
          setIsResult={setIsResult}
        />
      )}
    </div>
  );
};

export default DeckMaking;
