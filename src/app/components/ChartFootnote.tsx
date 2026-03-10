interface ChartFootnoteProps {
  n?: number;
  source?: string;
}

export function ChartFootnote({ n, source = 'VLR Observatory' }: ChartFootnoteProps) {
  return (
    <p className="text-xs text-slate-500 mt-3">
      Source: {source}{n != null ? `, N=${n} reports` : ''}, 2018-2025
    </p>
  );
}
