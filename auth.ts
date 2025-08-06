import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginUser } from "./lib/actions";
import NextAuth from "next-auth";

const authOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await LoginUser({
            email: email.toLowerCase(),
            password: password,
          });

          if (!user) {
            throw new Error("Invalid Credentials");
          }

          console.log(user, "user in authorize");

          return Promise.resolve({
            id: user._id,
            email: user.email,
            image: user.photo,
            name: `${user.firstName} ${user.lastName}`,
          });
        } catch (error) {
          console.log(error, "error");

          return Promise.resolve(null);
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
    error: "/auth/error",
    // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        //   token.accessToken = user.accessToken;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
