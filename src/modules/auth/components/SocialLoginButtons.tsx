// SocialLoginButtons.tsx
import { Button } from "@/shared/components/ui/button";
import GoogleLogo from "@/assets/icons/google.svg";
import MicrosoftLogo from "@/assets/icons/microsoft.svg";

export function SocialLoginButtons() {
  return (
    <>
      <div className="relative flex items-center justify-center w-full my-4">
        <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        <span className="mx-3 text-gray-300 text-sm uppercase whitespace-nowrap">
          Or continue with
        </span>
        <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          className="flex items-center justify-center w-full gap-2 rounded-md bg-white text-black font-medium py-2 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg"
        >
          <picture>
            <source srcSet={GoogleLogo} type="image/png" />
            <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
          </picture>
          <span>Google</span>
        </Button>

        <Button
          type="button"
          className="flex items-center justify-center w-full gap-2 rounded-md bg-white text-black font-medium py-2 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg"
        >
          <picture>
            <source srcSet={MicrosoftLogo} type="image/png" />
            <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-5 h-5" />
          </picture>
          <span>Microsoft</span>
        </Button>
      </div>
    </>
  );
}
