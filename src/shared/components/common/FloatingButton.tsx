import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/index";
import {
  SignpostBig,
  TriangleAlert,
  MessageSquareShare,
} from "lucide-react";

import HeadChatbotOFIA from "@/assets/images/ofia-chatbot-head.png";

export const FloatingActionButton = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-12 z-50"
      onMouseEnter={() => !isDropdownOpen && setIsTooltipVisible(false)}
      onMouseLeave={() => !isDropdownOpen && setIsTooltipVisible(true)}
    >
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <Tooltip open={isTooltipVisible}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full hover:h-16 hover:w-16 h-12 w-12 shadow-lg p-1 bg-primary hover:bg-primary/90 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] duration-500 cursor-pointer"
                >
                  <div className="ring-spacer h-full w-full rounded-full bg-zinc-50 flex justify-center items-center">
                    <picture className="floating-button-img-concept">
                      <source src={HeadChatbotOFIA} />
                      <img
                        src={HeadChatbotOFIA}
                        alt="ofia-chatbot-concept"
                        width={50}
                        height={50}
                      />
                    </picture>
                  </div>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>✨ Ask to OFIA ✨</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent
            align="end"
            className="w-56"
            onCloseAutoFocus={() => {
              setIsDropdownOpen(false);
              setIsTooltipVisible(true);
            }}
          >
             <DropdownMenuLabel>sOfiA Agent </DropdownMenuLabel>
             <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <SignpostBig />
              <span>Show last recommendations</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <TriangleAlert />
              <span>Show alerts logs</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <MessageSquareShare />
              <span>Start a chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default FloatingActionButton;
