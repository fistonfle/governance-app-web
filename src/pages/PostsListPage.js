import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postsSlice";
import { postComment } from "../features/commentsSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader

const PostsGrid = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth); // Access user state from authSlice
  const [selectedPostId, setSelectedPostId] = useState(null); // To track the post being commented on
  const [commentContent, setCommentContent] = useState(""); // Comment content state
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent.trim() && user) {
      dispatch(
        postComment({ postId: selectedPostId, comment: commentContent })
      );
      setCommentContent(""); // Clear the comment field
      setSelectedPostId(null); // Close the comment form
    }
  };

  const defaultImage =
    "https://th.bing.com/th/id/R.1e836926032a3c123d55fea94fdcd98d?rik=god%2b7%2fUa%2fHRqng&riu=http%3a%2f%2fwww.mangrovealliance.org%2fwp-content%2fuploads%2f2019%2f07%2fmikoko-pamoja.jpg&ehk=5QkhyXTTlH4ja1wECiG%2fP8xLOO5O947j7DRSymKjAvY%3d&risl=1&pid=ImgRaw&r=0";

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-lg">
            <Skeleton height={200} width="100%" className="mb-4" />
            <Skeleton width="80%" height={20} className="mb-2" />
            <Skeleton width="60%" height={20} />
          </div>
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-8 text-red-500">
        <p>Error fetching posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-lg rounded-lg">
            {/* Post Image */}
            <img
              src={post.image || defaultImage}
              alt="Post"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />

            {/* Post Title & Author */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Published on {new Date(post.createdAt).toLocaleDateString()} by{" "}
              {post.author}
            </p>

            {/* Post Content Preview */}
            <div className="text-lg text-gray-700 leading-relaxed mb-4">
              {post.content.length > 150
                ? `${post.content.slice(0, 150)}...`
                : post.content}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaThumbsUp className="text-blue-600" size={20} />
                <span>{post.likes} Upvotes</span>
              </div>
              <div className="flex items-center gap-2">
                <FaComment className="text-gray-600" size={20} />
                <span>{post.comments?.length} Comments</span>
              </div>
            </div>

            {/* Read More Link */}
            <Link
              to={`/posts/${post.id}`}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Read Full Post
            </Link>

            {/* Add Comment Button */}
            {
              <button
                onClick={() => handleAddComment(post.id)}
                className="mt-4 ml-2 text-blue-600 hover:text-blue-700"
              >
                Add a Comment
              </button>
            }

            {/* Comment Form (shown when Add Comment is clicked) */}
            {selectedPostId === post.id && (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                  rows="3"
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="mt-2 text-white bg-blue-600 px-4 py-2 rounded"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
