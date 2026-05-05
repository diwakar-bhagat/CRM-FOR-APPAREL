"use client";

import { formatDistanceToNow, subHours, subMinutes } from "date-fns";
import { AlertTriangle, Bell, CheckCircle2, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const now = new Date();

const notifications = [
  {
    id: "n1",
    title: "Order Delay Cascade Risk",
    description: "Sampling delay on ORD-2847 pushing production start. Action required.",
    type: "alert",
    time: subMinutes(now, 15),
    icon: AlertTriangle,
    dotColor: "bg-status-delayed",
  },
  {
    id: "n2",
    title: "Sample Approved",
    description: "Zara UK approved the proto sample for Linen Overshirt.",
    type: "success",
    time: subHours(now, 2),
    icon: CheckCircle2,
    dotColor: "bg-status-on-track",
  },
  {
    id: "n3",
    title: "Vendor Inactive Warning",
    description: "Apex Fabrics hasn't updated production status in 48h.",
    type: "warning",
    time: subHours(now, 5),
    icon: Clock,
    dotColor: "bg-status-at-risk",
  },
];

export function NotificationsPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="group relative">
          <Bell className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
          <span className="absolute top-2 right-2 flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-delayed opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-status-delayed" />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full border-l-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-md">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="font-semibold text-xl tracking-tight">Notifications</SheetTitle>
        </SheetHeader>
        <Separator className="opacity-50" />
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="flex flex-col">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="group relative flex cursor-pointer gap-4 border-white/5 border-b p-4 transition-colors hover:bg-surface-2/30"
                >
                  {/* Status Dot + Icon */}
                  <div className="mt-0.5 flex shrink-0 flex-col items-center gap-2">
                    <span className={`size-1.5 rounded-full ${notification.dotColor}`} />
                    <Icon className="size-4 text-muted-foreground/50" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm leading-none">{notification.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-snug">{notification.description}</p>
                    <span className="mt-1 font-medium text-[11px] text-muted-foreground" suppressHydrationWarning>
                      {formatDistanceToNow(notification.time, { addSuffix: true })}
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
                Mark all as read
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
