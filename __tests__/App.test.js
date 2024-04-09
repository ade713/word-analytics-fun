import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import App from '../src/components/App';
import { CHARACTERS_LABEL, FACEBOOK_LABEL, FACEBOOK_MAX_CHARACTERS, INSTAGRAM_LABEL, INSTAGRAM_MAX_CHARACTERS, WORDS_LABEL } from '../src/lib/constants';
import { charactersLeft, numberOfWordsInString } from '../src/lib/utils';

const charsString = 'apples are awesome';
const longCharsString = 'Instagram and Facebook are companies both under the umbrella corp known as Meta! Meta was formerly known as Facebook before the big change was made. Meta in located in menlo park.'
const makeTooLongString = () => {
  let tooLongString = '';
  for (let i = 1; i <= 13; i++) {
    tooLongString += longCharsString;
  }
  return tooLongString;
}
const facebookTooLongString = makeTooLongString();

describe("App.js", () => {
  it('renders the Word Analytics app', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeVisible(); // header
    expect(screen.getByRole('main')).toBeVisible(); // main content
    expect(screen.getByRole('contentinfo')).toBeVisible(); // footer

    // stat components
    expect(screen.getByRole('heading', {name: WORDS_LABEL}));
    expect(screen.getByRole('heading', {name: CHARACTERS_LABEL}));
    expect(screen.getByRole('heading', {name: INSTAGRAM_LABEL}));
    expect(screen.getByRole('heading', {name: FACEBOOK_LABEL}));
  });

  describe('Words Stat', () => {
    it('displays the number of words typed', async () => {
      render(<App />);

      await userEvent.type(screen.getByRole('textbox'), charsString);

      const wordsStat = screen.getByRole('heading', {name: WORDS_LABEL}).previousElementSibling;
      expect(wordsStat.textContent).toEqual(String(numberOfWordsInString(charsString)));
    });
  });

  describe('Characters Stat', () => {
    it('displays the number of characters typed', async () => {
      render(<App />);

      await userEvent.type(screen.getByRole('textbox'), charsString);

      const charactersStat = screen.getByRole('heading', {name: CHARACTERS_LABEL}).previousElementSibling;
      expect(charactersStat.textContent).toEqual(String(charsString.length));
    });
  });

  describe('Instagram Stat', () => {
    it('displays the number of characters left that can be typed', async () => {
      render(<App />);

      await userEvent.type(screen.getByRole('textbox'), longCharsString);

      const instagramStat = screen.getByRole('heading', {name: INSTAGRAM_LABEL}).previousElementSibling;
      expect(instagramStat.textContent).toEqual(String(charactersLeft(INSTAGRAM_MAX_CHARACTERS, longCharsString)));
    });

    it('displays count in applied class when limit passed', async () => {
      render(<App />);

      const tooLongString = longCharsString + longCharsString;

      await userEvent.type(screen.getByRole('textbox'), tooLongString);

      const instagramStat = screen.getByRole('heading', {name: INSTAGRAM_LABEL}).previousElementSibling;
      expect(instagramStat).toHaveClass('stat__number--limit');
    });
  });

  describe('Facebook Stat', () => {
    it('displays the number of characters left that can be typed', async () => {
      render(<App />);

      await userEvent.type(screen.getByRole('textbox'), longCharsString);

      const facebookStat = screen.getByRole('heading', {name: FACEBOOK_LABEL}).previousElementSibling;
      expect(facebookStat.textContent).toEqual(String(charactersLeft(FACEBOOK_MAX_CHARACTERS, longCharsString)));
    });

    it('displays count in applied class when limit passed', async () => {
      render(<App />);

      await userEvent.type(screen.getByRole('textbox'), facebookTooLongString);

      const instagramStat = screen.getByRole('heading', {name: FACEBOOK_LABEL}).previousElementSibling;
      expect(instagramStat).toHaveClass('stat__number--limit');
    }, 7000); // longer timeout added to cater for long time to enter characters to surpass 2200 char limit
  });
});
