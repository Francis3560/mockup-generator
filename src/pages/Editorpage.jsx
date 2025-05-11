import { useParams } from 'react-router-dom';
import Viewer from '../features/viewer/Viewer';
import DesignerPanel from '../features/designer/DesignerPanel';
import { Canvas } from '@react-three/fiber';
import React, { Component } from 'react';

// Error Boundary to catch errors in 3D rendering
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error occurred in Canvas:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong with the 3D model!</h2>;
    }
    return this.props.children;
  }
}

export default function EditorPage() {
  const { productId } = useParams(); // Get the productId from the URL

  // If no productId is available, render a message
  if (!productId) {
    return <div className="text-center p-4">No product selected</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Wrap Canvas with ErrorBoundary */}
      <ErrorBoundary>
        <div className="w-full md:w-3/4 bg-gray-200 relative">
          {/* Ensure the Canvas takes full width and height */}
          <Canvas style={{ width: '100%', height: '100vh' }}>
            <Viewer productId={productId} /> {/* Pass productId to Viewer */}
          </Canvas>
        </div>
      </ErrorBoundary>

      {/* Designer Panel for Editing Product */}
      <div className="w-full md:w-1/4 bg-white p-4 overflow-y-auto shadow-md">
        <DesignerPanel productId={productId} /> {/* Pass productId to DesignerPanel */}
      </div>
    </div>
  );
}
