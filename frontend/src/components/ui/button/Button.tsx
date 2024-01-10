import cn from "clsx";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "blue" | "gray";
  size?: "sm" | "md" | "lg";
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  size = "md",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "btn",
        {
          "btn-blue": variant === "blue",
          "btn-gray": variant === "gray",
          "px-5 py-5 text-sm": size === "sm",
          "btn-large": size === "lg",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
