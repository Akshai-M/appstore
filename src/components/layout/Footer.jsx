import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiPhone, 
  FiMail, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube 
} from 'react-icons/fi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }
  
  const menuItems = [
    { name: 'Shop', link: '/' },
    { name: 'Skills', link: '/skills' },
    { name: 'Stories', link: '/stories' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact Us', link: '/contact' }
  ]
  
  const quickLinks = [
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms & Conditions', link: '/terms' },
    { name: 'Shipping Policy', link: '/shipping' },
    { name: 'Returns & Exchanges', link: '/returns' },
    { name: 'FAQs', link: '/faqs' }
  ]
  
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD']
  const [currency, setCurrency] = useState('USD')
  
  const paymentMethods = [
    { name: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/128/6124/6124998.png' },
    { name: 'Mastercard', icon: 'https://pngimg.com/d/mastercard_PNG16.png' },
    { name: 'RazorPay', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rCrXuCdWnscUTa5biGk6EqIKB2L3ldEm5K0fDKJ1Ogx6FqOihla7-B2bejkwcc6P4Zk&usqp=CAU' },
    { name: 'American Express', icon: 'https://images.seeklogo.com/logo-png/45/2/american-express-logo-png_seeklogo-453638.png' },
    { name: 'Apple Pay', icon: 'https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png' }
  ]

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Stay connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive updates about new products, offers, and more.
            </p>
            
            {subscribed ? (
              <div className="bg-success-500 bg-opacity-20 p-4 rounded-md">
                <p className="text-success-500 font-medium">Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md text-primary-900 focus:outline-none" 
                  required
                />
                <button 
                  type="submit" 
                  className="bg-accent-500 hover:bg-accent-600 px-5 py-2 rounded-r-md font-medium transition"
                >
                  Subscribe
                </button>
              </form>
            )}
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <div className="flex items-center space-x-2 text-gray-300 mb-2">
                <FiPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FiMail size={16} />
                <span>support@appstore.com</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Currency</h4>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-accent-500"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>
          
         
          <div>
            <h3 className="text-xl font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-gray-300 hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-white transition">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-gray-300 hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Payment Methods</h3>
            <div className="grid grid-cols-5 gap-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-white p-1 rounded-md flex items-center justify-center">
                  <img 
                    src={method.icon} 
                    alt={method.name} 
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AppStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer