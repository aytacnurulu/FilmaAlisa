"use client";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
      <div className="text-[#7c3aed] mb-4">{icon}</div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-[#9a9a9a] mt-1">{label}</p>
    </div>
  );
}
