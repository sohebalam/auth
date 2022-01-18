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
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(account.providerAccountId)
      // accountId = Object.stringy(account.providerAccountId)
      // user.id = account.providerAccountId
      // console.log(account)
      return true
    },
    async jwt({ token, user, profile }) {
      // console.log("token", token)
      return token
    },
    async session({ session, token, user }) {
      // console.log("api", token, session)
      // session.user.id = token?.sub

      console.log("nextauth", session.user)

      return session
    },
    // session: {
    //   strategy: "database",

    //   maxAge: 30 * 24 * 60 * 60, // 30 days

    //   updateAge: 24 * 60 * 60, // 24 hours
    // },
  },
})
