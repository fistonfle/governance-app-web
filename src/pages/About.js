import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
          About PAMOJA
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to <span className="font-bold text-blue-500">PAMOJA</span>, a
          revolutionary platform designed to bring people together through
          meaningful connections, shared ideas, and vibrant discussions.
          PAMOJA, which means "together" in Swahili, embodies our mission to
          create a space where everyone’s voice matters.
        </p>
        <h2 className="text-2xl font-semibold text-green-500 mb-2">
          What We Do
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          PAMOJA is a social media platform built to encourage collaboration,
          community building, and the exchange of ideas. Our app allows users
          to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            <span className="font-semibold text-blue-600">Post:</span> Share
            your thoughts, ideas, or updates with the community.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Comment:</span> Engage
            in conversations and provide feedback on others' posts.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Tag:</span> Organize
            your content and explore related posts through tags.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Connect:</span> Build
            meaningful connections through shared interests.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Empower:</span>{" "}
            Promote knowledge sharing and community development.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">
          Why Choose PAMOJA?
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          At PAMOJA, we believe in inclusivity and accessibility. Our
          user-friendly interface, combined with powerful features, ensures that
          you can focus on what truly matters—connecting with others.
        </p>
        <p className="text-lg leading-relaxed">
          Join us and be a part of a growing community where ideas flourish,
          connections are strengthened, and everyone has a voice.
        </p>
        <div className="text-center mt-8">
          <Link to={"/signup"} className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
