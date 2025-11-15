export interface ValveData {
  tag: string;
  [key: string]: any;
}

export interface SheetData {
  name: string;
  title: string;
  data: ValveData[];
  headers: string[];
}
