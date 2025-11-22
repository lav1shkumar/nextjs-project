'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Real Feedback
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {session ? (
            <>
              <span className="text-sm font-medium text-muted-foreground hidden md:block">
                Welcome, {user.username || user.email}
              </span>
              <Button onClick={() => signOut()} variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
