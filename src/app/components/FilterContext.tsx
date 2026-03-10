import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { REGIONS, type Region } from './data/constants';

type Period = 'All' | '2018-2020' | '2020-2021' | '2022-2025';

interface FilterContextValue {
  region: string;
  setRegion: (region: string) => void;
  period: Period;
  setPeriod: (period: Period) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [region, setRegionState] = useState<string>(
    searchParams.get('region') || 'All'
  );
  const [period, setPeriodState] = useState<Period>(
    (searchParams.get('period') as Period) || 'All'
  );

  const setRegion = useCallback((r: string) => {
    setRegionState(r);
  }, []);

  const setPeriod = useCallback((p: Period) => {
    setPeriodState(p);
  }, []);

  // Sync state to URL query params
  useEffect(() => {
    const params = new URLSearchParams();
    if (region !== 'All') params.set('region', region);
    if (period !== 'All') params.set('period', period);
    setSearchParams(params, { replace: true });
  }, [region, period, setSearchParams]);

  return (
    <FilterContext.Provider value={{ region, setRegion, period, setPeriod }}>
      {children}
    </FilterContext.Provider>
  );
}
