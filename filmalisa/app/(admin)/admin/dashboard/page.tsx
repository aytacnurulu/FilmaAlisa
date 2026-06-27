"use client";

import { useState, useEffect } from "react";
import {
  Film,
  Users,
  MessageSquare,
  Mail,
  Tag,
  UserCircle,
  Heart,
} from "lucide-react";
import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import StatCard from "@/shared/components/ui-admin/StatCard";
import { useAdminDashboard } from "@/lib/admin/hooks/useAdminDashboard";
import { useAdminComments } from "@/lib/admin/hooks/useAdminComments";
import { useAdminContacts } from "@/lib/admin/hooks/useAdminContacts";
import { useAdminUsers } from "@/lib/admin/hooks/useAdminUsers";

const stats = [
  { key: "movies", label: "Movies", icon: <Film size={22} /> },
  { key: "categories", label: "Categories", icon: <Tag size={22} /> },
  { key: "actors", label: "Actors", icon: <UserCircle size={22} /> },
  { key: "users", label: "Users", icon: <Users size={22} /> },
  { key: "comments", label: "Comments", icon: <MessageSquare size={22} /> },
  { key: "contacts", label: "Contacts", icon: <Mail size={22} /> },
  { key: "favorites", label: "Favorites", icon: <Heart size={22} /> },
] as const;

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export default function DashboardPage() {
  const { data: dashStats, isLoading: statsLoading } = useAdminDashboard();
  const { data: comments, isLoading: commentsLoading } = useAdminComments();
  const { data: contacts, isLoading: contactsLoading } = useAdminContacts();
  const { data: users, isLoading: usersLoading } = useAdminUsers();

  const mounted = useMounted(50);

  const recentComments = comments?.slice(0, 5) ?? [];
  const recentContacts = contacts?.slice(0, 5) ?? [];
  const recentUsers = users?.slice(0, 5) ?? [];

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Dashboard" />

      <div className="p-6 space-y-8 overflow-y-auto">

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {stats.map(({ key, label, icon }, i) => (
            <div
              key={key}
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {statsLoading ? (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 animate-pulse">
                  <div className="w-6 h-6 bg-[#2a2a2a] rounded mb-4" />
                  <div className="h-8 w-12 bg-[#2a2a2a] rounded mb-2" />
                  <div className="h-3 w-20 bg-[#2a2a2a] rounded" />
                </div>
              ) : (
                <StatCard
                  label={label}
                  value={dashStats?.[key] ?? 0}
                  icon={icon}
                />
              )}
            </div>
          ))}
        </div>

        {/* Recent rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Users */}
          <Section
            title="Recent Users"
            delay={420}
            mounted={mounted}
            isLoading={usersLoading}
            isEmpty={!recentUsers.length}
          >
            {recentUsers.map((u, i) => (
              <Row
                key={u.id}
                delay={500 + i * 50}
                mounted={mounted}
                left={
                  <div className="flex items-center gap-3">
                    {u.img_url ? (
                      <img
                        src={u.img_url}
                        alt={u.full_name}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-[#f0f0f0] leading-tight">{u.full_name}</p>
                      <p className="text-xs text-[#9a9a9a]">{u.email}</p>
                    </div>
                  </div>
                }
                right={
                  <span className="text-xs text-[#9a9a9a] whitespace-nowrap">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                }
              />
            ))}
          </Section>

          {/* Recent Comments */}
          <Section
            title="Recent Comments"
            delay={480}
            mounted={mounted}
            isLoading={commentsLoading}
            isEmpty={!recentComments.length}
          >
            {recentComments.map((c, i) => (
              <Row
                key={c.id}
                delay={560 + i * 50}
                mounted={mounted}
                left={
                  <div>
                    <p className="text-sm text-[#f0f0f0] truncate max-w-[160px]">{c.comment}</p>
                    <p className="text-xs text-[#9a9a9a]">{c.user.full_name} · {c.movie.title}</p>
                  </div>
                }
                right={
                  <span className="text-xs text-[#9a9a9a] whitespace-nowrap">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                }
              />
            ))}
          </Section>

          {/* Recent Contacts */}
          <Section
            title="Recent Contacts"
            delay={540}
            mounted={mounted}
            isLoading={contactsLoading}
            isEmpty={!recentContacts.length}
          >
            {recentContacts.map((ct, i) => (
              <Row
                key={ct.id}
                delay={620 + i * 50}
                mounted={mounted}
                left={
                  <div>
                    <p className="text-sm text-[#f0f0f0]">{ct.full_name}</p>
                    <p className="text-xs text-[#9a9a9a] truncate max-w-[160px]">{ct.reason}</p>
                  </div>
                }
                right={
                  <span className="text-xs text-[#9a9a9a] whitespace-nowrap">
                    {new Date(ct.created_at).toLocaleDateString()}
                  </span>
                }
              />
            ))}
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ── helpers ── */

interface SectionProps {
  title: string;
  delay: number;
  mounted: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  children: React.ReactNode;
}

function Section({ title, delay, mounted, isLoading, isEmpty, children }: SectionProps) {
  return (
    <div
      style={{
        transitionDelay: `${delay}ms`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-[#2a2a2a]">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <div className="divide-y divide-[#2a2a2a]">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-[#2a2a2a] flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-[#2a2a2a] rounded w-3/4" />
                  <div className="h-2.5 bg-[#2a2a2a] rounded w-1/2" />
                </div>
              </div>
            ))
          : isEmpty
          ? (
            <p className="px-5 py-8 text-center text-sm text-[#9a9a9a]">No data yet.</p>
          )
          : children}
      </div>
    </div>
  );
}

interface RowProps {
  delay: number;
  mounted: boolean;
  left: React.ReactNode;
  right: React.ReactNode;
}

function Row({ delay, mounted, left, right }: RowProps) {
  return (
    <div
      style={{
        transitionDelay: `${delay}ms`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(-10px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
      className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-[#222222] transition-colors"
    >
      {left}
      {right}
    </div>
  );
}
