import { toast } from "sonner";
import React from "react";

interface SonnerToastLogProps {
  type?: "default" | "error" | "success" | "warning";
  title?: string;
  description?: string;
  actionTitle?: string;
}

const SonnerToastLog: React.FC<SonnerToastLogProps> = ({
  type = "default",
  title = "Toast Title",
  description = "Toast Description",
  actionTitle = "Continue"
}) => {
  const showToast = () => {
    const toastOptions = {
      description: description,
      action: {
        label: actionTitle,
        onClick: () => console.log("Undo"),
      },
    };

    switch (type) {
      case "error":
        toast.error(title, toastOptions);
        break;
      case "success":
        toast.success(title, toastOptions);
        break;
      case "warning":
        toast.warning(title, toastOptions);
        break;
      default:
        toast(title, toastOptions);
    }
  };

  // Trigger the toast when the component is rendered
  React.useEffect(() => {
    showToast();
  }, [type, title, description, actionTitle]);

  // Return null as the toast is handled by the Sonner library
  return null;
};

export default SonnerToastLog;