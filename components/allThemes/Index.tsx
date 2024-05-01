import React from "react";
import Link from "next/link";
import { themeData } from "@/themes/themeData";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import MainContainer from "../reusable/mainContainer/Index";

function AllThemes() {
  return (
    <MainContainer>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {themeData.map((example, index) => (
          <div className=" overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
              <h4 className="font-bold text-black">{example.label}</h4>
              <small className="text-default-500">
                This is what the {example.label} theme looks like
              </small>
            </div>
            <div className="px-4 sm:px-4">
              {" "}
              <Image
                shadow="sm"
                radius="lg"
                width={500}
                alt={example.img.alt}
                className="w-full object-cover h-[140px]"
                src={example.img.src}
              />
            </div>
            <div className="px-4 py-4 sm:px-6">
              <Button size="sm" target="_blank" as={Link} href={example.url}>
                View Theme
              </Button>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

export default AllThemes;
