import { Handle, NodeProps } from "reactflow";
import { useTimeConversion } from "../hooks/useTimeConversion";
import { FlowStyles } from "./types";
import { useState } from "react";
import { Position } from "reactflow";

export const EnhancedCircleNode = ({ data, selected }: NodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { convertFromSeconds } = useTimeConversion();

  const nodeColor = () => {
    if (!data.count) return selected ? FlowStyles.nodeColors.default : "#888";
    if (data.count > 1000) return FlowStyles.nodeColors.highVolume;
    if (data.count > 500) return FlowStyles.nodeColors.mediumVolume;
    return FlowStyles.nodeColors.lowVolume;
  };

  return (
    <div 
      className="enhanced-node-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="node-circle"
        style={{ 
          background: nodeColor(),
          width: FlowStyles.nodeSize,
          height: FlowStyles.nodeSize 
        }}
      />
      
      {isHovered && (
        <div className="node-tooltip">
          <h4>{data.label}</h4>
          <div>Procesos: {data.count?.toLocaleString()}</div>
          {data.avgProcessTime && (
            <div>Tiempo: {convertFromSeconds(data.avgProcessTime)}</div>
          )}
          {data.bottleneck && <div className="bottleneck-warning">¡Cuello de botella!</div>}
        </div>
      )}
      
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

