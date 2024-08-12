"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/models", label: "Models" },
  { href: "/runs", label: "Runs" },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          XspecT
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Link href="/submission">
          <Button color="blue">Classify sample</Button>
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {NAV_ITEMS.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <NavbarLink key={href} href={href} active={isActive}>
              {label}
            </NavbarLink>
          );
        })}
      </NavbarCollapse>
    </Navbar>
  );
}
