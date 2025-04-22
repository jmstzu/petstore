import axios from 'axios';
import { Pet } from '../types';

const API_BASE = 'http://localhost:8080/salas/pets';

export const getAllPets = () => axios.get<Pet[]>(API_BASE);
