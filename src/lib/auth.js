import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                let dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (!dbUser) {
                    // Extract username from email (before @)
                    let baseUsername = user.email.split("@")[0];
                    let username = baseUsername;
                    let counter = 1;

                    // Ensure username is unique
                    while (await prisma.user.findUnique({ where: { username } })) {
                        username = `${baseUsername}_${counter}`;
                        counter++;
                    }

                    // Create new user
                    dbUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: "user",
                            username,
                        },
                    });
                }

                // Update account with correct userId
                if (account) {
                    await prisma.account.upsert({
                        where: {
                            provider_providerAccountId: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                            },
                        },
                        update: {
                            userId: dbUser.id,
                        },
                        create: {
                            userId: dbUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                            session_state: account.session_state,
                        },
                    });
                }

                return true;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { id: true, name: true, email: true, username: true, image: true, role: true },
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.username = dbUser.username;
                    token.image = dbUser.image;
                    token.role = dbUser.role || "user";
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.username = token.username;
                session.user.image = token.image;
                session.user.role = token.role;
            }
            return session;
        },
        async redirect( ) {
            return "/dashboard";
        },
    },
};


export const getAuthSession = () => getServerSession(authOptions);