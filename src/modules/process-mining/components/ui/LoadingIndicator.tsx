
// src/features/ProcessMining/components/UI/LoadingIndicator.tsx
import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading_animation.json";

export const LoadingIndicator: React.FC = () => {
  return (
    <div data-testid="loading-indicator" className="flex items-center justify-center w-full h-full">
      <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} />
    </div>
  );
};