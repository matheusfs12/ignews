import { query as q } from "faunadb";

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { faunaClient } from "../../../services/fauna";

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
	callbacks: {
		async signIn({ user }) {
			try {
				await faunaClient.query(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index("user_by_email"),
									q.Casefold(user.email)
								)
							)
						),
						q.Create(
							q.Collection('users'),
							{ data: { email: user.email } }
						),
						q.Get(
							q.Match(
								q.Index("user_by_email"),
								q.Casefold(user.email)
							)
						)
					)
				)

				return true;
			} catch (error) {
				return false;
			}
		}
	},
	secret: 'eZpgJk1Koxb\tMTtbcvBt9gJuWKNLBQlTxUZ7xeR9t4='
})
