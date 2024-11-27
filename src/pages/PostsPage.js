import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/postsSlice"; // Import deletePost action
import { Link, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaEdit, FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader

const PostsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigating programmatically

  const { posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth); // Get the logged-in user state

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Default image for posts without images
  const defaultImage =
    "https://th.bing.com/th/id/R.1e836926032a3c123d55fea94fdcd98d?rik=god%2b7%2fUa%2fHRqng&riu=http%3a%2f%2fwww.mangrovealliance.org%2fwp-content%2fuploads%2f2019%2f07%2fmikoko-pamoja.jpg&ehk=5QkhyXTTlH4ja1wECiG%2fP8xLOO5O947j7DRSymKjAvY%3d&risl=1&pid=ImgRaw&r=0";

  // Filter posts based on the logged-in user
  const filteredPosts = user
    ? posts.filter((post) => post.userId === user.id)
    : [];

  // Function to handle post deletion
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId)); // Dispatch the delete action
    }
  };

  // Loading skeleton for posts
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 p-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md rounded-lg p-4"
          >
            <Skeleton height={80} width={80} className="mr-4" />
            <div className="flex-1">
              <Skeleton width="60%" height={20} className="mb-2" />
              <Skeleton width="80%" height={20} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error handling if something goes wrong while fetching posts
  if (status === "failed") {
    return (
      <div className="p-8 text-red-500">
        <p>Error fetching posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Create New Post Button (visible if the user is logged in) */}
      {user && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => navigate("/create-post")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Create New Post
          </button>
        </div>
      )}

      {/* Posts List in Flex Row */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={post.image || defaultImage}
                alt="Post"
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="text-gray-800 text-sm mb-4">
                  {post.content.slice(0, 50)}...
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Read More
                  </Link>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate(`/posts/edit-post/${post.id}`)}
                      className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                    >
                      <FaEdit /> <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
