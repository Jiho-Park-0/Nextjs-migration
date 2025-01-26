"use client";

import React, { useEffect, useState } from "react";
import { getIdentityDetail } from "@/api/detailAPI";
import { useQuery } from "@tanstack/react-query";
import { Main_Keys } from "@/constants/queryKeys";
import { getYoutube } from "@/api/mainApi";

const TestPage = () => {
  interface IdentityData {
    id: number;
    character: string;
    name: string;
    beforeImage: string;
    beforeZoomImage: string;
    afterImage: string;
    afterZoomImage: string;
    afterProfileImage: string;
    affiliation: string;
    grade: number;
    season: number;
    releaseDate: string;
    obtainingMethod: string;
    resistance: string[];
    keyword: string[];
    status: {
      life: string;
      speed: string;
      defend: string;
    };
    identitySkill1s: Skill[];
    identitySkill2s: Skill[];
    identitySkill3s: Skill[];
    identityDefSkills: Skill[];
    identityPassives: Passive[];
  }

  interface Skill {
    name: string;
    power: string;
    type: string;
    resource: string;
    skillSeq: number;
    quantity: number | null;
    skillPower: number;
    coinPower: number;
    coinNum: number;
    atkWeight: number;
    level: number;
    normalEffect: string;
    coin1Effect: string;
    coin2Effect: string;
    coin3Effect: string;
    coin4Effect: string;
    coin5Effect: string;
  }

  interface Passive {
    name: string;
    isMain: boolean;
    resource: string;
    resQuantity: number;
    activeCond: string;
    effect: string;
    level: number;
  }

  interface ApiError {
    message: string;
    status?: number;
  }

  const [identityData, setIdentityData] = useState<IdentityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [videoId, setVideoId] = useState<string>("");

  const { data } = useQuery({
    queryKey: Main_Keys.youtube,
    queryFn: getYoutube,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    placeholderData: {
      videoId: "HTRQgFYCXHY", // 기본값 설정
    },
  });

  useEffect(() => {
    const fetchYoutube = async () => {
      try {
        const data = await getYoutube();
        setVideoId(data.videoId);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchYoutube();
  }, []);
  console.log(typeof videoId);
  console.log(typeof data?.videoId);

  useEffect(() => {
    const fetchIdentityDetail = async () => {
      try {
        const data = await getIdentityDetail(133);
        setIdentityData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIdentityDetail();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Identity Detail</h1>
      <pre>{JSON.stringify(identityData, null, 2)}</pre>
    </div>
  );
};

export default TestPage;
