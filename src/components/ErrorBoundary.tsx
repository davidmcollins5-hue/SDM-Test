import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#f9faf8] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center text-destructive shadow-sm border border-destructive/20 mb-8">
              <AlertCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Something went wrong</h1>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                An unexpected error occurred while processing your request. Our engineering team has been notified.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 text-left overflow-hidden">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Error Details</div>
                <div className="text-xs font-mono text-destructive break-all bg-white p-3 rounded-lg border border-zinc-200 shadow-inner">
                  {this.state.error.message}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={() => window.location.reload()}
                className="flex-1 h-12 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-xs gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </Button>
              <Button 
                variant="outline"
                onClick={this.handleReset}
                className="flex-1 h-12 rounded-xl bg-white border-[#e2e8e1] text-foreground font-bold uppercase tracking-widest text-xs gap-2"
              >
                <Home className="w-4 h-4" /> Return Home
              </Button>
            </div>

            <div className="pt-8 border-t border-[#f0f2ef] text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
              SpecInsite Infrastructure System
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
