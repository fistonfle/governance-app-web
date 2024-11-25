import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postsSlice"; // Adjust the path if necessary
import { Link, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader

const PostsGrid = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth); // Access user state from authSlice

  useEffect(() => {
    // Dispatch fetchPosts on every page visit or component mount
    dispatch(fetchPosts());
  }, [dispatch]); // This will ensure posts are fetched every time the component is mounted

  // Default image for posts without images
  const defaultImage =
    "https://th.bing.com/th/id/R.1e836926032a3c123d55fea94fdcd98d?rik=god%2b7%2fUa%2fHRqng&riu=http%3a%2f%2fwww.mangrovealliance.org%2fwp-content%2fuploads%2f2019%2f07%2fmikoko-pamoja.jpg&ehk=5QkhyXTTlH4ja1wECiG%2fP8xLOO5O947j7DRSymKjAvY%3d&risl=1&pid=ImgRaw&r=0";

  // Loading skeleton for posts
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
      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={post.image || defaultImage}
              alt="Post"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-4">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="text-lg leading-relaxed mb-4">
              {post.content.slice(0, 100)}...
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaThumbsUp className="text-blue-600" size={20} />
              <span>{post.upvotes} Upvotes</span>
            </div>
            <Link
              to={`/posts/${post.id}`}
              className="text-blue-600 hover:text-blue-700"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
