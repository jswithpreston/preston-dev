"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ChatSession {
  id: string;
  sessionKey: string;
  createdAt: string;
  updatedAt: string;
  _count: { messages: number };
}

interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

interface SessionDetail {
  id: string;
  messages: ChatMessage[];
}

export default function AdminChatLogsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [detail, setDetail] = useState<SessionDetail | null>(null);

  useEffect(() => {
    fetch("/api/chat-logs")
      .then((r) => r.json())
      .then(setSessions)
      .finally(() => setLoading(false));
  }, []);

  async function toggleExpand(id: string) {
    if (expanded === id) {
      setExpanded(null);
      setDetail(null);
      return;
    }

    const res = await fetch(`/api/chat-logs/${id}`);
    const data = await res.json();
    setDetail(data);
    setExpanded(id);
  }

  async function deleteSession(id: string) {
    if (!confirm("Delete this chat session?")) return;
    await fetch(`/api/chat-logs/${id}`, { method: "DELETE" });
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (expanded === id) {
      setExpanded(null);
      setDetail(null);
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">Chat Logs</h1>
      {sessions.length === 0 ? (
        <p className="text-muted-foreground">No chat sessions yet.</p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="rounded-lg border border-border">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => toggleExpand(session.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  {expanded === session.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <div>
                    <code className="text-xs text-muted-foreground">
                      {session.sessionKey.slice(0, 24)}...
                    </code>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="secondary">{session._count.messages} messages</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(session.updatedAt)}
                      </span>
                    </div>
                  </div>
                </button>
                <Button variant="ghost" size="icon" onClick={() => deleteSession(session.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              {expanded === session.id && detail && (
                <div className="border-t border-border p-4">
                  <div className="space-y-3">
                    {detail.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-md p-3 text-sm ${
                          msg.role === "USER"
                            ? "ml-8 bg-primary/10"
                            : "mr-8 bg-muted"
                        }`}
                      >
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          {msg.role === "USER" ? "User" : "Assistant"}
                        </p>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
