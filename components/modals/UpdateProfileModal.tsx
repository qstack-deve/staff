"use client";

import { useState, useEffect, useRef } from "react";
import { useUpdateProfile, useUploadAvatar } from "@/lib/hooks/account.hook";
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
import { Loader2, Camera, Plus, X, Upload } from "lucide-react";

interface Social {
  platform: string;
  url: string;
}

interface ProfileData {
  full_name: string;
  first_name?: string;
  last_name?: string;
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
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    socials: [] as Social[],
  });

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined,
  );

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && profile) {
      // Try to split full_name if first_name/last_name are not available
      const nameParts = profile.full_name?.split(" ") || [];
      setFormData({
        first_name: profile.first_name || nameParts[0] || "",
        last_name: profile.last_name || nameParts.slice(1).join(" ") || "",
        bio: profile.bio || "",
        socials: profile.socials || [],
      });
      setAvatarPreview(profile.avatar);
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the file
    uploadAvatar(file);
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

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "??";
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

        {/* Avatar Section - Separate from form */}
        <div className="flex flex-col items-center gap-3 pb-4 border-b">
          <div className="relative group">
            <Avatar className="size-24 ring-2 ring-primary/20">
              <AvatarImage
                src={avatarPreview}
                alt={`${formData.first_name} ${formData.last_name}`}
              />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                {getInitials(formData.first_name, formData.last_name)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="size-6 text-white animate-spin" />
              ) : (
                <Camera className="size-6 text-white" />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="text-xs"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-1 size-3 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-1 size-3" />
                Change Photo
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Max 5MB. JPG, PNG, or GIF
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  className="mt-1"
                />
              </div>
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
