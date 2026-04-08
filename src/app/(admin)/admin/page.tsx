import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, GitBranch, Mail, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [projectCount, decisionCount, unreadMessages, chatSessions] =
    await Promise.all([
      prisma.project.count(),
      prisma.decision.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.chatSession.count(),
    ]);

  const stats = [
    { label: "Projects", value: projectCount, icon: FolderKanban },
    { label: "Decisions", value: decisionCount, icon: GitBranch },
    { label: "Unread Messages", value: unreadMessages, icon: Mail },
    { label: "Chat Sessions", value: chatSessions, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">
        Dashboard
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
