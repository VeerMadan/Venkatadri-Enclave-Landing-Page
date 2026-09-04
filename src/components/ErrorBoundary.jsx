import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-12 px-4 text-center">
          <div className="max-w-md mx-auto p-6 rounded-2xl glass-panel border border-amber-500/30">
            <h3 className="text-base font-bold text-main-color mb-2">Notice</h3>
            <p className="text-xs text-sub-color mb-4">This section is updating. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
