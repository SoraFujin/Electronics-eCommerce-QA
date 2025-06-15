import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role ?? "user",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: User; account: any }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
    }): Promise<JWT> {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async redirect({
      url,
      baseUrl,
      token,
    }: {
      url: string;
      baseUrl: string;
      token?: JWT;
    }): Promise<string> {
      if (token?.role === "admin") {
        return `${baseUrl}/admin`;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
