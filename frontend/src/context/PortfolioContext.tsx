import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileData } from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolioData';

export type AdminTab = 'profile' | 'projects' | 'skills' | 'education' | 'stats' | 'security' | 'export';

interface PortfolioContextType {
  data: ProfileData;
  isOwner: boolean;
  isAdminModalOpen: boolean;
  adminInitialTab: AdminTab;
  setIsAdminModalOpen: (open: boolean) => void;
  openAdminModal: (tab?: AdminTab) => void;
  verifyPin: (pin: string) => Promise<boolean>;
  logoutOwner: () => void;
  updateData: (newData: ProfileData) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  exportJSON: () => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_custom_data_v3';
const AUTH_KEY = 'portfolio_owner_session';
const TOKEN_KEY = 'portfolio_owner_token';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved portfolio data', e);
    }
    return initialPortfolioData;
  });

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'authenticated'
      && Boolean(sessionStorage.getItem(TOKEN_KEY));
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('profile');

  useEffect(() => {
    const loadSharedData = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio`);
        if (!response.ok) return;
        const sharedData = await response.json() as Partial<ProfileData>;
        setData(current => ({ ...current, ...sharedData }));
      } catch {
        // Keep bundled or locally cached data available when the API is offline.
      }
    };
    void loadSharedData();
  }, []);

  const openAdminModal = (tab: AdminTab = 'profile') => {
    setAdminInitialTab(tab);
    setIsAdminModalOpen(true);
  };

  // Keyboard shortcut for Owner Access: Alt + A or Shift + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.shiftKey && e.key.toLowerCase() === 'e' && e.ctrlKey)) {
        e.preventDefault();
        openAdminModal('profile');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const verifyPin = async (enteredPin: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: enteredPin })
      });
      if (response.ok) {
        const result = await response.json() as { token: string; data?: ProfileData };
        if (!result.token) return false;
        sessionStorage.setItem(TOKEN_KEY, result.token);
        if (result.data) setData(result.data);
        setIsOwner(true);
        sessionStorage.setItem(AUTH_KEY, 'authenticated');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logoutOwner = () => {
    setIsOwner(false);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  };

  const updateData = async (newData: ProfileData): Promise<boolean> => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    try {
      const response = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const resetToDefaults = async (): Promise<boolean> => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    return updateData(initialPortfolioData);
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isOwner,
        isAdminModalOpen,
        adminInitialTab,
        setIsAdminModalOpen,
        openAdminModal,
        verifyPin,
        logoutOwner,
        updateData,
        resetToDefaults,
        exportJSON
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
