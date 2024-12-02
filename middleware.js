import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/register', '/sign-up'], // Tambahkan /sign-up
});

export const config = {
  matcher: [
    '/((?!_next/|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)$).*)',
    '/api/:path*',
    '/trpc/:path*',
  ],
};