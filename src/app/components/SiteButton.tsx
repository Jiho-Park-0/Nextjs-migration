"use client";

import { IconButton, Tooltip } from "@material-tailwind/react";
import Link from "next/link";

interface SiteButtonProps {
  name: string;
  link: string;
  icon: JSX.Element;
}

const SiteButton = ({ name, link, icon }: SiteButtonProps) => {
  return (
    <div className="w-fit">
      <Tooltip content={name}>
        <IconButton
          className="rounded-full bg-primary-200 hover:bg-primary-100"
          size="lg"
          placeholder={undefined}
        >
          <Link href={link} target="_blank">
            {icon}
          </Link>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SiteButton;
