'use client';

import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState<Session | null>(null);
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();

  const alreadyLoggedIn = searchParams.get('loggedIn') === 'true';

  useEffect(() => {
    async function checkAuth() {
      if (alreadyLoggedIn || count >= 10) return;
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        if (!response.ok) {
          setCount(count + 1);
          throw new Error(data.message);
        }
        setLoggedIn(true);
        setData(data);
        clearInterval(intervalId);
      } catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    }

    const intervalId = setInterval(checkAuth, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [alreadyLoggedIn, count]);

  if (!loggedIn || alreadyLoggedIn) {
    return null;
  }

  return (
    <div className="text-4xl font-bold text-red-500 text-center">{`you SHOULD not see this: ${data?.user?.email}`}</div>
  );
}
