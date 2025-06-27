import React from 'react';

interface BotaoVermelhoProps {
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  disabled?: boolean;
}

const BotaoVermelho = ({ children, icon: Icon, onClick, disabled = false }: BotaoVermelhoProps) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition cursor-pointer"
      onClick={onClick}
      disabled={disabled} // You can set this to true or false based on your logic
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default BotaoVermelho;
