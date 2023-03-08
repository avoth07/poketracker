import { Pokemon } from "@prisma/client";

interface AuthenticatedUser {
  token: string;
  isAdmin: boolean;
}

const API_URL = "http://localhost:3003";

// Get all Pokemon
export async function getAllPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`${API_URL}/pokemon`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  const data = await response.json();
  return data;
}

// Create Pokemon
export async function createPokemon(pokemon: Pokemon, user: AuthenticatedUser): Promise<Pokemon> {
  if (!user.isAdmin) {
    throw new Error('You are not authorized to perform this action');
  }
  const response = await fetch(`${API_URL}/pokemon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(pokemon),
  });
  if (!response.ok) {
    throw new Error('Failed to create Pokemon');
  }
  const data = await response.json();
  return data;
}

// Update Pokemon
export async function updatePokemon(pokemon: Pokemon, user: AuthenticatedUser): Promise<Pokemon> {
  if (!user.isAdmin) {
    throw new Error('You are not authorized to perform this action');
  }
  const response = await fetch(`${API_URL}/pokemon/${pokemon.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(pokemon),
  });
  if (!response.ok) {
    throw new Error('Failed to update Pokemon');
  }
  const data = await response.json();
  return data;
}

// Delete Pokemon
export async function deletePokemon(id: number, user: AuthenticatedUser): Promise<void> {
  if (!user.isAdmin) {
    throw new Error('You are not authorized to perform this action');
  }
  const response = await fetch(`${API_URL}/pokemon/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete Pokemon');
  }
}