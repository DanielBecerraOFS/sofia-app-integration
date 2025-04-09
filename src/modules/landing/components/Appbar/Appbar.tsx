import OFILightLogo from "@/assets/images/logos/new-sofia-logo.png";
import { NavLinks } from "@/modules/landing/index";
import { Button } from "@/shared/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="appbar-content max-w-[100svw] w-full max-h-[100px] h-full fixed top-0 left-0 right-0 z-90">
      <div className="wapper-appbar realtive flex flex-row justify-between items-center px-6 py-4">
        <picture className="flex-1.5">
          <source src={OFILightLogo} />
          <img
            src={OFILightLogo}
            alt="OFI Services concept Logo"
            width={150}
            height={70}
          />
        </picture>
        <div
          className={`mobile-navigation w-[70svw] h-[100svh] fixed top-0 left-0 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] duration-300 bg-inverse-surface inline md:hidden ${
            isMenuOpen ? "translate-x-[-100%]" : "translate-x-0"
          }`}
        >
          <div className="navigation-wrapper flex flex-col gap-0 justify-start px-6 py-4">
            <div className="close-icon-container w-full text-end">
              <Button variant="ghost" onClick={toggleMenu} className="p-0">
                <X />
              </Button>
            </div>
            <NavLinks />
            <div className="cta-navbar-actions flex flex-row gap-4 mt-4">
              <Link to={'/home'} state={{isLogin: true}}>
                <Button
                  variant="outline"
                  className="bg-inverse-surface hover:bg-on-primary hover:text-primary"
                >
                  Login
                </Button>
              </Link>
              <Link to={'/auth'} state={{isLogin: false}}>
                <Button
                  variant="default"
                  className="hover:bg-on-primary hover:text-primary"
                >
                  Create an Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="navigation-container min-w-[60svw] hidden md:inline bg-fixed-surface rounded-2xl">
          <NavLinks />
        </div>
        <div className="cta-navbar-actions flex flex-row gap-4">
          <Button
            variant="outline"
            className="hover:bg-on-primary hover:text-primary inline md:hidden"
            onClick={toggleMenu}
          >
            <Menu strokeWidth={1} />
          </Button>
          <Link to={'/auth'} state={{isLogin: true}}>
            <Button
              variant="outline"
              className="bg-scrim hover:bg-on-primary hover:text-primary hidden md:inline"
            >
              Login
            </Button>
          </Link>
          <Link to={'/auth'} state={{isLogin: false}}>
            <Button
              variant="default"
              className="hover:bg-on-primary hover:text-primary hidden md:inline"
            >
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
