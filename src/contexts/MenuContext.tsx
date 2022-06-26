import { useContext, createContext, ReactNode, useState } from "react";

interface MenuContextData {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

interface MenuContextProviderProps {
  children: ReactNode;
}

export const MenuContext = createContext({} as MenuContextData);

export function MenuContextProvider({ children }: MenuContextProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  return useContext(MenuContext);
};
