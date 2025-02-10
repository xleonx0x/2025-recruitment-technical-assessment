interface CardProps {
  img: string;
  roomsAvaliable: number;
  buildingName: string;
}

export default function Card({
  img,
  roomsAvaliable = 10,
  buildingName = "test",
}: CardProps) {
  return (
    <button
      className={`flex md:flex-col-reverse justify-between p-3 rounded-xl bg-center bg-cover w-full md:h-[400px]`}
      style={{ backgroundImage: `url('/assets/${img}')` }}
    >
      <div className="sm:p-4 p-2 md:block flex justify-center items-center text-left bg-freeroomOrange bg-opacity-80 sm:bg-opacity-100 sm:text-sm text-xs rounded-xl font-bold text-white ">
        {buildingName}
      </div>
      <div className="flex flex-row-reverse">
        <div className="flex justify-center items-center gap-2 w-3/8 p-3 sm:text-sm text-xs bg-white rounded-2xl font-bold">
          <div className="bg-green-600 rounded-full h-3 w-3" />
          {roomsAvaliable} rooms avaliable
        </div>
      </div>
    </button>
  );
}
