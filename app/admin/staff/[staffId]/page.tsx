"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  Calendar,
  Settings2,
  UserMinus,
  UserCheck,
  Edit3,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useActivateMember,
  useAdminGetMember,
  useSuspendMember,
} from "@/lib/hooks/admin.hook";
import { useGetRoles, useGetSkills } from "@/lib/hooks/staff.hook";
import { useState } from "react";

export default function MemberDetailPage() {
  const params = useParams();
  const { staffId } = params as { staffId: string };
  const { data: member, isLoading } = useAdminGetMember(staffId);
  const { mutate: activateMember, isPending: isActivating } =
    useActivateMember(staffId);
  const { mutate: suspendMember } = useSuspendMember(staffId);

  const { data: roles } = useGetRoles();
  const { data: skills } = useGetSkills();

  if (isLoading)
    return <div className="p-8 text-center">Loading profile...</div>;
  if (!member) return <div className="p-8 text-center">Member not found.</div>;

  const isActive = member.active_status === "active";
  console.log(member);

  // const [openAddRoleDialog, setOpenAddRoleDialog] = useState(false);
  // const [openAddSkillDialog, setOpenAddSkillDialog] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto border-4 border-muted">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-2xl">
                  {member.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl">
                {member.full_name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />{" "}
                {member.role?.name || "No Role"}
              </CardDescription>
              <div className="flex justify-center mt-2">
                <Badge variant={isActive ? "default" : "secondary"}>
                  {member.active_status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 border-t pt-6">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">
                  Joined {new Date(member.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-4 justify-center pt-2">
                {member.socials?.map((s: any) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {s.platform === "github" && <Github className="h-5 w-5" />}
                    {s.platform === "twitter" && (
                      <Twitter className="h-5 w-5" />
                    )}
                    {s.platform === "linkedin" && (
                      <Linkedin className="h-5 w-5" />
                    )}
                    {s.platform === "website" && <Globe className="h-5 w-5" />}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Bio & Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Biography</CardTitle>
              <Button>
                <Plus />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {member.bio || "No biography available for this user."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Skills & Expertise</CardTitle>
              <Button>
                <Plus />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {member.skills?.length > 0 ? (
                member.skills.map((skill: any) => (
                  <Badge key={skill.id} variant="outline" className="px-3 py-1">
                    {skill.name}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground italic">
                  No skills listed.
                </span>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function UpdateInfoModal({ member }: { member: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Update Staff Information</DialogTitle>
          <DialogDescription>
            Make changes to the profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={member.full_name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              defaultValue={member.role?.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              defaultValue={member.bio}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
