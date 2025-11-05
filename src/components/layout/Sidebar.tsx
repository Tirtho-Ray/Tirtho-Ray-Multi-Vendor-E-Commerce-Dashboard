"use client"
import { JSX, useState } from "react";
import Link from "next/link";
import {
  FaSpotify,
  FaBalanceScale,
  FaCopy,
  FaWallet,
  FaGift,
  FaEllipsisH,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type MenuItem = {
  title: string;
  icon: JSX.Element;
  path?: string;
  expandable?: boolean;
  subMenu?: { title: string; path: string }[];
};

const menuItems: MenuItem[] = [
  {
    title: "Manage User",
    icon: <FaUser />,
    expandable: true,
    subMenu: [
      { title: "Manage Admin", path: "/manage-user/manage-admin" },
      { title: "Manage vendors", path: "/manage-user/manage-vendor" },
    ],
  },
  { title: "Vendors", icon: <FaSpotify />, path: "/vendors" },
  { title: "Admin", icon: <FaBalanceScale />, path: "/admin" },
  { title: "Copy", icon: <FaCopy />, path: "/copy-trading" },
  { title: "Wealth", icon: <FaWallet />, path: "/wealth" },
  { title: "Rewards Hub", icon: <FaGift />, path: "/rewards" },
  { title: "More", icon: <FaEllipsisH />, path: "/more" },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <aside className="w-full md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] md:p-3 lg:px-3 lg:py-5 rounded-2xl bg-gradient-to-b from-[#0e2126] via-[#102a2e] to-[#0a1b1f]">
      <div className="text-xl font-semibold mb-6 flex items-center space-x-2 text-white">
        <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse" />
        <Link href="/dashboard">Xbit Sora</Link>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ title, icon, expandable, subMenu }) => (
          <div key={title}>
            <button
              onClick={() => expandable && toggleDropdown(title)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all bg-[#11292e] hover:bg-[#164047] text-white"
            >
              <div className="flex items-center space-x-3">
                <span className="md:text-[12px] lg:text-xl text-teal-300">{icon}</span>
                <span className="md:text-[10px] lg:text-[14px] text-white">{title}</span>
              </div>
              {expandable &&
                (openDropdown === title ? <FaChevronUp /> : <FaChevronDown />)}
            </button>

            {expandable && openDropdown === title && subMenu && (
              <div className="ml-8 mt-2 space-y-1">
                {subMenu.map((sub) => (
                  <Link
                    key={sub.title}
                    href={sub.path}
                    className="block px-4 py-2 rounded-lg bg-[#0f2226] hover:bg-[#164047] text-[10px] text-white"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
