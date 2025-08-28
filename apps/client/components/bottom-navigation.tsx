'use client'

import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@cu-forum/ui/lib/utils'
import { usePathname } from 'next/navigation'

export interface NavItem {
  id: string
  label: string
  href: string
  icon: LucideIcon
  badge?: number
  className?: string
}

export interface BottomNavigationProps {
  items: NavItem[]
  className?: string
  onItemClick?: (item: NavItem) => void
  showLabels?: boolean
  variant?: 'default' | 'compact'
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  className,
  onItemClick,
  showLabels = true,
  variant = 'default',
}) => {
  const pathname = usePathname()

  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    if (onItemClick) {
      event.preventDefault()
      onItemClick(item)
    }
  }

  const isActive = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href))
  }

  return (
    <nav
      className={cn(
        // Base styles - mobile only
        'fixed bottom-0 left-0 right-0 z-50',
        'block md:hidden', // Only visible on mobile
        'bg-nav-background border-nav-border border-t',
        'bg-opacity-95 backdrop-blur-lg',
        'rounded-lg',
        'safe-area-pb', // For devices with home indicator
        className,
      )}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2">
        {items.map((item) => {
          const isItemActive = isActive(item.href)
          const IconComponent = item.icon
          const itemClassName = !!item.className

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleItemClick(item, e)}
              className={cn(
                // Base nav item styles
                'flex flex-col items-center justify-center',
                'relative transition-all duration-200 ease-out',
                'touch-manipulation', // Better touch response
                'active:scale-95', // Haptic feedback effect

                // Size variants
                variant === 'compact'
                  ? 'min-w-[60px] px-3 py-2'
                  : 'min-w-[70px] px-4 py-3',

                // Interactive states
                'hover:bg-nav-item-hover rounded-lg',
                'focus:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2',

                // Active state
                isItemActive && 'text-nav-item-active',
              )}
              aria-current={isItemActive ? 'page' : undefined}
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Icon container with badge support */}
              <div className="relative flex items-center justify-center">
                <IconComponent
                  size={
                    variant === 'compact'
                      ? 20
                      : item.label === 'Create'
                        ? 36
                        : 24
                  }
                  className={cn(
                    'transition-colors duration-200',
                    isItemActive ? 'text-nav-item-active' : 'text-nav-item',
                    item.label === 'Create' &&
                      'bg-secondary rounded-b-lg rounded-l-lg',
                    itemClassName && item.className,
                  )}
                  strokeWidth={isItemActive ? 2.5 : 2}
                />

                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span
                    className={cn(
                      'absolute -right-1 -top-1',
                      'flex items-center justify-center',
                      'h-[18px] min-w-[18px] px-1',
                      'bg-red-500 text-xs font-medium text-white',
                      'border-nav-background rounded-full border-2',
                      // 'animate-pulse',
                    )}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <span
                  className={cn(
                    'text-muted-foreground mt-1 text-[10px] font-medium leading-none',
                    'transition-colors duration-200',
                    'max-w-[60px] truncate',
                    variant === 'compact' && 'mt-0.5 text-[10px]',
                    isItemActive ? 'text-nav-item-active' : 'text-nav-item',
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Active indicator line */}
              {isItemActive && (
                <div
                  className={cn(
                    'absolute -top-[1px] left-1/2 -translate-x-1/2 transform',
                    'bg-nav-item-active h-0.5 w-8 rounded-full',
                    'animate-in slide-in-from-top-1 duration-200',
                  )}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
