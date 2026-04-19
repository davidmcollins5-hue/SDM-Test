/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Box, 
  Package, 
  Layers, 
  MapPin, 
  BarChart3, 
  FileText, 
  GraduationCap, 
  Settings,
  Search,
  Plus,
  Bell,
  User,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Lock,
  BookOpen,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
  SidebarRail
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { AuthModal } from '@/components/AuthModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LandingPage from '@/components/LandingPage';

import SKUBomModule from '@/components/SKUBomModule';
import PackagingModule from '@/components/PackagingModule';
import MaterialsModule from '@/components/MaterialsModule';
import PlantsModule from '@/components/PlantsModule';
import ReportingModule from '@/components/ReportingModule';
import TrainingModule from '@/components/TrainingModule';
import SupplierPortal from '@/components/SupplierPortal';

type ModuleId = 'skus' | 'packaging' | 'materials' | 'plants' | 'reporting' | 'documents' | 'training';

const DocumentModule = () => (
  <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
      <FileText className="w-8 h-8" />
    </div>
    <div className="max-w-xs">
      <h2 className="text-xl font-bold text-zinc-900">Document Vault</h2>
      <p className="text-sm text-zinc-500 mt-2">Securely store and manage COAs, Die Lines, and Compliance certificates.</p>
    </div>
    <Button className="mt-4 bg-zinc-900 text-white hover:bg-zinc-800">Browse Files</Button>
  </div>
);

const AppContent = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('skus');
  const [isSupplierPortal, setIsSupplierPortal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout, canEdit } = useAuth();

  if (!user) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowAuthModal(true)} />
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </>
    );
  }

  if (isSupplierPortal) {
    return <SupplierPortal onExit={() => setIsSupplierPortal(false)} />;
  }

  const navItems = [
    { id: 'skus', label: 'SKU BOM', icon: Box },
    { id: 'packaging', label: 'Packaging', icon: Package },
    { id: 'materials', label: 'Materials', icon: Layers },
    { id: 'plants', label: 'Plant Locations', icon: MapPin },
  ];

  const secondaryNav = [
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'training', label: 'Training', icon: GraduationCap },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'skus': return <SKUBomModule />;
      case 'packaging': return <PackagingModule />;
      case 'materials': return <MaterialsModule />;
      case 'plants': return <PlantsModule />;
      case 'reporting': return <ReportingModule />;
      case 'documents': return <DocumentModule />;
      case 'training': return <TrainingModule />;
      default: return <div className="p-8">Module Coming Soon</div>;
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full bg-background font-sans">
          <Sidebar collapsible="icon" className="border-r border-zinc-200 shadow-lg">
            <SidebarHeader className="h-20 flex items-center px-4">
              <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/20">
                  <Package className="w-6 h-6" />
                </div>
                <span className="group-data-[collapsible=icon]:hidden text-white/90">SpecInsite SDM</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-[#8a9a8a] font-bold mb-2">Core Registry</SidebarGroupLabel>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveModule(item.id as ModuleId)}
                        isActive={activeModule === item.id}
                        tooltip={item.label}
                        className="transition-all duration-200 hover:bg-white/10"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-bold">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
              
              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-[#8a9a8a] font-bold mb-2">Systems</SidebarGroupLabel>
                <SidebarMenu>
                  {secondaryNav.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveModule(item.id as ModuleId)}
                        isActive={activeModule === item.id}
                        tooltip={item.label}
                        className="transition-all duration-200 hover:bg-white/10"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-bold">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 flex flex-col gap-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10 h-10 rounded-lg gap-3 px-3"
                onClick={() => setIsSupplierPortal(true)}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden uppercase">Supplier Portal</span>
              </Button>
              <Separator className="bg-white/10 my-2" />
              <div className="flex items-center justify-between group-data-[collapsible=icon]:hidden mb-2 px-2 pb-2">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{user.role}</span>
                  <span className="text-[11px] font-bold text-white truncate max-w-[120px]">{user.email}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} className="text-white/40 hover:text-white h-8 w-8">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-20 border-b border-[#e2e8e1] flex items-center justify-between px-8 bg-white/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold shadow-md uppercase">
                    {user.email.substring(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-bold text-foreground leading-tight capitalize">{user.role} Workspace</h1>
                    <p className="text-[10px] text-primary uppercase tracking-wider font-bold">Session Active: {user.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest">SpecInsite Compliance Engine</span>
                  <span className="text-xs font-bold text-foreground capitalize">{activeModule.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-primary">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  {canEdit ? (
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90 gap-1 rounded-lg text-xs px-5 shadow-sm font-semibold">
                      <Plus className="w-4 h-4" />
                      Create Entry
                    </Button>
                  ) : (
                    <Badge variant="outline" className="border-secondary text-secondary font-bold text-[9px] uppercase tracking-[0.2em] px-3">
                      <Shield className="w-3 h-3 mr-1.5" /> Read Only
                    </Badge>
                  )}
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto bg-[#f9faf8]">
              {renderModule()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AuthProvider>
  );
}
