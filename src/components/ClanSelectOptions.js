import clansData from '../data/clans.json';
const ClanSelectOptions = () => {
  return (
    <select>
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
