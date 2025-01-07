import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Image from "next/image";

interface Props {
  beforeImage: string;
  afterImage: string;
  type: "identity" | "ego";
}

const IdentityImage = ({ beforeImage, afterImage, type }: Props) => {
  return (
    <Card className="bg-primary-450" placeholder="Card">
      <CardBody
        className="bg-primary-500 mb-5 rounded-md p-3 md:p-6"
        placeholder="CardBody"
      >
        <p className="text-base md:text-xl font-bold mb-2 md:mb-5 text-white">
          {type === "identity" ? "동기화 전" : "각성"}
        </p>
        <Image src={beforeImage} alt="beforeImage" width={1024} height={1024} />
      </CardBody>
      {afterImage && (
        <CardBody
          className="bg-primary-500 rounded-md p-3 md:p-6"
          placeholder="CardBody"
        >
          <p className="text-base md:text-xl font-bold mb-2 md:mb-5 text-white">
            {/* TODO : 침식 대신 확대로 넣어둠, 침식 이미지 삽입시 수정 */}
            {type === "identity" ? "동기화 후" : "침식"}
          </p>
          <Image src={afterImage} alt="afterImage" width={1024} height={1024} />
        </CardBody>
      )}
    </Card>
  );
};

export default IdentityImage;
