"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getIdentityDetail } from "@/api/detailAPI";
import IdentityInfoBox from "@/components/detail/identity/IdentityInfoBox";
import IdentitySkills from "@/components/detail/identity/IdentitySkills";
import IdentityPassive from "@/components/detail/identity/IdentityPassive";
import Keyword from "@/components/detail/Keyword";
// import DetailImage from "@/components/detail/DetailImage";
import ErrorMessage from "@/ui/ErrorMessage";
import useStore from "@/zustand/store";
import keyword_data from "@/constants/keyword.json";
import { IdentityData } from "@/interfaces/identityDetail";
import { ApiError } from "@/interfaces/apiError";

const IdentityTabs = () => {
  const id = useParams().id;
  const setSynchronization = useStore((state) => state.setSynchronizationState);
  const synchronization = useStore((state) => state.synchronizationState);
  const [identityData, setIdentityData] = useState<IdentityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchIdentityDetail = async () => {
      try {
        const data = await getIdentityDetail(Number(id));
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="w-8 h-8 text-primary-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-primary-200 text-center w-full my-8">
        <ErrorMessage />
      </div>
    );
  }

  const keywordInfo = identityData?.keyword.some((kw: string) =>
    keyword_data.some((item) => item.name === kw && item.content)
  );

  const identitySkills = identityData
    ? [
        identityData.identitySkill1s,
        identityData.identitySkill2s,
        identityData.identitySkill3s,
        identityData.identityDefSkills,
      ]
    : [];

  return (
    <div className="w-full mb-8">
      <Tabs value="스킬" orientation="horizontal" className="lg:flex">
        <div className="flex flex-col lg:items-start items-center gap-3 mt-4">
          {identityData && (
            <IdentityInfoBox
              character={identityData.character}
              name={identityData.name}
              afterProfileImage={identityData.afterProfileImage}
              affiliation={identityData.affiliation}
              grade={identityData.grade}
              season={identityData.season}
              releaseDate={identityData.releaseDate}
              obtainingMethod={identityData.obtainingMethod}
              resistance={identityData.resistance}
              status={identityData.status}
            />
          )}
          <TabsHeader
            className="w-64 md:flex md:flex-col bg-primary-500"
            placeholder={"TabsHeader"}
            indicatorProps={{
              className: "bg-primary-300 shadow-none mx-1",
            }}
          >
            {menu.map((value) => (
              <Tab
                key={value}
                value={value}
                placeholder={"Tab"}
                className="text-primary-100 mt-1 font-bold md:text-xl text-base p-0 md:p-1"
              >
                {value}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <TabsBody
          placeholder={"TabsBody"}
          animate={{
            initial: { y: 0, x: 0 },
            mount: { y: 0, x: 0 },
            unmount: { y: 50, x: 0 },
          }}
        >
          {menu.map((value) => (
            <TabPanel
              key={value}
              value={value}
              className="text-white font-bold md:pl-10"
            >
              <div className="flex justify-between">
                <span className="text-xl md:text-4xl text-primary-100">
                  {value}
                </span>
                {(value === "스킬" || value === "패시브") && (
                  <Button
                    className="flex gap-2 items-center bg-primary-400 px-2 md:px-4 py-0 md:py-1 font-sansLight text-sm md:text-base text-white hover:bg-primary-300 rounded"
                    placeholder={undefined}
                    onClick={() =>
                      setSynchronization({
                        synchronization:
                          (synchronization.synchronization + 1) % 2,
                      })
                    }
                  >
                    <span className="pt-1 whitespace-nowrap">4동기화</span>
                    {synchronization.synchronization ? (
                      <FaCheckCircle className="text-primary-200" />
                    ) : (
                      <FaRegCircle className="text-primary-200" />
                    )}
                  </Button>
                )}
              </div>
              <div className="py-1">
                {value === "스킬" && (
                  <IdentitySkills identitySkills={identitySkills} />
                )}
                {value === "패시브" && identityData && (
                  <IdentityPassive
                    identityPassives={identityData.identityPassives}
                  />
                )}
                {value === "키워드" &&
                  (keywordInfo && identityData ? (
                    <Keyword keywords={identityData.keyword} />
                  ) : (
                    <div className="text-primary-200 text-center w-full my-8">
                      키워드가 없습니다.
                    </div>
                  ))}
                {/* {value === "이미지" && (
                  <DetailImage
                    type="identity"
                    beforeImage={data.beforeImage}
                    afterImage={data.afterImage}
                  />
                )} */}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

const menu = ["스킬", "패시브", "키워드"];

export default IdentityTabs;
