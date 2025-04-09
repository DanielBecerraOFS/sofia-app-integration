import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/index";

interface TooltipInfoHoverProps {
  action: string | null;
  title: string;
  content: string;
  children: React.ReactNode;
  className?: string;
}

const TooltipInfoHover: React.FC<TooltipInfoHoverProps> = ({
  children,
  action,
  title,
  content,
  className
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className={className} asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-center">
        <h4 className="font-bold">{title}</h4>
        <p>{content}</p>
        {action === null ? <></> : <Button>{action}</Button>}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipInfoHover;
