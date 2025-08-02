'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    const fallback = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    router.replace(`/${stored ?? fallback}`);
  }, []);

  return null;
}
