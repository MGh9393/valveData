import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SheetData } from '@/types/valve';
import { TagItem } from './TagItem';
import { ValveDetailDialog } from './ValveDetailDialog';

interface SheetCardProps {
  sheet: SheetData;
  colorVariant?: 'cyan' | 'purple' | 'orange';
}

export const SheetCard = ({ sheet, colorVariant = 'cyan' }: SheetCardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<any>(null);

  const filteredData = sheet.data.filter(item =>
    item.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const borderColor = colorVariant === 'cyan' ? 'border-card-cyan-border' : 
                      colorVariant === 'purple' ? 'border-card-purple-border' : 
                      'border-card-orange-border';
  
  const headerBgColor = colorVariant === 'cyan' ? 'bg-tech-cyan/10 border-tech-cyan/30' : 
                        colorVariant === 'purple' ? 'bg-tech-purple/10 border-tech-purple/30' : 
                        'bg-tech-orange/10 border-tech-orange/30';
  
  const headerTextColor = colorVariant === 'cyan' ? 'text-tech-cyan' : 
                          colorVariant === 'purple' ? 'text-tech-purple' : 
                          'text-tech-orange';

  return (
    <>
      <Card className={`h-full flex flex-col border-2 ${borderColor} shadow-lg shadow-${colorVariant === 'cyan' ? 'tech-cyan' : colorVariant === 'purple' ? 'tech-purple' : 'tech-orange'}/5`}>
        <CardHeader className={`${headerBgColor} border-b`}>
          <CardTitle className={`text-right text-lg font-bold ${headerTextColor}`}>{sheet.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pt-6">
          <div className="relative mb-4" dir="rtl">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="جستجو بر اساس تگ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right"
            />
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredData.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {searchQuery ? 'نتیجه‌ای یافت نشد' : 'داده‌ای موجود نیست'}
              </p>
            ) : (
              filteredData.map((item, index) => (
                <TagItem
                  key={index}
                  tag={item.tag}
                  onClick={() => setSelectedTag(item)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ValveDetailDialog
        isOpen={!!selectedTag}
        onClose={() => setSelectedTag(null)}
        data={selectedTag}
        headers={sheet.headers}
      />
    </>
  );
};
