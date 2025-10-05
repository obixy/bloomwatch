import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Region } from '../lib/regionsData';
import { regions } from '../lib/regionsData';
import { RegionContext } from './RegionContextInstance';

export function RegionProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export { RegionContext };
