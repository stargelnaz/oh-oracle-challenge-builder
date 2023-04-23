import React, { useState } from 'react';
import './ChallengeInputForm.css';
import ClanSelectOptions from './ClanSelectOptions';
import ResourceSelectOptions from './ResourceSelectOptions';

const ChallengeInputForm = () => {
  // State for form fields
  const [season, setSeason] = useState('S01');
  const [week, setWeek] = useState('');
  const [prize, setPrize] = useState('');
  const [hints, setHints] = useState([{ id: 1, value: '' }]);
  const [quantity, setQuantity] = useState('1');
  // Add hint handler
  const addHint = () => {
    setHints([...hints, { id: hints.length + 1, value: '' }]);
  };
  // Clean empty hints handler
  const cleanEmptyHints = () => {
    setHints(hints.filter((hint) => hint.value.trim() !== ''));
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
        <div>
          <button type='button' onClick={addHint}>
            Add another Hint
          </button>
          <button
            type='button'
            onClick={cleanEmptyHints}
            style={{ marginLeft: '0.5rem' }}
          >
            Clear Empty Hints
          </button>{' '}
        </div>
      </div>
      <h2>Elements</h2>
      <div className='form-elements'>
        <div>
          <label>
            Clan:
            <ClanSelectOptions />
          </label>
        </div>
        <div>
          <label>
            Resource:
            <ResourceSelectOptions />
          </label>
        </div>
        <div>
          <label>Quantity:</label>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <label key={num}>
              <input
                type='radio'
                name='quantity'
                value={num}
                checked={num.toString() === quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {num}
            </label>
          ))}
        </div>
      </div>{' '}
      <button type='button' onClick={generateCode}>
        Generate Code
      </button>
    </div>
  );
};

export default ChallengeInputForm;
