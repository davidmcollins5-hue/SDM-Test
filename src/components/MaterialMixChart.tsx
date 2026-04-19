import React from 'react';
import { Visualizer } from './Visualizer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const MATERIAL_COLORS: Record<string, string> = {
  'Virgin Plastics': '#344e41', // Forest (Darkest for Virgin)
  'rPET / rHDPE': '#5a6e5a',    // Sage (Medium for Recycled)
  'Fiber / Pulp': '#a3b18a',    // Olive (Lightest/Organic for Fiber)
  'Aluminum': '#d4a373',        // Tan (Metallic/Secondary)
  'Other': '#dad7cd',           // Light Neutral
};

const DEFAULT_COLOR = '#dad7cd';

interface MaterialMixData {
  name: string;
  value: number;
}

interface MaterialMixChartProps {
  data: MaterialMixData[];
  title?: string;
  description?: string;
}

export const MaterialMixChart: React.FC<MaterialMixChartProps> = ({ 
  data, 
  title = "Global Material Mix", 
  description = "Enterprise Aggregate Mix" 
}) => {
  // Sort or map colors specifically to names
  const chartColors = data.map(item => MATERIAL_COLORS[item.name] || DEFAULT_COLOR);

  return (
    <Card className="rounded-2xl border-none shadow-sm bg-white border border-[#eceee9] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0 pb-8">
        <div className="relative w-full">
          <Visualizer 
            type="pie"
            data={data}
            dataKey="value"
            colors={chartColors}
            height={240}
            showTooltip={true}
            showLegend={false} // We'll build a custom themed legend for better Natural Tones integration
          />
          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</span>
            <span className="text-xl font-mono font-bold text-foreground">100%</span>
          </div>
        </div>

        {/* Custom Natural Tones Legend */}
        <div className="grid grid-cols-1 gap-2 w-full px-4 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2 border-b border-[#f0f2ef] last:border-none group">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300" 
                  style={{ backgroundColor: MATERIAL_COLORS[item.name] || DEFAULT_COLOR }} 
                />
                <span className="text-[11px] font-bold text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-mono font-bold text-foreground">{item.value}</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase">%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
