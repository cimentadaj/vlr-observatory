import { useLocation } from 'react-router';
import { useFilters } from './FilterContext';
import { REGIONS } from './data/constants';

const steps = [
  { label: '1. Coverage', path: '/' },
  { label: '2. Policies', path: '/policy-recommendations' },
  { label: '3. Challenges', path: '/challenges-barriers' },
  { label: '4. Commitments', path: '/commitment-statements' },
  { label: '5. Themes', path: '/emerging-themes' },
];

const periods = [
  { value: 'All', label: 'All Years' },
  { value: '2018-2020', label: '2018-2020' },
  { value: '2020-2021', label: '2020-2021' },
  { value: '2022-2025', label: '2022-2025' },
] as const;

export function GlobalFilterBar() {
  const { region, setRegion, period, setPeriod } = useFilters();
  const location = useLocation();

  const currentStepIndex = steps.findIndex(s =>
    s.path === '/' ? location.pathname === '/' : location.pathname.startsWith(s.path)
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-100 px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center gap-6 flex-wrap">
        {/* Region filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="region-filter" className="text-xs font-medium text-slate-500 whitespace-nowrap">Region</label>
          <select
            id="region-filter"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="min-h-[44px] px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <option value="All">All Regions</option>
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Period filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="period-filter" className="text-xs font-medium text-slate-500 whitespace-nowrap">Period</label>
          <select
            id="period-filter"
            value={period}
            onChange={(e) => setPeriod(e.target.value as typeof period)}
            className="min-h-[44px] px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Story progress stepper */}
        <div className="flex items-center gap-1 ml-auto" role="navigation" aria-label="Story progress">
          {steps.map((step, i) => (
            <div key={step.path} className="flex items-center">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap ${
                  i === currentStepIndex
                    ? 'bg-[#1E40AF] text-white'
                    : i < currentStepIndex
                    ? 'text-[#3B82F6]'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <span className={`mx-0.5 text-xs ${i < currentStepIndex ? 'text-[#3B82F6]' : 'text-slate-300'}`}>
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Data currency */}
        <span className="text-xs text-slate-400 whitespace-nowrap">Data as of: March 2025</span>
      </div>
    </div>
  );
}
