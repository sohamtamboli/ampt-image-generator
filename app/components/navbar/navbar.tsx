'use client';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { AccountContext } from '../context/accountcontext';
import Cookies from 'js-cookie';

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const [status, setstatus] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const { getSession, Logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((Session) => {
        console.log('session', Session);
        setstatus(true);
       console.log(Session.idToken.payload.name);
       setUserName(Session.idToken.payload.name)
       console.log('idToken', Session.idToken.jwtToken);
       Cookies.set('idToken', Session.idToken.jwtToken);

      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <div className=" justify-end sm:px-6 lg:px-8">
          <div className=" flex h-16 justify-end ">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {pathname === '/favourites' && (
                <div className="mr-2">
                  <Link href="/home">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Home</span>
                      <Image
                        src="/images/home.svg" // Update the image source to your home icon
                        alt="home"
                        height={33}
                        width={33}
                      />
                    </button>
                  </Link>
                </div>
              )}
              <Link href="/favourites">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View favourites</span>
                  <Image
                    src="/images/bookmark.svg"
                    alt="fav"
                    height={35}
                    width={35}
                  />
                </button>
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <Image
                      src="/images/navprofile.svg"
                      alt="fav"
                      height={40}
                      width={35}
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
                        <Link legacyBehavior href="/favourites">
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
