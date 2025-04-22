package com.salas.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/salas")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    // Get All Pets
    @GetMapping(path = "/pets")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    // Add New Pet
    @PostMapping(path = "/pets")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public Pet addNewPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    // Add Multiple Pets (Bulk Post)
    @PostMapping(path = "/pets/bulk")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public List<Pet> addMultiplePets(@RequestBody List<Pet> pets) {
        return petRepository.saveAll(pets);
    }

    // Update Pet
    @PutMapping(path = "/pets/{id}")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public String updatePet(@PathVariable Integer id, @RequestBody Pet request) {
        Optional<Pet> optionalPet = petRepository.findById(id);

        if (optionalPet.isPresent()) {
            Pet existingPet = optionalPet.get();
            if (request.getName() != null) existingPet.setName(request.getName());
            if (request.getSpecies() != null) existingPet.setSpecies(request.getSpecies());
            if (request.getBreed() != null) existingPet.setBreed(request.getBreed());
            if (request.getGender() != null) existingPet.setGender(request.getGender());
            if (request.getImage() != null) existingPet.setImage(request.getImage());
            if (request.getDescription() != null) existingPet.setDescription(request.getDescription());
            if (request.getPrice() != null) existingPet.setPrice(request.getPrice());

            petRepository.save(existingPet);
            return "Pet with ID " + id + " updated.";
        } else {
            return "Pet with ID " + id + " not found.";
        }
    }

    // Delete a Pet
    @DeleteMapping(path = "/pets/{id}")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public String deletePet(@PathVariable Integer id) {
        return petRepository.findById(id).map(existingPet -> {
            petRepository.delete(existingPet);
            return "Pet with ID " + id + " deleted.";
        }).orElse("Pet with ID " + id + " not found.");
    }

    // Get Pet by ID
    @GetMapping(path = "/pets/{id}")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public Pet getPet(@PathVariable Integer id) {
        return petRepository.findById(id).orElse(null);
    }

    // Search Pet
    @GetMapping(path = "/pets/search/{key}")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public List<Pet> searchPet(@PathVariable String key) {
        return petRepository.findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCaseOrBreedContainingIgnoreCase(key, key, key);
    }

    // Get all pets by price
    @GetMapping(path = "/pets/search/price/{price}")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow requests from Vite
    public List<Pet> getPetsByPrice(@PathVariable Double price) {
        return petRepository.findByPrice(price);
    }
}
