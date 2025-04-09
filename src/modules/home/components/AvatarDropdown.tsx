
import React, { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';

interface AvatarDropdownProps {
  avatarSrc: string;
  userName?: string;
  userEmail?: string;
  onSignOut: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  avatarSrc,
  userName = 'Usuario',
  userEmail = 'usuario@ejemplo.com',
  onSignOut
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    onSignOut();
    setIsOpen(false);
  };

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón del Avatar */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={avatarSrc}
          alt="Avatar de usuario"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-surface-container-high shadow-lg ring-1 ring-outline ring-opacity-5 focus:outline-none transform transition-all duration-150 ease-in-out">
          <div className="p-4">
            {/* Información del usuario */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={avatarSrc}
                alt="Avatar de usuario"
                width={40}
                height={40}
                className="rounded-full border-2 border-primary-container"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface">{userName}</span>
                <span className="text-xs text-on-surface-variant">{userEmail}</span>
              </div>
            </div>

            {/* Separador */}
            <div className="h-px bg-outline-variant my-2"></div>

            {/* Opciones del dropdown */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-on-surface-variant rounded-md hover:bg-surface-variant transition-colors"
            >
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;