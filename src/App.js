import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";
import PostsListPage from "./pages/PostsListPage";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import HashtagPage from "./pages/HashTagPost";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/tag/:hashtag" element={<HashtagPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-posts" element={<PostsPage />} />{" "}
        {/* Updated to 'element' */}
        <Route path="/posts/:postId" element={<PostPage />} />{" "}
        {/* Updated to 'element' */}
        <Route path="/posts/edit-post/:id" element={<CreatePost />} />{" "}
        {/* Updated to 'element' */}
        <Route path="about" element={<About />} />
        <Route path="/create-post" element={<CreatePost />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
