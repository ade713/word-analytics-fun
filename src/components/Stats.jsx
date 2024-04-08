export function Stats({ stats }) {
  const { 
    facebookCharactersLeft,
    instagramCharactersLeft,
    numberOfCharacters,
    numberOfWords, 
  } = stats;

  return (
    <section className="stats">
      <Stat number={numberOfWords} statLabel="Words" />
      <Stat number={numberOfCharacters} statLabel="Characters" />
      <Stat number={instagramCharactersLeft} statLabel="Instagram" />
      <Stat number={facebookCharactersLeft} statLabel="Facebooks" />
    </section>
  );
}

function Stat({ number, statLabel }) {
  return (
    <section className='stat'>
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ''}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{statLabel}</h2>
    </section>
  );
}
