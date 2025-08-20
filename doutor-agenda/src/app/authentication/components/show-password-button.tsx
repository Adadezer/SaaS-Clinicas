import { Eye, EyeOff } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

interface ShowPasswordButtonProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const ShowPasswordButton = ({
  showPassword,
  setShowPassword,
}: ShowPasswordButtonProps) => {
  return (
    <Button
      type="button"
      variant={"ghost"}
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:bg-transparent"
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </Button>
  );
};

export default ShowPasswordButton;
