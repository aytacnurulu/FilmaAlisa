"use client";

interface AdminTableProps {
  columns: string[];
  isLoading?: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export default function AdminTable({
  columns,
  isLoading,
  isEmpty,
  children,
}: AdminTableProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left text-xs font-medium text-[#9a9a9a] uppercase tracking-wider px-4 py-3"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[#2a2a2a]">
                {Array.from({ length: 4 }).map((__, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-[#222222] rounded animate-pulse w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : isEmpty ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="py-16 text-center text-sm text-[#9a9a9a]">
                  No data found.
                </div>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
