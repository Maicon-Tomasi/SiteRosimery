import React from 'react';

interface BotaoAmareloProps {
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  disabled?: boolean;
}

const BotaoAmarelo = ({ children, icon: Icon, onClick, disabled = false }: BotaoAmareloProps) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 bg-[#d49f43] text-white hover:bg-[#d49f43d3] rounded-md transition cursor-pointer"
      onClick={onClick}
      disabled={disabled} // You can set this to true or false based on your logic
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default BotaoAmarelo;
