export const POKEMON_MAX_HP = 200

export const POKEMON_REQUIRED_FIELDS = [
  //name
  ['name'],
  //types (at least one)
  ['types', '0', 'type', 'name'],
  //experience (experience = level^3)
  ['base_experience'],
  //hp
  ['stats', '0', 'base_stat'],
  ['stats', '0', 'stat', 'name'],
  //attack
  ['stats', '1', 'base_stat'],
  ['stats', '1', 'stat', 'name'],
  //defense
  ['stats', '2', 'base_stat'],
  ['stats', '2', 'stat', 'name'],
  //moves (at least one)
  ['moves', '0', 'move', 'name'],
  //image
  ['sprites', 'other', 'home', 'front_default']
]
