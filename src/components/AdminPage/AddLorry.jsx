import React, { useState } from "react";
import { Client, Databases, Storage } from "appwrite";
import "./AddLorry.css";

const AddLorry = () => {
  const [lorryDetails, setLorryDetails] = useState({
    lorry_name: "",
    lorry_number: "",
    manufacturing_year: "",
    mileage: "",
    fuel_type: "",
    no_of_owner: "",
    lorry_fc: "",
    lorry_rc: "",
    national_permit: "",
    location: "",
    price: "",
    lorry_images: [], // This will hold the selected files
  });


  console.log(lorryDetails.price);
  console.log(typeof lorryDetails.price);


  // Appwrite Client Setup
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113');
  const storage = new Storage(client);
  const databases = new Databases(client);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert numeric inputs to numbers
    let updatedValue = value;

    if (type === "number") {
      if (name === "manufacturing_year") {
        updatedValue = parseInt(value, 10) || ""; // Convert to integer
      } else if (name === "mileage") {
        updatedValue = parseFloat(value) || ""; // Convert to float (double)
      } else if (name === "no_of_owner") {
        updatedValue = parseInt(value, 10) || ""; // Convert to integer
      }
      else if (name === "price") {
        updatedValue = parseInt(value, 10) || ""; // Convert to integer
      } else {
        updatedValue = value;
      }
    }

    setLorryDetails({ ...lorryDetails, [name]: updatedValue });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      alert("Only JPEG, PNG, or JPG files are allowed.");
    }
    setLorryDetails({ ...lorryDetails, lorry_images: validFiles });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the files and get the URLs
    const uploadedImageUrls = await uploadImages(lorryDetails.lorry_images);

    console.log(uploadedImageUrls);


    // Create the lorry record in Appwrite Database
    try {
      const response = await databases.createDocument(
        '6783dd920033baafee24', // The ID of your Appwrite database
        '6783ddbb00096a0eca8d', // The ID of your Appwrite collection
        'unique()', // Document ID (you can use a custom ID or 'unique()' to generate one)
        {
          lorry_name: lorryDetails.lorry_name,
          lorry_number: lorryDetails.lorry_number,
          manufacturing_year: lorryDetails.manufacturing_year,
          mileage: lorryDetails.mileage,
          fuel_type: lorryDetails.fuel_type,
          no_of_owner: lorryDetails.no_of_owner,
          lorry_fc: lorryDetails.lorry_fc,
          lorry_rc: lorryDetails.lorry_rc,
          national_permit: lorryDetails.national_permit,
          location: lorryDetails.location,
          price: lorryDetails.price,
          lorry_image: uploadedImageUrls, // Store the uploaded image URLs
        }
      );
      console.log("Lorry details saved:", response);
      alert("Lorry details added successfully!");
    } catch (error) {
      console.error("Error saving lorry details:", error);
    }
  };

  // Upload images to Appwrite Storage and return the URLs
  const uploadImages = async (files) => {
    const uploadedUrls = [];
    for (let file of files) {
      try {
        const fileUpload = await storage.createFile(
          "6783e2a6002aedc40288", // Bucket ID
          file.name, // Custom file name or unique()
          file
        );
        console.log(file.name);

        uploadedUrls.push(`https://cloud.appwrite.io/v1/storage/buckets/6783e2a6002aedc40288/files/${fileUpload.$id}/view?project=67810eb3001248099113`);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}`);
      }
    }
    return uploadedUrls;
  };


  return (
    <div className="add-lorry-container">
      <h2 className="add-lorry-title">Add New Lorry</h2>
      <form className="add-lorry-form" onSubmit={handleSubmit}>
        <label htmlFor="lorry_name">Lorry Name</label>
        <input
          type="text"
          id="lorry_name"
          name="lorry_name"
          value={lorryDetails.lorry_name}
          onChange={handleChange}
          placeholder="Enter lorry name"
          required
        />

        <label htmlFor="lorry_number">Lorry Number</label>
        <input
          type="text"
          id="lorry_number"
          name="lorry_number"
          value={lorryDetails.lorry_number}
          onChange={handleChange}
          placeholder="Enter lorry number"
          required
        />

        <label htmlFor="manufacturing_year">Manufacturing Year</label>
        <input
          type="number"
          id="manufacturing_year"
          name="manufacturing_year"
          value={lorryDetails.manufacturing_year}
          onChange={handleChange}
          placeholder="Enter year"
          required
        />

        <label htmlFor="mileage">Mileage</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          value={lorryDetails.mileage}
          onChange={handleChange}
          placeholder="Enter mileage"
          step="0.01" // To allow decimal values
          required
        />

        <label htmlFor="fuel_type">Fuel Type</label>
        <select
          id="fuel_type"
          name="fuel_type"
          value={lorryDetails.fuel_type}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select fuel type</option>
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
        </select>

        <label htmlFor="no_of_owner">Number of Owners</label>
        <input
          type="number"
          id="no_of_owner"
          name="no_of_owner"
          value={lorryDetails.no_of_owner}
          onChange={handleChange}
          placeholder="Enter number of owners"
          required
        />

        <label htmlFor="lorry_fc">Lorry FC</label>
        <select
          id="lorry_fc"
          name="lorry_fc"
          value={lorryDetails.lorry_fc}
          onChange={handleChange}
          required
        >
          <option value="">Select FC status</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>


        <label htmlFor="lorry_rc">Lorry RC</label>
        <select
          id="lorry_rc"
          name="lorry_rc"
          value={lorryDetails.lorry_rc}
          onChange={handleChange}
          required
        >
          <option value="">Select RC status</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="national_permit">National Permit</label>
        <select
          id="national_permit"
          name="national_permit"
          value={lorryDetails.national_permit}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={lorryDetails.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={lorryDetails.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />

        <label htmlFor="lorry_images">Lorry Images</label>
        <input
          type="file"
          id="lorry_images"
          name="lorry_images"
          multiple
          accept="image/*" // This allows only image files and opens the gallery by default on mobile
          onChange={handleFileChange}
          required
        />


        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLorry;
