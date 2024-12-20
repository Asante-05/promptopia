"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useMyThemeContext } from "@contexts/theme";

const Nav = () => {
  // Get the login state from the current session
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { lightMode, setLightMode } = useMyThemeContext();

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">SharePrompt</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Image
              alt="lightMode"
              className="mx-3"
              width={40}
              height={40}
              onClick={() => setLightMode(!lightMode)}
              src={
                lightMode
                  ? "/assets/icons/lightMode.svg"
                  : "/assets/icons/darkMode.svg"
              }
            />

            <Link href="/profile">
              <Image
                src={session?.user.image || "/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign in with {provider.name}
                  </button>

                  <Image
                    alt="lightMode"
                    className="mx-3"
                    width={40}
                    height={40}
                    onClick={() => setLightMode(!lightMode)}
                    src={
                      lightMode
                        ? "/assets/icons/lightMode.svg"
                        : "/assets/icons/darkMode.svg"
                    }
                  />
                </>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            <Image
              alt="lightMode"
              className="mx-3"
              width={40}
              height={40}
              onClick={() => setLightMode(!lightMode)}
              src={
                lightMode
                  ? "/assets/icons/lightMode.svg"
                  : "/assets/icons/darkMode.svg"
              }
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
