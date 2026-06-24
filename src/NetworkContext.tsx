import React, { createContext, useState, useContext, useEffect } from "react";

interface NetworkContextType {
  lowDataMode: boolean;
  setLowDataMode: (enabled: boolean) => void;
  loadedImages: Record<string, boolean>;
  loadSingleImage: (src: string) => void;
  isWeakConnection: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lowDataMode, setLowDataModeState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lowDataMode");
      if (stored === "true") return true;
      if (stored === "false") return false;
    }
    return false;
  });

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isWeakConnection, setIsWeakConnection] = useState(false);

  // Auto-detect weak connection using Network Information API if available
  useEffect(() => {
    if (typeof navigator !== "undefined" && (navigator as any).connection) {
      const conn = (navigator as any).connection;
      const checkConnection = () => {
        // If effectiveType is '2g' or '3g' or saveData is true, auto-enable lowDataMode!
        const isSlow = conn.effectiveType === "2g" || conn.effectiveType === "3g" || conn.saveData;
        setIsWeakConnection(!!isSlow);
        // If the user hasn't explicitly set it, auto-enable low data mode on slow connections
        if (isSlow && localStorage.getItem("lowDataMode") === null) {
          setLowDataModeState(true);
        }
      };
      checkConnection();
      if (conn.addEventListener) {
        conn.addEventListener("change", checkConnection);
        return () => conn.removeEventListener("change", checkConnection);
      }
    }
  }, []);

  const setLowDataMode = (enabled: boolean) => {
    setLowDataModeState(enabled);
    localStorage.setItem("lowDataMode", String(enabled));
  };

  const loadSingleImage = (src: string) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <NetworkContext.Provider
      value={{
        lowDataMode,
        setLowDataMode,
        loadedImages,
        loadSingleImage,
        isWeakConnection,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};
