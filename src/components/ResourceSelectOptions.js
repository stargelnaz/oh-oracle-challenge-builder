import resourcesData from '../data/resources.json';
const ResourceSelectOptions = () => {
  return (
    <select>
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
