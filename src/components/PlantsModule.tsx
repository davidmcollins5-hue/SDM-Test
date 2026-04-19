import { PLANTS } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MapPin, 
  Navigation, 
  Building2, 
  Truck,
  Globe,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlantsModule() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Supply Chain / Nodes
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Plant Locations</h1>
          <p className="text-sm text-zinc-500">Map and manage manufacturing facilities, contract packers, and distribution centers.</p>
        </div>
        <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2">
          <Plus className="w-4 h-4" /> Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          {PLANTS.map((plant) => (
            <Card key={plant.id} className="border-none shadow-sm bg-white hover:bg-zinc-50/50 transition-colors group cursor-pointer overflow-hidden">
              <div className="flex">
                <div className={cn(
                  "w-1 h-auto shrink-0",
                  plant.type === 'Manufacturing' ? "bg-blue-500" :
                  plant.type === 'Distribution' ? "bg-emerald-500" : "bg-amber-500"
                )} />
                <CardContent className="flex-1 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-white border border-transparent group-hover:border-zinc-100 transition-all">
                      {plant.type === 'Manufacturing' ? <Building2 className="w-5 h-5" /> :
                       plant.type === 'Distribution' ? <Truck className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">{plant.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1 uppercase font-bold tracking-tight">
                        <MapPin className="w-3 h-3 text-zinc-300" /> {plant.city}, {plant.state}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      {plant.type}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 group-hover:text-zinc-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm bg-white relative overflow-hidden group min-h-[400px]">
           <CardHeader className="absolute top-4 left-4 z-10 p-0">
             <Badge className="bg-white/90 backdrop-blur-sm text-zinc-900 border-zinc-200 flex items-center gap-1.5 shadow-sm py-1.5 px-3">
               <Globe className="w-3.5 h-3.5 text-blue-500" /> Interactive Network Map
             </Badge>
           </CardHeader>
           <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center overflow-hidden">
             {/* Mock Map Background */}
             <div className="relative w-full h-full flex items-center justify-center opacity-40">
                <div className="absolute top-[20%] left-[30%] w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                <div className="absolute top-[50%] left-[60%] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                <div className="absolute top-[35%] left-[75%] w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                <svg className="absolute inset-0 w-full h-full text-zinc-300" viewBox="0 0 800 500">
                  <path d="M100,100 L700,400" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" fill="none" opacity="0.3" />
                  <path d="M100,100 L600,250" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" fill="none" opacity="0.3" />
                </svg>
             </div>
             
             <div className="z-10 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white shadow-xl max-w-[280px] text-center space-y-3">
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                 <Navigation className="w-6 h-6 text-blue-600" />
               </div>
               <div className="font-semibold text-zinc-900">Geographic Routing Logic</div>
               <p className="text-xs text-zinc-500 leading-relaxed">System-calculated flow from manufacturing to regional retail zones for state-by-state compliance reporting.</p>
               <Button size="sm" variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest bg-white">Open Full Map</Button>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';
