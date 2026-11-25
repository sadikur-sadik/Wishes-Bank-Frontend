"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Landmark,
  LogOut,
  Loader2,
  ShieldAlert,
  Camera,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountStatus } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserProfilePicture } from "@/store/slices/authSlice";
import { useUpdateProfileMutation } from "@/store/api/authApi";

function DashboardNavbar() {
  const { data: session, update: updateSession } = useSession();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.auth.user);
  const [updateProfileApi] = useUpdateProfileMutation();

  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newUrl, setNewUrl] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  // Sync profile picture priorities: Redux state -> Session user
  const profilePicture =
    reduxUser?.profilePicture || session?.user?.profilePicture || "";
  const fullName = reduxUser?.fullName || session?.user?.fullName || "Banking User";
  const email = reduxUser?.email || session?.user?.email || "";

  const isImageValid = Boolean(profilePicture && !failedImages[profilePicture]);

  // Compute initials fallback (e.g. "John Doe" -> "JD", "Admin" -> "A")
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
      await updateProfileApi({ profilePicture: newUrl.trim() }).unwrap();
      dispatch(updateUserProfilePicture(newUrl.trim()));
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          profilePicture: newUrl.trim(),
        },
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update profile picture:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-colors shadow-xs">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* ── Left Side: Wishes Bank Logo & Digital Portal ── */}
          <Link
            href="/home"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 pr-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground leading-none">
                Wishes Bank
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-primary leading-tight mt-0.5">
                Digital Portal
              </span>
            </div>
          </Link>

          {/* ── Right Side: Profile Picture | Full Name | Email | Sign Out ── */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              {/* User details (hidden on very small screens) */}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-foreground tracking-tight leading-tight">
                  {fullName}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground leading-tight">
                  {email}
                </span>
              </div>

              {/* Profile Image Avatar (Clickable to change URL) */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => {
                    setNewUrl(profilePicture);
                    setIsModalOpen(true);
                  }}
                  title="Click to update profile image URL"
                  className="relative h-10 w-10 rounded-full border-2 border-primary/30 hover:border-primary transition-all overflow-hidden bg-primary/10 flex items-center justify-center cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  {/* Hover indicator */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-full">
                    <Camera className="h-3.5 w-3.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="gap-2 text-xs font-semibold border-border hover:bg-muted text-foreground transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Edit Profile Picture URL Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card border border-border p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">
                Update Profile Picture
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
              Provide a direct image URL (PNG, JPG, or WebP). Your profile picture will be stored in your banking profile and updated in the navbar.
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
                  Save Picture
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return null;
  }

  // Handle blocked accounts
  if (session.user.accountStatus === AccountStatus.BLOCKED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-destructive/20 p-8 rounded-2xl text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-bold text-foreground">Account Suspended</h1>
          <p className="text-sm text-muted-foreground">
            Your account has been blocked by system administrators. Please contact support.
          </p>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="destructive"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Exactly ONE navbar on dashboard pages */}
      <DashboardNavbar />

      {/* Main Page Area */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
