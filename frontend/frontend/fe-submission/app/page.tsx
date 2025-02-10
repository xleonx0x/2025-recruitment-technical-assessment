import Card from "@/components/Card";
import FilterButton from "@/components/FilterButton";
import SearchBar from "@/components/SearchBar";
import data from "@/data.json";

export default function Home() {
  return (
    <div className="m-3">
      <div className="flex flex-row justify-between mb-3">
        <FilterButton variant={0} />
        <SearchBar />
        <FilterButton variant={1} />
      </div>
      <div className="grid xl:grid-cols-5 gap-5 md:grid-cols-3">
        {data.map((building, id) => (
          <Card
            key={id}
            img={building.building_picture.slice(2)}
            roomsAvaliable={building.rooms_available}
            buildingName={building.name}
          />
        ))}
      </div>
    </div>
  );
}
