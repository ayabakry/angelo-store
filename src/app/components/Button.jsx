// components/Button.jsx
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  type = "button",
  ...props
}) {
  const baseStyles =
    "transition-all duration-300 font-semibold rounded-md focus:outline-none relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-red transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-300",
    link: "text-brand-blue hover:text-brand-red font-bold disabled:text-gray-400",
    nav: "text-white uppercase text-sm tracking-wider hover:text-brand-red relative disabled:text-gray-400",
    menu: "block w-full text-left px-3 py-2 text-white hover:text-brand-red uppercase text-sm tracking-wider hover:bg-white/5 rounded-lg transition-all disabled:text-gray-400",
    icon: "text-white hover:text-brand-red disabled:text-gray-400",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
