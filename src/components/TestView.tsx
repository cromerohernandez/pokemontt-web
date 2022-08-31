import { FunctionComponent } from 'react';
import { Pokemon } from 'pokedex-promise-v2';

interface TestProps {
  pokemonA: Pokemon | undefined;
  pokemonB: Pokemon | undefined;
}

const TestView: FunctionComponent<TestProps> = ({ pokemonA, pokemonB }) => {
  const styleImg = {
    transform: 'scaleX(-1)'
  }

  return (
    <>
      {pokemonA && pokemonB &&
        <>
          <div>
            <h4>{ pokemonA.name }</h4>
            <h6>{ pokemonA.types[0].type.name }</h6>
            <h6>{ `${pokemonA.stats[0].stat.name} - ${pokemonA.stats[0].base_stat}` }</h6>
            <h6>{ `${pokemonA.stats[1].stat.name} - ${pokemonA.stats[1].base_stat}` }</h6>
            <h6>{ `${pokemonA.stats[2].stat.name} - ${pokemonA.stats[2].base_stat}` }</h6>

            <h4>{ pokemonB.name }</h4>
            <h6>{ pokemonB.types[0].type.name }</h6>
            <h6>{ `${pokemonB.stats[0].stat.name} - ${pokemonB.stats[0].base_stat}` }</h6>
            <h6>{ `${pokemonB.stats[1].stat.name} - ${pokemonB.stats[1].base_stat}` }</h6>
            <h6>{ `${pokemonB.stats[2].stat.name} - ${pokemonB.stats[2].base_stat}` }</h6>
          </div>

          <div>
            <img src={pokemonA.sprites.other.home.front_default ?? undefined} alt='pokemon-sprite' style={styleImg}></img>
            <img src={pokemonB.sprites.other.home.front_default ?? undefined} alt='pokemon-sprite'></img>
          </div>
        </>
      }
    </>
  )
}
 
export default TestView;
