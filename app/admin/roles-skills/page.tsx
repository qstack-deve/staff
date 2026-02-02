"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Briefcase,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  useGetRoles,
  useGetSkills,
  useAddRole,
  useUpdateRole,
  useDeleteRole,
  useAddSkills,
  useUpdateSkill,
  useDeleteSkill,
} from "@/lib/hooks/staff.hook";
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

interface ItemType {
  id: string;
  name: string;
}

interface RoleType extends ItemType {
  level: number;
  assigned?: number;
}

interface ItemRowProps {
  item: ItemType;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

interface RoleRowProps {
  role: RoleType;
  onUpdate: (id: string, name: string, level: number) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

function RoleRow({
  role,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: RoleRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(role.name);
  const [editLevel, setEditLevel] = useState(role.level);

  const handleSave = () => {
    if (
      editValue.trim() &&
      (editValue !== role.name || editLevel !== role.level)
    ) {
      onUpdate(role.id, editValue.trim(), editLevel);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(role.name);
    setEditLevel(role.level);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border bg-card hover:bg-muted/50 transition-colors p-3">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-8 flex-1"
            placeholder="Role name"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <Input
            type="number"
            value={editLevel}
            onChange={(e) => setEditLevel(Number(e.target.value))}
            className="h-8 w-20"
            placeholder="Level"
            min={1}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            disabled={isUpdating}
            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="font-medium">{role.name}</span>
            <Badge variant="outline" className="text-xs">
              Lvl {role.level}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {role.assigned ?? 0} assigned
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete "{role.name}"?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove
                    this role.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(role.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}

function ItemRow({
  item,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: ItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);

  const handleSave = () => {
    if (editValue.trim() && editValue !== item.name) {
      onUpdate(item.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(item.name);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border bg-card hover:bg-muted/50 transition-colors p-3">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-8"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            disabled={isUpdating}
            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className="font-medium">{item.name}</span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete "{item.name}"?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove
                    this item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(item.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}

interface AddItemFormProps {
  onAdd: (name: string) => void;
  isAdding: boolean;
  placeholder: string;
}

function AddItemForm({ onAdd, isAdding, placeholder }: AddItemFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" disabled={isAdding || !value.trim()}>
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Plus className="h-4 w-4 mr-2" />
        )}
        Add
      </Button>
    </form>
  );
}

interface AddRoleFormProps {
  onAdd: (name: string, level: number) => void;
  isAdding: boolean;
}

function AddRoleForm({ onAdd, isAdding }: AddRoleFormProps) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), level);
      setName("");
      setLevel(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter role name..."
        className="flex-1"
      />
      <Input
        type="number"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        placeholder="Level"
        className="w-20"
        min={1}
      />
      <Button type="submit" disabled={isAdding || !name.trim()}>
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Plus className="h-4 w-4 mr-2" />
        )}
        Add
      </Button>
    </form>
  );
}

export default function RolesSkillsPage() {
  // Roles hooks
  const { data: roles, isLoading: rolesLoading } = useGetRoles();
  const { mutate: addRole, isPending: isAddingRole } = useAddRole();
  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateRole();
  const { mutate: deleteRole, isPending: isDeletingRole } = useDeleteRole();

  // Skills hooks
  const { data: skills, isLoading: skillsLoading } = useGetSkills();
  const { mutate: addSkill, isPending: isAddingSkill } = useAddSkills();
  const { mutate: updateSkill, isPending: isUpdatingSkill } = useUpdateSkill();
  const { mutate: deleteSkill, isPending: isDeletingSkill } = useDeleteSkill();

  const handleAddRole = (name: string, level: number) => {
    addRole({ name, level });
  };

  const handleUpdateRole = (id: string, name: string, level: number) => {
    updateRole({ id, data: { name, level } });
  };

  const handleDeleteRole = (id: string) => {
    deleteRole(id);
  };

  const handleAddSkill = (name: string) => {
    addSkill({ name });
  };

  const handleUpdateSkill = (id: string, name: string) => {
    updateSkill({ id, data: { name } });
  };

  const handleDeleteSkill = (id: string) => {
    deleteSkill(id);
  };

  console.log(roles);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles & Skills</h1>
        <p className="text-muted-foreground mt-2">
          Manage roles and skills that can be assigned to staff members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Roles</CardTitle>
                <CardDescription>
                  Define job titles and positions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddRoleForm onAdd={handleAddRole} isAdding={isAddingRole} />

            <div className="space-y-2">
              {rolesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : roles?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No roles yet. Add your first role above.
                </div>
              ) : (
                roles?.map((role: RoleType) => (
                  <RoleRow
                    key={role.id}
                    role={role}
                    onUpdate={handleUpdateRole}
                    onDelete={handleDeleteRole}
                    isUpdating={isUpdatingRole}
                    isDeleting={isDeletingRole}
                  />
                ))
              )}
            </div>

            {roles?.length > 0 && (
              <div className="pt-2 border-t">
                <Badge variant="secondary" className="text-xs">
                  {roles.length} role{roles.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Sparkles className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Define competencies and expertise areas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddItemForm
              onAdd={handleAddSkill}
              isAdding={isAddingSkill}
              placeholder="Enter skill name..."
            />

            <div className="space-y-2">
              {skillsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : skills?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No skills yet. Add your first skill above.
                </div>
              ) : (
                skills?.map((skill: ItemType) => (
                  <ItemRow
                    key={skill.id}
                    item={skill}
                    onUpdate={handleUpdateSkill}
                    onDelete={handleDeleteSkill}
                    isUpdating={isUpdatingSkill}
                    isDeleting={isDeletingSkill}
                  />
                ))
              )}
            </div>

            {skills?.length > 0 && (
              <div className="pt-2 border-t">
                <Badge variant="secondary" className="text-xs">
                  {skills.length} skill{skills.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
