// OptionForm.jsx
import React, { useState, useRef } from "react";
import axios from "axios";

const OptionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [storeLink, setStoreLink] = useState("");


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 100 * 1024 * 1024) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setFileError("");
    } else {
      setFileError("File too large or invalid!");
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !videoFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", videoFile);
      formData.append('storeLink', storeLink);  // ✅ renamed key from "mama" to "video"

      const response = await axios.post(
        "http://localhost:3000/api/item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Uploaded:", response.data);
      alert("Food item saved successfully!");
      setName("");
      setDescription("");
      setVideoFile(null);
      setVideoURL(null);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !name || !description || !videoFile || loading;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Product</h1>
          <p className="text-gray-400 mt-2">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="space-y-2">
            <label
              htmlFor="foodVideo"
              className="block text-sm font-medium text-gray-300"
            >
              Food Video
            </label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
            >
              <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
                <p>
                  <strong className="text-indigo-400">Tap to upload</strong> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  MP4, WebM, MOV • Up to ~100MB
                </p>
              </div>
            </div>

            {fileError && (
              <p className="text-red-500 text-sm">{fileError}</p>
            )}

            {videoFile && (
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3 mt-3">
                <div className="flex items-center space-x-3">
                  <span>{videoFile.name}</span>
                  <span className="text-xs text-gray-400">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-indigo-400 hover:text-indigo-300"
                    onClick={openFileDialog}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-red-400 hover:text-red-300"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoURL(null);
                      setFileError("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoURL && (
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <video
                className="w-full rounded-lg"
                src={videoURL}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="foodName"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="Title of you product"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="foodDesc"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description about your product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Store Link */}
<div>
  <label htmlFor="storeLink" className="block text-sm font-medium text-gray-300">
   Product Link
  </label>
  <input
    id="storeLink"
    type="url"
    placeholder="https://example.com/product"
    value={storeLink}
    onChange={(e) => setStoreLink(e.target.value)}
    required
    className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
  />
</div>


          {/* Actions */}
          <div className="flex justify-end">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
              type="submit"
              disabled={isDisabled}
            >
              {loading ? "Saving..." : "Save Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OptionForm;
