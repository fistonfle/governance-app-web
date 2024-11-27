import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, fetchPostById } from "../features/postsSlice"; // Import actions
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get post ID from URL if editing
  const isEdit = Boolean(id); // Determine if it's edit mode based on the presence of an ID

  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
    trending: false,
    userId: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { user } = useSelector((state) => state.auth); // Get the logged-in user
  const { currentPost } = useSelector((state) => state.posts); // Get the current post for editing

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      setPost((prevPost) => ({ ...prevPost, userId })); // Set userId for new post
    }

    // If editing, fetch the post details
    if (isEdit) {
      dispatch(fetchPostById(id));
    }
  }, [id, isEdit, dispatch, navigate]);

  useEffect(() => {
    // Populate the form with the post data if editing
    if (currentPost && isEdit) {
      setPost(currentPost);
    }
  }, [currentPost, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        // Update post if in edit mode
        await dispatch(updatePost({ id, post })).unwrap();
        setSuccessMessage("Post updated successfully!");
      } else {
        // Create new post
        await dispatch(createPost(post)).unwrap();
        setSuccessMessage("Post created successfully!");
      }

      navigate("/posts");
    } catch (error) {
      setSuccessMessage("Error saving post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleTagChange = (tag) => {
    setPost((prevPost) => ({
      ...prevPost,
      tags: prevPost.tags.includes(tag)
        ? prevPost.tags.filter((t) => t !== tag)
        : [...prevPost.tags, tag],
    }));
  };

  const handleTrendingChange = () => {
    setPost((prevPost) => ({ ...prevPost, trending: !prevPost.trending }));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {isEdit ? "Edit Post" : "Create a New Post"}
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
            {["new", "trending", "most-discussed"].map((tag) => (
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
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
