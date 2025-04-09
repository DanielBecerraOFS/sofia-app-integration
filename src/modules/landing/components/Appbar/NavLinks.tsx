import { AuroraText } from "../text/AuroraText";

export default function NavLinks() {
  return (
    <nav className="navbar flex justify-between rounded-2xl gap-4 flex-col items-start md:px-4 md:py-2 md:border md:border-outline md:items-center md:flex-row ">
      <a
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant pb-4 border-b-outline-variant border-b-1 max-sm:w-full md:p-0 md:border-none"
      >
        Consulting
      </a>
      <a 
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant pb-4 border-b-outline-variant border-b-1 max-sm:w-full md:p-0 md:border-none"
      >
        Services
      </a>
      <a
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant pb-4 border-b-outline-variant border-b-1 max-sm:w-full md:p-0 md:border-none"
      >
        <AuroraText>SOFIA</AuroraText>
      </a>
      <a
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant pb-4 border-b-outline-variant border-b-1 max-sm:w-full md:p-0 md:border-none"
      >
        Pricing
      </a>
      <a
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant pb-4 border-b-outline-variant border-b-1 max-sm:w-full md:p-0 md:border-none"
      >
        Support
      </a>
      <a
        href="#"
        className="navbar-item flex p-2 text-center hover:scale-85 hover:text-outline-variant"
      >
        Our Work
      </a>
    </nav>
  );
}
