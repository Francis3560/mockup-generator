import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, CanvasTexture, Color } from 'three';
import { useEffect, useState } from 'react';
import useDesignStore from '../../hooks/useDesignStore'; // Custom hook for texture management

function Product({ productId }) {
  const { texture, color } = useDesignStore(); // Get texture and background color from store
  const { scene } = useThree(); // Access the Three.js scene
  const [hasError, setHasError] = useState(false);
  const [fallbackTexture, setFallbackTexture] = useState(null);

  // Set texture URL based on productId
  const [textureUrl, setTextureUrl] = useState(`/assets/${productId}.png`);
  
  // Log to check if texture URL is set correctly
  useEffect(() => {
    console.log("Loaded texture URL:", textureUrl);
  }, [textureUrl]);

  // Update texture URL when the productId changes
  useEffect(() => {
    setTextureUrl(`/assets/${productId}.png`);
    setHasError(false); // Reset error when the productId changes
  }, [productId]);

  // Set the background color of the scene (optional)
  useEffect(() => {
    scene.background = new Color(color); // Set the background color from the store
  }, [scene, color]);

  // Load the texture using useLoader
  const loadedTexture = useLoader(TextureLoader, textureUrl, (loadedTexture) => {
    setHasError(false); // Texture loaded successfully
  }, () => {
    setHasError(true); // Texture loading failed
  });

  // Create a fallback texture if loading fails
  useEffect(() => {
    if (hasError) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ddd'; // Fallback color for missing textures
      ctx.fillRect(0, 0, 64, 64);
      const fallback = new CanvasTexture(canvas);
      setFallbackTexture(fallback);
    }
  }, [hasError]);

  // Apply the uploaded texture from the store, or fallback to loaded texture
  const appliedTexture = texture || (hasError ? fallbackTexture : loadedTexture);

  return (
    <mesh rotation={[0, Math.PI, 0]}>
      <boxGeometry args={[3, 4, 0.2]} />
      <meshStandardMaterial map={appliedTexture} />
    </mesh>
  );
}

export default Product;
