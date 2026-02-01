"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Check,
  Settings,
  Palette,
} from "lucide-react";

export default function StaffSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
      description: "A clean, bright appearance",
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
      description: "Easy on the eyes in low light",
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
      description: "Match your device setting",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="size-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your preferences and account settings.
        </p>
      </div>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the app looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Theme</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mounted &&
                themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = theme === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="size-3 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-full ${
                          isSelected ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`size-6 ${
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="text-center">
                        <p
                          className={`font-medium ${
                            isSelected ? "text-primary" : ""
                          }`}
                        >
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}

              {!mounted && (
                <>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 rounded-xl border-2 border-border bg-muted/30 animate-pulse"
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="text-base">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications in the app
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-base">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
