import { Button } from "@/shared/components/index";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { TooltipInfoHover } from "@/shared/components/index";
import { formatValues } from "@/shared/utils/formatters";
import { Sparkles } from "lucide-react";

interface KPICardProps {
  key: string | null;
  title: string;
  legend: string;
  isCurrency: boolean;
  data: number;
}

const KPICard: React.FC<KPICardProps> = ({
  title = "Card Title",
  legend = "space for providing additional information",
  isCurrency = true,
  data = 0,
}) => {
  return (
    <Card className="flex-1 min-w-0 min-h-[180px] rounded-md border-1 border-primary">
      <CardHeader className="flex flex-row items-center justify-start gap-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="cta-tooltip-actions flex flex-row items-center">
          <TooltipInfoHover
            title="✨ Ask to SOFIA ✨"
            content="Learn more about this KPI"
            action={null}
          >
            <Button variant="ghost" className="cursor-pointer">
              <Sparkles strokeWidth={1.25} size={16} />
            </Button>
          </TooltipInfoHover>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {isCurrency ? `$ ${formatValues(data)}` : formatValues(data)}
        </div>
        <p className="text-xs text-muted-foreground">{legend}</p>
      </CardContent>
    </Card>
  );
};

export default KPICard;
