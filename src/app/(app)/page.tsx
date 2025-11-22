'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-background text-foreground overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 animate-pulse" />
        
        <section className="text-center mb-16 md:mb-24 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Dive into the World of <br /> Anonymous Feedback
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real Feedback - Where your identity remains a secret. Share your thoughts freely and securely.
          </p>
          <div className="mt-8 flex justify-center gap-4">
             <Link href="/sign-up">
                <Button size="lg" className="rounded-full px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Get Started
                </Button>
             </Link>
             <Link href="/sign-in">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                  Login
                </Button>
             </Link>
          </div>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-2xl animate-slide-up"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="glass-card !border-foreground/10 shadow-md h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-tight">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-muted-foreground leading-relaxed">{message.content}</p>
                      <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 md:p-8 border-t border-white/5 text-muted-foreground text-sm">
        © 2023 Real Feedback. All rights reserved.
      </footer>
    </>
  );
}
