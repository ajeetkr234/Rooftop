import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

type ButtonProps = ButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined })
    | { to: string; href?: undefined; type?: undefined; onClick?: () => void }
    | { href: string; to?: undefined; type?: undefined; onClick?: () => void }
  );

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 select-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium",
    md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
    lg: "px-7 py-3.5 text-base font-semibold tracking-wide",
  }[size];

  const variantStyles = {
    primary: "bg-brand-copper text-white hover:bg-brand-copper-hover active:bg-[#B3581E] shadow-sm focus-visible:outline-brand-copper",
    secondary: "bg-brand-navy text-white hover:bg-brand-slate active:bg-slate-900 border border-slate-700 focus-visible:outline-brand-navy",
    outline: "bg-transparent text-brand-navy border-2 border-brand-navy/30 hover:border-brand-navy hover:bg-brand-navy/5 active:bg-brand-navy/10 focus-visible:outline-brand-navy",
    dark: "bg-white text-brand-navy hover:bg-brand-warm active:bg-slate-200 focus-visible:outline-white",
  }[variant];

  const combinedClasses = cn(baseStyles, sizeStyles, variantStyles, className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={combinedClasses} onClick={props.onClick}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={combinedClasses} onClick={props.onClick}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </a>
    );
  }

  const { type = 'button', onClick } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedClasses}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

