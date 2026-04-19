import { useState } from 'react';
import { SKUS, PACKAGING_COMPONENTS, MATERIALS } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronDown, 
  Box, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2,
  Package,
  Layers,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function SKUBomModule() {
  const [selectedSkuId, setSelectedSkuId] = useState(SKUS[0].id);
  const [unit, setUnit] = useState<'g' | 'kg'>('g');
  const selectedSku = SKUS.find(s => s.id === selectedSkuId)!;

  // Calculate total packaging weight
  const totalPkgWeight = selectedSku.components.reduce((acc, c) => {
    const comp = PACKAGING_COMPONENTS.find(pc => pc.id === c.componentId);
    return acc + (comp ? comp.weight * c.quantity : 0);
  }, 0);

  const pkgToProductRatio = (totalPkgWeight / (selectedSku.productWeight + totalPkgWeight)) * 100;

  const formatWeight = (weightInGrams: number) => {
    if (unit === 'kg') {
      return `${(weightInGrams / 1000).toFixed(3)} kg`;
    }
    return `${weightInGrams.toFixed(1)} g`;
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Registry / SKU BOM
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{selectedSku.name}</h1>
          <div className="text-zinc-500 font-mono text-sm">{selectedSku.skuNumber}</div>
        </div>

        <div className="flex items-center bg-white border border-[#e2e8e1] p-1 rounded-xl shadow-sm self-start">
          <button 
            onClick={() => setUnit('g')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              unit === 'g' ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-[#f4f7f4]"
            )}
          >
            Grams
          </button>
          <button 
            onClick={() => setUnit('kg')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              unit === 'kg' ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-[#f4f7f4]"
            )}
          >
            Kilograms
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Package className="w-3 h-3 text-primary" /> Total Pkg Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-foreground">{formatWeight(totalPkgWeight)}</div>
            <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tight italic">Across all hierarchy levels</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3 h-3 text-secondary" /> Pkg to Product Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-foreground">{pkgToProductRatio.toFixed(1)} %</div>
            <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tight italic">Total payload efficiency</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm bg-[#fefae0] border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-primary" /> Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">92% Ready</div>
            <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tight">Alignment Confirmed</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden border border-[#eceee9]">
        <CardHeader className="border-b border-[#e2e8e1] bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-foreground">Hierarchy Mapping</CardTitle>
            <div className="flex gap-3">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                 <span className="w-2 h-2 rounded-full bg-primary" /> Primary
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                 <span className="w-2 h-2 rounded-full bg-secondary" /> Secondary
               </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-100">
            {/* Root Product */}
            <div className="flex items-center gap-4 p-4 bg-zinc-50/50">
              <Box className="w-5 h-5 text-zinc-400" />
              <div className="flex-1">
                <div className="font-semibold text-sm">{selectedSku.name}</div>
                <div className="text-xs text-zinc-500">Sellable Unit</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono">{formatWeight(selectedSku.productWeight)}</div>
                <div className="text-[10px] text-zinc-400 font-medium">Net Contents</div>
              </div>
            </div>

            {/* Packaging Levels */}
            {['Primary', 'Secondary', 'Tertiary'].map((level) => {
              const componentsAtLevel = selectedSku.components.filter(c => c.level === level);
              if (componentsAtLevel.length === 0) return null;

              return (
                <div key={level} className="flex flex-col">
                  <div className="px-4 py-2 bg-zinc-100/30 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{level} Packaging</span>
                  </div>
                  {componentsAtLevel.map((c, i) => {
                    const comp = PACKAGING_COMPONENTS.find(pc => pc.id === c.componentId)!;
                    const material = MATERIALS.find(m => m.id === comp.materialId)!;
                    
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 pl-10 hover:bg-zinc-50 group cursor-pointer border-l-2 border-l-transparent hover:border-l-zinc-200">
                        <div className="w-10 h-10 rounded overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                          {comp.thumbnail ? (
                            <img src={comp.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 opacity-50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-zinc-900">{comp.name}</span>
                            <Badge variant="outline" className="text-[9px] h-4 px-1 leading-none font-medium text-zinc-500">{comp.type}</Badge>
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">
                            {material.name} • {comp.dimensions}
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="text-sm font-mono text-zinc-900">{formatWeight(comp.weight * c.quantity)}</div>
                          <div className="text-[10px] text-zinc-400">Qty: {c.quantity}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
