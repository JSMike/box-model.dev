import { Route, Routes } from 'react-router-dom';

import { AppNav } from './app-nav';
import AboutPage from '../pages/about';
import BlogArticlePage from '../pages/blog-article';
import BlogsPage from '../pages/blogs';
import HomePage from '../pages/home';

export function App() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
