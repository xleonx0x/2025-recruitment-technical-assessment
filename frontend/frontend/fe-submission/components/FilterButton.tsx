import filterList from "@/public/filter_list.svg";
import filterAlt from "@/public/filter_alt.svg";
import Image from "next/image";

type Filter = 0;
type Sort = 1;

interface FilterButtonProps {
  variant: Filter | Sort;
}

export default function FilterButton({ variant }: FilterButtonProps) {
  return (
    <button className="flex gap-2 justify-center items-center sm:w-32 sm:h-10 w-20 h-10 border-2 border-freeroomOrange rounded-lg">
      <Image
        src={variant === 0 ? filterAlt : filterList}
        alt={variant === 0 ? "filter button" : "sort button"}
      />
      <span className="text-freeroomOrange font-bold text-xs sm:text-lg">
        {variant === 0 ? "Filters" : "Sort"}
      </span>
    </button>
  );
}
