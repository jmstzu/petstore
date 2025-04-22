import React from 'react';
import AddPet from './components/AddPet.tsx'; // Import AddPet component
import PetList from './components/PetList.tsx'; // Assuming you have PetList component
import './PetList.css'
const App: React.FC = () => {
  return (
    <div>
      <h1 className='maintitle'>Pet Management</h1>
      <AddPet /> {/* Render AddPet form */}
      <PetList /> {/* Render the pet list */}
    </div>
  );
};

export default App;
