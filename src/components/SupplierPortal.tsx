import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  Send,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function SupplierPortal({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<'landing' | 'dashboard' | 'upload'>('landing');

  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="text-center space-y-2">
             <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">S</div>
             <h1 className="text-3xl font-bold tracking-tight text-zinc-900">SpecInsite SDM</h1>
             <p className="text-zinc-500 font-medium tracking-tight">Supplier Collaboration Portal</p>
           </div>
           
           <Card className="border-none shadow-2xl bg-white p-8 space-y-6">
             <div className="space-y-2">
               <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Secure Access</div>
               <h2 className="text-xl font-bold text-zinc-900">One-Time Magic Link</h2>
               <p className="text-sm text-zinc-500 leading-relaxed">
                 Welcome back, **PlastiCorp Inc.** You have 3 pending data requests for the Q2 Compliance Campaign.
               </p>
             </div>
             
             <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex gap-3">
               <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
               <div className="text-xs text-blue-700 leading-relaxed">
                 You are accessing this portal via a temporary secure link. No password is required.
               </div>
             </div>

             <Button 
               className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-bold uppercase tracking-widest gap-2"
               onClick={() => setStep('dashboard')}
             >
               Enter Portal <ArrowRight className="w-4 h-4" />
             </Button>
           </Card>

           <button 
             onClick={onExit}
             className="w-full py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900 transition-colors flex items-center justify-center gap-2"
           >
             <LogOut className="w-3.5 h-3.5" /> Return to Internal App
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <header className="h-16 border-b border-zinc-100 bg-white flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center text-white text-[10px] font-bold">S</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900">PlastiCorp Inc.</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Supplier ID: VN-9421</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-[10px] font-bold text-blue-600 border-blue-100 bg-blue-50/50">Q2 COMPLIANCE CAMPAIGN</Badge>
          <Button variant="ghost" size="sm" onClick={() => setStep('landing')} className="text-zinc-400 hover:text-zinc-900">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-12 space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Action Required</h1>
          <p className="text-zinc-500">Please provide the missing specifications for the following items to remain compliant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white p-6 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Requests</div>
            <div className="text-3xl font-mono font-bold">03</div>
          </Card>
          <Card className="border-none shadow-sm bg-white p-6 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Completed</div>
            <div className="text-3xl font-mono font-bold text-green-600">01</div>
          </Card>
          <Card className="border-none shadow-sm bg-white p-6 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Campaign End</div>
            <div className="text-3xl font-mono font-bold text-amber-600">12d</div>
          </Card>
        </div>

        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-zinc-50 sr-only">
             <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-50">
              <div className="p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">16oz PET Bottle (Clear)</div>
                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Due in 4 days • <span className="text-amber-600 font-semibold uppercase tracking-tighter">Missing Material Spec</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2"
                  onClick={() => setStep('upload')}
                >
                  Apply Spec <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="p-6 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">8oz rHDPE Container</div>
                    <div className="text-xs text-zinc-500 mt-1">Submitted 2 days ago • <span className="text-green-600 font-semibold uppercase tracking-tighter">Approved</span></div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {step === 'upload' && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-lg border-none shadow-2xl bg-white animate-in zoom-in-95 duration-200">
             <CardHeader className="border-b border-zinc-100 p-6 flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl font-bold">Upload Specification</CardTitle>
                  <CardDescription className="text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-widest">16oz PET Bottle (Clear)</CardDescription>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setStep('dashboard')} className="text-zinc-400">
                 <Plus className="w-6 h-6 rotate-45" />
               </Button>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <div className="border-2 border-dashed border-zinc-100 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-900 tracking-tight text-lg">Drop COA or Tech Spec</div>
                    <p className="text-sm text-zinc-400">PDF, PNG, or JPG up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Manual Data Entry</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Total Weight (g)</label>
                       <Input placeholder="0.00" className="bg-zinc-50 border-none focus-visible:ring-1 focus-visible:ring-zinc-200" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">PCR Content %</label>
                       <Input placeholder="0" className="bg-zinc-50 border-none focus-visible:ring-1 focus-visible:ring-zinc-200" />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-bold uppercase tracking-widest gap-2"
                  onClick={() => setStep('dashboard')}
                >
                  Submit for Approval <Send className="w-4 h-4" />
                </Button>
             </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
