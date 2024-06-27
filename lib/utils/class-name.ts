import clsx from 'clsx';
import type { ClassNameValue } from 'tailwind-merge';
import { twMerge } from 'tailwind-merge';

export function clsMerge(...classNames: ClassNameValue[]) {
    return clsx(twMerge(...classNames));
}
