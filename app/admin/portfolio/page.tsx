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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Pin,
  Loader2,
  FolderKanban,
  X,
  Upload,
  ImageIcon,
} from "lucide-react";
import {
  useGetPortfolios,
  useGetPortfolioCategories,
  useGetPortfolioTags,
  useCreatePortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
} from "@/lib/hooks/portfolio.hook";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PortfolioItem,
  PortfolioCategory,
  PortfolioTag,
} from "@/lib/types/portfolio.types";
import Header from "@/components/Header";
import Image from "next/image";

const statusColors: Record<string, string> = {
  development: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  live: "bg-green-500/10 text-green-600 border-green-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

interface PortfolioFormData {
  title: string;
  description: string;
  long_description: string;
  client: string;
  url: string;
  status: string;
  is_pinned: boolean;
  category_id: string;
  tag_ids: string[];
  image: File | null;
  existingImage: string | null;
}

const defaultFormData: PortfolioFormData = {
  title: "",
  description: "",
  long_description: "",
  client: "",
  url: "",
  status: "development",
  is_pinned: false,
  category_id: "",
  tag_ids: [],
  image: null,
  existingImage: null,
};

interface PortfolioFormProps {
  formData: PortfolioFormData;
  setFormData: React.Dispatch<React.SetStateAction<PortfolioFormData>>;
  categories: PortfolioCategory[];
  tags: PortfolioTag[];
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
}

function PortfolioForm({
  formData,
  setFormData,
  categories,
  tags,
  isLoading,
  onSubmit,
  onCancel,
  submitLabel,
}: PortfolioFormProps) {
  const toggleTag = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tag_ids: prev.tag_ids.includes(tagId)
        ? prev.tag_ids.filter((id) => id !== tagId)
        : [...prev.tag_ids, tagId],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Project title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Brief project description"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="long_description">Long Description</Label>
        <Textarea
          id="long_description"
          value={formData.long_description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              long_description: e.target.value,
            }))
          }
          placeholder="Detailed project description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Project Image</Label>
        <div className="flex items-start gap-4">
          {(formData.image || formData.existingImage) && (
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border bg-muted">
              <img
                src={
                  formData.image
                    ? URL.createObjectURL(formData.image)
                    : formData.existingImage || ""
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    image: null,
                    existingImage: null,
                  }))
                }
                className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <label className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-muted/50 transition-colors">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formData.image || formData.existingImage
                  ? "Change image"
                  : "Upload image"}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, image: file }));
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Input
            id="client"
            value={formData.client}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, client: e.target.value }))
            }
            placeholder="Client name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, url: e.target.value }))
            }
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={formData.category_id}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category_id: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={
                formData.tag_ids.includes(tag.id) ? "default" : "outline"
              }
              className="cursor-pointer transition-colors"
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_pinned"
          checked={formData.is_pinned}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, is_pinned: checked }))
          }
        />
        <Label htmlFor="is_pinned">Pin this project</Label>
      </div>

      <DialogFooter className="gap-2 sm:gap-0">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={
            isLoading ||
            !formData.title ||
            !formData.description ||
            !formData.category_id
          }
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

function PortfolioCard({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: {
  item: PortfolioItem;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
      {item.is_pinned && (
        <div className="absolute top-3 right-3 z-10">
          <Pin className="h-4 w-4 text-primary fill-primary" />
        </div>
      )}
      {item.image ? (
        <div className="relative w-full h-100 overflow-hidden">
          <Image
            width={200}
            height={200}
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-100 bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {item.description}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={statusColors[item.status] || statusColors.development}
          >
            {item.status}
          </Badge>
          <Badge variant="secondary">{item.category?.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags?.map((tag) => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>
        {item.client && (
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-medium">Client:</span> {item.client}
          </p>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View Project
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="h-8 w-8 p-0"
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
                  <AlertDialogTitle>Delete "{item.title}"?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove
                    this portfolio item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminPortfolioPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<PortfolioFormData>(defaultFormData);

  const { data: portfolios, isLoading: portfoliosLoading } = useGetPortfolios();
  const { data: categories = [] } = useGetPortfolioCategories();
  const { data: tags = [] } = useGetPortfolioTags();

  const { mutate: createPortfolio, isPending: isCreating } =
    useCreatePortfolio();
  const { mutate: updatePortfolio, isPending: isUpdating } =
    useUpdatePortfolio();
  const { mutate: deletePortfolio, isPending: isDeleting } =
    useDeletePortfolio();

  const handleCreate = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.long_description) {
      formDataToSend.append("long_description", formData.long_description);
    }
    if (formData.client) {
      formDataToSend.append("client", formData.client);
    }
    if (formData.url) {
      formDataToSend.append("url", formData.url);
    }
    formDataToSend.append("status", formData.status);
    formDataToSend.append("is_pinned", String(formData.is_pinned));
    if (formData.category_id) {
      formDataToSend.append("category", formData.category_id);
    }
    if (formData.tag_ids.length > 0) {
      formData.tag_ids.forEach((tagId) => {
        formDataToSend.append("tags", tagId);
      });
    }
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    createPortfolio(formDataToSend, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData(defaultFormData);
      },
    });
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      long_description: item.long_description || "",
      client: item.client || "",
      url: item.url || "",
      status: item.status,
      is_pinned: item.is_pinned,
      category_id: item.category?.id || "",
      tag_ids: item.tags?.map((t) => t.id) || [],
      image: null,
      existingImage: item.image,
    });
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.long_description) {
      formDataToSend.append("long_description", formData.long_description);
    }
    if (formData.client) {
      formDataToSend.append("client", formData.client);
    }
    if (formData.url) {
      formDataToSend.append("url", formData.url);
    }
    formDataToSend.append("status", formData.status);
    formDataToSend.append("is_pinned", String(formData.is_pinned));
    if (formData.category_id) {
      formDataToSend.append("category", formData.category_id);
    }
    if (formData.tag_ids.length > 0) {
      formData.tag_ids.forEach((tagId) => {
        formDataToSend.append("tags", tagId);
      });
    }
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    updatePortfolio(
      {
        id: editingItem.id,
        data: formDataToSend,
      },
      {
        onSuccess: () => {
          setEditingItem(null);
          setFormData(defaultFormData);
        },
      },
    );
  };

  const handleDelete = (id: string) => {
    deletePortfolio(id);
  };

  const closeCreateDialog = () => {
    setIsCreateOpen(false);
    setFormData(defaultFormData);
  };

  const closeEditDialog = () => {
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Header
        title="Portfolio"
        subtitle=""
        actions={
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to your portfolio.
                </DialogDescription>
              </DialogHeader>
              <PortfolioForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                tags={tags}
                isLoading={isCreating}
                onSubmit={handleCreate}
                onCancel={closeCreateDialog}
                submitLabel="Create Project"
              />
            </DialogContent>
          </Dialog>
        }
      />

      {/* Portfolio Grid */}
      {portfoliosLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !portfolios || portfolios.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FolderKanban className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No portfolio items yet</h3>
            <p className="text-muted-foreground mt-1">
              Get started by adding your first project.
            </p>
            <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-6">
          {portfolios.map((item: PortfolioItem) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editingItem}
        onOpenChange={(open) => !open && closeEditDialog()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details of this portfolio project.
            </DialogDescription>
          </DialogHeader>
          <PortfolioForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            tags={tags}
            isLoading={isUpdating}
            onSubmit={handleUpdate}
            onCancel={closeEditDialog}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
