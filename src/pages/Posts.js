import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa"; // Import thumbs-up icon
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader

const Post = ({ postId }) => {
  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const [post, setPost] = useState(null); // State to hold the post data
  const [upvotes, setUpvotes] = useState(0); // Initialize upvotes

  // Default image for the post
  const defaultImage =
    "https://via.placeholder.com/600x400.png?text=No+Image+Available";

  // Fetch the post from the API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
        setUpvotes(response.data.upvotes || 0); // Set the upvotes count
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // If post data is not loaded, show skeleton loader
  if (!post) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton height={40} width={300} className="mb-4" />
        <Skeleton height={20} width={200} className="mb-6" />
        <Skeleton count={4} className="mb-6" />
        <Skeleton height={50} width={200} />
      </div>
    );
  }

  // Handle upvote
  const handleUpvote = async () => {
    try {
      const response = await axios.post(
        `/api/posts/${post.id}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setUpvotes(upvotes + 1); // Increment upvote count
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <img
        src={post.image || defaultImage} // Display post image or default if none exists
        alt="Post"
        className="w-full h-64 object-cover mb-6"
      />
      <p className="text-gray-600 text-sm mb-4">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed mb-6">{post.content}</div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-gray-600">Views: {post.viewCount}</span>
        <div className="flex items-center gap-2">
          <FaThumbsUp
            className="cursor-pointer text-blue-600 hover:text-blue-700"
            size={24}
            onClick={handleUpvote}
          />
          <span className="text-gray-600">{upvotes} Upvotes</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
