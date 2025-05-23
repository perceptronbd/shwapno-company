const storage = {
  set: (key: string, data: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error setting storage data:", error);
    }
  },

  get: (key: string): unknown => {
    try {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
      }
      return null;
    } catch (error) {
      console.error("Error getting storage data:", error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing storage data:", error);
    }
  },
};

export default storage;
