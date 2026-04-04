import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
          <div className="max-w-3xl w-full bg-red-950/50 border border-red-500 rounded-2xl p-8 overflow-auto">
            <h1 className="text-3xl font-black text-red-400 mb-4 tracking-tight">Application Render Error</h1>
            <p className="font-bold text-red-200 mb-6">{this.state.error?.toString()}</p>
            <details className="bg-black/40 p-4 rounded-xl text-xs font-mono text-slate-300">
              <summary className="cursor-pointer mb-2 text-red-300 font-bold hover:text-red-200">View Stack Trace</summary>
              <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold uppercase text-xs tracking-widest transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
