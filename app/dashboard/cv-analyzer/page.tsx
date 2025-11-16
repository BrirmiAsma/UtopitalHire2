'use client';

import { FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CVAnalyzerInterface from '@/components/cv-analyzer/CVAnalyzerInterface';

export default function CVAnalyzerPage() {
  return (
    <DashboardLayout>
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3182CE] to-[#805AD5] rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#2D3748]">
                Enhancement
              </h1>
              <p className="text-[#2D3748]/70">
                Enhance your professional profile with AI-driven suggestions and regional insights.
              </p>
            </div>
          </div>
        </div>
        
        <CVAnalyzerInterface />
      </div>
    </DashboardLayout>
  );
}
