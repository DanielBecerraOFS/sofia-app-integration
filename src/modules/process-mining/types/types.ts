
export interface DynamicFilter {
  [key: string]: string[];
}

export interface ProcessAction {
    id: string;
    label: string;
    timestamps?: string[];
    count?: number;
    avgProcessTime?: number;
    bottleneck?: boolean;
}

export interface ProcessArrow {
id: string;
from: string;
to: string;
label: string;
count?: number;
avg_time?: number;
}

export interface CustomEdgeProps {
id: string;
sourceX: number;
sourceY: number;
targetX: number;
targetY: number;
data?: { label?: string };
markerEnd?: string;
selected?: boolean;
}

export interface VariantData {
    value: string;
    label: string;
    frequency: number;
    avg_time: number;
    displayName?: string;
  }
  
  export interface Attribute {
    name: string;
    type: string;
    distincts: any[];
  }
  
  export interface FilterCriteria {
    attributeName: string;
    operator: string;
    value: any;
    value2?: any;
    id: string;
  }
  
  
  export interface VariantAPIResultRow {
    id: number;
    activities: string;
    percentage: number;
    avg_time: number;
    cases: string;
  }
  
  export interface GraphData {
    nodes: any[];
    edges: any[];
    variants?: VariantAPIResultRow[];
  }
  
  export interface MetadataType {
    attributes?: Attribute[];
    [key: string]: any;
  }

  export const FlowStyles = {
    nodeColors: {
      highVolume: "#e91e63",
      mediumVolume: "#ff9800",
      lowVolume: "#10b981",
      default: "#03a9f4"
    },
    
    edgeStyles: {
      default: { 
        stroke: "#555", 
        strokeWidth: 1.5 
      },
      highlighted: { 
        stroke: "#e91e63", 
        strokeWidth: 3 
      }
    },
    
    layoutOptions: {
      "elk.algorithm": "mrtree",
      "elk.direction": "DOWN",
      "elk.layered.spacing.nodeNodeBetweenLayers": "150",
      "elk.spacing.nodeNode": "200",
      "elk.edgeRouting": "SPLINES"
    },
    
    nodeSize: 18,
    loopRadius: 15
  };