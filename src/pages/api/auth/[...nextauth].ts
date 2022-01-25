import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			authorization: {
				params: {
					scope: 'read:user'
				}
			},
		}),
	],
	secret: 'eZpgJk1Koxb\tMTtbcvBt9gJuWKNLBQlTxUZ7xeR9t4='
})
