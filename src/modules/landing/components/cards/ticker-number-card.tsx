import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";
import { NumberTicker, ShineBorder } from "@/modules/landing/index";

interface TickerNumberCardProps {
    value: number;
    title: string;
    unit: string;
    }

const TickerNumberCard: React.FC<TickerNumberCardProps> = ({value, title, unit}) => {
  return (
    <Card className="relative overflow-hidden min-w-[300px] bg-secondary-container/10 ">
      <ShineBorder shineColor={["#fbbf24", "#ffffff", "#a4d8e6","#0e7490"]} />
      <CardContent className="text-center">      
        <h3 className="text-7xl text-secondary-container font-bold"><NumberTicker value={value}/>{unit}</h3>
        <p>{title}</p>
      </CardContent>
    </Card>
  );
}

export default TickerNumberCard;
