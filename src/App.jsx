// Entry Point: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import EditorPage from './pages/Editorpage';
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:productId" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}
