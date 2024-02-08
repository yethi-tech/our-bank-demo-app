import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        userId: { label: "User ID", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { userId, password } = credentials ?? {};
        if (userId === "admin" && password === "admin") {
          return {
            id: 1,
            userId: "admin",
            name: "Admin",
            email: "admin@yethi.in",
          };
        } else {
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
