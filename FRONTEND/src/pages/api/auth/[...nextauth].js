import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

 
export default NextAuth({
  

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // // ...add github here
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // }),

        // ...add other providers here


    ],
    // pages: {
    //     // signIn: 'api/auth/signin',
    //     // signOut: '/auth/signout',
    //     error: '/noaccess', // Error code passed in query string as ?error=
    //     // verifyRequest: '/auth/verify-request', // (used for check email message)
    //     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    //   },
     

    session: { strategy: "jwt" },

    callbacks: {
        
        async session({ session, token, user }) {
            session.jwt = token.jwt;
            session.id = token.id;
            session.access_token = token.access_token;
            session.refresh_token = token.refresh_token;
            return session;
        },
       

        async jwt({ token, user, account }) {

            const isSignIn = user ? true : false;
            if (isSignIn) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
                );
                const data = await response.json();
                token.jwt = data.jwt;
                token.id = data.user.id;
                token.access_token = account?.access_token;
            }
            return token
        }
    },
    secret: '7Lu5wA0v+Wa0+3vRtOtpVA==',

}
);


