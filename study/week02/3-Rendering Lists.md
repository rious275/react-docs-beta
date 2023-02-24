# Rendering Lists

js의 filter()와 map()을 사용하여 목록을 출려한다.

## key
map이나 filter 함수내의 엘리먼트에 key 속성을 추가한다.
즉석에서 생성하지말고 데이터에 키를 포함시켜야함.( index를 사용하지 말란 이야기 )
```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map((person, index) =>
    <li key={index}>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

여러개의 노드로 구성된 컴포넌트일 경우 Fragment 태그로 key를 전달한다.
```jsx
const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

🤔 리액트에 키가 필요한 이유를 구구절절 설명하는데 모든 list가 다시 식별 가능해야하지는 않음. 그래서 타 프레임워크처럼 알아서 넣거나 빼게하면 좋겠단 생각.

### 과제 1
```jsx
import { people } from './data.js';
import { getImageUrl } from './utils.js';

const List = () => {
  const listChemist = people.filter(person => person.profession === 'chemist');
  const listOthers = people.filter(person => person.profession !== 'chemist');
  const listSorted = [ ...listChemist, ...listOthers];
  const listItems = listSorted.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
export default List;
```

### 과제 2
```jsx
import { Fragment } from 'react';
import { recipes } from './data.js';

export default function RecipeList() {
  const list = recipes.map(recipe => 
    <Fragment key={recipe.id}>
      <h2>{food.name}</h2>
      <ul>
        {recipe.ingredients.map(ingredient =>
          <li key={ingredient}>{ingredient}</li>
        )}
      </ul>
    </Fragment>
  );
  return (
    <div>
      <h1>Recipes</h1>
      {list}
    </div>
  );
}
```

### 과제 3
```jsx
import { recipes } from './data.js';

const Recipe = (props) => {
  return (
    <div key={props.id}>
      <h2>{props.name}</h2>
      <ul>
        {props.ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

const RecipeList = () => {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe key={recipe.id} id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} />
      )}
    </div>
  );
}
export default RecipeList;
```

### 과제4
```jsx
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) => [
        <p key={index}>{line}</p>,
        index < poem.lines.length - 1 && <hr key={`hr-${index}`} />
      ])}
    </article>
  );
}
```