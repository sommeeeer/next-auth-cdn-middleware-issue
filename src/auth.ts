import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const users = [
  {
    id: '1',
    username: 'conico',
    email: 'conico@opennext.com',
    password: '123',
  },
]

function getUserFromFakeDb(username: string, password: string) {
  return users.find(user => user.username === username && user.password === password)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        if (typeof credentials.username !== "string" || typeof credentials.password !== "string") {
          throw new Error("User not found.")
        }

        // logic to salt and hash password
        user = getUserFromFakeDb(credentials.username, credentials.password);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        // return user object with their profile data
        console.log("USER IS LOGGED IN", user)
        return user
      },
    }),
  ],
})


