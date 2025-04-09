import { Outlet } from "react-router-dom";
import ParticlesBackground from "@/shared/components/ui/particles";

const ParticlesLayout = () => {
  return (
    <div className="relative w-full h-full">
      <ParticlesBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ParticlesLayout;