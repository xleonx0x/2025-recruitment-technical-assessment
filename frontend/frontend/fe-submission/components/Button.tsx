import clsx from "clsx";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ButtonProps {
  img: string | StaticImport;
  alt: string;
  pressed?: boolean;
}

export default function Button({ img, alt, pressed = false }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex justify-center border-2 border-freeroomOrange rounded-md h-10 w-10",
        { "bg-freeroomOrange": pressed }
      )}
    >
      <Image src={img} alt={alt} />
    </button>
  );
}
