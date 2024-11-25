import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postsSlice"; // Import the createPost action
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon for loading

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [], // This will store the selected tags
    trending: false, // The 'trending' flag for the post
    userId: "", // The user ID that will be included in the post
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State to track authentication

  useEffect(() => {
    // Check if the user is authenticated (e.g., check for a token in localStorage or Redux state)
    const token = localStorage.getItem("token"); // Replace with your authentication method
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

    if (!token || !userId) {
      setIsAuthenticated(false); // User is not authenticated
      navigate("/login"); // Redirect to login page
    } else {
      setPost((prevPost) => ({ ...prevPost, userId })); // Set the userId if authenticated
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      // Dispatch the createPost action to create a new post
      await dispatch(createPost(post)).unwrap();
      setSuccessMessage("Post created successfully!");
      // Navigate to the posts page after successful creation
      navigate("/posts");
    } catch (error) {
      setSuccessMessage("Error creating post. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleTagChange = (tag) => {
    setPost((prevPost) => {
      // Toggle the selected tag
      const tags = prevPost.tags.includes(tag)
        ? prevPost.tags.filter((t) => t !== tag)
        : [...prevPost.tags, tag];
      return { ...prevPost, tags };
    });
  };

  const handleTrendingChange = () => {
    setPost((prevPost) => ({
      ...prevPost,
      trending: !prevPost.trending,
    }));
  };

  if (!isAuthenticated) {
    return null; // This will ensure the component doesn't render if not authenticated
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create a New Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your post"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Write the content of your post"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Tags</label>
          <div className="flex gap-4">
            {["new", "trending", "most discussed"].map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${
                  post.tags.includes(tag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } px-4 py-2 rounded-full text-sm font-medium`}
                onClick={() => handleTagChange(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={post.trending}
              onChange={handleTrendingChange}
              className="form-checkbox"
            />
            <span className="text-lg">Mark as Trending</span>
          </label>
        </div>

        {/* Success or error message */}
        {successMessage && (
          <div
            className={`p-4 mb-4 text-center rounded-lg ${
              successMessage.includes("success") ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {successMessage}
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Submit Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
