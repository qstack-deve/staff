"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  Calendar,
  UserMinus,
  UserCheck,
  Edit3,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Loader2,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useActivateMember,
  useAdminGetMember,
  useSuspendMember,
} from "@/lib/hooks/admin.hook";
import { UpdateStaffModal } from "@/components/modals/UpdateStaffModal";

export default function MemberDetailPage() {
  const params = useParams();
  const { staffId } = params as { staffId: string };
  const { data: member, isLoading } = useAdminGetMember(staffId);
  const { mutate: activateMember, isPending: isActivating } =
    useActivateMember(staffId);
  const { mutate: suspendMember, isPending: isSuspending } =
    useSuspendMember(staffId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Skeleton className="h-24 w-24 mx-auto rounded-full" />
                <Skeleton className="h-8 w-40 mx-auto mt-4" />
                <Skeleton className="h-4 w-24 mx-auto mt-2" />
              </CardHeader>
              <CardContent className="space-y-4 border-t pt-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Member not found
          </h2>
          <p className="text-muted-foreground mt-2">
            The staff member you're looking for doesn't exist.
          </p>
          <Link href="/admin/staff">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Staff Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isActive = member.active_status === "active";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/staff">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Staff Profile</h1>
            <p className="text-muted-foreground text-sm">
              Manage {member.full_name}'s information
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>

          {isActive ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                >
                  <UserMinus className="mr-2 h-4 w-4" />
                  Suspend
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Suspend Staff Member?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will suspend {member.full_name}'s account. They won't
                    be able to access the system until reactivated.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => suspendMember()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {isSuspending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Suspend
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Activate Staff Member?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reactivate {member.full_name}'s account. They will
                    regain access to the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => activateMember()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isActivating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Activate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto border-4 border-muted">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                  {getInitials(member.full_name || "")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl">
                {member.full_name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                {member.role?.name || "No Role Assigned"}
              </CardDescription>
              <div className="flex justify-center mt-2">
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className={
                    isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  }
                >
                  {member.active_status?.toUpperCase() || "UNKNOWN"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 border-t pt-6">
              {member.email && (
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 opacity-70" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">
                  Joined {new Date(member.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Social Links */}
              {member.socials?.length > 0 && (
                <div className="flex gap-3 justify-center pt-2">
                  {member.socials.map((s: any, idx: number) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-all"
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Bio & Skills */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {member.bio || "No biography available for this user."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {member.skills?.length > 0 ? (
                member.skills.map((skill: any) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="px-3 py-1.5 bg-primary/5 border-primary/20"
                  >
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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {member.skills?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Skills</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {member.socials?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Social Links</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2 md:col-span-1">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {Math.floor(
                      (Date.now() - new Date(member.created_at).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Update Staff Modal */}
      <UpdateStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={member}
      />
    </div>
  );
}
