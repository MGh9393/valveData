import { useState, useEffect } from 'react';
import { SheetCard } from '@/components/SheetCard';
import { parseExcelFile } from '@/utils/excelParser';
import { SheetData } from '@/types/valve';
import { toast } from 'sonner';
import { Loader2, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load factory.xlsx on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/factory.xlsx');
        const blob = await response.blob();
        const file = new File([blob], 'factory.xlsx', { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        const parsedSheets = await parseExcelFile(file);
        setSheets(parsedSheets);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('خطا در بارگذاری اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-10 shadow-lg shadow-primary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                سیستم مدیریت ولوها
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">در حال بارگذاری اطلاعات...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sheets.map((sheet, index) => {
              const colorVariants: ('cyan' | 'purple' | 'orange')[] = ['cyan', 'purple', 'orange'];
              return (
                <SheetCard 
                  key={index} 
                  sheet={sheet} 
                  colorVariant={colorVariants[index % 3]}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm space-x-2">
          سیستم مدیریت اطلاعات ولوهای صنعتی
          <span className="mx-1">|</span>
          <Link to="/about" className="underline hover:text-primary transition">
            درباره ما
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
