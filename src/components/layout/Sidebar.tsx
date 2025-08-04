'use client';

import { JSX, useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaBitcoin,
  FaChartLine,
  FaSpotify,
  FaBalanceScale,
  FaCopy,
  FaWallet,
  FaGift,
  FaEllipsisH,
} from 'react-icons/fa';

type MenuItem = {
  title: string;
  icon: JSX.Element;
  expandable?: boolean;
};

const menuItems: MenuItem[] = [
  { title: 'Buy Crypto', icon: <FaBitcoin /> },
  { title: 'Markets', icon: <FaChartLine /> },
  { title: 'Spot', icon: <FaSpotify /> },
  { title: 'Derivatives', icon: <FaBalanceScale /> },
  { title: 'Copy Trading', icon: <FaCopy /> },
  { title: 'Wealth', icon: <FaWallet /> },
  { title: 'Rewards Hub', icon: <FaGift /> },
  { title: 'More', icon: <FaEllipsisH />, expandable: false },
];

const Sidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-full max-w-[300px] p-5 rounded-2xl bg-gradient-to-b from-[#0e2126] via-[#102a2e] to-[#0a1b1f] shadow-[0_0_30px_rgba(0,255,210,0.1)]">
      <div className="text-xl font-semibold mb-6 flex items-center space-x-2 text-white">
        <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse" />
        <span>Xbit Sora</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ title, icon, expandable = true }) => (
          <div key={title}>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all bg-[#11292e] hover:bg-[#164047] text-white ${
                openSections[title] ? 'bg-[#164047]' : ''
              }`}
              onClick={() => expandable && toggleSection(title)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg text-teal-300">{icon}</span>
                <span>{title}</span>
              </div>
              {expandable &&
                (openSections[title] ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                ))}
            </button>

            {expandable && openSections[title] && (
              <div className="ml-10 mt-2 text-sm text-gray-400 space-y-1">
                {/* Sub-options placeholder */}
                <p>- Option 1</p>
                <p>- Option 2</p>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
