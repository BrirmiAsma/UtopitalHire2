'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Download, User, Briefcase, GraduationCap, Code, MessageSquare, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  isLoading?: boolean;
};

type CVData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  experiences: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
};

const initialCVData: CVData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  summary: '',
  experiences: [],
  education: [],
  skills: [],
};

const initialQuestions = [
  { 
    id: 'name', 
    question: "What's your full name?",
    field: 'name',
    icon: <User className="w-5 h-5 text-[#38A169]" />
  },
  { 
    id: 'title', 
    question: "What's your professional title? (e.g., 'Senior Software Engineer')",
    field: 'title',
    icon: <Briefcase className="w-5 h-5 text-[#3182CE]" />
  },
  { 
    id: 'email', 
    question: "What's your email address?",
    field: 'email',
    icon: <MessageSquare className="w-5 h-5 text-[#805AD5]" />
  },
  { 
    id: 'phone', 
    question: "What's your phone number?",
    field: 'phone',
    icon: <MessageSquare className="w-5 h-5 text-[#805AD5]" />
  },
  { 
    id: 'summary', 
    question: "Can you give a brief professional summary about yourself? (2-3 sentences)",
    field: 'summary',
    icon: <Sparkles className="w-5 h-5 text-[#D69E2E]" />
  },
];

export default function CVGeneratorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: 'Welcome to the CV Generator! I\'ll help you create a professional CV. Let\'s start with some basic information.',
        isUser: false,
      },
      {
        id: '2',
        content: initialQuestions[0].question,
        isUser: false,
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Update CV data with the answer
    const currentQuestion = initialQuestions[currentQuestionIndex];
    const updatedCVData = { ...cvData, [currentQuestion.field]: inputValue };
    setCvData(updatedCVData);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Move to next question or complete
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < initialQuestions.length) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: initialQuestions[nextIndex].question,
          isUser: false,
        },
      ]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      // All questions answered, show completion message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Great! I have all the information I need. Ready to generate your CV?',
          isUser: false,
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleGenerateCV = async () => {
    try {
      setIsLoading(true);
      
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Set font and size for the title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(45, 55, 72); // Dark gray color
      
      // Add name as title
      doc.text(cvData.name || 'Your Name', 20, 30);
      
      // Add title
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.setTextColor(74, 85, 104); // Slightly lighter gray
      doc.text(cvData.title || 'Professional Title', 20, 40);
      
      // Add contact information
      doc.setFontSize(10);
      doc.setTextColor(100, 110, 120); // Even lighter gray
      doc.text(`${cvData.email} | ${cvData.phone}`, 20, 50);
      
      // Add a line
      doc.setDrawColor(56, 161, 105); // Green color
      doc.setLineWidth(0.5);
      doc.line(20, 55, 190, 55);
      
      // Add summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(45, 55, 72);
      doc.text('PROFESSIONAL SUMMARY', 20, 70);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(cvData.summary || 'Experienced professional with a strong background in the field.', 170);
      doc.text(splitText, 20, 80);
      
      // Add experience section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('EXPERIENCE', 20, 110);
      
      // Add sample experience (you can expand this with actual data)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Your Experience Will Appear Here', 20, 120);
      
      // Add education section
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', 20, 140);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Your Education Will Appear Here', 20, 150);
      
      // Add skills section
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', 20, 170);
      
      doc.setFont('helvetica', 'normal');
      doc.text('Your Skills Will Appear Here', 20, 180);
      
      // Save the PDF
      doc.save('generated-cv.pdf');
      
      // Show success message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: 'Your CV has been generated and downloaded!',
          isUser: false,
        },
      ]);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: 'Sorry, there was an error generating your CV. Please try again.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-2xl px-4 py-3 ${
                message.isUser
                  ? 'bg-[#3182CE] text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {!message.isUser && (
                  <div className="w-6 h-6 rounded-full bg-[#38A169] flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="font-semibold">
                  {message.isUser ? 'You' : 'CV Assistant'}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.id === messages[messages.length - 1].id && 
               !message.isUser && 
               currentQuestionIndex >= initialQuestions.length - 1 && (
                <div className="mt-4">
                  <Button 
                    onClick={handleGenerateCV}
                    disabled={isLoading}
                    className="bg-[#38A169] hover:bg-[#2F855A] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Generate CV PDF
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {currentQuestionIndex < initialQuestions.length && (
                <div className="text-gray-400">
                  {initialQuestions[currentQuestionIndex].icon}
                </div>
              )}
            </div>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentQuestionIndex < initialQuestions.length 
                ? `Type your ${initialQuestions[currentQuestionIndex].field}...` 
                : 'Type your message...'}
              className="w-full border border-gray-300 rounded-2xl py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '200px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-[#3182CE] text-white rounded-full hover:bg-[#2C5282] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Your information is processed securely and never shared.
        </p>
      </div>
    </div>
  );
}
