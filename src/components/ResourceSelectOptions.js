// ResourceSelectOptions.js

import resourcesData from '../data/resources.json';

const ResourceSelectOptions = ({ id, value, onChange }) => {
  const handleSelectChange = (e) => {
    onChange(id, e.target.value);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      {resourcesData.resources.map((resource) => (
        <option
          key={resource.id}
          value={resource.id}
          style={{
            backgroundColor:
              resource.class === 'orchids' ? 'orchid' : 'darkgray',
            color: 'white'
          }}
        >
          {resource.name}
        </option>
      ))}
    </select>
  );
};

export default ResourceSelectOptions;
