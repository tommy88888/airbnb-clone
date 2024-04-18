import { useSession } from 'next-auth/react';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export default async function middleware(request: NextRequest) {
  // Your middleware logic here
  const user = await auth();
  console.log('🚀 ~ currentUser:', user);
  // Example: Conditional logic based on pathname
  if (!user || user === undefined) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next(); // Pass the request on by default
}

export const config = {
  matcher: ['/trips', '/reservations', '/properties', '/favorites'],
};
