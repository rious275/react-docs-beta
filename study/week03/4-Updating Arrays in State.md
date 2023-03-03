# Updating Arrays in State

객체와 마찬가지로 읽기전용으로 취급해야함.  

새배열을 반환하는 concat, 스프레드 구문, filter, slice, map같은 걸 사용하거나 모든 배열 메서드를 사용하고 싶을땐 Immer를 사용할 수있음.

## 배열 추가
push 쓰지 말 것  

아래처럼 쓸 것.
```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setName('');
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
앞쪽에 넣을땐 아래처럼
```jsx
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```

## 배열에서 삭제
filter 활용
```jsx
<button onClick={() => {
  setArtists(
    artists.filter(a =>
      a.id !== artist.id
    )
  );
}}>
```

## 배열 수정
map 활용
```jsx
const handleClick = () => {
  const nextShapes = shapes.map(shape => {
    if (shape.type === 'square') {
      // No change
      return shape;
    } else {
      // Return a new circle 50px below
      return {
        ...shape,
        y: shape.y + 50,
      };
    }
  });
  // Re-render with the new array
  setShapes(nextShapes);
}
```

## 배열 대체
map 활용
```jsx
const handleIncrementClick = (index) => {
  const nextCounters = counters.map((c, i) => {
    if (i === index) {
      // Increment the clicked counter
      return c + 1;
    } else {
      // The rest haven't changed
      return c;
    }
  });
  setCounters(nextCounters);
}
```

## 배열에 삽입(특정위치)
slice 활용
```jsx
const handleClick = () => {
  const insertAt = 1; // Could be any index
  const nextArtists = [
    // Items before the insertion point:
    ...artists.slice(0, insertAt),
    // New item:
    { id: nextId++, name: name },
    // Items after the insertion point:
    ...artists.slice(insertAt)
  ];
  setArtists(nextArtists);
  setName('');
}
```

## 기타
순서 반대로
```jsx
const handleClick = () => {
  const nextList = [...list];
  nextList.reverse();
  setList(nextList);
}
```

## 배열내의 객체
deepcopy 하고 쓰라는 얘기로 이해함.

```jsx
const handleToggleMyList = (artworkId, nextSeen) => {
  setMyList(myList.map(artwork => {
    if (artwork.id === artworkId) {
      // Create a *new* object with changes
      return { ...artwork, seen: nextSeen };
    } else {
      // No changes
      return artwork;
    }
  }));
}
```

## Immer 사용
```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }
  return (
    //
  )
}

```

## useImmer에 대해
리액트에서 `데이터를 업데이트할 때 불변성을 지켜주면서` 업데이트를 해야 한다.

즉, 배열을 수정할 때 push, pop을 이용해서 배열에 직접 접근하는 것이 아니라, map이나 filter의 함수를 이용해야 하며, 객체의 경우도 …(spread)연산자를 이용해서 새로운 객체를 만들어 수정해야 한다.

하지만 `immer를 사용하면 immer가 대신 불변성을 관리해주기 때문에 우리가 그것을 신경쓰지 않아도 된다`.

⇒ push나 pop을 이용해 배열에 바로 접근이 가능하다는 의미이다.
```jsx
const [toy, setToy] = useImmer({});

<button
  onClick={() => {
    const name = prompt(`what's your toy's name?`);
    setToy((toy) => {
      toy.name = name;
    });
  }}
>
  장난감 이름 바꾸기
</button>
```

**결론 상태변경은 결국 setter로 해야된다는 이야기.**  

### 과제 1
```jsx
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

const ShoppingCart = () => {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  const handleIncreaseClick = (productId) => {
    setProducts(products.map((p) => {
     if(p.id === productId) {
       return { ...p, count: p.count+1 }
     } else {
       return p
     }
    }));
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
export default ShoppingCart;
```

### 과제 2
`-` 버튼을 동작하게 하고 0이 되면 사라지게
```jsx
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

const ShoppingCart = () => {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  const handleIncreaseClick = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }
  const handleDecreaseClick = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1
        };
      } else {
        return product;
      }
    }).filter(p => p.count > 0));
  }
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => {
            handleDecreaseClick(product.id);
          }}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
export default ShoppingCart;
```

### 과제 3
```jsx
import { useState } from "react";
import AddTodo from "./AddTodo.js";
import TaskList from "./TaskList.js";

let nextId = 3;
const initialTodos = [
  { id: 0, title: "Buy milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false }
];

const TaskApp = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  };

  const handleChangeTodo = (nextTodo) => {
    setTodos(
      todos.map((t, i) => {
        if (t.id === nextTodo.id) {
          return {
            ...t,
            title: nextTodo.title,
            done: nextTodo.done
          };
        } else {
          return t;
        }
      })
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((t) => t.id !== todoId));
  };

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
};
export default TaskApp;
```

### 과제4
immer를 사용해 상태관리
```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false }
];

const TaskApp = () => {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  const handleAddTodo = (title) => {
    updateTodos((draft) => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      })
    });
  }

  const handleChangeTodo = (nextTodo) => {
    updateTodos((draft) => {
      const todo = draft.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    });
  }

  const handleDeleteTodo = (todoId) => {
    updateTodos((draft) => {
      const index = draft.findIndex(t =>
        t.id === todoId
      );
      draft.splice(index, 1);
    });
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
export default TaskApp;
```