import { Button } from '@/components/ui/button';
import { Minus, Plus, RefreshCcw } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: ZoomControlsProps) {
  return (
    <div className="absolute right-4 top-4 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-2xl p-2 flex flex-col gap-2">
      <Button
        variant="ghost"
        className="text-white hover:bg-white/20 w-10 h-10"
        onClick={onZoomIn}
      >
        <Plus />
      </Button>
      <Button
        variant="ghost"
        className="text-white hover:bg-white/20 w-10 h-10"
        onClick={onZoomOut}
      >
        <Minus />
      </Button>
      <Button
        variant="ghost"
        className="text-white hover:bg-white/20 w-10 h-10 text-xs"
        onClick={onReset}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
}
