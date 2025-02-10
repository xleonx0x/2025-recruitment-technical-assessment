import Search from "@/public/searchGrey.svg";
import Image from "next/image";

export default function SearchBar() {
  return (
    <>
      <div className="flex border-2 rounded-sm w-1/2 p-2 gap-2">
        <Image src={Search} alt="magnifying glass icon" />
        <input
          className="focus:outline-none placeholder-bold w-full h-full"
          type="text"
          placeholder="Search for a building..."
        />
      </div>
    </>
  );
}
