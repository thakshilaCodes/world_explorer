import { FaGlobeAmericas, FaSearch, FaPalette, FaHeart } from 'react-icons/fa'
import { IoMdRocket } from 'react-icons/io'
import Header from '../components/Header'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Explore the World with Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Country Explorer is your gateway to discovering the diverse nations of our planet, 
            with rich details at your fingertips.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Why Choose Country Explorer?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaGlobeAmericas className="w-8 h-8" />}
              title="Comprehensive Database"
              description="Access detailed information about every country recognized by the United Nations."
            />
            <FeatureCard 
              icon={<FaSearch className="w-8 h-8" />}
              title="Intuitive Search"
              description="Find exactly what you're looking for with our powerful search and filtering system."
            />
            <FeatureCard 
              icon={<FaPalette className="w-8 h-8" />}
              title="Beautiful Design"
              description="Enjoy a visually pleasing experience with dark/light mode and responsive layout."
            />
            <FeatureCard 
              icon={<IoMdRocket className="w-8 h-8" />}
              title="Fast Performance"
              description="Optimized for speed so you get information instantly without waiting."
            />
            <FeatureCard 
              icon={<FaHeart className="w-8 h-8" />}
              title="Free Forever"
              description="We believe knowledge should be accessible to everyone, with no paywalls."
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Behind the Scenes
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                CE
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Country Explorer Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We're a passionate group of developers, designers, and geography enthusiasts 
                  dedicated to making world knowledge accessible to everyone.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Our Story</a>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Careers</a>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Built With Modern Technology
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <TechPill name="React" color="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" />
            <TechPill name="Tailwind CSS" color="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200" />
            <TechPill name="REST Countries API" color="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" />
            <TechPill name="Axios" color="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" />
          </div>
        </section>
      </main>

    
     
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}

function TechPill({ name, color }) {
  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium ${color}`}>
      {name}
    </span>
  )
}