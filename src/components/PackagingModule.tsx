import { useState } from 'react';
import { PACKAGING_COMPONENTS, MATERIALS } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  ArrowUpRight, 
  FileCheck, 
  MoreVertical,
  Filter,
  Package
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

export default function PackagingModule() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filteredComponents = PACKAGING_COMPONENTS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Registry / Packaging
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Components</h1>
          <p className="text-sm text-zinc-500">Manage your entire catalog of packaging items and their specifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2">
            <Plus className="w-4 h-4" /> Add Component
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm border border-zinc-100">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input 
            placeholder="Search items..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 border-none bg-zinc-50/50 focus-visible:ring-0 text-sm"
          />
        </div>
        <div className="flex items-center gap-1 border-l border-zinc-100 ml-4 pl-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", view === 'grid' ? "bg-zinc-100" : "opacity-50")}
            onClick={() => setView('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", view === 'list' ? "bg-zinc-100" : "opacity-50")}
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredComponents.map((comp) => {
            const material = MATERIALS.find(m => m.id === comp.materialId)!;
            return (
              <Card key={comp.id} className="group overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white border border-[#eceee9]">
                <div className="aspect-square bg-[#f0f2ef] relative group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center p-8">
                  {comp.thumbnail ? (
                    <img src={comp.thumbnail} alt={comp.name} className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/30">
                      <Package className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest border-none h-6">
                      {comp.state}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                        {comp.name}
                      </h3>
                      <p className="text-[10px] text-primary/70 mt-2 font-bold uppercase tracking-widest">{comp.type} • {material.type}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <Button variant="outline" className="w-full h-8 text-[10px] uppercase font-bold tracking-widest text-primary hover:bg-primary hover:text-white border-[#e2e8e1] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                      <Search className="w-3 h-3 mr-2" /> Find Similar
                    </Button>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#f0f2ef]">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">Net Weight</span>
                        <span className="text-sm font-mono font-bold text-foreground">{comp.weight} g</span>
                      </div>
                      {comp.state === 'Approved' && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <FileCheck className="w-3.5 h-3.5 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-zinc-50/50 text-zinc-400 uppercase text-[10px] font-bold tracking-widest border-b border-zinc-100">
                  <th className="px-6 py-4 font-bold">Component</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Material</th>
                  <th className="px-6 py-4 font-bold text-right">Weight</th>
                  <th className="px-6 py-4 font-bold">State</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredComponents.map((comp) => {
                  const material = MATERIALS.find(m => m.id === comp.materialId)!;
                  return (
                    <tr key={comp.id} className="hover:bg-zinc-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center text-zinc-400 overflow-hidden shrink-0">
                             {comp.thumbnail ? <img src={comp.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <Package className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-zinc-900 truncate max-w-[200px]">{comp.name}</div>
                            <div className="text-[10px] text-zinc-400 font-mono">{comp.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-none font-medium text-[10px]">{comp.type}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-zinc-600">{material.name}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-zinc-900">
                        {comp.weight} g
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full", 
                            comp.state === 'Approved' ? "bg-green-500" : 
                            comp.state === 'In Review' ? "bg-amber-500" : "bg-zinc-400"
                          )} />
                          <span className="text-xs text-zinc-600">{comp.state}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4 text-zinc-400" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
