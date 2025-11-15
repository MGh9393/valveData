import * as XLSX from 'xlsx';
import { SheetData, ValveData } from '@/types/valve';

export const parseExcelFile = async (file: File): Promise<SheetData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        const sheets: SheetData[] = workbook.SheetNames.map((sheetName, index) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
          
          if (jsonData.length === 0) {
            return {
              name: sheetName,
              title: getSheetTitle(index),
              data: [],
              headers: []
            };
          }
          
          // First row is headers
          const headers = jsonData[0] as string[];
          
          // Find the tag column index
          const tagColumnIndex = headers.findIndex(h => 
            h && (h.includes('Tag') || h.includes('تگ'))
          );
          
          // Convert rows to objects
          const data: ValveData[] = jsonData.slice(1)
            .filter(row => row && row[tagColumnIndex]) // Only include rows with a tag
            .map(row => {
              const obj: ValveData = {
                tag: row[tagColumnIndex] || ''
              };
              
              headers.forEach((header, index) => {
                if (header && row[index] !== undefined && row[index] !== null) {
                  obj[header] = row[index];
                }
              });
              
              return obj;
            });
          
          return {
            name: sheetName,
            title: getSheetTitle(index),
            data,
            headers: headers.filter(h => h)
          };
        });
        
        resolve(sheets);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};

const getSheetTitle = (index: number): string => {
  const titles = [
    'ولوهای کنترل - Control Valves',
    'ولوهای تنظیم خودکار - Self Regulator Valves',
    'ولوهای کنترل (دسته دوم) - Control Valves (Set 2)'
  ];
  return titles[index] || `Sheet ${index + 1}`;
};
