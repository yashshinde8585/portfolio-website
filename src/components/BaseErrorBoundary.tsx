import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * BaseErrorBoundary - Production-grade error boundary.
 * Captures React runtime errors to prevent full app crashes.
 */
class BaseErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // TODO: Send to Sentry/LogRocket in production
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong.</h2>
          <p className="mb-8 text-slate-400">
            The application encountered an unexpected error. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-indigo-600 px-6 py-3 font-bold text-white transition-transform hover:scale-105"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BaseErrorBoundary;
