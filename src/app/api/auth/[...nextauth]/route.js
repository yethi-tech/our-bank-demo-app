import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const authenticate = async (userId, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new Error("Invalid Credentials");
    } else if (user && !user.hasBranchAccess) {
      throw new Error("User is locked. Please contact Administrator");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        userId: { label: "User ID", type: "string" },
        password: { label: "Password", type: "password" },
        id: { label: "ID", type: "number" },
      },
      async authorize(credentials) {
        const { userId, password } = credentials ?? {};
        const authenticatedUser = await authenticate(userId, password);
        return authenticatedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      // Assuming 'user' here contains the user object returned from 'authorize'
      // Add 'id' and 'userId' from the user object to the session

      console.log("Inside session callback");
      if (token) {
        session.user.id = Number(token.sub);
        session.user.userId = token.userId;
      }

      return session;
    },
  },
};

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         userId: { label: "User ID", type: "string" },
//         password: { label: "Password", type: "password" },
//         id: { label: "ID", type: "number" },
//       },
//       async authorize(credentials) {
//         const { userId, password } = credentials ?? {};
//         if (userId === "admin" && password === "admin") {
//           return {
//             id: 1,
//             userId: "admin",
//             name: "Admin",
//             email: "admin3@yethi.in",
//           };
//         } else {
//           throw new Error("Invalid Credentials");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       console.log(session);
//       console.log(user);
//       return session;
//     },
//   },
// };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
