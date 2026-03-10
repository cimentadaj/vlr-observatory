interface InsightBannerProps {
  headline: string;
  subtitle?: string;
  previousContext?: string;
}

export function InsightBanner({ headline, subtitle, previousContext }: InsightBannerProps) {
  return (
    <div className="bg-[#1E40AF] rounded-2xl px-8 py-6 mb-6" role="region" aria-label="Key insight">
      <p className="text-white text-xl font-semibold leading-relaxed">
        {headline}
      </p>
      {subtitle && (
        <p className="text-blue-200 text-base mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
      {previousContext && (
        <p className="text-blue-200 text-sm mt-3 italic">
          Previously: {previousContext}
        </p>
      )}
    </div>
  );
}
