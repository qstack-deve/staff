"use client";

import { useGetProfile } from "@/lib/hooks/account.hook";
import { UpdateProfileModal } from "@/components/modals/UpdateProfileModal";
import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Twitter, Github, Mail, Globe, Edit3 } from "lucide-react";
import { notFound } from "next/navigation";

export default function StaffProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto w-11/12">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-12">
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              <Skeleton className="size-40 md:size-48 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-6 w-32" />
                <div className="flex gap-3 mt-6">
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="size-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return notFound();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl" />
      </div>

      <div className="">
        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-12">
          {/* Accent decorations */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-chart-2/10 rounded-full blur-3xl" />

          {/* Edit Button */}
          <div className="relative z-10 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Large Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-chart-1 to-chart-2 blur-lg opacity-60 scale-110" />
              <Avatar className="relative size-40 md:size-48 ring-4 ring-background shadow-2xl">
                <AvatarImage src={profile.avatar} alt={profile.full_name} />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                  {getInitials(profile.full_name || "")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                {profile.full_name}
              </h1>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                {profile.role.name}
              </span>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-3 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                  >
                    <Mail className="size-5" />
                  </a>
                )}
                {profile.socials?.map((social: any, idx: number) => {
                  let Icon = Globe;
                  let hoverClass = "hover:bg-primary/10 hover:text-primary";

                  switch (social.platform) {
                    case "linkedin":
                      Icon = Linkedin;
                      hoverClass = "hover:bg-[#0077B5] hover:text-white";
                      break;
                    case "twitter":
                      Icon = Twitter;
                      hoverClass = "hover:bg-[#1DA1F2] hover:text-white";
                      break;
                    case "github":
                      Icon = Github;
                      hoverClass = "hover:bg-[#333] hover:text-white";
                      break;
                  }

                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-background/80 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110 ${hoverClass}`}
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 xl:grid-cols-3">
          {/* Bio Section */}
          <div className="xl:col-span-2">
            <div className="rounded-2xl border bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {profile.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="xl:col-span-1">
            <div className="rounded-2xl border bg-card p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill: any) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-chart-2/10 text-foreground border border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No skills added yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
