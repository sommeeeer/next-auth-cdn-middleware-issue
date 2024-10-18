import { auth } from '@/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-12 items-center py-14">
      <h1>
        This page is <span className="font-bold">SSR</span>
      </h1>
      <nav className="flex gap-4 flex-col items-center">
        {session?.user ? (
          <div>{`you are logged in as ${session.user.email}`}</div>
        ) : (
          <div>you are not logged in</div>
        )}
        {!session?.user && (
          <Link
            href="/login"
            className="text-blue-600 hover:underline bg-yellow-400 px-8 py-4"
          >
            Go to login page
          </Link>
        )}
        {session?.user && (
          <>
            <Link
              href="/isr?loggedIn=true"
              className="text-blue-600 hover:underline bg-yellow-400 px-8 py-4"
            >
              Go make the set-cookie in /isr
            </Link>
            <Link
              href="/logout"
              className="text-blue-600 hover:underline bg-yellow-400 px-8 py-4"
            >
              Go to logout page
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
