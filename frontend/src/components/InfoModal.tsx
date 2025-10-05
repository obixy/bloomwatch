import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';
import { Button } from './ui/button';

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function InfoModal({
  open,
  onOpenChange,
  title,
  description,
  buttonLabel = 'Fechar',
  onButtonClick,
}: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-600 dark:text-cyan-300">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-4 text-neutral-700 dark:text-neutral-300">
          {description}
        </DialogDescription>
        <DialogClose asChild>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2 rounded-lg"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
