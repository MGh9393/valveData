import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast.error('لطفا یک فایل Excel انتخاب کنید');
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg bg-card hover:bg-muted/50 transition-colors">
      <Upload className="w-16 h-16 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">آپلود فایل Excel</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        فایل Excel خود را انتخاب کنید تا داده‌های ولوها نمایش داده شود
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button 
        onClick={() => fileInputRef.current?.click()}
        size="lg"
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        انتخاب فایل
      </Button>
    </div>
  );
};
