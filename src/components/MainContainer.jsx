import { useState } from 'react';
import { Stats } from './Stats';
import { Textarea } from './Textarea';
import { FACEBOOK_MAX_CHARACTERS, INSTAGRAM_MAX_CHARACTERS } from '../lib/constants';
import { charactersLeft, numberOfWordsInString } from '../lib/utils';

export function MainContainer() {
  const [text, setText] = useState('');

  const stats = {
    numberOfWords: numberOfWordsInString(text),
    numberOfCharacters: text.length,
    instagramCharactersLeft: charactersLeft(INSTAGRAM_MAX_CHARACTERS, text),
    facebookCharactersLeft: charactersLeft(FACEBOOK_MAX_CHARACTERS, text),
  }

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stats={stats} />
    </main>
  );
}
