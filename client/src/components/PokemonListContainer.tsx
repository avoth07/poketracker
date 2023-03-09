import React, { useEffect, useState} from 'react';
import { Pokemon } from '../Pokemon';
import PokemonCard from './PokemonCard';
import { PokemonFilterContainer } from './PokemonFilterContainer';


const PokemonList: React.FC = () => {
  //state
  const [pokemonCollection, setPokemonCollection] = useState<number[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  //handle returned value from PokemonCard component
  const handleSetPokemonCollection = (collection: any) => {
    setPokemonCollection(collection);
  };

   // load pokemon data in
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/pokemon');
        const data = await response.json();
        setFilteredList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setFilteredList]);

  //gather count statistics
  const totalCount = filteredList.length;
  const caughtCount = filteredList.filter((pokemon) => pokemonCollection.includes(pokemon.dex_number)).length;
  const percentage = Math.round((caughtCount / totalCount) * 100);

return (
<div id = "root" className='flex flex-row flex-wrap space-x-5 space-y-3'>
  <PokemonFilterContainer setFilteredList={setFilteredList}/>
<div id="catchPercent" className="block w-full">
  {totalCount > 0 && (
    <p>You have caught <strong> {caughtCount} </strong> out of <strong>{totalCount}</strong>, or <strong>~{percentage}%</strong></p>
  )}
  {totalCount === 0 && (
    <p>No Pokémon fit your filter criteria.</p>
  )}
</div>
{filteredList.map((pokemon: Pokemon ) => (
  <PokemonCard key={pokemon.dex_number} pokemon={pokemon} pokemonCollection={pokemonCollection} setPokemonCollection={handleSetPokemonCollection}/>
))}
  </div>

)}


export default PokemonList;
