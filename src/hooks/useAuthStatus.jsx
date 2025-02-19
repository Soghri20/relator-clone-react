import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

// Assuming supabase client is initialized

const useAuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [usering, setUsering] = useState(null);

  useEffect(() => {
    // Function to fetch session on page load / get user if it existed
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session', error);
        setLoading(false);
      } else {
        setUsering(data.session?.user || null);
        setLoading(false);
      }
    };

    getSession();

    // Listen for authentication state changes (e.g., sign in, sign out)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SESSION_RESTORED') {

        setUsering(session.user);

      } else if (event === 'SIGNED_OUT') {

        setUsering(null);
      }
    });

    // Cleanup listener on component unmount
   
  }, []);

  return { loading, usering };
};

export default useAuthStatus;

