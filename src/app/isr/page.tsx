import { Suspense } from 'react';
import CheckAuth from './_components/checkauth';

export const revalidate = 30;

export default async function Page() {
  const time = await fetch('https://worldtimeapi.org/api/ip');
  const data = await time.json();
  return (
    <div className="flex flex-col gap-12 items-center py-14">
      <h1>
        This page is <span className="font-bold">ISR</span>
      </h1>
      <p className="text-gray-700 text-lg">It revalidates every 30</p>
      <p className="text-gray-700 text-lg">
        The time is {new Date(data.datetime).toLocaleString()}
      </p>
      <Suspense fallback={null}>
        <CheckAuth />
      </Suspense>
    </div>
  );
}
