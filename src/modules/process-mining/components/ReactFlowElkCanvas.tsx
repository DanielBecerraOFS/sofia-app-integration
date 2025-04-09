import React, { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
  useNodesState,
  useEdgesState,
  EdgeTypes,
  Position,
  NodeProps,
  Handle,
} from "reactflow";
import ELK from "elkjs/lib/elk.bundled.js";
import "reactflow/dist/style.css";
import { useTimeConversion } from "../hooks/useTimeConversion";
import { Button } from "@/shared/components/ui/button";
import { ProcessAction, ProcessArrow } from "../types/types";
import { CustomLoopEdge } from "../types/edgeTypes";
import { ProcessMetricsPanel } from "./ProcessMetricsPanel";
import { Clock, InfoIcon, List } from "lucide-react";

const elk = new ELK();

const nodeWidth = 8;
const nodeHeight = 8;

// Enhanced circle node with hover details
const EnhancedCircleNode = ({ data, selected }: NodeProps) => {
  const { convertFromSeconds, getUnitLabel } = useTimeConversion();
  const [isHovered, setIsHovered] = useState(false);
  const circleSize = nodeWidth + 10;
  
  const nodeColor = () => {
    // Color nodes based on their process volume (count)
    if (!data.count) return selected ? "#03a9f4" : "#888";
    if (data.count > 1000) return "#e91e63"; // High volume
    if (data.count > 500) return "#ff9800"; // Medium volume
    return "#10b981"; // Low volume
  };
  
  return (
    <div 
      style={{ position: "relative", width: circleSize, height: circleSize }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          background: nodeColor(),
          border: "1px solid #6b7280",
          boxShadow: selected ? "0 0 8px rgba(3, 169, 244, 0.8)" : "none",
          transition: "all 0.2s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: circleSize + 6,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#333",
          whiteSpace: "nowrap",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "3px 6px",
          borderRadius: "4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          border: "1px solid #eee",
          transition: "opacity 0.2s ease",
          opacity: isHovered ? 1 : 0.6, // Nombre del nodo traslúcido hasta hover
        }}
      >
        {data.label}
      </div>
      
      {/* Node details tooltip on hover */}
      {isHovered && data.count && (
        <div
          style={{
            position: "absolute",
            top: circleSize + 8,
            left: 0,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "8px",
            fontSize: "11px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
            minWidth: "180px",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{data.label} Details:</div>
          <div>Process Count: {data.count.toLocaleString()}</div>
          {data.avgProcessTime && (
            <div>Avg. Processing Time: {`${convertFromSeconds(data.avgProcessTime)} ${getUnitLabel()}`}</div>
          )}
          {data.bottleneck && (
            <div style={{ color: "red", marginTop: "4px" }}>⚠️ Process Bottleneck</div>
          )}
        </div>
      )}

      {/* Handles (same as original) */}
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        style={{ opacity: 0, width: 6, height: 6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{
          opacity: 0,
          width: 6,
          height: 6,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        style={{ opacity: 0, width: 6, height: 6 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        style={{
          opacity: 0,
          width: 6,
          height: 6,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        style={{ opacity: 0, width: 6, height: 6 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        style={{
          opacity: 0,
          width: 6,
          height: 6,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        style={{ opacity: 0, width: 6, height: 6 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{
          opacity: 0,
          width: 6,
          height: 6,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};


// Custom loop edge (same as original)


const edgeTypes: EdgeTypes = { customLoop: CustomLoopEdge };
const nodeTypes = { circle: EnhancedCircleNode };

const layoutOptions = {
  "elk.algorithm": "mrtree",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "150",
  "elk.spacing.nodeNode": "200",
  "elk.edgeRouting": "SPLINES",
  "elk.layered.priority.straightness": "true",
  "elk.layered.priority.direction": "false",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.spacing.edgeNode": "300",
  "elk.spacing.edgeEdge": "3000",
};


const ReactFlowCanvas: React.FC<{
  nodes: ProcessAction[];
  edges: ProcessArrow[];
}> = ({ nodes, edges }) => {
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState([]);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState([]);
  const [showAvgTime, setShowAvgTime] = useState(true);
  const [showMetricsPanel, setShowMetricsPanel] = useState(false);
  const { convertFromSeconds, getUnitLabel, timeUnit } = useTimeConversion();
  // Process nodes to add count and avgProcessTime
  const processedNodes = nodes.map(node => {
    // Calculate incoming count for each node
    const incomingEdges = edges.filter(e => e.to === node.id);
    const outgoingEdges = edges.filter(e => e.from === node.id);
    
    const nodeCount = incomingEdges.reduce((sum, edge) => sum + (edge.count || 0), 0);
    
    // Calculate average processing time
    const avgTime = outgoingEdges.reduce((sum, edge) => 
      sum + (edge.avg_time || 0), 0) / outgoingEdges.length;
    
    // Identify bottlenecks
    const isBottleneck = avgTime > 10; // Example threshold
    
    return {
      ...node,
      count: nodeCount > 0 ? nodeCount : undefined,
      avgProcessTime: avgTime || undefined,
      bottleneck: isBottleneck
    };
  });

  const pickHandleId = (angleDeg: number, handleType: "source" | "target") => {
    const angle = (angleDeg + 360) % 360;
    if (angle >= 300 || angle < 60) return `${handleType}-right`;
    if (angle >= 60 && angle < 120) return `${handleType}-bottom`;
    if (angle >= 120 && angle < 240) return `${handleType}-left`;
    return `${handleType}-top`;
  };

  const buildRFNodes = (actions: ProcessAction[]): Node[] => {
    return actions.map((act) => ({
      id: act.id,
      data: { 
        label: act.label,
        count: act.count,
        avgProcessTime: act.avgProcessTime,
      },
      position: { x: 0, y: 0 },
      type: "circle",
      "data-testid": 'node-label'

    }));
  };

  const buildRFEdges = (arrows: ProcessArrow[]): Edge[] => {
  return arrows.map((arrow) => {
    const isLoop = arrow.from === arrow.to;
    const label =
      showAvgTime && arrow.avg_time !== undefined
        ? `${convertFromSeconds(arrow.avg_time)} ${getUnitLabel()}`
        : arrow.count !== undefined
        ? `${arrow.count}`
        : arrow.label;
    
    // Determine edge style based on volume
    const highVolume = arrow.count && arrow.count > 500;
    const edgeStyle = {
      stroke: highVolume ? "#03a9f4" : "#555",
      strokeWidth: highVolume ? 2.5 : 1.5,
      strokeDasharray: undefined
    };
    
    // Check if there's a reverse edge (B to A) for this edge (A to B)
    const reverseEdgeExists = arrows.some(
      e => e.from === arrow.to && e.to === arrow.from
    );
    
    let edgeType = isLoop ? "customLoop" : "default";
    let customEdgeProps = {};
    
    // Apply curved edges for bidirectional connections
    if (reverseEdgeExists && !isLoop) {
      // Use bezier type for smooth curved lines
      edgeType = "default";
      
      // Find the reverse edge
      const reverseEdge = arrows.find(e => e.from === arrow.to && e.to === arrow.from);
      const isCurrentEdgeFirst = arrow.id < (reverseEdge?.id || "");
      
      // Use different curvature direction based on edge order
      customEdgeProps = {
        style: {
          ...edgeStyle,
        },
        // Use different curvature strengths for each direction
        curvature: isCurrentEdgeFirst ? 0.5 : -0.5,
        animated: highVolume
      };
    }
    
    return {
      id: arrow.id,
      source: arrow.from,
      target: arrow.to,
      label,
      data: { label },
      type: edgeType,
      animated: highVolume,
      style: edgeStyle,
      ...customEdgeProps
    } as Edge;
  });
};

  useEffect(() => {
    const calculateLayout = async () => {
      const initialNodes = buildRFNodes(processedNodes);
      const initialEdges = buildRFEdges(edges);

      const elkGraph = {
        id: "root",
        layoutOptions,
        children: initialNodes.map((node) => ({
          id: node.id,
          width: nodeWidth,
          height: nodeHeight,
        })),
        edges: initialEdges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };

      try {
        const layoutedGraph = await elk.layout(elkGraph);
        const layoutedNodes = initialNodes.map((node) => {
          const elkNode = layoutedGraph.children?.find((n) => n.id === node.id);
          return {
            ...node,
            position: { x: elkNode?.x || 0, y: elkNode?.y || 0 },
          };
        });

        const usedTargetHandles: { [nodeId: string]: string[] } = {};
        const layoutedEdges = initialEdges.map((edge) => {
          const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
          const targetNode = layoutedNodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return edge;

          const sx = sourceNode.position.x + nodeWidth / 2;
          const sy = sourceNode.position.y + nodeHeight / 2;
          const tx = targetNode.position.x + nodeWidth / 2;
          const ty = targetNode.position.y + nodeHeight / 2;

          const dx = tx - sx;
          const dy = ty - sy;
          const angleSource = Math.atan2(dy, dx) * (180 / Math.PI);
          const angleTarget = angleSource + 180;

          const sourceHandleId = pickHandleId(angleSource, "source");
          let targetHandleId = pickHandleId(angleTarget, "target");
          if (!usedTargetHandles[targetNode.id]) usedTargetHandles[targetNode.id] = [];
          if (usedTargetHandles[targetNode.id].includes(targetHandleId)) {
            const availableHandles = [
              "target-top",
              "target-right",
              "target-bottom",
              "target-left",
            ];
            const alternative = availableHandles.find(
              (h) => !usedTargetHandles[targetNode.id].includes(h)
            );
            if (alternative) targetHandleId = alternative;
          }
          usedTargetHandles[targetNode.id].push(targetHandleId);

          return { ...edge, sourceHandle: sourceHandleId, targetHandle: targetHandleId };
        });

        setRfNodes(layoutedNodes);
        setRfEdges(layoutedEdges);
      } catch (error) {
        console.error("Error calculating layout:", error);
      }
    };

    calculateLayout();
  }, [edges, showAvgTime, timeUnit]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Control buttons */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 3,
          display: "flex",
          gap: "8px"
        }}
      >
        {/* Toggle between time and count */}
        <Button
          onClick={() => setShowAvgTime((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: 0,
          }}
          title={showAvgTime ? "Show Count" : "Show Average Time"}
        >
          {showAvgTime ? (
            <Clock size={20} color="#000" />
          ) : (
            <List size={20} color="#000" />
          )}
        </Button>
        
        {/* Toggle metrics panel */}
        <Button
          onClick={() => setShowMetricsPanel((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: 0,
          }}
          title={showMetricsPanel ? "Hide Metrics" : "Show Metrics"}
        >
          <InfoIcon size={20} color="#000" />
        </Button>
      </div>
      
      {/* Metrics panel */}
      {showMetricsPanel && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "10px",
            zIndex: 3,
          }}
        >
          <ProcessMetricsPanel 
            nodes={processedNodes} 
            edges={edges} 
            showAvgTime={showAvgTime}
          />
        </div>
      )}
      
      <ReactFlowProvider>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          minZoom={0.2}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          defaultEdgeOptions={{
            style: { stroke: "#555", strokeWidth: 1.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#555" },
            labelStyle: { fontSize: 11, fill: "#222", fontWeight: "bold" },
            labelBgPadding: [2, 4],
            labelBgBorderRadius: 3,
            labelBgStyle: { fill: "#fff", opacity: 0.9 },
          }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#ddd" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowCanvas;