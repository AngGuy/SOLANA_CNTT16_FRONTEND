import React, { useState } from "react";
import { createNFT } from "../services/apiService";

const CreateNFT = () => {
  const [attributes, setAttributes] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [destinationUserReferenceId, setDestinationUserReferenceId] =
    useState("");

  const handleCreateNFT = async (e) => {
    e.preventDefault();
    const nftData = {
      attributes,
      description,
      imageUrl,
      name,
      destinationUserReferenceId,
    };
    try {
      const data = await createNFT(nftData);
      console.log(data);
      alert("NFT created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating NFT.");
    }
  };

  return (
    <form onSubmit={handleCreateNFT}>
      <h2>Create NFT</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Attributes"
        onChange={(e) => setAttributes(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Reference ID"
        onChange={(e) => setDestinationUserReferenceId(e.target.value)}
      />
      <button type="submit">Create NFT</button>
    </form>
  );
};

export default CreateNFT;
