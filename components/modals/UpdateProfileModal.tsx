"use client";

import { useState, useEffect } from "react";
import { useUpdateProfile } from "@/lib/hooks/account.hook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera, Plus, X } from "lucide-react";

interface Social {
  platform: string;
  url: string;
}

interface ProfileData {
  full_name: string;
  email: string;
  bio: string;
  avatar?: string;
  role: {
    name: string;
  };
  socials: Social[];
  skills?: { id: string; name: string }[];
}

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export function UpdateProfileModal({
  isOpen,
  onClose,
  profile,
}: UpdateProfileModalProps) {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    avatar: "",
    socials: [] as Social[],
  });

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && profile) {
      setFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        avatar: profile.avatar || "",
        socials: profile.socials || [],
      });
    }
  }, [isOpen, profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    setFormData((prev) => {
      const newSocials = [...prev.socials];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return { ...prev, socials: newSocials };
    });
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty socials
    const filteredSocials = formData.socials.filter(
      (s) => s.platform.trim() && s.url.trim(),
    );

    updateProfile(
      { ...formData, socials: filteredSocials },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update profile");
        },
      },
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Changes will be visible to others.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="size-24 ring-2 ring-primary/20">
                <AvatarImage src={formData.avatar} alt={formData.full_name} />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                  {getInitials(formData.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="size-6 text-white" />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="avatar" className="text-sm text-muted-foreground">
                Avatar URL
              </Label>
              <Input
                id="avatar"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
                className="mt-1"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="mt-1 resize-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Social Links</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSocial}
                className="h-8 px-2 text-xs"
              >
                <Plus className="size-4 mr-1" />
                Add Social
              </Button>
            </div>

            {formData.socials.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
                No social links added yet. Click "Add Social" to add one.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.socials.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <select
                        value={social.platform}
                        onChange={(e) =>
                          handleSocialChange(index, "platform", e.target.value)
                        }
                        className="h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select platform</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="github">GitHub</option>
                        <option value="website">Website</option>
                      </select>
                      <Input
                        value={social.url}
                        onChange={(e) =>
                          handleSocialChange(index, "url", e.target.value)
                        }
                        placeholder="URL"
                        type="url"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocial(index)}
                      className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
