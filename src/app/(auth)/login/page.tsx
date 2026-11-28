"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Landmark, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";
import { showSuccess, showError } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Redirection helper based on verified user role
  const getDashboardPath = (role?: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "/dashboard/admin";
      case UserRole.STAFF:
        return "/dashboard/staff";
      case UserRole.CUSTOMER:
      default:
        return "/dashboard/customer";
    }
  };

  // If already authenticated, redirect to appropriate role dashboard
  React.useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      router.replace(getDashboardPath(session.user.role as UserRole));
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
      });

      if (res?.error) {
        setError(res.error);
        showError(res.error);
        setLoading(false);
        return;
      }

      showSuccess("Signed in successfully!");

      // Fetch verified user from /api/v1/auth/me to guarantee accurate role redirection
      const meRes = await fetch("/api/v1/auth/me");
      if (meRes.ok) {
        const meData = await meRes.json();
        if (meData.user?.role) {
          router.push(getDashboardPath(meData.user.role as UserRole));
          router.refresh();
          return;
        }
      }

      // Fallback
      router.push("/dashboard/customer");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      showError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-6 bg-card border border-border p-8 rounded-2xl shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm mb-1">
            <Landmark className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sign In to Wishes Bank
          </h1>
          <p className="text-sm text-muted-foreground">
            Access your secure digital banking account
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-3.5 pr-10 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
