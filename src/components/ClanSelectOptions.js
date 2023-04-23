// ClanSelectOptions.js

import clansData from '../data/clans.json';

const ClanSelectOptions = ({ id, value, onChange }) => {
  const handleSelectChange = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      {clansData.clans.map((clan) => (
        <option
          key={clan.id}
          value={clan.id}
          style={{ backgroundColor: clan.rgba, color: 'text_dark' }}
        >
          {clan.name}
        </option>
      ))}
    </select>
  );
};

export default ClanSelectOptions;
