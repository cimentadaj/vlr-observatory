import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

interface StoryThreadCardProps {
  question: string;
  to: string;
}

export function StoryThreadCard({ question, to }: StoryThreadCardProps) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-2xl border border-slate-200/60 shadow-sm px-6 py-5 mb-6 group hover:border-[#3B82F6]/40 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-[#1E3A8A] group-hover:text-[#1E40AF]">
          {question}
        </p>
        <ArrowRight className="w-5 h-5 text-[#3B82F6] group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" aria-hidden="true" />
      </div>
    </Link>
  );
}
