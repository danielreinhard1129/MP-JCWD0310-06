'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <>
      <nav className="container px-4 xl:px-0 sticky flex justify-between py-4">
        <div className="place-content-center text-[24px] font-bold">
          purwa<span className="text-main_yellow">pora</span>
        </div>

        {Boolean(id) ? (
          <div className="flex items-center gap-10">
            <Button
              className="hidden sm:block"
              variant="link"
              onClick={() => router.push('/create-event')}
            >
              Create Event
            </Button>
            <Button variant="link" className="hidden md:block">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-10">
            <Button
              className="hidden sm:block"
              variant="link"
              onClick={() => router.push('/create-event')}
            >
              Create Event
            </Button>
            <Button
              className="hidden sm:block"
              variant="link"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              className="hidden sm:block"
              variant="default"
              onClick={() => router.push('/register')}
            >
              Register
            </Button>
          </div>
        )}
      </nav>
      <hr className='border-b-0 border-b-' />
    </>
  );
};
