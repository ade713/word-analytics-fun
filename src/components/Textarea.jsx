import { useState } from 'react';
import { Warning } from './Warning';

export function Textarea({text, setText}) {
  const [warningText, setWarningText] = useState('');

  const handleChange = (e) => {
    let newText = e.target.value;

    // basic text validation
    if (newText.includes('<script>')) {
      setWarningText('No script tag allowed plair!');
      newText = newText.replace('<script>', '');
    } else if (newText.includes('@')) {
      setWarningText('No @ symbol allowed home slice!');
      newText = newText.replace('@', '');
    } else {
      setWarningText('');
    }

    setText(newText);
  }
  
  return (
    <div className="textarea">
      <textarea
        placeholder="Enter your text"
        onChange={handleChange}
        spellCheck="false"
        value={text}
      />
      {warningText ? <Warning warningText={warningText} /> : null}
    </div>
  );
}
