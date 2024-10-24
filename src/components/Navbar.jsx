"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Next.js client-side routing
import debugPic from '@/public/images/debug.png';
import profilePic from "@/public/images/profile-pic.jpg";
import Link from 'next/link';

const navigation = [
    { name: 'Web', href: '/Web', current: false },
    { name: 'DSA', href: '/Dsa', current: false },
    { name: 'Interview', href: '/Interview', current: false },
    { name: 'Raise an Issue', href: '/raiseIssue', current: false },
    { name: 'Run your Code', href: '/compiler', current: false }
];

// Utility to handle conditional class names
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <Disclosure as="nav" className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
                            <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Image
                                alt="Help me Debug"
                                src={debugPic}
                                width={30}
                                height={30}
                                className="hover:cursor-pointer"
                                onClick={() => router.push("/")}
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} passHref>
                                        <p
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-xl px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        {!session ? (
                            <button
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center ml-2 shadow-lg transition duration-300 ease-in-out"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </button>
                        ) : (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            src={session.user?.image || profilePic}
                                            alt="User Profile"
                                            width={32} // More consistent sizing
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition">
                                    <MenuItem>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                onClick={() => signOut()}
                                            >
                                                Sign out
                                            </a>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-xl px-3 py-2 text-sm font-medium',
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
