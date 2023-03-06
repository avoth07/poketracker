import React, { useState, useEffect } from 'react';
import styles from './styles/pokemon-types.module.css';
import classNames from 'classnames';
import { pokemonData } from './data/pokemon';
//import getPokemonData from '../../server/prisma/pokemonService'

interface Pokemon {
  name: string;
  dex_number: number;
  type_1: string;
  type_2: string | null;
  image_url: string;
  isCaught?: boolean;
}

const PokemonList: React.FC = () => {
  //set state and filter options
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);
  const [filterPokemon, setFilterPokemon] = useState<string>('');
  const [type1Filter, setType1Filter] = useState<string>('Any');
  const [type2Filter, setType2Filter] = useState<string>('Any');
  const [typeOrderChecked, setTypeOrderChecked] = useState<boolean>(true);

  //gather all pokemon types from both type 1 and type 2 values
  const uniqueTypes: any[] = Array.from(new Set(pokemonData.map((pokemon: Pokemon) => pokemon.type_1 || pokemon.type_2)));
  
  const handleFilterChange = (event: any) => {
    setFilterPokemon(event.target.value);
  };

  const handleType1FilterChange = (event: any) => {
    setType1Filter(event.target.value);
  };

  const handleType2FilterChange = (event: any) => {
    setType2Filter(event.target.value);
  };

  const handleCheckboxChanged = () => {
    setTypeOrderChecked(!typeOrderChecked);
  };

  //If specified pokemon already exists in caughtPokemon, remove the value from state. Otherwise add it to caughtPokemon.
  const handleCatchPokemon = (dexNumber: number) => {
    if (caughtPokemon.includes(dexNumber)){
      setCaughtPokemon(caughtPokemon.filter((num) => num !== dexNumber));
    } else {
    setCaughtPokemon([...caughtPokemon, dexNumber]);
    }
  };

  //map pokemondata and assign isCaught boolean based on caughtPokemon Array
  const mapPokemonData = pokemonData.map((pokemon: Pokemon) => {
    const isCaught = caughtPokemon.includes(pokemon.dex_number);
    return { ...pokemon, isCaught };
  });

  //filter pokemon based on type and consider whether or not type order checkbox is checked.
  const filteredList = mapPokemonData.filter((pokemon: Pokemon) =>   
   (
    (typeOrderChecked) &&
    (
      (pokemon.type_1 === type1Filter && pokemon.type_2 === type2Filter) ||
      (pokemon.type_1 === type1Filter && type2Filter === 'Any') ||
      (type1Filter === 'Any' && pokemon.type_2 === type2Filter) ||
      (type1Filter === 'Any' && type2Filter === 'Any')
    ) || 
  (!typeOrderChecked) &&
    (
      (type1Filter === 'Any' && (pokemon.type_1 === type2Filter || pokemon.type_2 === type2Filter) )|| 
      (type2Filter === 'Any' && (pokemon.type_1 === type1Filter || pokemon.type_2 === type1Filter) )||
      (pokemon.type_1 === type2Filter && pokemon.type_2 === type1Filter) ||
      (pokemon.type_1 === type1Filter && pokemon.type_2 === type2Filter) ||
      (type1Filter === 'Any' && type2Filter === 'Any')
    ) 
  )&&
  //finally filter based on textbox content
   (pokemon.name.toLowerCase().includes(filterPokemon.toLowerCase()) || pokemon.dex_number.toString() === filterPokemon)
  );

  //gather count statistics
  const caughtCount = filteredList.filter(x => x.isCaught).length;
  const totalCount = filteredList.length;
  const percentage = Math.round((caughtCount / totalCount) * 100);

return (
<div id = "root" className='flex flex-row flex-wrap space-x-5 space-y-3'>
  <div className="mb-4 block flex flex-col w-1/3 float-left">
    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="pokemon-list-filter">
      Filter By Name or PokeDex Number
    </label>
    <div className="flex-grow mr-2">
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="pokemon-list-filter"
        type="text"
        placeholder="Enter name or PokeDex Number..."
        onChange={handleFilterChange}
      />
    </div>
  </div>
  <div id = "primary-secondary-selector" className="flex flex-row items-center">
    <label className="text-gray-700 text-sm font-bold mr-2">Strict Types:</label>
    <input type="checkbox" checked={typeOrderChecked} onChange={handleCheckboxChanged} id="type-order-filter" />
  </div>
    <div id = "type-selectors" className="flex flex-row space-x-4">
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="type-1-filter">Type 1</label>
        <select
          onChange={handleType1FilterChange}
          id="type-1-filter"
          className="block w-70 h-10 rounded-md border-gray-300 bg-white text-gray-900 border pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option>Any</option>
          {uniqueTypes.map((type1: string) => (
          <option className="capitalize" key={type1} value={type1}>
            {type1}
          </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="type-2-filter">Type 2</label>
        <select
          onChange={handleType2FilterChange}
          defaultValue="Any"
          id="type-2-filter"
          className="block w-70 h-10 rounded-md border-gray-300 bg-white text-gray-900 border pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="Any">Any</option>
        {uniqueTypes.map((type2: string) => (
          <option className="capitalize" key={type2} value={type2}>{type2}</option>
          ))}
        </select>
      </div>
    </div>

<div id="catchPercent" className="block w-full">
  {totalCount > 0 && (
    <p>You have caught <strong> {caughtCount} </strong> out of <strong>{totalCount}</strong>, or <strong>~{percentage}%</strong></p>
  )}
  {totalCount === 0 && (
    <p>No Pokémon fit your filter criteria.</p>
  )}
</div>
{filteredList.map((pokemon: Pokemon) => (
  <div className='pokemon-card rounded-md flex items-center p-3' key={pokemon.dex_number} style={{ backgroundColor: pokemon.isCaught ? 'lightgreen' : 'white' }}>
    <div id="pokeball" className="ml-1">
    <svg version="1.1" width="25" height="25" viewBox="0 0 25 25" role="button" className={pokemon.isCaught ?  "animate-wiggle" : ""} onClick={() => handleCatchPokemon(pokemon.dex_number)}>
          <path fill="#FFF" stroke="#000" strokeWidth="2" strokeMiterlimit="10" d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"></path>
          <path fill={pokemon.isCaught ? "red" : "gray"} stroke="#000" strokeWidth="2" strokeMiterlimit="10" d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"></path>
          <path fill="#FFF" d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"></path>
        </svg>
    </div>

    <div id = 'pokemonCardContent' className="flex-1 text-center m-5">
      <p className='capitalize font-bold'>{pokemon.name}</p>
      <p className='font-bold'>#: {pokemon.dex_number}</p>
      <img className='pokemon-media mx-auto' src={pokemon.image_url} title={pokemon.name} />

      <div className={classNames(styles['type-icon'], styles[String(pokemon.type_1)])} />      
      {/*hide type 2 icon if null*/}
      {pokemon.type_2 ? (

      <div className={classNames(styles['type-icon'], styles[String(pokemon.type_2)])} />
      ) : null}
      </div>
    
    </div>
  
))}
  </div>

)}


export default PokemonList;
