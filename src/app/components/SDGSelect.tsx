import { getSDGName } from './data/constants';

interface SDGSelectProps {
  value: number;
  onChange: (sdg: number) => void;
  label?: string;
}

export function SDGSelect({ value, onChange, label = 'Select SDG' }: SDGSelectProps) {
  return (
    <div className="mb-6">
      <label htmlFor="sdg-select" className="block text-sm font-medium text-[#1E3A8A] mb-1.5">
        {label}
      </label>
      <select
        id="sdg-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="min-h-[44px] px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] w-full max-w-sm"
      >
        {Array.from({ length: 17 }, (_, i) => i + 1).map(sdg => (
          <option key={sdg} value={sdg}>
            SDG {sdg} — {getSDGName(sdg)}
          </option>
        ))}
      </select>
    </div>
  );
}
