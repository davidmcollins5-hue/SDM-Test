import { MATERIALS } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Layers, 
  Droplets, 
  Leaf, 
  AlertCircle,
  Database
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MaterialsModule() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Registry / Substrates
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Materials</h1>
          <p className="text-sm text-zinc-500">Manage approved raw materials and their environmental impact factors.</p>
        </div>
        <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2">
          <Plus className="w-4 h-4" /> Add Material
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {MATERIALS.map((mat) => (
          <Card key={mat.id} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow group overflow-hidden">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 p-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-white border-zinc-200 text-zinc-500 text-[9px] font-bold uppercase tracking-widest">{mat.type}</Badge>
                <div className="text-[10px] text-zinc-400 font-mono">{mat.id}</div>
              </div>
              <CardTitle className="text-sm font-semibold mt-3 text-zinc-900 group-hover:text-blue-600 transition-colors">{mat.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-tighter text-zinc-400 flex items-center gap-1.5">
                      <Leaf className="w-3 h-3 text-green-500" /> PCR Content
                    </span>
                    <span className="text-xs font-mono font-medium text-zinc-900">{mat.pcrPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000" 
                      style={{ width: `${mat.pcrPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-50 rounded-lg">
                    <div className="text-[9px] uppercase font-bold text-zinc-400 tracking-tight flex items-center gap-1 mb-1">
                      <Layers className="w-3 h-3" /> Density
                    </div>
                    <div className="text-sm font-mono font-semibold text-zinc-900 leading-none">{mat.density} <span className="text-[10px] text-zinc-400 font-normal">kg/m³</span></div>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-lg">
                    <div className="text-[9px] uppercase font-bold text-zinc-400 tracking-tight flex items-center gap-1 mb-1">
                      <Droplets className="w-3 h-3" /> CO2e
                    </div>
                    <div className="text-sm font-mono font-semibold text-zinc-900 leading-none">{mat.carbonFactor} <span className="text-[10px] text-zinc-400 font-normal">kg/kg</span></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-50 flex items-center justify-between">
                <Badge variant="outline" className="text-[9px] font-bold h-5 px-1.5 text-zinc-500 bg-white">
                  Score: {mat.recyclabilityScore}%
                </Badge>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900">
                  View LCA
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <button className="border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center p-8 gap-3 text-zinc-400 hover:border-zinc-300 hover:bg-zinc-50 transition-all group">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-white border border-zinc-100 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest">Register Substrate</div>
        </button>
      </div>

      <Card className="border-none shadow-sm bg-white mt-4">
        <CardHeader className="border-b border-zinc-50">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-zinc-400" /> Pre-loaded Taxonomy
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            {['Plastics (PET, HDPE, PP)', 'Fiber (Corrugated, Paper)', 'Glass (Flint, Amber)', 'Metals (Aluminum, Steel)'].map((tax) => (
              <div key={tax} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-zinc-600 font-medium">{tax}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
