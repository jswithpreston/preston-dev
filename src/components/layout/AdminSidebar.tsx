"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  GitBranch,
  BarChart3,
  Settings,
  Brain,
  MessageSquare,
  Mail,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/decisions", label: "Decisions", icon: GitBranch },
  { href: "/admin/metrics", label: "Metrics", icon: BarChart3 },
  { href: "/admin/system", label: "System", icon: Settings },
  { href: "/admin/knowledge", label: "Knowledge", icon: Brain },
  { href: "/admin/chat-logs", label: "Chat Logs", icon: MessageSquare },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-4 py-4">
        <Link href="/" className="font-serif text-sm font-semibold tracking-tight">
          Preston Munu
        </Link>
        <p className="text-xs text-muted-foreground">Admin</p>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
