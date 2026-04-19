import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Plus, 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  HelpCircle,
  FileSearch,
  CheckCircle2,
  ExternalLink,
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrainingModule() {
  const courses = [
    { title: 'Standard Specification Creation', time: '12 min', category: 'Core Registry', completed: true },
    { title: 'Understanding EPR Compliance (SB 54)', time: '20 min', category: 'Compliance', completed: false },
    { title: 'Supplier Collaboration Best Practices', time: '15 min', category: 'Logistics', completed: false },
    { title: 'Calculating Recyclability Scores', time: '10 min', category: 'Intelligence', completed: false },
  ];

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Resources / Knowledge
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Training & Support</h1>
          <p className="text-sm text-zinc-500">Master SpecInsite SDM with step-by-step guides and legislative summaries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-500" /> Interactive Walkthroughs
              </CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-widest text-zinc-400 mt-1">Guided Learning Paths</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-zinc-400">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-50">
              {courses.map((course, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border",
                      course.completed ? "bg-green-50 border-green-100 text-green-600" : "bg-zinc-100 border-zinc-200 text-zinc-400"
                    )}>
                      {course.completed ? <CheckCircle2 className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-zinc-900">{course.title}</div>
                      <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-tight mt-0.5">{course.category} • {course.time}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-zinc-900 text-white overflow-hidden relative">
            <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
            <CardHeader>
              <CardTitle className="text-lg font-bold">Knowledge Base</CardTitle>
              <CardDescription className="text-zinc-400 text-xs">Search our repository of FAQs and best practices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input 
                  placeholder="How do I..." 
                  className="bg-white/10 border-none pl-10 h-10 text-sm focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-zinc-600"
                />
              </div>
              <div className="flex flex-col gap-2">
                {['Sustainability Reporting FAQ', 'Plastic Tax Logic', 'Certificate Verification'].map(t => (
                  <button key={t} className="text-left text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-between group py-1">
                    {t} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white p-6 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 mb-1">Need Concierge Support?</div>
              <p className="text-xs text-zinc-500 leading-relaxed">Our data experts can help you map your legacy BOMs into SpecInsite format.</p>
            </div>
            <Button size="sm" variant="outline" className="w-full border-zinc-200">Contact Expert</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
