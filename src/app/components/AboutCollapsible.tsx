import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Info } from 'lucide-react';

interface AboutCollapsibleProps {
  strategicValue: string[];
  methodology?: string;
}

export function AboutCollapsible({ strategicValue, methodology }: AboutCollapsibleProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm mb-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="about" className="border-none">
          <AccordionTrigger className="px-6 py-4 text-base font-semibold text-[#1E3A8A] hover:no-underline">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4" aria-hidden="true" />
              About This Analysis
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <div className="space-y-4 pb-2">
              <div>
                <h4 className="text-sm font-semibold text-[#1E3A8A] mb-2">Strategic Value</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                  {strategicValue.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              {methodology && (
                <div>
                  <h4 className="text-sm font-semibold text-[#1E3A8A] mb-2">Methodology</h4>
                  <p className="text-sm text-slate-600">{methodology}</p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
