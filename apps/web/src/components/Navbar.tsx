'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { logoutAction } from '@/redux/slices/userSlice';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id, role } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleLogoClick = () => {
    if (role === 'organizer') {
      router.push('/organizer');
    } else {
      router.push('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  };

  return (
    <>
      <nav className="container flex justify-between px-4 py-4 xl:px-0">
        <div
          className="cursor-pointer place-content-center text-[24px] font-bold"
          onClick={handleLogoClick}
        >
          purwa<span className="text-main_yellow">pora</span>
        </div>

        {Boolean(id) ? (
          <div className="flex items-center gap-8">
            <Button
              className="hidden sm:block"
              variant="link"
              onClick={() => router.push('/create')}
            >
              Create Event
            </Button>
            <Button
              variant="link"
              className="hidden text-red-500 md:block"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <Button
              className="hidden sm:block"
              variant="link"
              onClick={() => router.push('/create')}
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
      <hr className="border-b- border-b-0" />
    </>
  );
};
