export const Badge = ({ children, color = '#64748b' }: { children: React.ReactNode; color?: string }) => (
  <span style={{ background: color, color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 12 }}>{children}</span>
);
