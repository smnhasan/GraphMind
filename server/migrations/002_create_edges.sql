CREATE TABLE IF NOT EXISTS edges (
    id SERIAL PRIMARY KEY,
    source_id VARCHAR(36) REFERENCES nodes(id) ON DELETE CASCADE,
    target_id VARCHAR(36) REFERENCES nodes(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    properties JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_id);
CREATE INDEX IF NOT EXISTS idx_edges_label ON edges(label);
