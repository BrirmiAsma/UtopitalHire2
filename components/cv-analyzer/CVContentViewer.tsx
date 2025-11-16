'use client';

import { FileText } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CVSection {
  id: string;
  title: string;
  content: string;
  isModified?: boolean;
}

interface CVContentViewerProps {
  sections: CVSection[];
  fileName: string;
}

export default function CVContentViewer({ sections, fileName }: CVContentViewerProps) {
  const handleDownload = () => {
    const content = sections
      .map(
        (section) => `${section.title.toUpperCase()}\n${section.content}\n`
      )
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = fileName || 'cv';
    a.download = `${baseName.replace(/\.[^/.]+$/, '')}-enhanced.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3182CE] to-[#805AD5] rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#2D3748]">CV Content</h3>
            <p className="text-xs text-[#2D3748]/70">{fileName}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          Download
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="animate-slideUp">
            <h4 className="text-base font-bold text-[#2D3748] mb-2 uppercase tracking-wide">
              {section.title}
            </h4>
            <div
              className={`text-sm text-[#2D3748] leading-relaxed whitespace-pre-wrap ${
                section.isModified ? 'bg-green-50 border-l-4 border-green-400 pl-3 py-2 rounded' : ''
              }`}
            >
              {section.content}
            </div>
            {section.isModified && (
              <p className="text-xs text-[#38A169] mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Updated
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}



