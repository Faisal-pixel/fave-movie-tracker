import React from "react";

type Props = {
  children: React.ReactNode;
};

const LoadingState = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground">{children}</p>
      </div>
    </div>
  );
};

export default LoadingState;
