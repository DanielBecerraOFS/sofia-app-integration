import { FlowStyles } from "./types";
import { CustomEdgeProps } from "./types";

export const CustomLoopEdge: React.FC<CustomEdgeProps> = ({
  sourceX,
  sourceY,
  data,
  markerEnd,
}) => {
  const path = `
    M ${sourceX} ${sourceY + 10} 
    A ${FlowStyles.loopRadius} ${FlowStyles.loopRadius} 0 1 1 ${sourceX + 0.2} ${sourceY - 10}
  `;
  
  // Formatear el label para eliminar saltos de línea
  const formattedLabel = data?.label ? data.label.replace(/\r\n/g, ' ') : '';

  // Definir el punto de anclaje para el label
  const anchorX = (sourceX - 40) - FlowStyles.loopRadius / 2;

  return (
    <>
      <path
        d={path}
        transform={`translate(-${20}, 0)`}
        style={{ stroke: "#555", strokeWidth: 1.5, fill: "none" }}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <foreignObject
          x={anchorX}
          y={sourceY - FlowStyles.loopRadius - 10}
          height="20" // Aumentar altura para asegurar que todo el texto sea visible
          overflow="visible"
        >
          <div
            style={{
              transform: 'translateX(-100%)', // Hace que el extremo derecho del label se fije en anchorX y crezca a la izquierda
              fontSize: "11px",
              background: "#fff",
              width: "fit-content",
              borderRadius: "3px",
              padding: "2px 4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textAlign: "center"
            }}
          >
            {formattedLabel}
          </div>
        </foreignObject>
      )}
    </>
  );
};
