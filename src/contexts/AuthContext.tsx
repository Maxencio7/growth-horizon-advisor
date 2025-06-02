
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface NotificationPreferences {
  id: string;
  user_id: string;
  investment_milestones: boolean;
  monthly_reports: boolean;
  goal_achievements: boolean;
  market_updates: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  notifications: NotificationPreferences | null;
  loading: boolean;
  isGuest: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  updateNotifications: (updates: Partial<NotificationPreferences>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check if user chose guest mode
    const guestMode = localStorage.getItem('guest-mode');
    if (guestMode === 'true') {
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile and notifications only if tables exist
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setNotifications(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Try to fetch profile (gracefully handle if table doesn't exist)
      try {
        const { data: profileData } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.log('Profiles table not yet created, skipping profile fetch');
      }

      // Try to fetch notification preferences (gracefully handle if table doesn't exist)
      try {
        const { data: notificationData } = await (supabase as any)
          .from('notification_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (notificationData) {
          setNotifications(notificationData);
        }
      } catch (error) {
        console.log('Notification preferences table not yet created, skipping notification fetch');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('guest-mode');
    setIsGuest(false);
    await supabase.auth.signOut();
  };

  const continueAsGuest = () => {
    localStorage.setItem('guest-mode', 'true');
    setIsGuest(true);
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...updates } : null);
      }

      return { error };
    } catch (error) {
      return { error: 'Profile update not available yet' };
    }
  };

  const updateNotifications = async (updates: Partial<NotificationPreferences>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await (supabase as any)
        .from('notification_preferences')
        .update(updates)
        .eq('user_id', user.id);

      if (!error) {
        setNotifications(prev => prev ? { ...prev, ...updates } : null);
      }

      return { error };
    } catch (error) {
      return { error: 'Notification preferences update not available yet' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      notifications,
      loading,
      isGuest,
      signUp,
      signIn,
      signOut,
      continueAsGuest,
      updateProfile,
      updateNotifications,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
