import styles from '../styles/pokemon-types.module.css';
import classNames from 'classnames';
import { Pokemon } from '../Pokemon';

interface IPokemonProps {
    pokemon: Pokemon;
    pokemonCollection: number[];
    setPokemonCollection: React.Dispatch<React.SetStateAction<number>[]>;
  }

const PokemonCard: React.FC<IPokemonProps> = ({ pokemon, pokemonCollection, setPokemonCollection }) => {
    
  //If specified pokemon already exists in pokemonCollection, remove the value from state. Otherwise add it to collection.
  const handleCatchPokemon = (dexNumber: number) => {
    if (pokemonCollection.includes(dexNumber)){
      setPokemonCollection(pokemonCollection.filter((num) => num !== dexNumber));
    } else {
      setPokemonCollection([...pokemonCollection, dexNumber]);
    }
  };

  return (
    <div className='pokemon-card rounded-md flex items-center p-3' key={pokemon.dex_number} style={{ backgroundColor: pokemonCollection.includes(pokemon.dex_number) ? 'lightgreen' : 'white' }}>
    <div id="pokeball" className="ml-1">
    <svg version="1.1" width="25" height="25" viewBox="0 0 25 25" role="button" className={pokemonCollection.includes(pokemon.dex_number) ?  "animate-wiggle" : ""} onClick={() => handleCatchPokemon(pokemon.dex_number)}>
          <path fill="#FFF" stroke="#000" strokeWidth="2" strokeMiterlimit="10" d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"></path>
          <path fill={pokemonCollection.includes(pokemon.dex_number) ? "red" : "gray"} stroke="#000" strokeWidth="2" strokeMiterlimit="10" d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"></path>
          <path fill="#FFF" d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"></path>
        </svg>
    </div>
    <div id = 'pokemonCardContent' className="flex-1 text-center m-5">
      <p className='capitalize font-bold'>{pokemon.name}</p>
      <p className='font-bold'>#: {pokemon.dex_number}</p>
      <img className='pokemon-media mx-auto' src={pokemon.image_url} title={pokemon.name} />

      <div className={classNames(
        styles['type-icon'], 
        styles[String(pokemon.type_1)])} 
        />      
      {/*hide type 2 icon if null*/}
      {pokemon.type_2 ? (
        <div className={classNames
            (styles['type-icon'], 
            styles[String(pokemon.type_2)])} 
            />
      ) : null}
      </div>
    </div>
    );
};

export default PokemonCard;