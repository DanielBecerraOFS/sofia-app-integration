import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/index";
import { Flag } from "lucide-react";
import { formatValues } from "@/shared/utils/formatters";

export default function CardInvoiceDetails({
  title = "Invoice Detail Title",
  value = "Invoice Detail Value",
  isCurrency = false,
  status = "default",
  icon = "",
}) {
  return (
    <Card
      className={`gap-2 py-1 border-1 border-primary max-h-[100px] ${
        status === "danger" ? "bg-red-200 text-red-950 border-red-950" : ""
      }`}
    >
      <CardHeader className="py-0">
        <CardTitle className="py-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center py-0">
        {icon === "high" && <Flag size={16} strokeWidth={1.5} />}
        <p>{isCurrency ? `$ ${formatValues(Number(value))}` : value}</p>
      </CardContent>
    </Card>
  );
}
