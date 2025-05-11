import { create } from 'zustand';

const useDesignStore = create((set) => ({
  texture: null,   
  color: '#ffffff', 
  setTexture: (texture) => set({ texture }), 
  setColor: (color) => set({ color }), 
}));

export default useDesignStore;
