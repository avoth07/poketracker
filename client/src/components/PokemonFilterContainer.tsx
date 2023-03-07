import { useEffect, useState } from "react";
import { Pokemon } from "../Pokemon";
import { pokemonData } from '../data/pokemon';

interface IPokemonProps {
    setFilteredList: React.Dispatch<React.SetStateAction<any>[]>;
  }
export const PokemonFilterContainer: React.FC<IPokemonProps> = ({setFilteredList}) => {

    const [filterPokemon, setFilterPokemon] = useState<string>('');
    const [type1Filter, setType1Filter] = useState<string>('Any');
    const [type2Filter, setType2Filter] = useState<string>('Any');
    const [typeOrderChecked, setTypeOrderChecked] = useState<boolean>(true);

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

    useEffect(() => {
        pokemonFilterReducer(setFilteredList);
      },
       [type1Filter,
        type2Filter,
        filterPokemon,
        typeOrderChecked
        ]
    );

    const pokemonFilterReducer = (setFilteredListProp: React.Dispatch<React.SetStateAction<Pokemon>[]>) => {
        setFilteredListProp(pokemonData.filter((pokemon: Pokemon) =>
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
      ) &&
        //finally filter based on textbox content
        (pokemon.name.toLowerCase().includes(filterPokemon.toLowerCase()) || pokemon.dex_number.toString() === filterPokemon)
    ));

  };
  
      //gather all pokemon types from both type 1 and type 2 values
      const uniqueTypes: any[] = Array.from(new Set(pokemonData.map((pokemon: Pokemon) => pokemon.type_1 || pokemon.type_2)));

return (
<div className="m-5">
  <div className="inline-block">
    <div className="mb-4 block">
      <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="pokemon-list-filter">
        Filter By Name or PokeDex Number
      </label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="pokemon-list-filter"
        type="text"
        placeholder="Enter name or PokeDex Number..."
        onChange={handleFilterChange}
      />
    </div>
    <div id="primary-secondary-selector" className="">
      <label className="text-gray-700 text-sm font-bold mr-2">Strict Types:</label>
      <input type="checkbox" checked={typeOrderChecked} onChange={handleCheckboxChanged} id="type-order-filter" />
      <div id="type-selectors" className="flex space-x-4">
        <div className="inline-block">
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
        <div className="inline-block">
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
    </div>
  </div>
</div>
)};