// src/services/processMiningTransform.ts
import { APIResultRow } from "../store/processMiningSlice";

export interface ElkNode {
  id: string;
  label: string;
  timestamps: string[];
}

export interface ElkEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  count: number;
  avg_time: number;
}

export function aggregateProcessData(
  apiData: { count: number; next: any; previous: any; results: APIResultRow[] },
): { 
  nodes: ElkNode[]; 
  edges: ElkEdge[];
  activityAverages: Record<string, number>;
  overallAverage: number;
} {
  const rawData = apiData.results;
  const grouped: Record<string, APIResultRow[]> = {};

  rawData.forEach(row => {
    const caseKey = String(row.case);
    grouped[caseKey] = grouped[caseKey] || [];
    grouped[caseKey].push(row);
  });

  for (const caseKey in grouped) {
    grouped[caseKey].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  const activityMap = new Map<string, { count: number; timestamps: string[] }>();
  const transitionMap = new Map<string, { count: number; totalTpt: number }>();

  activityMap.set("Start", { count: 0, timestamps: [] });
  activityMap.set("End", { count: 0, timestamps: [] });

  const getTransitionKey = (from: string, to: string) => `${from}-->${to}`;

  for (const caseKey in grouped) {
    const events = grouped[caseKey];
    if (events.length === 0) continue;

    // Procesar Start -> Primera actividad
    const first = events[0];
    const startKey = getTransitionKey("Start", first.name);
    updateTransition(transitionMap, startKey, 0);
    updateActivity(activityMap, "Start", first.timestamp);
    updateActivity(activityMap, first.name, first.timestamp);

    // Procesar transiciones internas
    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];
      
      const transitionKey = getTransitionKey(current.name, next.name);
      updateTransition(transitionMap, transitionKey, current.tpt);
      updateActivity(activityMap, next.name, next.timestamp);
    }

    // Procesar última actividad -> End
    const last = events[events.length - 1];
    const endKey = getTransitionKey(last.name, "End");
    updateTransition(transitionMap, endKey, last.tpt);
    updateActivity(activityMap, "End", last.timestamp);
  }

  // Calcular promedios por actividad y total
  const activityStats = new Map<string, { totalTpt: number; count: number }>();

  for (const [key, transition] of transitionMap.entries()) {
    const [from] = key.split("-->");
    if (from === "Start") continue; // Ignorar transiciones desde Start
    
    const activityData = activityStats.get(from) || { totalTpt: 0, count: 0 };
    activityData.totalTpt += transition.totalTpt;
    activityData.count += transition.count;
    activityStats.set(from, activityData);
  }

  // Calcular promedio por actividad
  const activityAverages: Record<string, number> = {};
  activityStats.forEach((stats, activity) => {
    activityAverages[activity] = stats.count > 0 
      ? Number((stats.totalTpt / stats.count).toFixed(2))
      : 0;
  });

  // Calcular promedio general
  let totalTpt = 0;
  let totalCount = 0;
  activityStats.forEach(stats => {
    totalTpt += stats.totalTpt;
    totalCount += stats.count;
  });
  const overallAverage = totalCount > 0 
    ? Number((totalTpt / totalCount).toFixed(2))
    : 0;

  return {
    nodes: Array.from(activityMap.entries()).map(([activity, data]) => ({
      id: activity,
      label: ["Start", "End"].includes(activity) 
        ? activity 
        : `${activity} (${data.count})`,
      timestamps: data.timestamps
    })),
    edges: Array.from(transitionMap.entries()).map(([key, transition]) => {
      const [from, to] = key.split("-->");
      return {
        id: key,
        from,
        to,
        label: String(transition.count),
        count: transition.count,
        avg_time: Number((transition.totalTpt / transition.count).toFixed(2))
      };
    }),
    activityAverages,
    overallAverage
  };
}

// Helpers (sin cambios)
function updateTransition(
  map: Map<string, { count: number; totalTpt: number }>,
  key: string,
  tpt: number
) {
  const existing = map.get(key) || { count: 0, totalTpt: 0 };
  map.set(key, {
    count: existing.count + 1,
    totalTpt: existing.totalTpt + tpt
  });
}

function updateActivity(
  map: Map<string, { count: number; timestamps: string[] }>,
  activity: string,
  timestamp: string
) {
  const data = map.get(activity) || { count: 0, timestamps: [] };
  map.set(activity, {
    count: data.count + 1,
    timestamps: [...data.timestamps, timestamp]
  });
}