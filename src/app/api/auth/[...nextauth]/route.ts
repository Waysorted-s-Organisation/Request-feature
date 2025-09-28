import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { IUser } from "@/types";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile && profile.email) {
        await connectDB();

        // check if user exists
        let user = await User.findOne({ email: profile.email }) as IUser | null;

        if (!user) {
          // create a new user with Google profile info
          user = await User.create({
            initials: profile.name ? profile.name.charAt(0).toUpperCase() : "U",
            fullName: profile.name,
            email: profile.email,
            passwordHash: "", // Google login → no password required
            role: "user",
          }) as IUser;
        }

        // attach MongoDB user id and other info to token
        token.id = user._id.toString();
        token.name = user.fullName;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
