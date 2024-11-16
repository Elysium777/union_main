import React from "react";

const UnionDetailsForm = ({
  image,
  unionName,
  setUnionName,
  description,
  setDescription,
  handleImageChange,
}) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-3xl">Union Details</h2>

        <p className="text-sm text-gray-400">
          Enter the details of the union you want to create below. You cannot
          change these details once the union is created.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
        />
        {image && <p className="text-sm text-gray-400 mt-1">{image.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Union Name
        </label>
        <input
          type="text"
          value={unionName}
          onChange={(e) => setUnionName(e.target.value)}
          className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-indigo-500 text-gray-200 placeholder-gray-500"
          placeholder="Enter the name of the union"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-indigo-500 text-gray-200 placeholder-gray-500"
          placeholder="Enter a brief description of the union"
          rows="4"
          required
        />
      </div>
    </>
  );
};

export default UnionDetailsForm;
