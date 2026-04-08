"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read } : m))
    );
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border border-border p-4 ${!msg.read ? "bg-accent/30" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-sm text-muted-foreground hover:underline">
                      {msg.email}
                    </a>
                    {!msg.read && <Badge>New</Badge>}
                  </div>
                  <p className="mt-2 text-sm">{msg.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(msg.createdAt)}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRead(msg.id, !msg.read)}
                    title={msg.read ? "Mark unread" : "Mark read"}
                  >
                    {msg.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMessage(msg.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
