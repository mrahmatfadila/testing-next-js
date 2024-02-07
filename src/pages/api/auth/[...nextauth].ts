import { signIn, signInWithGoogle } from "@/pages/lib/firebase/service";
import { compare } from "bcrypt";
import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn({ email });
                if(user) {
                    // passwordConfirm untuk membandingkan password dari database(user.input) dengan password yang diinput user(password) sama apa tidak
                    const passwordConfirm = await compare(password, user.password);
                    if(passwordConfirm) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
          }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user}: any) {
            if(account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            if(account?.provider === "google") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: "google",
                };

                await signInWithGoogle(data, (result: any) => {
                    if(result.status) {
                        // console.log(data);
                        token.email = result.data.email;
                        token.fullname = result.data.fullname;
                        token.type = result.data.type;
                        token.image = result.data.image;
                        token.role = result.data.role;
                    }
                })
            }
            return token;
        },
    async session({session, token}: any) {
        if("email" in token) {
            session.user.email = token.email;
        }
        if("fullname" in token) {
            session.user.fullname = token.fullname;
        }
        if("image" in token) {
            session.user.image = token.image;
        }
        if("role" in token) {
            session.user.role = token.role;
        }
        return session;
    },
 },
    pages: {
        signIn: "/auth/login",
    }
};

export default NextAuth(authOptions);