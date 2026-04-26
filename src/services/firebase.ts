import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, updateDoc, increment, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Initialize user profile if it doesn't exist
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        country: 'Unknown',
        university: 'None',
        rank: 'Rookie',
        bestSingle: 0,
        bestAo5: 0,
        totalSolves: 0,
        createdAt: serverTimestamp(),
      });
    }
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => signOut(auth);

export const saveSolve = async (userId: string, solveData: {
  time: number,
  scramble: string,
  moves: string,
  moveCount: number,
}) => {
  const solveRef = doc(collection(db, 'solves'));
  await setDoc(solveRef, {
    ...solveData,
    userId,
    timestamp: serverTimestamp(),
    penalty: 'none'
  });

  // Update user stats
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    totalSolves: increment(1),
    // Logic for updating PB would go here or in a function
  });
};

export const getLeaderboard = async () => {
  const q = query(collection(db, 'users'), orderBy('bestSingle', 'asc'), limit(50));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};
