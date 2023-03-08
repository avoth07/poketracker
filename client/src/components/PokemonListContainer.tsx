import React, { useEffect, useState} from 'react';
import { Pokemon } from '../Pokemon';
import PokemonCard from './PokemonCard';
import { PokemonFilterContainer } from './PokemonFilterContainer';
import { getAllPokemon } from '../../../server/services/pokemonService'

const PokemonList: React.FC = () => {
  //state
  const [pokemonCollection, setPokemonCollection] = useState<number[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  
  //handle returned value from PokemonCard component
  const handleSetPokemonCollection = (collection: any) => {
    setPokemonCollection(collection);
  };

  //load all pokemon on mount
  useEffect(() => {
    async function loadPokemon() {
      const pokemonList = await getAllPokemon();
      setFilteredList(pokemonList);
    }
    loadPokemon();
  }, []);

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
  <PokemonCard pokemon={pokemon} pokemonCollection={pokemonCollection} setPokemonCollection={handleSetPokemonCollection}/>
))}
  </div>

)}


export default PokemonList;
