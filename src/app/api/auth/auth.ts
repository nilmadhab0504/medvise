import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Doctor from "../../../models/Doctor"; 
import Admin from "../../../models/Admin"; 
import connectDB from "../../../lib/connectDB";

interface Credentials {
  email: string;
  password: string;
  role: string;
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          return null; // Will show "Invalid Credentials"
        }

        await connectDB();
        const { email, password, role } = credentials;

        let user;
        if (role === "doctor") {
          user = await Doctor.findOne({ email });
        } else if (role === "admin") {
          user = await Admin.findOne({ email });
        } else {
          throw new Error("Invalid role");
        }

        if (!user) {
          throw new Error(`${role[0].toUpperCase()+role.slice(1)} not found for the email`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, email: user.email, name: user.name, role };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token = { ...token, id: user.id, email: user.email, name: user.name, role: user.role };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = { id: token.id, email: token.email, name: token.name, role: token.role };
      return session;
    },
  },

  pages: {
    signIn: "/login", // Redirect to the login page on error
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "gkjbk",
};
