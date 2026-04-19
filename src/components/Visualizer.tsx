import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { cn } from '@/lib/utils';

export type ChartType = 'bar' | 'line' | 'area' | 'scatter' | 'pie';

interface ChartProps {
  type: ChartType;
  data: any[];
  dataKey: string;
  categoryKey?: string;
  colors?: string[];
  height?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  horizontal?: boolean;
  stacked?: boolean;
}

const DEFAULT_COLORS = [
  '#5a6e5a', // Sage (Primary)
  '#d4a373', // Tan (Secondary)
  '#a3b18a', // Olive (Accent)
  '#344e41', // Forest (Foreground)
  '#dad7cd', // Light Olive
  '#b5c99a', // Bright Green
];

export const Visualizer: React.FC<ChartProps> = ({
  type,
  data,
  dataKey,
  categoryKey = 'name',
  colors = DEFAULT_COLORS,
  height = 300,
  className,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  horizontal = false,
  stacked = false,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8E1" />}
            {horizontal ? (
              <>
                <XAxis type="number" axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
                <YAxis dataKey={categoryKey} type="category" axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
              </>
            ) : (
              <>
                <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
                <YAxis axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
              </>
            )}
            {showTooltip && (
              <Tooltip
                cursor={{ fill: 'rgba(244, 247, 244, 0.5)' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  border: '1px solid #ECEEE9', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />}
            <Bar 
              dataKey={dataKey} 
              fill={colors[0]} 
              radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]} 
              stackId={stacked ? 'a' : undefined}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8E1" />}
            <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            <YAxis axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            {showTooltip && (
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  border: '1px solid #ECEEE9', 
                  fontSize: '12px'
                }}
              />
            )}
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: colors[0] }} 
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8E1" />}
            <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            <YAxis axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            {showTooltip && <Tooltip />}
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              fillOpacity={1} 
              fill="url(#colorArea)" 
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'scatter':
        return (
          <ScatterChart>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E1" />}
            <XAxis type="number" dataKey="x" name="Category" axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            <YAxis type="number" dataKey="y" name="Value" axisLine={false} tickLine={false} className="text-[10px] uppercase font-bold text-muted-foreground" />
            {showTooltip && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
            <Scatter name="Data" data={data} fill={colors[0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="none" />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-2", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
