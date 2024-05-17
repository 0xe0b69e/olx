import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { adminRoutes, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes } from "@/routes";
import { NextURL } from "next/dist/server/web/next-url";
import { ExtendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth( authConfig );

export default auth( ( req ): undefined | Response =>
{
  const { nextUrl }: { nextUrl: NextURL } = req;
  const user: ExtendedUser | undefined = req.auth?.user;
  const isLoggedIn: boolean = !!req.auth;
  
  const isApiAuthRoute: boolean = nextUrl.pathname.startsWith( apiAuthPrefix );
  const isPrivateRoute: boolean = privateRoutes.includes( nextUrl.pathname );
  const isAuthRoute: boolean = authRoutes.includes( nextUrl.pathname );
  const isAdminRoute: boolean = adminRoutes.includes( nextUrl.pathname );
  
  if ( isApiAuthRoute ) return;
  if ( isAuthRoute )
  {
    if ( isLoggedIn ) return Response.redirect( new URL( DEFAULT_LOGIN_REDIRECT, nextUrl ) );
    return;
  }
  if ( !isLoggedIn && isPrivateRoute ) return Response.redirect( new URL( "/auth/login", nextUrl ) );
  if ( isAdminRoute && user?.role !== UserRole.ADMIN ) return Response.redirect( new URL( "/permission-fail", nextUrl ) );
} );

export const config: { matcher: string[] } = {
  matcher: [ "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)" ],
};