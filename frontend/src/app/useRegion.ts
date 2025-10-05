import { useContext } from 'react';
import { RegionContext } from './RegionContext';

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context)
    throw new Error('useRegion deve ser usado dentro do RegionProvider');
  return context;
}
