// src/services/favorites.js
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export async function addFavorite(userId, countryCode, countryData) {
  try {
    if (!userId || !countryCode || !countryData) {
      throw new Error('Missing required parameters');
    }

    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      favorites: arrayUnion({
        code: countryCode,
        data: countryData
      })
    }, { merge: true });
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
}

export async function removeFavorite(userId, countryCode) {
  try {
    if (!userId || !countryCode) {
      throw new Error('Missing required parameters');
    }

    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const favorites = docSnap.data().favorites || [];
      const favoriteToRemove = favorites.find(fav => fav.code === countryCode);
      
      if (favoriteToRemove) {
        await updateDoc(userRef, {
          favorites: arrayRemove(favoriteToRemove)
        });
      }
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

export async function getFavorites(userId) {
  try {
    if (!userId) return [];

    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) return [];
    
    return docSnap.data().favorites || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
}