"use client";

import { useState, useEffect } from "react";
import { useAdminUpdateMember } from "@/lib/hooks/admin.hook";
import { useGetRoles, useGetSkills } from "@/lib/hooks/staff.hook";

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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";

interface Social {
  platform: string;
  url: string;
}

interface MemberData {
  id: string;
  full_name: string;
  email?: string;
  bio: string;
  avatar?: string;
  role?: { id: string; name: string };
  socials: Social[];
  skills?: { id: string; name: string }[];
  active_status: string;
}

interface UpdateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberData;
}

export function UpdateStaffModal({
  isOpen,
  onClose,
  member,
}: UpdateStaffModalProps) {
  const { mutate: updateMember, isPending } = useAdminUpdateMember(member.id);
  const { data: availableRoles } = useGetRoles();
  const { data: availableSkills } = useGetSkills();

  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    role_id: "",
    socials: [] as Social[],
    skill_ids: [] as string[], // Array of skill IDs
  });

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && member) {
      setFormData({
        full_name: member.full_name || "",
        bio: member.bio || "",
        role_id: member.role?.id || "",
        socials: member.socials || [],
        skill_ids: member.skills?.map((s) => s.id) || [],
      });
    }
  }, [isOpen, member]);

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

  const toggleSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      skill_ids: prev.skill_ids.includes(skillId)
        ? prev.skill_ids.filter((id) => id !== skillId)
        : [...prev.skill_ids, skillId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty socials
    const filteredSocials = formData.socials.filter(
      (s) => s.platform.trim() && s.url.trim(),
    );

    // Format data according to expected API structure
    // { role: "uuid", skills: ["uuid1", "uuid2"] }
    const payload: any = {};

    // Only include role if selected
    if (formData.role_id) {
      payload.role = formData.role_id;
    }

    // Include skills array of IDs
    if (formData.skill_ids.length > 0) {
      payload.skills = formData.skill_ids;
    }

    // Include socials if any
    if (filteredSocials.length > 0) {
      payload.socials = filteredSocials;
    }

    updateMember(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Staff Information
          </DialogTitle>
          <DialogDescription>
            Make changes to {member.full_name}'s profile. Click save when done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          {/* Role Selection */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role_id}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role_id: value }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles?.map((role: any) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a brief biography..."
              rows={4}
              className="mt-1 resize-none"
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label>Skills & Expertise</Label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30 min-h-[60px]">
              {availableSkills?.length > 0 ? (
                availableSkills.map((skill: any) => (
                  <Badge
                    key={skill.id}
                    variant={
                      formData.skill_ids.includes(skill.id)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => toggleSkill(skill.id)}
                  >
                    {skill.name}
                    {formData.skill_ids.includes(skill.id) && (
                      <X className="ml-1 size-3" />
                    )}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No skills available
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to toggle skills on/off
            </p>
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
                No social links added yet.
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
