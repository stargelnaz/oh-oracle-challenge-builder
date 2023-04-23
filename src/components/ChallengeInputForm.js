//ChallengeInputForm.js

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
  const [elements, setElements] = useState([
    { id: 1, clan: '', resource: '', quantity: 1 }
  ]);

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

  // Add element handler
  const addElement = () => {
    setElements([
      ...elements,
      { id: elements.length + 1, clan: '', resource: '', quantity: 1 }
    ]);
  };

  // Delete last element handler
  const deleteLastElement = () => {
    if (elements.length > 1) {
      setElements(elements.slice(0, elements.length - 1));
    }
  };

  // Update element handler
  const updateElement = (id, field, value) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, [field]: value } : element
      )
    );
  };

  // Generate code handler
  const generateCode = () => {
    const weekCode = week ? `W${week.toString().padStart(2, '0')}` : '';
    const prizeCode = prize ? `&P=${prize}` : '';
    const hintsCode = hints
      .map((hint, index) => (hint.value ? `&H${index + 1}=${hint.value}` : ''))
      .join('');
    const elementsCode = elements
      .map(
        (element) =>
          `&E${element.id}=${element.clan}-${element.resource}-${element.quantity}`
      )
      .join('');

    const code = `${season}${weekCode}${prizeCode}${hintsCode}${elementsCode}`;
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
        {elements.map((element) => (
          <div
            key={element.id}
            style={{ backgroundColor: `rgb(255, ${element.id * 30}, 0)` }}
          >
            <h3>Element #{element.id}</h3>

            <label>
              Clan:
              <ClanSelectOptions
                id={element.id}
                value={element.clan}
                onChange={(id, value) => updateElement(id, 'clan', value)}
              />
            </label>
            <label>
              Resource:
              <ResourceSelectOptions
                id={element.id}
                value={element.resource}
                onChange={(id, value) => updateElement(id, 'resource', value)}
              />
            </label>
            <div>
              <label>Quantity:</label>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <label key={num}>
                  <input
                    type='radio'
                    name={`quantity${element.id}`}
                    value={num}
                    checked={num.toString() === element.quantity}
                    onChange={(e) =>
                      setElements(
                        elements.map((el) =>
                          el.id === element.id
                            ? { ...el, quantity: e.target.value }
                            : el
                        )
                      )
                    }
                  />
                  {num}
                </label>
              ))}
              {element.id > 1 && (
                <button
                  type='button'
                  onClick={() => setElements(elements.slice(0, -1))}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Delete Element
                </button>
              )}
            </div>
          </div>
        ))}
        <button type='button' onClick={addElement}>
          Add another Element
        </button>
      </div>
      <button type='button' onClick={generateCode}>
        Generate Code
      </button>
    </div>
  );
};

export default ChallengeInputForm;
