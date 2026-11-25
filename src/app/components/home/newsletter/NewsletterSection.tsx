"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/common/MotionReveal";
import { NewsletterData } from "@/types/footer";
import { defaultNewsletterData } from "@/data/homepage/footer";

interface NewsletterSectionProps {
  data?: NewsletterData;
  onSubscribe?: (email: string) => Promise<{ success: boolean; message: string }>;
}

export default function NewsletterSection({
  data = defaultNewsletterData,
  onSubscribe,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      setFeedbackMessage("Please enter an email address.");
      return;
    }

    if (!validateEmail(trimmed)) {
      setStatus("error");
      setFeedbackMessage("Please provide a valid email address.");
      return;
    }

    setStatus("loading");
    setFeedbackMessage("");

    try {
      if (onSubscribe) {
        const result = await onSubscribe(trimmed);
        if (result.success) {
          setStatus("success");
          setFeedbackMessage(result.message || "Thank you for subscribing!");
          setEmail("");
        } else {
          setStatus("error");
          setFeedbackMessage(result.message || "Failed to subscribe. Please try again.");
        }
      } else {
        // API-ready fallback simulation
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus("success");
        setFeedbackMessage(
          `Thank you for subscribing! Updates will be sent to ${trimmed}.`
        );
        setEmail("");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-background border-t border-border overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-12 shadow-lg text-center space-y-6">
          {/* Eyebrow & Header */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
              <Mail className="h-3.5 w-3.5" />
              {data.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {data.heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={data.placeholderText}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all disabled:opacity-60"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0 gap-2 shadow-xs"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>{data.buttonText}</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>

            {/* Validation Feedback */}
            {status === "success" && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground pt-1">
              {data.disclaimer}
            </p>
          </form>
        </MotionReveal>
      </div>
    </section>
  );
}
