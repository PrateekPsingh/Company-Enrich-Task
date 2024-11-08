import { signInWithGoogle, logOut, auth } from './Components/firebase.js';
import LeadForm from './Components/LeadForm.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import './index.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <header className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Lead Enrichment Preview Tool
        </h1>
        {user ? (
          <>
            <button
              onClick={logOut}
              className="py-2 mb-4 text-white font-semibold bg-red-500 rounded-md hover:bg-red-600 transition duration-200 w-full"
            >
              Logout
            </button>
            <LeadForm />
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 w-full"
          >
            Login with Google
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
