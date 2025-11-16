'use client';

import { Check, X, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Suggestion {
  id: string;
  section: string;
  originalText: string;
  enhancedText: string;
  reason?: string;
}

interface CVSuggestionCardProps {
  suggestion: Suggestion;
  onAccept: (id: string) => void;
  onReject?: (id: string) => void;
  isAccepted?: boolean;
}

export default function CVSuggestionCard({
  suggestion,
  onAccept,
  onReject,
  isAccepted = false,
}: CVSuggestionCardProps) {
  return (
    <Card className={`transition-all ${isAccepted ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-[#3182CE] to-[#805AD5] rounded-lg flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#2D3748] mb-1">{suggestion.section}</h4>
          {suggestion.reason && (
            <p className="text-xs text-[#2D3748]/60 mb-3">{suggestion.reason}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Original Text */}
        <div>
          <p className="text-xs font-medium text-[#2D3748]/70 mb-2">Current:</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-900 line-through">{suggestion.originalText}</p>
          </div>
        </div>

        {/* Enhanced Text */}
        <div>
          <p className="text-xs font-medium text-[#2D3748]/70 mb-2">Suggested:</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-900 font-medium">{suggestion.enhancedText}</p>
          </div>
        </div>
      </div>

      {!isAccepted && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAccept(suggestion.id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Accept Changes
          </Button>
          {onReject && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(suggestion.id)}
              className="flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {isAccepted && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#38A169]">
          <Check className="w-4 h-4" />
          <span>Changes applied</span>
        </div>
      )}
    </Card>
  );
}



