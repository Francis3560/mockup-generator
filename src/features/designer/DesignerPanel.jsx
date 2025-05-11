import { useRef, useState } from 'react';
import * as THREE from 'three'; 
import useDesignStore from '../../hooks/useDesignStore';

export default function DesignerPanel() {
  const inputRef = useRef();
  const setTexture = useDesignStore((state) => state.setTexture); // Set texture in store
  const setBackgroundColor = useDesignStore((state) => state.setColor); // Set background color in store
  const [customDesign, setCustomDesign] = useState(null); // Track custom design
  const [scale, setScale] = useState(1); // Track scale for design

  // Handle file upload for custom design
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      setTexture(texture); // Update the texture in the store
      setCustomDesign(img); // Optionally track the uploaded image
    };
  };

  // Handle background color change
  const handleColorChange = (e) => {
    const color = e.target.value;
    setBackgroundColor(color); // Update background color in the store
  };

  // Handle scale change for design (optional)
  const handleScaleChange = (e) => {
    const newScale = e.target.value;
    setScale(newScale); // Update scale for design
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Customize Design</h2>

      {/* Background Color Picker */}
      <div className="mb-4">
        <input
          type="color"
          onChange={handleColorChange} // Use separate function for background color
          className="w-full h-10 p-1 rounded border"
        />
        <label className="block text-sm text-gray-600 mt-2">Background Color</label>
      </div>

      {/* Design Upload */}
      <div className="mb-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload} // Handle file upload
          className="block w-full text-sm text-gray-700"
        />
        <label className="block text-sm text-gray-600 mt-2">Upload Design</label>
      </div>

      {/* Optional Controls for Design */}
      {customDesign && (
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Position & Scale</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={scale} 
            onChange={handleScaleChange} // Change scale based on user input
            className="w-full" 
          />
        </div>
      )}
    </div>
  );
}
