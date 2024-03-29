"use client";

import { IoMenuSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAccessToken } from "@/providers/AccessTokenProvider";

export function NavMenu() {
  const { user } = useAccessToken();

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    user
      ? {
          name: "Logout",
          path: "/logout",
        }
      : {
          name: "Login",
          path: "/login",
        },
  ];

  return (
    <nav className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Open main menu</span>
            <IoMenuSharp />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {navItems.map((v, i) => (
            <DropdownMenuItem asChild key={i}>
              <Link href={v.path}>{v.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="max-w-screen-xl flex-wrap items-center justify-between mx-auto hidden md:flex">
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex p-0 mt-4 border flex-row space-x-8 rtl:space-x-reverse mt-0 border-0">
            {navItems.map((v, i) => (
              <li key={i}>
                <Link href={v.path}>{v.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
