"use client";

import { getAllIdentity } from "@/api/dictionaryApi";
import { queryClient } from "@/api/queryClient";
import SelectIdentity from "@/components/deck/SelectIdentity";
import ShowIdentity from "@/components/deck/ShowIdentity";
import { useState, useEffect } from "react";

const DeckMaking = () => {
  const [mine, setMine] = useState<number[]>([]);
  const [isResult, setIsResult] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const data = await getAllIdentity();
        queryClient.setQueryData(["allIdentity"], data);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdentity();
  }, []);

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
