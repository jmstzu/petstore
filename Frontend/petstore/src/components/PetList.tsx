import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../PetList.css';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  image: string;
  description: string;
  price: number;
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editingPetId, setEditingPetId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Pet>>({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/salas/pets')
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the pets!', error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8080/salas/pets/${id}`)
      .then(() => {
        setPets(pets.filter((pet) => pet.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting pet:', error);
      });
  };

  const handleEditClick = (pet: Pet) => {
    setEditingPetId(pet.id);
    setFormData(pet);
  };

  const handleCancelEdit = () => {
    setEditingPetId(null);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    if (!editingPetId) return;

    axios
      .put(`http://localhost:8080/salas/pets/${editingPetId}`, formData)
      .then((response) => {
        setPets(pets.map((pet) => (pet.id === editingPetId ? response.data : pet)));
        setEditingPetId(null);
        setFormData({});
      })
      .catch((error) => {
        console.error('Error updating pet:', error);
      });
  };

  return (
    <div>
      <h1>Pet List</h1>
      <div>
        {pets.length === 0 ? (
          <p>No pets available.</p>
        ) : (
          <ul>
            {pets.map((pet) => (
              <li key={pet.id} className="pet-card">
                {pet.image && <img src={pet.image} alt={pet.name} />}
                {editingPetId === pet.id ? (
                  <div className="edit-form">
                    <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" />
                    <input name="species" value={formData.species || ''} onChange={handleChange} placeholder="Species" />
                    <input name="breed" value={formData.breed || ''} onChange={handleChange} placeholder="Breed" />
                    <input name="price" type="number" value={formData.price || ''} onChange={handleChange} placeholder="Price" />
                    <input name="gender" value={formData.gender || ''} onChange={handleChange} placeholder="Gender" />
                    <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" />
                    <input name="image" value={formData.image || ''} onChange={handleChange} placeholder="Image URL" />
                    <div className="pet-buttons">
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="pet-info">
                    <h2>{pet.name}</h2>
                    <p><strong>Species:</strong> {pet.species}</p>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Price:</strong> ${pet.price}</p>
                    <p><strong>Gender:</strong> {pet.gender}</p>
                    <p><strong>Description:</strong> {pet.description}</p>
                    <div className="pet-buttons">
                      <button onClick={() => handleEditClick(pet)}>Edit</button>
                      <button onClick={() => handleDelete(pet.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PetList;
