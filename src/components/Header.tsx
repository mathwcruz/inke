import { List } from "phosphor-react";
import inkeLogo from "../assets/inke-logo.svg";

export const Header = () => (
  <header className="flex items-center gap-2 py-5 justify-center w-full border-b border-neutral-600 relative">
    <div className="flex flex-row items-center justify-center">
      <img className="w-10" src={inkeLogo} alt="Inke Logo" />
      <h4 className="text-center font-bold text-2xl">Inke</h4>
    </div>
    <div className="lg:hidden absolute top-6 right-2 flex flex-row items-center justify-center gap-2">
      <span className="text-sm text-left text-neutral-300 font-medium">
        Lessons
      </span>
      <List size={28} className="text-sky-400" />
    </div>
  </header>
);
