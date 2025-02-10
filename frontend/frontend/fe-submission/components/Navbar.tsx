"use client";
import { useState } from "react";
import FreeRoomsOpenLogo from "@/public/assets/freeRoomsLogo.png";
import FreeRoomsClosedLogo from "@/public/assets/freeroomsDoorClosed.png";
import Image from "next/image";
import Button from "@/components/Button";
import Search from "@/public/searchOrange.svg";
import GridViewPressed from "@/public/grid_view_pressed.svg";
import Map from "@/public/map.svg";
import DarkMode from "@/public/dark_mode.svg";

export default function Navbar() {
  const [doorOpen, setDoorOpen] = useState(true);

  return (
    <>
      <div className="m-3">
        <nav className="flex flex-row justify-between w-full h-10">
          <div className="flex">
            {
              <Image
                src={doorOpen ? FreeRoomsOpenLogo : FreeRoomsClosedLogo}
                onClick={() => setDoorOpen(!doorOpen)}
                alt="freerooms logo"
                className="cursor-pointer"
                width={50}
              />
            }
            <span className="sm:text-3xl text-xl text-freeroomOrange font-bold">
              Freerooms
            </span>
          </div>

          <div className="flex gap-2">
            <Button img={Search} alt="Search button" />
            <Button img={GridViewPressed} alt="Map grid button" pressed />
            <Button img={Map} alt="Map button" />
            <Button img={DarkMode} alt="Dark mode button" />
          </div>
        </nav>
      </div>
      <hr className="w-full" />
    </>
  );
}
