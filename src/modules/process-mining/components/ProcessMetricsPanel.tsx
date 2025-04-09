import { ProcessAction, ProcessArrow } from "../types/types";
import { useTimeConversion } from "../hooks/useTimeConversion";
import { ChartBar } from "lucide-react";

export const ProcessMetricsPanel = ({
  nodes,
  edges,
}: {
  nodes: ProcessAction[];
  edges: ProcessArrow[];
  showAvgTime: boolean;
}) => {

  const { convertFromSeconds, getUnitLabel } = useTimeConversion();
  // Calcular volumen total del proceso
  const totalVolume = nodes.reduce((sum, node) => sum + (node.count || 0), 0);

  // Encontrar el proceso que es cuello de botella (más lento)
  const slowestProcess = [...nodes].sort(
    (a, b) => (b.avgProcessTime || 0) - (a.avgProcessTime || 0)
  )[0];

  // Calcular tiempo promedio de transición
  const avgTransitionTime =
    edges.reduce((sum, edge) => sum + (edge.avg_time || 0), 0) /
    edges.filter((e) => e.avg_time !== undefined).length;

  // Encontrar la transición más frecuente
  const mostFrequentPath = [...edges].sort(
    (a, b) => (b.count || 0) - (a.count || 0)
  )[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg w-[280px] animate-slideIn">
      <h3 className="mb-3 text-[15px] text-gray-800 border-b border-gray-100 pb-2.5 flex items-center">
        <ChartBar className="mr-2 text-indigo-600" size={20} /> Process Analytics
      </h3>

      <div className="text-xs mb-[14px]">
        <div className="font-semibold mb-1.5 text-gray-700 flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
          Total Process Volume:
        </div>
        <div className="bg-gray-50 py-1.5 px-2 rounded font-medium">
          {totalVolume.toLocaleString()} instances
        </div>
      </div>

      <div className="text-xs mb-[14px]">
        <div className="font-semibold mb-1.5 text-gray-700 flex items-center">
          <div className="w-2 h-2 rounded-full bg-pink-500 mr-1.5" />
          Bottleneck Process:
        </div>
        <div className="bg-gray-50 py-1.5 px-2 rounded">
          <div className="font-medium">{slowestProcess?.label}</div>
          <div className="text-pink-500 mt-[2px]">
            { convertFromSeconds(slowestProcess?.avgProcessTime ?? 0)} {getUnitLabel()}
          </div>
        </div>
      </div>

      <div className="text-xs mb-[14px]">
        <div className="font-semibold mb-1.5 text-gray-700 flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
          Most Frequent Transition:
        </div>
        <div className="bg-gray-50 py-1.5 px-2 rounded">
          <div className="font-medium">
            {nodes.find((n) => n.id === mostFrequentPath?.from)?.label} →{" "}
            {nodes.find((n) => n.id === mostFrequentPath?.to)?.label}
          </div>
          <div className="text-blue-500 mt-[2px]">
            {mostFrequentPath?.count?.toLocaleString()} instances
          </div>
        </div>
      </div>

      <div className="text-xs">
        <div className="font-semibold mb-1.5 text-gray-700 flex items-center">
          <div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" />
          Average Transition Time:
        </div>
        <div className="bg-gray-50 py-1.5 px-2 rounded font-medium">
          {convertFromSeconds(avgTransitionTime)} {getUnitLabel()}
        </div>
      </div>
    </div>
  );
};