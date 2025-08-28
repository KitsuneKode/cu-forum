'use client'

import React from 'react'
import BottomNavigation from '@/components/bottom-navigation'
import { Home, Search, Heart, User, Plus } from 'lucide-react'

export default function BottomNavClient() {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
      className: 'text-secondary',
    },
    {
      id: 'search',
      label: 'Search',
      href: '/search',
      icon: Search,
      className: 'text-secondary',
    },
    {
      id: 'create-post',
      label: 'Create',
      href: '/create-post',
      icon: Plus,
      className: 'text-primary',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      href: '/favorites',
      icon: Heart,
      badge: 3,
      className: 'text-secondary',
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: User,
      className: 'text-secondary',
    },
  ] // BottomNavigation already uses usePathname; keeping this component client ensures it runs safely.
  return <BottomNavigation items={navItems} />
}
