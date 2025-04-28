import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Roadmap from '@/components/Roadmap';
import Mint from '@/components/Mint';
import CommunityHub from '@/components/CommunityHub';
import Background from '@/components/Background';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Background />
        <Hero />
        <Gallery />
        <Roadmap />
        <Mint />
        <CommunityHub />
      </Suspense>
    </main>
  );
} 