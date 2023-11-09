'use client';
import AccIcon from '@/public/images/accounticon.svg';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import BookmarkIcon from '../SVGs/BookmarkIcon';
import HomeIcon from '../SVGs/HomeIcon';
import { AccountContext } from '../context/accountcontext';

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const { getSession, Logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((Session) => {
        setStatus(true);
        setUserName(Session.idToken.payload.name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getSession]);

  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="">
      <>
        <div className=" ">
          <div className="  ">
            <div className="mx-4 my-2 flex items-center justify-end">
              {pathname === '/favourites' && (
                <div className="mr-2">
                  <Link href="/home">
                    <button
                      type="button"
                      className="relative rounded-full focus:outline-none"
                    >
                      <span className="sr-only">Home</span>
                      <HomeIcon />
                    </button>
                  </Link>
                </div>
              )}
              <Link href="/favourites">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-950 hover:text-black focus:outline-none"
                >
                  <span className="sr-only">View favourites</span>
                  <BookmarkIcon />
                </button>
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full border-2 border-gray-950 bg-gray-800 text-sm focus:outline-none">
                    <Image
                      src={AccIcon}
                      alt="fav"
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href={''}>
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            {status ? userName : 'please login'}
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href="/favourites">
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            favourites
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href="/login">
                          <a
                            onClick={Logout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign out
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};
export default Navbar;
