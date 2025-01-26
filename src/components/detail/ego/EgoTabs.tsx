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
import { getEgoDetail } from "@/api/detailAPI";
import { useState, useEffect } from "react";
import EgoInfoBox from "@/components/detail/ego/EgoInfoBox";
import EgoSkills from "@/components/detail/ego/EgoSkills";
import EgoPassive from "@/components/detail/ego/EgoPassive";
import Keyword from "@/components/detail/Keyword";
// import DetailImage from "@/components/detail/DetailImage";
import ErrorMessage from "@/ui/ErrorMessage";
import useStore from "@/zustand/store";
import keyword_data from "@/constants/keyword.json";
import { EgoDetail } from "@/interfaces/egoDetail";
import { ApiError } from "@/interfaces/apiError";

const EgoTabs = () => {
  const id = useParams().id;
  const setSynchronization = useStore((state) => state.setSynchronizationState);
  const synchronization = useStore((state) => state.synchronizationState);
  const [EgoData, setEgoData] = useState<EgoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchEgoDetail = async () => {
      try {
        const data = await getEgoDetail(Number(id));
        setEgoData(data);
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

    fetchEgoDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="w-8 h-8 text-primary-200" />
      </div>
    );
  }

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

  const keywordInfo = EgoData?.keyword.some((kw: string) =>
    keyword_data.some((item) => item.name === kw && item.content)
  );

  return (
    <div className="w-full mb-8">
      <Tabs value="스킬" orientation="horizontal" className="lg:flex">
        <div className="flex flex-col lg:items-start items-center gap-3 mt-4">
          {EgoData && (
            <EgoInfoBox
              character={EgoData.character}
              name={EgoData.name}
              zoomImage={EgoData.zoomImage}
              grade={EgoData.grade}
              season={EgoData.season}
              resistance={EgoData.resistance}
              releaseDate={EgoData.releaseDate}
              obtainingMethod={EgoData.obtainingMethod}
              cost={EgoData.cost}
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
              className="text-white font-bold lg:pl-10 w-full"
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
                {value === "스킬" &&
                  EgoData?.egoskills &&
                  EgoData?.egoCorSkills && (
                    <EgoSkills
                      EgoSkills={{
                        EgoSkill1s: EgoData.egoskills,
                        EgoSkill2s: EgoData.egoCorSkills,
                      }}
                    />
                  )}
                {value === "패시브" && EgoData?.passive && (
                  <EgoPassive Egodata={EgoData.passive} />
                )}
                {value === "키워드" &&
                  (keywordInfo && EgoData ? (
                    <Keyword keywords={EgoData.keyword} />
                  ) : (
                    <div className="text-primary-200 text-center w-full my-8">
                      키워드가 없습니다.
                    </div>
                  ))}
                {/* {value === "이미지" && data.image && data.zoomImage && (
                  <DetailImage
                    type="ego"
                    beforeImage={data.image}
                    afterImage={data.corImage}
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

export default EgoTabs;
