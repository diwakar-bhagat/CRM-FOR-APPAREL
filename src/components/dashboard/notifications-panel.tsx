"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Bell, CheckCircle2, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Notification = {
  id: string;
  reffNo: string | null;
  styleName: string | null;
  message: string;
  isRead: boolean;
  type: string;
  createdAt: string;
};

const iconByType = {
  ACTION: AlertTriangle,
  RISK: AlertTriangle,
  SUCCESS: CheckCircle2,
  INFO: Clock,
} as const;

const dotByType = {
  ACTION: "bg-status-at-risk",
  RISK: "bg-status-delayed",
  SUCCESS: "bg-status-on-track",
  INFO: "bg-primary",
} as const;

export function NotificationsPanel() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications", "panel"],
    queryFn: async () => {
      const res = await fetch("/api/notifications?limit=12");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json() as Promise<{ data: { notifications: Notification[]; unreadCount: number } }>;
    },
    staleTime: 30_000,
  });

  const notifications = data?.data.notifications ?? [];
  const unreadCount = data?.data.unreadCount ?? 0;

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/notifications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="group relative">
          <Bell className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
          {unreadCount > 0 && (
            <span className="-top-1 -right-1 absolute flex min-w-5 items-center justify-center rounded-full bg-status-delayed px-1.5 py-0.5 font-semibold text-[10px] text-white tabular-nums">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full border-l-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="font-semibold text-xl tracking-tight">Notifications</SheetTitle>
        </SheetHeader>
        <Separator className="opacity-50" />
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="flex flex-col">
            {notifications.length === 0 && (
              <div className="p-6 text-center text-muted-foreground text-sm">No notifications</div>
            )}
            {notifications.map((notification) => {
              const type = notification.type as keyof typeof iconByType;
              const Icon = iconByType[type] ?? Clock;
              const dotColor = dotByType[type] ?? "bg-primary";
              return (
                <div
                  key={notification.id}
                  className="group relative flex cursor-pointer gap-4 border-white/5 border-b p-4 transition-colors hover:bg-surface-2/30"
                  onClick={() => !notification.isRead && markAsRead.mutate(notification.id)}
                >
                  {/* Status Dot + Icon */}
                  <div className="mt-0.5 flex shrink-0 flex-col items-center gap-2">
                    <span className={`size-1.5 rounded-full ${notification.isRead ? "bg-muted-foreground/30" : dotColor}`} />
                    <Icon className="size-4 text-muted-foreground/50" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm leading-none">
                        {notification.reffNo ?? "System"} {notification.styleName ? `- ${notification.styleName}` : ""}
                      </h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-snug">{notification.message}</p>
                    <span className="mt-1 font-medium text-[11px] text-muted-foreground" suppressHydrationWarning>
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                </div>
              );
            })}

            <div className="p-6 text-center">
              <Button variant="outline" className="w-full text-xs" size="sm">
                {unreadCount} unread
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
