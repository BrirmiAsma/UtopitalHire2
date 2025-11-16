import { MessageSquare, Briefcase, Sparkles, FileText, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import ModuleCard from '@/components/dashboard/ModuleCard';

export const metadata = {
  title: 'Dashboard - UtopiaHire',
  description: 'Access your AI-powered career tools',
};

const modules = [
  {
    id: 'interview',
    title: 'Interview Simulation',
    description: 'Practice interviews with AI-powered simulations. Get real-time feedback and improve your confidence.',
    icon: MessageSquare,
    href: '/dashboard/interview',
    color: 'from-[#D4A574] to-[#ED8936]',
  },
  {
    id: 'job-matching',
    title: 'Job Matching',
    description: 'Find opportunities that match your skills and aspirations across Africa and MENA regions.',
    icon: Briefcase,
    href: '/dashboard/job-matching',
    color: 'from-[#2C7A7B] to-[#3182CE]',
  },
  {
    id: 'enhancement',
    title: 'CV Generator',
    description: 'Get detailed analysis of your CV with actionable recommendations for improvement.',
    icon: Sparkles,
    href: '/dashboard/enhancement',
    color: 'from-[#38A169] to-[#48BB78]',
  },
  {
    id: 'cv-analyzer',
    title: 'Enhancement',
    description: 'Enhance your professional profile with AI-driven suggestions and regional insights.',
    icon: FileText,
    href: '/dashboard/cv-analyzer',
    color: 'from-[#3182CE] to-[#805AD5]',
  },
  {
    id: 'behavior',
    title: 'Career Insights',
    description: 'Understand career trends and behaviors that lead to success in your field.',
    icon: TrendingUp,
    href: '/dashboard/behavior',
    color: 'from-[#805AD5] to-[#9F7AEA]',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <WelcomeHero />
      
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-[#2D3748] mb-2">
            Your Career Modules
          </h2>
          <p className="text-[#2D3748]/70">
            Select a module to start building your career success story
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slideUp">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              href={module.href}
              color={module.color}
            />
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-br from-[#D4A574]/10 to-[#2C7A7B]/10 rounded-2xl p-8 border border-[#E2E8F0] animate-slideUp delay-100">
          <h3 className="text-xl font-bold text-[#2D3748] mb-3">
            💡 Getting Started Tips
          </h3>
          <ul className="space-y-2 text-[#2D3748]/70">
            <li className="flex items-start gap-2">
              <span className="text-[#38A169] mt-1">✓</span>
              <span>Start with the <strong>CV Generator</strong> to understand your current profile strength</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#38A169] mt-1">✓</span>
              <span>Use <strong>Interview Simulation</strong> to prepare for upcoming opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#38A169] mt-1">✓</span>
              <span>Explore <strong>Job Matching</strong> to discover relevant positions in your region</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#38A169] mt-1">✓</span>
              <span>Check <strong>Career Insights</strong> regularly for industry trends and tips</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
