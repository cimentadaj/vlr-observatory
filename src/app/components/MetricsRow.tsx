import type { LucideIcon } from 'lucide-react';

interface Metric {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
}

interface MetricsRowProps {
  metrics: Metric[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" role="group" aria-label="Key metrics">
      {metrics.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm px-6 py-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5 text-[#3B82F6]" aria-hidden="true" />
              <span className="text-base text-slate-500">{metric.label}</span>
            </div>
            <div className="text-4xl font-bold text-[#1E3A8A]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {metric.value}
            </div>
            {metric.trend && (
              <p className="text-sm text-slate-500 mt-1">{metric.trend}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
