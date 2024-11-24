import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/register'], // Define public routes
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)$).*)',
    '/api/:path*', // Ensure API routes are matched
    '/trpc/:path*', // Match TRPC routes
  ],
};
