import React, { useState } from 'react';
import './ChallengeInputForm.css';

const ChallengeInputForm = () => {
  // State for form fields
  const [season, setSeason] = useState('S01');
  const [week, setWeek] = useState('');
  const [prize, setPrize] = useState('');
  const [hints, setHints] = useState([{ id: 1, value: '' }]);

  // Add hint handler
  const addHint = () => {
    setHints([...hints, { id: hints.length + 1, value: '' }]);
  };

  // Update hint value handler
  const updateHint = (id, value) => {
    setHints(hints.map((hint) => (hint.id === id ? { ...hint, value } : hint)));
  };

  // Generate code handler
  const generateCode = () => {
    const weekCode = week ? `W${week.toString().padStart(2, '0')}` : '';
    const prizeCode = prize ? `&P=${prize}` : '';
    const hintsCode = hints
      .map((hint, index) => (hint.value ? `&H${index + 1}=${hint.value}` : ''))
      .join('');

    const code = `${season}${weekCode}${prizeCode}${hintsCode}`;
    console.log('Generated code:', code);
  };

  return (
    <div className='form-container'>
      <h2>Season</h2>
      <div className='form-section season'>
        <label>
          <input
            type='radio'
            name='season'
            value='S01'
            checked={season === 'S01'}
            onChange={(e) => setSeason(e.target.value)}
          />
          Season 1
        </label>
        <label>
          <input
            type='radio'
            name='season'
            value='S02'
            checked={season === 'S02'}
            onChange={(e) => setSeason(e.target.value)}
          />
          Season 2
        </label>
        <div className='form-section season'>
          <label>
            Week:
            <input
              type='number'
              name='week'
              min='1'
              max='99'
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            />
          </label>
          <label>
            Prize:
            <input
              type='text'
              name='prize'
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
            />
          </label>
        </div>
      </div>
      <h2>Hints</h2>
      <div className='form-section'>
        {hints.map((hint) => (
          <div key={hint.id}>
            <label>
              Hint #{hint.id}:
              <input
                type='text'
                name={`hint${hint.id}`}
                value={hint.value}
                onChange={(e) => updateHint(hint.id, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type='button' onClick={addHint}>
          Add another Hint
        </button>
      </div>
      <h2>Elements</h2>
      {/* Elements section will be developed later */}
      <button type='button' onClick={generateCode}>
        Generate Code
      </button>
    </div>
  );
};

export default ChallengeInputForm;
