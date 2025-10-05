import { createContext } from 'react';
import type { Region } from '../lib/regionsData';

export interface RegionContextType {
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
}

export const RegionContext = createContext<RegionContextType | undefined>(
  undefined
);
