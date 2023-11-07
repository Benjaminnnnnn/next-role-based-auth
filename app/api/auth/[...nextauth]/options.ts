import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile Github:", profile);

        let userRole = "GitHub User";
        if (profile?.email === "benjaminnnnnnzhuang@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.id.toString(),
          role: userRole,
        };
      },

      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google:", profile);

        let userRole = "Google User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials?.email })
            // .lean()
            .exec();

          if (foundUser) {
            console.log("User credentials found in databse");
            const match = await bcrypt.compare(
              credentials?.password!,
              foundUser.password
            );
            if (match) {
              console.log("Password matches");
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;
