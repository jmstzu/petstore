import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../PetList.css'; // Import the CSS file

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

  useEffect(() => {
    // Fetch all pets from the Spring Boot backend
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
    // Send a DELETE request to remove the pet from the backend
    axios
      .delete(`http://localhost:8080/salas/pets/${id}`)
      .then(() => {
        // After deleting, remove the pet from the local state to update the UI
        setPets(pets.filter((pet) => pet.id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the pet!', error);
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
              <li key={pet.id}>
                <h2>{pet.name}</h2>
                <img src={pet.image} alt={pet.name} className="pet-image" />
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
                <p>Price: ${pet.price}</p>
                <p>Gender: {pet.gender}</p>
                <p>Description: {pet.description}</p>

                {/* Delete Button */}
                <button onClick={() => handleDelete(pet.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PetList;
