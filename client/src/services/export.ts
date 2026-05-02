export const exportGraph = (nodes: any[], edges: any[]) => {
  const data = { nodes, edges, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graphmind-export.json';
  a.click();
  URL.revokeObjectURL(url);
};
