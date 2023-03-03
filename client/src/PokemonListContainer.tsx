import React from "react";

type Props = {};

export const PokemonListContainer = (props: Props) => {
  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pokemon-list-filter"
        >
          Filter By Name or PokeDex Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pokemon-list-filter"
          type="text"
          placeholder="Enter name or PokeDex Number..."
        />
      </div>

      <p>You have caught <strong>X</strong> out of <strong>X</strong>, or <strong>~X%</strong></p>
    </div>
  );
};
