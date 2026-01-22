import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Vercel Preview/Production 환경에서는 배포 도메인이 매번 바뀔 수 있으므로
// 현재 배포 도메인(VERCEL_URL)로 NEXTAUTH_URL을 강제 맞춰 500(호스트 불일치) 이슈를 피합니다.
if (process.env.VERCEL_URL) {
  const inferred = `https://${process.env.VERCEL_URL}`
  process.env.NEXTAUTH_URL = inferred
}

export const authOptions: NextAuthOptions = {
  providers:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : [],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 초기 로그인 시 사용자 정보를 토큰에 저장
      if (account && user) {
        token.accessToken = account.access_token
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      // 세션에 토큰 정보 추가
      if (session.user) {
        session.user.id = token.id as string || ""
        session.accessToken = token.accessToken as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 홈으로 리다이렉트
      // 상대 경로인 경우 baseUrl과 결합
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      // 같은 도메인인 경우 허용
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // 기본적으로 홈으로 리다이렉트
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error("[next-auth][error]", code, metadata)
    },
    warn(code) {
      console.warn("[next-auth][warn]", code)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.log("[next-auth][debug]", code, metadata)
      }
    },
  },
}
