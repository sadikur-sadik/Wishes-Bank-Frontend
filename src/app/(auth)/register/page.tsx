"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Landmark,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  ArrowRight,
  User,
  Briefcase,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = React.useState<UserRole.CUSTOMER | UserRole.STAFF>(
    UserRole.CUSTOMER
  );
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isPendingStaffScreen, setIsPendingStaffScreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          confirmPassword,
          phoneNumber: phoneNumber.trim(),
          profilePicture: profilePicture.trim(),
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to register. Please try again.");
        setLoading(false);
        return;
      }

      if (data.isPendingApproval || role === UserRole.STAFF) {
        setIsPendingStaffScreen(true);
        setLoading(false);
        return;
      }

      setSuccess("Account registered successfully! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("An unexpected error occurred during registration. Please try again.");
      setLoading(false);
    }
  };

  // Dedicated Pending Approval Confirmation View for Staff Applicants
  if (isPendingStaffScreen) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-lg space-y-6 bg-card border border-border p-8 rounded-2xl shadow-xl text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm mx-auto">
            <Clock className="h-8 w-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              Staff Registration Submitted
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Awaiting Administrator Approval
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for applying to join the Wishes Bank operations team. Your staff account request has been registered and is currently under administrative review.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-muted border border-border text-left space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <AlertCircle className="h-4 w-4 text-primary shrink-0" />
              <span>What happens next?</span>
            </div>
            <p>
              An authorized Wishes Bank Administrator must review and activate your staff permissions before you can access the staff portal and dashboard.
            </p>
            <p>
              Once approved, you will be able to sign in using your email (<span className="font-medium text-foreground">{email}</span>) and password.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              <Link href="/login">Return to Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/home">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-6 bg-card border border-border p-8 rounded-2xl shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm mb-1">
            <Landmark className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start banking with Wishes Bank LTD today
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole(UserRole.CUSTOMER)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  role === UserRole.CUSTOMER
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card hover:bg-muted text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <User className={`h-4 w-4 ${role === UserRole.CUSTOMER ? "text-primary" : ""}`} />
                  <span
                    className={`h-3 w-3 rounded-full border ${
                      role === UserRole.CUSTOMER
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold text-foreground">Customer</div>
                <p className="text-[11px] leading-tight text-muted-foreground">
                  Personal banking, transfers, and loans.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole(UserRole.STAFF)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                  role === UserRole.STAFF
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card hover:bg-muted text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Briefcase className={`h-4 w-4 ${role === UserRole.STAFF ? "text-primary" : ""}`} />
                  <span
                    className={`h-3 w-3 rounded-full border ${
                      role === UserRole.STAFF
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    }`}
                  />
                </div>
                <div className="text-sm font-semibold text-foreground">Staff Member</div>
                <p className="text-[11px] leading-tight text-muted-foreground">
                  Bank officer. Requires admin approval.
                </p>
              </button>
            </div>

            {role === UserRole.STAFF && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Staff accounts require administrative verification. You will not have dashboard access until an administrator approves your account.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

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
            <label className="text-xs font-semibold text-foreground">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Profile Picture URL (Optional)
            </label>
            <input
              type="url"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="https://images.example.com/avatar.jpg"
              className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Password
            </label>
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {role === UserRole.STAFF ? "Submitting Application..." : "Creating Account..."}
              </>
            ) : (
              <>
                {role === UserRole.STAFF ? "Submit Staff Request" : "Register as Customer"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
