import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-zinc-800 bg-zinc-900 text-zinc-100',
        high: 'border-red-500/30 bg-red-500/15 text-red-200',
        medium: 'border-amber-500/30 bg-amber-500/15 text-amber-200',
        low: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200',
        violet: 'border-violet-500/30 bg-violet-500/15 text-violet-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
