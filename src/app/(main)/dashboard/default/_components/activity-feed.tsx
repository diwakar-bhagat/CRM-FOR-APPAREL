"use client";

import { useRef } from "react";

import { formatDistanceToNow, subDays, subHours, subMinutes } from "date-fns";
import { motion, useInView } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const now = new Date();

const feedItems = [
  {
    id: "f1",
    actor: "Raj Mehta",
    action: "marked Sampling as complete",
    orderId: "ORD-2790",
    time: subMinutes(now, 12),
    color: "bg-emerald-500",
  },
  {
    id: "f2",
    actor: "Apex Fabrics",
    action: "uploaded lab dip report",
    orderId: "ORD-2923",
    time: subMinutes(now, 45),
    color: "bg-blue-500",
  },
  {
    id: "f3",
    actor: "System",
    action: "flagged delay — deadline exceeded",
    orderId: "ORD-2847",
    time: subHours(now, 2),
    color: "bg-red-500",
  },
  {
    id: "f4",
    actor: "Priya Shah",
    action: "approved tech pack revision",
    orderId: "ORD-2834",
    time: subHours(now, 5),
    color: "bg-violet-500",
  },
  {
    id: "f5",
    actor: "Green Thread Ltd",
    action: "updated production to 55%",
    orderId: "ORD-2923",
    time: subHours(now, 8),
    color: "bg-amber-500",
  },
  {
    id: "f6",
    actor: "Ankit Verma",
    action: "added QC inspection notes",
    orderId: "ORD-2958",
    time: subDays(now, 1),
    color: "bg-cyan-500",
  },
  {
    id: "f7",
    actor: "Fast Track Garments",
    action: "submitted revised sample",
    orderId: "ORD-2958",
    time: subDays(now, 1.5),
    color: "bg-pink-500",
  },
  {
    id: "f8",
    actor: "System",
    action: "auto-escalated to buyer team",
    orderId: "ORD-2766",
    time: subDays(now, 2),
    color: "bg-red-500",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
};

export function ActivityFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <Card className="h-full border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-medium text-base">Activity</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[340px]">
          <motion.div
            ref={ref}
            variants={staggerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="py-2"
          >
            {feedItems.map((item, i) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative flex gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-muted/50"
              >
                {/* Vertical connector */}
                {i < feedItems.length - 1 && (
                  <div className="absolute top-[38px] left-[30px] h-[calc(100%-14px)] w-px bg-border/50" />
                )}

                <Avatar className="size-7 shrink-0 font-medium text-[10px] text-white">
                  <AvatarFallback className={`${item.color} text-[10px] text-white`}>
                    {getInitials(item.actor)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{item.actor}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground" suppressHydrationWarning>
                      {formatDistanceToNow(item.time, { addSuffix: true })}
                    </span>
                    <span className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {item.orderId}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
