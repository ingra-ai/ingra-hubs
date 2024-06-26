'use client';
import { NavItemChild } from '@components/navs/types';
import { SquareDashedBottomCodeIcon, SquareLibraryIcon } from 'lucide-react';

export const MarketplaceNavRoutes: NavItemChild[] = [
  {
    name: 'Collections',
    href: '/marketplace/collections',
    icon: SquareLibraryIcon
  },
  {
    name: 'Functions',
    href: '/marketplace/functions',
    icon: SquareDashedBottomCodeIcon
  }
];
