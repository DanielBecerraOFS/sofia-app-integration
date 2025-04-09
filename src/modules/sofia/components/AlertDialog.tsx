import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/index";
import { useEffect, useState } from "react";
import SofiaAlerts from "@/assets/images/sofia-alerts.png";

interface AlertDialogProps {
  description: string;
  onAction?: () => void;
}

const AlertsDialog: React.FC<AlertDialogProps> = ({
  description,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-row justify-between dialog-alert-content min-w-[30svw]">
        <div className="dialog-img-content">
          <picture className="sofia-alert-concept block">
            <source src={SofiaAlerts} />
            <img src={SofiaAlerts} alt="Sofia alert image concept" className=" m-auto object-contain object-center block p-0"/>
          </picture>
        </div>
        <div className="dialog-content">
          <AlertDialogHeader>
            <AlertDialogTitle>An anomaly has been detected</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="cursor-pointer hover:bg-primary/50 hover:text-on-primary-container">Close</AlertDialogCancel>
            <AlertDialogAction className="bg-scrim text-inverse-on-surface border hover:bg-surface hover:text-on-surface cursor-pointer">
              ✨ Review with SOFIA ✨
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertsDialog;
