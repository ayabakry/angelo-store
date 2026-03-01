// components/Button.js
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  ...props
}) {
  const baseStyles =
    "transition-all duration-300 font-semibold rounded-md focus:outline-none relative overflow-hidden";

  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-red transform hover:-translate-y-1 hover:shadow-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    link: "text-brand-blue hover:text-brand-red font-bold",
    nav: "text-white uppercase text-sm tracking-wider hover:text-brand-red relative",
    menu: "block w-full text-left px-3 py-2 text-white hover:text-brand-red uppercase text-sm tracking-wider hover:bg-white/5 rounded-lg transition-all",
    icon: "text-white hover:text-brand-red",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
