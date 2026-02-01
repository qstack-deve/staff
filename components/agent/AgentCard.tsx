'"use client";';

import React from "react";
import { MapPin, Phone, Mail, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AgentType } from "@/lib/types/user.types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { useToggleAgentStatus } from "@/lib/hooks/admin.hook";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AgentCardProps {
  agent: AgentType;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { mutate: toggleStatus, isPending } = useToggleAgentStatus();
  const router = useRouter();

  // Fallback for empty names
  const displayName = agent.full_name?.trim() || "Unnamed Agent";

  // Status logic
  const isActive = agent.active_status === "active";

  const handleToggleStatus = () => {
    toggleStatus(agent.id);
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={20} />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold leading-none truncate max-w-[150px]">
              {displayName}
            </h3>
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={isActive ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isActive ? "Active" : "Suspended"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5 text-sm md:text-base flex-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={15} />
          <span className="truncate">
            {agent.station_location || "No Station"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail size={15} />
          <span className="truncate">{agent.user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone size={15} />
          <span className="truncate">{agent.phone || "No phone"}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 gap-2 border-t bg-muted/10 p-4">
        <Button
          onClick={() => router.push(`/admin/agents/${agent.id}`)}
          variant="outline"
          className="flex-1"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
