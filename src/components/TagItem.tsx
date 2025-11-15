import { ChevronLeft } from 'lucide-react';

interface TagItemProps {
  tag: string;
  onClick: () => void;
}

export const TagItem = ({ tag, onClick }: TagItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-lg bg-tag-bg border border-tag-border hover:bg-hover-bg transition-all hover:shadow-md group"
      dir="rtl"
    >
      <span className="font-medium text-foreground">{tag}</span>
      <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
};
