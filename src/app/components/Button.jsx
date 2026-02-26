// components/Button.js
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className,
  ...props
}) {
  const baseStyles =
    "transition-colors duration-300 font-semibold rounded-md focus:outline-none";

  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-red",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    link: "text-brand-blue hover:text-brand-blue/80 font-bold",
    nav: "text-white uppercase text-sm tracking-wider hover:text-brand-blue",
    menu: "block w-full text-left px-3 py-2 text-white hover:text-brand-blue uppercase text-sm tracking-wider",
    icon: "text-white hover:text-brand-blue",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
