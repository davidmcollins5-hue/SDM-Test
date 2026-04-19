import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Visualizer } from '@/components/Visualizer';
import { MaterialMixChart } from '@/components/MaterialMixChart';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, ExternalLink, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EPR_DATA = [
  { name: 'PET', current: 450, projected: 520 },
  { name: 'HDPE', current: 320, projected: 310 },
  { name: 'Aluminum', current: 180, projected: 250 },
  { name: 'Corrugated', current: 890, projected: 850 },
];

const COMPLIANCE_TREND = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 84 },
  { name: 'May', value: 89 },
  { name: 'Jun', value: 92 },
];

const MATERIAL_MIX = [
  { name: 'Virgin Plastics', value: 45 },
  { name: 'rPET / rHDPE', value: 25 },
  { name: 'Fiber / Pulp', value: 30 },
];

export default function ReportingModule() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            Intelligence / Analytics
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">EPR & Compliance</h1>
          <p className="text-sm text-muted-foreground">Real-time tracking of tonnage, material mix, and regulatory liability across all states.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="gap-2 bg-white border-[#e2e8e1]">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-lg font-bold uppercase tracking-widest text-[10px] px-6">
            <Calculator className="w-4 h-4" /> Run Tax Simulator
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Tonnage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-mono font-bold tracking-tighter text-foreground">1,245.8 <span className="text-sm font-normal text-muted-foreground">mT</span></div>
              <Badge className="bg-accent/20 text-primary border-none flex items-center gap-1 h-5 text-[10px] font-bold">
                <TrendingUp className="w-3 h-3" /> 4.2%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projected Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold tracking-tighter text-foreground">$342,000</div>
            <p className="text-[10px] text-primary mt-1 uppercase font-bold tracking-tight">Based on SB 54 (California)</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Material Data Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-mono font-bold tracking-tighter text-secondary">8.4%</div>
              <AlertTriangle className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">Requires supplier outreach</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-[#fefae0] border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Compliance Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold tracking-tighter text-primary">92%</div>
            <div className="h-1.5 w-full bg-white/50 rounded-full mt-2">
              <div className="h-full bg-primary w-[92%] rounded-full shadow-[0_0_8px_rgba(90,110,90,0.3)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl border-none shadow-sm bg-white border border-[#eceee9]">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tonnage by Material Type</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Current vs Projected (Metric Tons)</CardDescription>
          </CardHeader>
          <CardContent>
            <Visualizer 
              type="bar"
              data={EPR_DATA}
              dataKey="current"
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm bg-white border border-[#eceee9]">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Compliance Trend</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Readiness Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Visualizer 
              type="area"
              data={COMPLIANCE_TREND}
              dataKey="value"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaterialMixChart data={MATERIAL_MIX} />

        <Card className="rounded-2xl border-none shadow-sm bg-white border border-[#eceee9] overflow-hidden">
          <div className="bg-primary text-white p-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Compliance Engine</div>
                <CardTitle className="text-2xl font-bold tracking-tight">SB 54 Readiness Score</CardTitle>
              </div>
              <div className="text-6xl font-mono font-bold tracking-tighter">89.4</div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-zinc-100">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                  <ShieldCheck className="w-4 h-4" /> Data Verifiability
                </div>
                <div className="text-3xl font-mono font-bold text-foreground">96.2%</div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">Percentage of records with verified COAs or technical specifications attached.</p>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-[10px]">
                  <TrendingUp className="w-4 h-4" /> Recycling Rate (Avg)
                </div>
                <div className="text-3xl font-mono font-bold text-foreground">42.8%</div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">System-calculated recyclability based on current state infrastructure data.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
