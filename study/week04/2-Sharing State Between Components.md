# Sharing State Between Components

아코디언등을 구현할때 하나만 열려야하는 경우 상태를 부모에서 관리해야함.  

# 과제1
인풋창 2개 동기화
```jsx
import { useState } from 'react';

const Input = ({ label, value, onChange }) => {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

const SyncedInputs = () => {
  const [ value, setValue ] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  return (
    <>
      <Input 
        label="First input" 
        value={value}
        onChange={handleChange}
      />
      <Input 
        label="Second input" 
        value={value}
        onChange={handleChange}
      />
    </>
  );
}
export default SyncedInputs;
```

### 과제 2
food의 name으로 필터링하기
-> query를 부모 컴포넌트로 옮겨옴
```jsx
import { useState } from 'react';
import { foods, filterItems } from './data.js';

const FilterableList = () => {

  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  }  
  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}
export default FilterableList;

const SearchBar = ({ query, onChange }) => {

  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

const List = ({ items }) => {
  return (
    <table>
      <tbody>
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
