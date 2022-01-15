import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // database: process.env.DB,
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("token", token, user)
      return token
    },
    async session({ session, token, user }) {
      // console.log("api", token, session, user)
      session.user.id = token?.sub

      // console.log("nextauth", session.user)

      return session
    },
  },
})
