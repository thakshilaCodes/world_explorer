// src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFavorites } from '../services/favorites';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Favorites() {
  const { currentUser } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFavorites() {
      if (!currentUser) {
        setLoading(false);
        return;
      }
    
      try {
        setLoading(true);
        setError(null);
        const favorites = await getFavorites(currentUser.uid);
        
        // Make sure we're properly extracting the country data
        const countriesData = favorites
          .filter(fav => fav && fav.data) // Additional null check
          .map(fav => fav.data);
        
        setFavoriteCountries(countriesData);
      } catch (err) {
        console.error("Error loading favorites:", err);
        setError("Failed to load favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [currentUser]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Your Favorite Countries</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : favoriteCountries.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            {currentUser 
              ? "You haven't added any favorites yet."
              : "Please sign in to view your favorites."}
          </div>
        ) : (
          <ErrorBoundary>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favoriteCountries.map(country => (
                <CountryCard 
                  key={country.cca3} 
                  country={country} 
                  isFavorite={true}
                />
              ))}
            </div>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}