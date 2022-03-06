import './App.css';
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './routes/HomePage';
import { AboutPage } from './routes/AboutPage';
import Navbar from './components/Navbar';
import { PostPage } from './routes/PostPage';
import { CategoryPage } from './routes/CategoryPage';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
