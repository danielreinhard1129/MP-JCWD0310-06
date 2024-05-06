import Image from 'next/image';
import purwapora from 'public/purwapora.svg';

export const Footer = () => {
  return (
    <main className="mt-10 px-6 pb-10 md:px-20">
      <div className="container h-fit overflow-hidden rounded-3xl bg-[#1e1e1e] px-0 md:h-[366px]">
        <div className="relative h-full w-full flex-col">
          <div className="right-10 top-10 grid gap-4 px-6 pb-8 pt-6 text-white md:absolute md:flex md:gap-10 md:p-0">
            <h2 className="text-[24px] font-bold">Connect With Us</h2>
            <ul>
              <li>Contact Support</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
          <h3 className="relative z-50 px-6 pb-6 text-[14px] font-medium text-white md:absolute md:bottom-10 md:left-10 md:p-0">
            © 2024 Purwapora
          </h3>
          <Image
            src={purwapora}
            alt="bg"
            draggable="false"
            className="absolute -bottom-4 w-full object-cover md:-bottom-20"
          />
        </div>
      </div>
    </main>
  );
};
