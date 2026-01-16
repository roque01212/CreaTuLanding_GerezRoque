type Variant = "primary" | "secondary" | "ghost" | "danger";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const CustomButton = ({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}: Props) => {
  const base =
    "inline-flex items-center border border-white/10 justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/20";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    secondary: "bg-white/10 hover:bg-white/15 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
  };
  const disabledStyles = "opacity-50 pointer-events-none";
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base}  ${variants[variant]} ${
        disabled ? disabledStyles : ""
      } ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
