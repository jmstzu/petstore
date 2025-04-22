import React, { useState } from 'react';
import axios from 'axios';
import '../AddPet.css'; // Import the CSS file for styling

const AddPet: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a pet object
    const pet = {
      name,
      species,
      breed,
      price: Number(price),
      description,
      image,
    };

    // Post request to add a new pet
    axios
      .post('http://localhost:8080/salas/pets', pet)
      .then((response) => {
        setMessage('Pet added successfully!');
        setIsSuccess(true);
        // Reset form after successful submission
        setName('');
        setSpecies('');
        setBreed('');
        setPrice('');
        setDescription('');
        setImage('');
      })
      .catch((error) => {
        console.error('There was an error adding the pet!', error);
        setMessage('Failed to add pet.');
        setIsSuccess(false);
      });
  };

  return (
    <div className="add-pet-container">
      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Species</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Breed</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
      {message && (
        <p className={isSuccess ? 'success' : 'error'}>{message}</p>
      )}
    </div>
  );
};

export default AddPet;
