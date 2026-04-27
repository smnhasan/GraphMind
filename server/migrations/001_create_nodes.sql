CREATE TABLE IF NOT EXISTS nodes (
    id VARCHAR(36) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    properties JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nodes_label ON nodes(label);
CREATE INDEX IF NOT EXISTS idx_nodes_properties_gin ON nodes USING GIN(properties);
