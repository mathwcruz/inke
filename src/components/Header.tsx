import { List, X } from "phosphor-react";
import inkeLogo from "../assets/inke-logo.svg";

import { useMenu } from "../contexts/MenuContext";

export const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <header className="flex items-center gap-2 py-5 justify-center w-full border-b border-neutral-600 relative">
      <div className="flex flex-row items-center justify-center gap-2">
        <img className="w-10" src={inkeLogo} alt="Inke Logo" />
        <h4 className="text-center font-bold text-2xl">Inke</h4>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden absolute top-7 mb-[1px] right-2 flex flex-row items-center justify-center gap-2"
      >
        <span className="text-sm text-left text-neutral-300 font-medium">
          Lessons
        </span>
        {isMenuOpen ? (
          <X size={22} className="text-sky-400" />
        ) : (
          <List size={22} className="text-sky-400" />
        )}
      </button>
    </header>
  );
};
