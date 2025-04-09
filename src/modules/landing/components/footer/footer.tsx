import OFILightLogo from "@/assets/images/logos/new-sofia-logo.png";
import { AuroraText } from "../text/AuroraText";
import { Instagram, Linkedin } from "lucide-react";
export default function FooterContainer() {
  return (
    <footer className="bg-scrim text-on-primary pt-10 px-6">
      <div className="footer-container mx-auto flex flex-col md:flex-row items-start justify-around space-y-4 gap-4">
        <div className="footer-logo text-2xl font-bold flex items-center space-x-2">
          <picture className="flex-1.5">
            <source src={OFILightLogo} />
            <img
              src={OFILightLogo}
              alt="OFI Services concept Logo"
              width={250}
              height={100}
            />
          </picture>
        </div>
        <div className="footer-links flex flex-col space-x-4">
          <h3 className="links-title font-bold">
            <AuroraText>SOFIA</AuroraText>
          </h3>
          <a href="#" className="hover:text-primary">
            Chat
          </a>
          <a href="#" className="hover:text-primary">
            Documentation
          </a>
          <a href="#" className="hover:text-primary">
            Alerts
          </a>
        </div>
        <div className="footer-links flex flex-col space-x-4">
          <h3 className="links-title font-bold text-outline-variant">
            Use Cases
          </h3>
          <a href="#" className="hover:text-primary">
            Free Text Analysis
          </a>
          <a href="#" className="hover:text-primary">
            Duplicated Invoice Checker
          </a>
          <a href="#" className="hover:text-primary">
            Process Mining
          </a>
        </div>
        <div className="footer-links flex flex-col space-x-4">
          <h3 className="links-title font-bold text-outline-variant">
            Resourses
          </h3>
          <a href="#" className="hover:text-primary">
            Pricing
          </a>
          <a href="#" className="hover:text-primary">
            News
          </a>
          <a href="#" className="hover:text-primary">
            Documentation
          </a>
        </div>
      </div>
      <div className="footer-rights mt-4 py-2 px-1 md:px-6">
        <div className="wrapper-rights flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="left-side flex flex-col md:flex-row gap-2">
            <p className="font-bold">
              © 2023 OFI Services. All rights reserved.
            </p>
            <div className="cta-left-content">
              <a href="#" className="text-primary-container hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-container hover:text-primary ml-2">
                Terms of Service
              </a>
              <a href="#" className="text-primary-container hover:text-primary ml-2">
                Cookies Settings
              </a>
            </div>
          </div>
          <div className="right-side flex flex-row gap-2">
            <a href="#" className="hover:text-secondary">
              <Instagram />
            </a>
            <a href="#" className="hover:text-secondary">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
