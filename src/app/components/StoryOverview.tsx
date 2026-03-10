import { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

const DISMISSED_KEY = 'vlr-story-overview-dismissed';

const chapters = [
  { number: 1, title: 'Coverage', summary: '5 SDGs consume 73% of all VLR content while 12 share just 27%.' },
  { number: 2, title: 'Policies', summary: 'No two regions share the same top policy priority, but a hidden consensus emerges.' },
  { number: 3, title: 'Challenges', summary: 'The #1 barrier isn\'t money — it\'s governance coordination. Wealthier regions have it worse.' },
  { number: 4, title: 'Commitments', summary: '11 of 17 SDGs have large gaps between challenges and commitments. 53% are plans about plans.' },
  { number: 5, title: 'Themes', summary: 'Global South cities lead the next wave of urban innovation. A quiet revolution.' },
];

interface StoryOverviewProps {
  variant: 'hero' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
}

export function StoryOverview({ variant, isOpen, onClose }: StoryOverviewProps) {
  const [dismissed, setDismissed] = useState(() => {
    if (variant === 'modal') return false;
    try { return localStorage.getItem(DISMISSED_KEY) === 'true'; } catch { return false; }
  });

  if (variant === 'hero' && dismissed) return null;

  if (variant === 'modal' && !isOpen) return null;

  const handleDismiss = () => {
    if (variant === 'hero') {
      localStorage.setItem(DISMISSED_KEY, 'true');
      setDismissed(true);
    }
    onClose?.();
  };

  const content = (
    <div className="bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-2xl px-8 py-8 mb-6 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-blue-200 hover:text-white transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label="Dismiss story overview"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-blue-200" aria-hidden="true" />
        <h2 className="text-xl font-bold text-white">The Global Sustainability Paradox</h2>
      </div>

      <p className="text-blue-100 text-base leading-relaxed mb-6 max-w-3xl">
        The VLR Observatory tells a 5-chapter story about how the world's cities are — and aren't —
        delivering on the Sustainable Development Goals. The regions that look strongest on paper are
        often the weakest in practice, while the regions dismissed as "developing" are quietly
        pioneering the future.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {chapters.map((ch) => (
          <div key={ch.number} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
            <div className="text-[#F59E0B] text-xs font-bold mb-1">Chapter {ch.number}</div>
            <div className="text-white font-semibold text-sm mb-1">{ch.title}</div>
            <p className="text-blue-200 text-xs leading-snug">{ch.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleDismiss}>
        <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>
    );
  }

  return content;
}
