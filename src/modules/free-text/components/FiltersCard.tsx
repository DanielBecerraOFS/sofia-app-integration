import { Button } from "@/shared/components/index";
import { ListFilter } from "lucide-react";
import AccordionFilters from "../components/AccordionFilters";

const FilterSideBar: React.FC = () => {
  return (
    <div className="filter-aside-container relative overflow-hidden hidden md:block flex-1 w-full max-w-[300px] min-w-[300px] h-full ">
      <div className="wrapper w-full h-full relative pr-6">
        <div className="filter-container fixed w-full max-w-[290px] py-4 px-6 z-10 border border-primary-container rounded-md">
          <div className="filter-aside-header flex flex-row justify-between items-center">
            <h3 className="font-semibold text-2xl">Filters</h3>
            <ListFilter size={20} strokeWidth={2} />
          </div>
          <div className="filter-aside-body">
            <AccordionFilters/>
          </div>
          <Button variant="default" className="w-full border-1 bg-secondary text-on-secondary hover:bg-on-secondary hover:text-secondary">Aplicar</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
