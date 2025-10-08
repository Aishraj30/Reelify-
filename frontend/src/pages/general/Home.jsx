import React, { useEffect, useState, useRef } from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const videoRefs = useRef([]);

  // Fetch videos from backend

 // (`${import.meta.env.VITE_API_URL}/api/item`
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/item`, { withCredentials: true })
      .then((res) => {
        setVideos(res.data.items); // Make sure backend returns items array
      })
      .catch((err) => console.log(err));
  }, []);

  // Auto-play only visible video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {videos.map((video, index) => (
        <div
          key={video._id}
          className="h-screen w-full relative flex items-center justify-center snap-start"
        >
          {/* Background Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.video}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70"></div>

          {/* Bottom Center Info */}
          <div className="absolute bottom-20 w-full px-6 flex flex-col items-center text-center">
            <p className="text-white text-sm sm:text-base mb-3 line-clamp-2 max-w-md">
              {video.description}
            </p>
            <button
  onClick={() => window.open(video.storeLink, "_blank")}
  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
>
  Visit Store
</button>

          </div>

          {/* Right Side Buttons */}
          <div className="absolute right-6 bottom-32 flex flex-col items-center space-y-6">
            <button
              onClick={() => toggleLike(video._id)}
              className="flex flex-col items-center text-white hover:scale-110 transition"
            >
              <HeartIcon
                className={`h-8 w-8 ${liked[video._id] ? "text-red-500" : "text-gray-300"}`}
              />
              <span className="text-xs mt-1">{liked[video._id] ? "Liked" : "Like"}</span>
            </button>

            <button
              onClick={() => toggleSave(video._id)}
              className="flex flex-col items-center text-white hover:scale-110 transition"
            >
              <BookmarkIcon
                className={`h-8 w-8 ${saved[video._id] ? "text-yellow-400" : "text-gray-300"}`}
              />
              <span className="text-xs mt-1">{saved[video._id] ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
