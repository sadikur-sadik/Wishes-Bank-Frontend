import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      "group transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-xs hover:shadow-sm",
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && (
          <span className="mr-2 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}
        {asChild && React.isValidElement(children)
          ? (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
          : children}
        {!isLoading && rightIcon && (
          <span className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      return (
        <Button
          ref={ref}
          asChild
          disabled={disabled || isLoading}
          className={buttonClasses}
          {...props}
        >
          {React.cloneElement(
            children as React.ReactElement<{ children?: React.ReactNode }>,
            undefined,
            content
          )}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        asChild={false}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {content}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";
export default AppButton;
