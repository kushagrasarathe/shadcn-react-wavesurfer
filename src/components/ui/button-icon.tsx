import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import { Loader2, LucideIcon } from 'lucide-react';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  state?: 'default' | 'loading' | 'disabled';
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon: Icon,
      iconPosition = 'left',
      children,
      state = 'default',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const classname = cn(
      `flex items-center gap-2 ${
        iconPosition === 'right' && 'flex-row-reverse'
      }`,
      className
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className: classname }))}
        ref={ref}
        {...props}
      >
        {state === 'loading' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          Icon && <Icon className={'size-4'} />
        )}
        {children}
      </Comp>
    );
  }
);
ButtonIcon.displayName = 'ButtonIcon';

export { ButtonIcon };
