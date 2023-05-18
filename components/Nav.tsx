'use client';

import { ProviderI } from '@/models/interfaces';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [providers, SetProviders] = useState<ProviderI | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const isUserLoggedIn = true;

  const handleSignOutButtonClick = () => {};

  const handleMenuToggleClick = () => {
    setToggleDropdown((prevVal) => !prevVal);
  };

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response as ProviderI);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href="/"
        className="flex gap-2 flex-center"
      >
        <Image
          src="/assets/images/logo.svg"
          className="object-contain"
          width={30}
          height={30}
          alt="logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Mobile */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-promt"
              className="black_btn"
            >
              Create Post
            </Link>
            <button
              onClick={handleSignOutButtonClick}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="profile"
              onClick={handleMenuToggleClick}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
