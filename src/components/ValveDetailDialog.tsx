import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ValveDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  headers: string[];
}

export const ValveDetailDialog = ({ isOpen, onClose, data, headers }: ValveDetailDialogProps) => {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">
            جزئیات تگ: <span className="text-primary">{data.tag}</span>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {headers.map((header, index) => {
              const value = data[header];
              if (!value || header === data.tag) return null;

              return (
                  <div
                      key={index}
                      className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                  >
                    {/* Header (line 1) */}
                    <div className="font-semibold text-secondary-foreground mb-2 text-right" style={{ direction: "rtl", unicodeBidi: "plaintext" }}>
                      {header}
                    </div>

                    {/* Value (line 2) */}
                    <div className="text-foreground text-right" style={{ direction: "rtl", unicodeBidi: "plaintext" }}>
                      {value}
                    </div>
                  </div>
              );
            })}

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
