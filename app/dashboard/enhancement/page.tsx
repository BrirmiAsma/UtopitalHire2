'use client';

import { Sparkles } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CVGeneratorChat from '@/components/cv-generator/CVGeneratorChat';

export default function EnhancementPage() {
  return (
    <DashboardLayout>
      <div className="px-6 sm:px-8 lg:px-12 py-12 h-[calc(100vh-80px)] flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#38A169] to-[#48BB78] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748]">
                CV Generator
              </h1>
              <p className="text-[#2D3748]/70">
                Answer a few questions and we'll create a professional CV for you
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <CVGeneratorChat />
        </div>
      </div>
    </DashboardLayout>
  );
}
