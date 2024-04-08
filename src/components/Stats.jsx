import { CHARACTERS_LABEL, FACEBOOK_LABEL, INSTAGRAM_LABEL, WORDS_LABEL } from '../lib/constants';

export function Stats({ stats }) {
  const { 
    facebookCharactersLeft,
    instagramCharactersLeft,
    numberOfCharacters,
    numberOfWords, 
  } = stats;

  return (
    <section className="stats">
      <Stat number={numberOfWords} statLabel={WORDS_LABEL} />
      <Stat number={numberOfCharacters} statLabel={CHARACTERS_LABEL} />
      <Stat number={instagramCharactersLeft} statLabel={INSTAGRAM_LABEL} />
      <Stat number={facebookCharactersLeft} statLabel={FACEBOOK_LABEL} />
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
