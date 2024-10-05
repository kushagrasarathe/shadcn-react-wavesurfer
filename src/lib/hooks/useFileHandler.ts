import { useCallback, useState } from 'react';

export const useFileHandler = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File) => {
    setIsLoading(true);
    setSelectedFile(file);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const clearSelection = () => {
    setSelectedFile(null);
    setError(null);
  };

  return { selectedFile, isLoading, error, handleFileChange, clearSelection };
};
