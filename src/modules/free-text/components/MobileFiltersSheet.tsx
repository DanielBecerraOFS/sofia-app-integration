import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/index";

import { Filter } from "lucide-react";

import AccordionFilters from "./AccordionFilters";

export default function MobileFiltersSheet() {
  return (
    <div className="content-sidebar-sheet cursor-pointer md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Filter />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <div className="filter-sidebar-body px-4">
            <AccordionFilters />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant="default"
                className="w-full border-1 hover:bg-zinc-50 hover:text-zinc-950 hover:border-zinc-950 dark:hover:bg-zinc-950 dark:hover:text-zinc-50 dark:hover:border-zinc-50"
              >
                Aplicar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
