import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-red-600">
                Oops! Something went wrong
              </h2>
              <p className="mb-4 text-gray-600">
                We apologize for the inconvenience. Please try refreshing the
                page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
