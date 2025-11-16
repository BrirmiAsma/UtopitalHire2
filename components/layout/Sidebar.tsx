'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Briefcase, Sparkles, FileText, TrendingUp, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  { id: 'profile', title: 'Profile', icon: User, href: '/dashboard/profile', color: 'from-[#3182CE] to-[#805AD5]' },
  { id: 'interview', title: 'Interview', icon: MessageSquare, href: '/dashboard/interview', color: 'from-[#D4A574] to-[#ED8936]' },
  { id: 'job-matching', title: 'Job Matching', icon: Briefcase, href: '/dashboard/job-matching', color: 'from-[#2C7A7B] to-[#3182CE]' },
  { id: 'enhancement', title: 'CV Generator', icon: Sparkles, href: '/dashboard/enhancement', color: 'from-[#38A169] to-[#48BB78]' },
  { id: 'cv-analyzer', title: 'Enhancement', icon: FileText, href: '/dashboard/cv-analyzer', color: 'from-[#3182CE] to-[#805AD5]' },
  { id: 'behavior', title: 'Behavior', icon: TrendingUp, href: '/dashboard/behavior', color: 'from-[#805AD5] to-[#9F7AEA]' },
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#E2E8F0]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4A574] to-[#2C7A7B] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D3748]">UtopiaHire</h2>
            <p className="text-xs text-[#2D3748]/60">Career Platform</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6" aria-label="Dashboard navigation">
        <ul className="space-y-2 px-4">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = pathname === module.href;
            
            return (
              <li key={module.id}>
                <Link
                  href={module.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-[#2C7A7B] to-[#38A169] text-white shadow-lg'
                      : 'text-[#2D3748] hover:bg-[#E2E8F0]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110',
                    isActive ? 'bg-white/20' : `bg-gradient-to-br ${module.color}`
                  )}>
                    <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-white')} />
                  </div>
                  <span className="font-medium">{module.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-[#E2E8F0]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#2D3748] hover:bg-[#E2E8F0] transition-colors"
        >
          <LogOut className="w-5 h-5 text-[#ED8936]" />
          <span className="font-medium">Sign Out</span>
        </Link>
        
        <div className="mt-4 bg-gradient-to-r from-[#D4A574]/10 to-[#2C7A7B]/10 rounded-lg p-4">
          <p className="text-xs text-[#2D3748]/70 mb-1">
            Powered by Ethical AI
          </p>
          <p className="text-xs text-[#2C7A7B] font-medium">
            Fair & Inclusive Employment
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-40 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open sidebar"
        aria-expanded={isMobileOpen}
      >
        <Menu className="w-6 h-6 text-[#2C7A7B]" />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-out lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 rounded-lg hover:bg-[#E2E8F0] transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 text-[#2D3748]" />
        </button>
        <SidebarContent />
      </aside>

      <aside className="hidden lg:block fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
