import { useState } from "react";

/**
 * Custom hook for handling image uploads and breed predictions
 */
export function useImagePredictor() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample data for the breed match chart
  const breedData = [
    { name: "Sahiwal", percentage: 25 },
    { name: "Red Sindhi", percentage: 45 },
    { name: "Tharparkar", percentage: 55 },
    { name: "Gir", percentage: 92.5 },
    { name: "Kankrej", percentage: 20 },
  ];

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    // Reset previous prediction
    setPrediction(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      // Simulate prediction after image upload
      simulatePrediction();
    };
    reader.readAsDataURL(file);
  };

  // Simulate breed prediction
  const simulatePrediction = () => {
    // In a real application, this would call the AI model for prediction
    setTimeout(() => {
      setIsProcessing(false);
      setPrediction({
        breed: "Gir",
        confidence: 92.5,
        scientificName: "Bos taurus indicus",
        relatedBreed: "Sahiwal",
        status: "LC/IN",
      });
    }, 1500);
  };

  // Reset the state
  const resetPredictor = () => {
    setImage(null);
    setPrediction(null);
    setIsProcessing(false);
  };

  return {
    image,
    isDragging,
    prediction,
    isProcessing,
    breedData,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    resetPredictor,
  };
}
