"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Bell,
  Menu,
  LogOut,
  Camera,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationBell } from "./NotificationBell";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserProfilePicture } from "@/store/slices/authSlice";
import { showSuccess, showError } from "@/lib/toast";

export interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  title?: string;
  breadcrumb?: string;
}

export const DashboardHeader = ({
  onMenuToggle,
  title = "Dashboard",
  breadcrumb = "Overview",
}: DashboardHeaderProps) => {
  const { data: session, update: updateSession } = useSession();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.auth.user);

  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newUrl, setNewUrl] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const profilePicture =
    reduxUser?.profilePicture || session?.user?.profilePicture || "";
  const fullName = reduxUser?.fullName || session?.user?.fullName || "Banking User";
  const email = reduxUser?.email || session?.user?.email || "";
  const role = reduxUser?.role || session?.user?.role || "CUSTOMER";

  const isImageValid = Boolean(profilePicture && !failedImages[profilePicture]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (name[0] || "U").toUpperCase();
  };

  const handleSaveProfilePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/v1/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilePicture: newUrl.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update profile picture");

      dispatch(updateUserProfilePicture(newUrl.trim()));
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          profilePicture: newUrl.trim(),
        },
      });
      showSuccess("Profile picture updated successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      showError(err?.message || "Failed to update profile picture.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-colors flex items-center justify-between px-4 sm:px-8">
        {/* Left: Mobile Menu Toggle & Title / Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
              <span>Wishes Bank</span>
              <span>/</span>
              <span className="text-foreground capitalize">{breadcrumb}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: Notifications, User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Bell */}
          <NotificationBell role={role} />

          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-foreground tracking-tight leading-tight">
                {fullName}
              </span>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {role}
                </span>
                <span className="text-muted-foreground text-[10px]">•</span>
                <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                  {email}
                </span>
              </div>
            </div>

            {/* Profile Avatar with Edit Modal trigger */}
            <button
              type="button"
              onClick={() => {
                setNewUrl(profilePicture);
                setIsModalOpen(true);
              }}
              title="Click to update profile image"
              className="relative h-9 w-9 rounded-full border border-primary/30 hover:border-primary transition-all overflow-hidden bg-primary/10 flex items-center justify-center cursor-pointer shadow-xs group"
            >
              {isImageValid ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profilePicture}
                  alt={fullName}
                  className="h-full w-full object-cover rounded-full"
                  onError={() =>
                    setFailedImages((prev) => ({
                      ...prev,
                      [profilePicture]: true,
                    }))
                  }
                />
              ) : (
                <span className="font-bold text-xs text-primary font-mono tracking-wider">
                  {getInitials(fullName)}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-full">
                <Camera className="h-3 w-3" />
              </div>
            </button>
          </div>

          {/* Sign Out Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="gap-2 text-xs font-semibold border-border hover:bg-muted text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Edit Profile Picture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card border border-border p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">
                Update Profile Avatar
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Provide a direct image URL (PNG, JPG, or WebP). Your avatar will be stored with your profile.
            </p>

            <form onSubmit={handleSaveProfilePicture} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.example.com/avatar.jpg"
                  className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {newUrl && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                  <div className="h-10 w-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    Previewing your avatar
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  Save Avatar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
