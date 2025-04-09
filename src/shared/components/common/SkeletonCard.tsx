import { Card, CardContent, Skeleton } from "@/shared/components/index";

export default function SkeletonCard() {
  return (
    <Card className="flex-1 rounded-md border-outline gap-2 max-h-fit p-0">
      <CardContent className="flex justify-center items-center gap-2 p-0">
        <Skeleton className="h-[130px] w-full" />
      </CardContent>
    </Card>
  );
}
