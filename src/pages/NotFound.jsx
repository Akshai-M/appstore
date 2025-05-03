import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary-800 mb-6">Page Not Found</h2>
        <p className="text-primary-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center px-6 py-3"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound