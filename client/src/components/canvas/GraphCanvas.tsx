import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ForceSimulation } from './ForceSimulation';
import { NodeRenderer } from './NodeRenderer';
import { EdgeRenderer } from './EdgeRenderer';
import { useGraphStore } from '../../store/graphSlice';
import { useWebSocket } from '../../hooks/useWebSocket';
import { GraphEvent } from '../../types/events';

export default function GraphCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<ForceSimulation | null>(null);
  const { nodes, edges, addNode, addEdge, setSelectedNode, setSelectedEdge } = useGraphStore();
  const { events } = useWebSocket();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = svg.append('g');

    // Zoom & Pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    simulationRef.current = new ForceSimulation();

    const updateSimulation = () => {
      if (simulationRef.current) {
        simulationRef.current.update(nodes, edges);
      }
    };

    updateSimulation();

    return () => {
      simulationRef.current?.stop();
    };
  }, [nodes, edges]);

  // Handle live WebSocket events
  useEffect(() => {
    events.forEach(event => {
      if (event.type === 'NodeAdded') {
        addNode({
          id: event.node_id,
          label: event.label,
          properties: event.properties,
        });
      } else if (event.type === 'EdgeAdded') {
        addEdge({
          id: event.edge_id,
          source: event.source_id,
          target: event.target_id,
          label: event.label,
          properties: event.properties,
        });
      }
    });
  }, [events]);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#0f172a' }}>
      <svg ref={svgRef} width="100%" height="100%" style={{ background: '#0f172a' }}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>
        <g>
          {edges.map(edge => (
            <EdgeRenderer key={edge.id} edge={edge} isSelected={false} />
          ))}
          {nodes.map(node => (
            <NodeRenderer 
              key={node.id} 
              node={node} 
              isSelected={false} 
              onClick={() => setSelectedNode(node.id)} 
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
