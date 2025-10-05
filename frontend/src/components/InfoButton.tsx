import { Info } from 'lucide-react';
import { Button } from './ui/button';

interface InfoButtonProps {
  onClick?: () => void;
  className?: string;
}

export function InfoButton({ onClick, className }: InfoButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={className || 'p-2 rounded-lg'}
      onClick={onClick}
      aria-label="Informações"
    >
      <Info />
    </Button>
  );
}
