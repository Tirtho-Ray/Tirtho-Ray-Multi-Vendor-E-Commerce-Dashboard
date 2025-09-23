import { JSX } from "react";
import Link from "next/link"; 
import {
  FaSpotify,
  FaBalanceScale,
  FaCopy,
  FaWallet,
  FaGift,
  FaEllipsisH,
  FaHome,
} from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";

type MenuItem = {
  title: string;
  icon: JSX.Element;
  path: string;
  expandable?: boolean;
};

const menuItems: MenuItem[] = [
  { title: "Home", icon: <FaHome />, path: "/dashboard" },
  { title: "Products", icon: <FaProductHunt />, path: "/products" },
  { title: "Vendors", icon: <FaSpotify />, path: "/vendors" },
  { title: "Admin", icon: <FaBalanceScale />, path: "/admin" },
  { title: "Copy ", icon: <FaCopy />, path: "/copy-trading" },
  { title: "Wealth", icon: <FaWallet />, path: "/wealth" },
  { title: "Rewards Hub", icon: <FaGift />, path: "/rewards" },
  { title: "More", icon: <FaEllipsisH />, path: "/more", expandable: false },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] md:p-3 lg:px-3 lg:py-5 rounded-2xl bg-gradient-to-b from-[#0e2126] via-[#102a2e] to-[#0a1b1f]">
      <div className="text-xl font-semibold mb-6 flex items-center space-x-2 text-white">
        <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse" />
        <span>Xbit Sora</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ title, icon, path }) => (
          <div key={title}>
            <Link
              href={path}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all bg-[#11292e] hover:bg-[#164047] text-white"
            >
              <div className="flex items-center space-x-3">
                <span className="md:text-[12px] lg:text-xl text-teal-300">{icon}</span>
                <span className="md:text-[10px] lg:text-lg text-white">{title}</span>
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
