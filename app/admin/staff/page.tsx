"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Github,
  Twitter,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useAdminGetMembers } from "@/lib/hooks/admin.hook";

// Updated to match your backend JSON
interface Social {
  platform: string;
  url: string;
}

interface Role {
  id: string;
  name: string;
}

interface MemberType {
  id: string;
  full_name: string;
  role: Role | null;
  socials: Social[];
  avatar: string | null;
  bio: string;
  active_status: "active" | "inactive" | "on_leave";
  slug: string;
}

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "github":
      return <Github className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

export default function StaffPage() {
  const { data: members } = useAdminGetMembers();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Directory</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members and their profiles.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {members?.map((member: MemberType) => (
          <Card key={member.id} className="overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={member.avatar ?? ""} alt={member.full_name} />
                <AvatarFallback>
                  {member.full_name.substring(0, 2).toUpperCase() || "NA"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg leading-none">
                  {member.full_name.trim() || "Unknown User"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {member.role?.name ?? "No Role Assigned"}
                </p>
                <Badge
                  className="w-fit mt-2"
                  variant={
                    member.active_status === "active" ? "default" : "secondary"
                  }
                >
                  {member.active_status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {member.bio || "No biography provided for this team member."}
              </p>

              <div className="flex gap-3 mt-4">
                {member.socials?.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            </CardContent>

            <CardFooter className="bg-muted/50 p-4">
              <Link href={`/admin/staff/${member.id}`} className="w-full">
                <Button variant="outline" className="w-full group">
                  View Profile
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
