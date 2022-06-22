import inkeLogo from "../assets/inke-logo.svg";

export const Header = () => (
  <header className="flex items-center gap-2 py-5 justify-center w-full border-b border-neutral-600">
    <img className="w-10" src={inkeLogo} alt="Inke Logo" />
    <h4 className="text-center font-bold text-2xl">Inke</h4>
  </header>
);
