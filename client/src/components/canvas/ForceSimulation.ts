import * as d3 from 'd3';
import { GraphNode, GraphEdge } from '../../types/graph';

export class ForceSimulation {
  private simulation: d3.Simulation<GraphNode, GraphEdge>;

  constructor() {
    this.simulation = d3.forceSimulation<GraphNode, GraphEdge>()
      .force('link', d3.forceLink<GraphNode, GraphEdge>().id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter())
      .force('collision', d3.forceCollide().radius(20));
  }

  update(nodes: GraphNode[], edges: GraphEdge[]) {
    this.simulation.nodes(nodes);
    (this.simulation.force('link') as d3.ForceLink<GraphNode, GraphEdge>).links(edges);
    this.simulation.alpha(1).restart();
  }

  onTick(callback: () => void) {
    this.simulation.on('tick', callback);
  }

  stop() {
    this.simulation.stop();
  }
}
