import { useState } from 'react';
import { useQueryStore } from '../../store/querySlice';

export default function QueryEditor() {
  const [query, setQuery] = useState('MATCH (n:Person) RETURN n');
  const { addToHistory, setResults } = useQueryStore();

  const runQuery = async () => {
    addToHistory(query);
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div style={{ padding: 20 }}>
      <textarea 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        style={{ width: '100%', height: 100 }}
      />
      <button onClick={runQuery}>Run Query</button>
    </div>
  );
}
