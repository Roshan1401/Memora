import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
});

export const config = {
  matcher: [
    "/calendar/:path*",
    "/memories/:path*",
    "/profile/:path*",
    "/api/user/:path*",
  ],
};
