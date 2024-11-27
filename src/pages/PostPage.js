import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../features/postsSlice"; // Adjust the path if necessary
import { postComment } from "../features/commentsSlice"; // Import postComment action
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader
import { FaThumbsUp, FaComment } from "react-icons/fa";

const SinglePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams(); // Get the ID of the post from the URL
  const { currentPost, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth); // Get the logged-in user state
  const [commentContent, setCommentContent] = useState(""); // State for comment content
  const [selectedPostId, setSelectedPostId] = useState(null); // Track which post is being commented on

  useEffect(() => {
    // Fetch post by ID when the component is mounted
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  const handleAddComment = (postId) => {
    if (user) {
      setSelectedPostId(postId); // Open comment form for the selected post
    } else {
      // Show confirmation dialog
      const confirmLogin = window.confirm(
        "You need to be logged in to add a comment. Do you want to go to the login page?"
      );

      // If the user clicks OK, redirect to the login page
      if (confirmLogin) {
        navigate("/login");
      }
      // If the user clicks Cancel, do nothing (stay on the page)
    }
  };

  // Function to handle submitting a comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      dispatch(
        postComment({ postId, comment: commentContent, author: user.name })
      );
      setCommentContent(""); // Clear the comment input after submission
      setSelectedPostId(null); // Close the comment form
    }
  };

  // Default image URL for posts without images
  const defaultImage =
    "https://th.bing.com/th/id/R.1e836926032a3c123d55fea94fdcd98d?rik=god%2b7%2fUa%2fHRqng&riu=http%3a%2f%2fwww.mangrovealliance.org%2fwp-content%2fuploads%2f2019%2f07%2fmikoko-pamoja.jpg&ehk=5QkhyXTTlH4ja1wECiG%2fP8xLOO5O947j7DRSymKjAvY%3d&risl=1&pid=ImgRaw&r=0";

  // Loading skeleton for the post
  if (status === "loading") {
    return (
      <div className="p-8">
        <Skeleton height={400} width="100%" className="mb-4" />
        <Skeleton width="80%" height={30} className="mb-4" />
        <Skeleton count={3} width="100%" height={20} className="mb-4" />
      </div>
    );
  }

  // Error handling if something goes wrong while fetching the post
  if (status === "failed") {
    return (
      <div className="p-8 text-red-500">
        <p>Error fetching post: {error}</p>
      </div>
    );
  }

  // Safely check if `currentPost` is available before trying to access its properties
  if (!currentPost) {
    return (
      <div className="p-8">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Go back button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-6 hover:bg-gray-600 transition"
      >
        Back to Posts
      </button>

      {/* Post Details */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={currentPost.image || defaultImage} // Use defaultImage if currentPost has no image
          alt="currentPost"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on {new Date(currentPost.createdAt).toLocaleDateString()} by{" "}
          {currentPost.author}
        </p>
        <div className="text-lg leading-relaxed mb-6">
          {currentPost.content}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaThumbsUp className="text-blue-600" size={20} />
            <span>{currentPost.upvotes} Upvotes</span>
          </div>
          <div className="flex items-center gap-2">
            <FaComment className="text-gray-600" size={20} />
            <span>{currentPost.comments?.length} Comments</span>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          {currentPost.comments?.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            currentPost.comments?.map((comment) => (
              <div key={comment.id} className="p-4 bg-gray-100 mb-4 rounded-lg">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Comment */}
        {selectedPostId === postId && user && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Post Comment
            </button>
          </div>
        )}
        {/* Display Add Comment button */}
        {!selectedPostId && (
          <button
            onClick={() => handleAddComment(postId)}
            className="mt-6 text-blue-500 hover:text-blue-600"
          >
            Add a Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
