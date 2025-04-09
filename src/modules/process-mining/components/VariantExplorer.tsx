import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/shared/components/ui/select";
import { useTimeConversion } from "../hooks/useTimeConversion";
import { VariantData } from "../types/types";

export interface VariantBarChartSelectorProps {
  variants: VariantData[];
  onFilter?: (selected: string[]) => void;
  selectedVariants?: string[];
}

// Componente CustomTooltip para el tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  const { convertFromSeconds, getUnitLabel } = useTimeConversion();

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: 8,
          padding: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <p style={{ color: "var(--on-surface)", margin: 0, fontWeight: 500 }}>
          Frecuencia
        </p>
        <p style={{ color: "var(--secondary)", margin: 0 }}>
          {Math.round(payload[0].value)}%
        </p>
        <p style={{ color: "var(--on-surface)", margin: 0, fontWeight: 500 }}>
          Duración
        </p>
        <p style={{ color: "var(--secondary)", margin: 0 }}>
          {convertFromSeconds(Math.round(payload[0].payload.avg_time))} {getUnitLabel()}
        </p>
      </div>
    );
  }
  return null;
};

// Componente para mostrar cuando no hay variantes
const NoVariantsMessage = () => (
  <div className="flex flex-col items-center justify-center h-64 p-6 rounded-lg bg-surface/5">
    <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.84 6.71 2.26" />
        <path d="M21 3v9h-9" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-on-surface mb-2">No hay variantes disponibles</h3>
    <p className="text-sm text-muted-foreground text-center">
      No variants were found to display. Try modifying filters or adding data.
    </p>
  </div>
);

export function VariantExplorer({
  variants,
  onFilter,
  selectedVariants = []
}: VariantBarChartSelectorProps) {
  const [viewMode, setViewMode] = useState<"chart" | "list">("chart");
  const [sortOrder, setSortOrder] = useState<"frequency" | "duration">(
    "frequency"
  );

  const sortedVariants = useMemo(
    () =>
      [...variants].sort((a, b) =>
        sortOrder === "frequency"
          ? b.frequency - a.frequency
          : (Number(b.avg_time) || 0) - (Number(a.avg_time) || 0)
      ),
    [variants, sortOrder]
  );

  const displayVariants = useMemo(
    () =>
      sortedVariants.map((v, i) => ({
        ...v,
        displayName: `v${i + 1}`
      })),
    [sortedVariants]
  );

  // Calcular el dominio máximo para el eje X basado en la variante de mayor frecuencia
  const maxDomain = useMemo(() => {
    if (!displayVariants.length) return 100;
    
    const maxFrequency = Math.max(...displayVariants.map(v => v.frequency));
    // Redondear al siguiente múltiplo de 5%
    return Math.min(100, Math.ceil(maxFrequency / 5) * 5 );
  }, [displayVariants]);

  const toggleVariant = (value: string) => {
    const newSelection = selectedVariants.includes(value)
      ? selectedVariants.filter((v) => v !== value)
      : [...selectedVariants, value];
    onFilter?.(newSelection);
  };

  const totalSelectedPercentage = useMemo(
    () =>
      displayVariants
        .filter((v) => selectedVariants.includes(v.value))
        .reduce((acc, cur) => acc + Math.round(cur.frequency), 0),
    [displayVariants, selectedVariants]
  );

  const chartHeight = Math.max(displayVariants.length * 40, 300);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Contenedor de selects con label superior */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col flex-1">
          <span className="mb-1 text-sm font-medium text-muted-foreground">Ordenar por</span>
          <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as any)}>
            <SelectTrigger className="w-full bg-on-surface text-surface flex justify-between items-center">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequency">Frecuencia</SelectItem>
              <SelectItem value="duration">Tiempo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col flex-1 ml-2">
          <span className="mb-1 text-sm font-medium text-muted-foreground">Ver como</span>
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <SelectTrigger className="w-full bg-on-surface text-surface flex justify-between items-center">
              <SelectValue placeholder="Ver como" />
            </SelectTrigger>
            <SelectContent className="gap-0">
              <SelectItem value="chart">Gráfica</SelectItem>
              <SelectItem value="list">Lista</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayVariants.length === 0 ? (
        <NoVariantsMessage />
      ) : viewMode === "chart" ? (
        <div className="custom-scrollbar overflow-y-auto mr-2" style={{ maxHeight: 500 }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={displayVariants}
              layout="vertical"
              margin={{ left: -20, right: 10 }}
              onClick={(e) =>
                e.activePayload?.[0]?.payload?.value && toggleVariant(e.activePayload[0].payload.value)
              }
            >
              <YAxis
                dataKey="displayName"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--on-surface)" }}
              />
              {/* XAxis posicionado en la parte superior con dominio dinámico */}
              <XAxis
                type="number"
                tick={{ fill: "var(--on-background)" }}
                tickLine={{ fill: "var(--surface-dim)" }}
                domain={[0, maxDomain]}
                tickFormatter={(v) => `${v}%`}
                axisLine={false}
                orientation="top"
              />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey="frequency"
                fill="var(--secondary)"
                radius={4}
                cursor="pointer"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="custom-scrollbar overflow-y-auto space-y-2" style={{ maxHeight: 300 }}>
          {displayVariants.map((variant) => (
            <div
              key={variant.value}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer
                ${
                  selectedVariants.includes(variant.value)
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-background hover:bg-muted/50"
                }`}
              onClick={() => toggleVariant(variant.value)}
            >
              <span className="font-medium text-sm">{variant.displayName}</span>
              <span className="text-muted-foreground text-sm">
                {Math.round(variant.frequency)}%
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {selectedVariants.length > 0 ? (
              <>
                <span className="font-medium text-foreground">
                  {selectedVariants.length} seleccionadas
                </span>{" "}
                ({totalSelectedPercentage}% del total)
              </>
            ) : (
              "All variants"
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilter?.([])}
            disabled={!selectedVariants.length}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}