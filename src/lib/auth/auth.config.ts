import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AccountStatus, UserRole } from "@/types/user";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: (credentials.email as string).toLowerCase().trim(),
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            throw new Error(data.message || "Invalid email or password");
          }

          const user = data.user;

          return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            accountStatus: user.accountStatus,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture || user.profileImage || "",
            profileImage: user.profilePicture || user.profileImage || "",
            token: data.token,
          };
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "Failed to authenticate with backend server";
          throw new Error(message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.role = user.role as UserRole;
        token.accountStatus = user.accountStatus as AccountStatus;
        token.phoneNumber = user.phoneNumber;
        token.profilePicture = user.profilePicture || user.profileImage;
        token.profileImage = user.profilePicture || user.profileImage;
        if (user.token) {
          token.backendToken = user.token;
        }
      }
      if (trigger === "update" && session?.user) {
        if (session.user.fullName) token.fullName = session.user.fullName;
        if (session.user.profilePicture !== undefined) {
          token.profilePicture = session.user.profilePicture;
          token.profileImage = session.user.profilePicture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.accountStatus = token.accountStatus as AccountStatus;
        session.user.phoneNumber = token.phoneNumber as string | undefined;
        session.user.profilePicture = token.profilePicture as string | undefined;
        session.user.profileImage = token.profilePicture as string | undefined;
        if (token.backendToken) {
          session.backendToken = token.backendToken as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const authOptions = authConfig;
