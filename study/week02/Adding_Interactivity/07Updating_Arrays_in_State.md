배열도 마찬가지로 불변성 지키기

방지(배열을 변경) 선호 (새 배열 반환)
첨가 push,unshift => concat, [...arr]스프레드 구문( 예제 )
풀이 pop, shift,splice => filter, slice( 예 )
교체 splice, arr[i] = ...assignment => map( 예 )
정렬 reverse,sort => 먼저 어레이 복사( 예제 )

### 배열에 추가

```jsx
setArtists([
  ...artists, // 원본 가져온 후
  { id: nextId++, name: name }, // 뒤에 추가
]);
```

```jsx
setArtists([
  { id: nextId++, name: name }, // 앞에 추가
  ...artists, // 원본 가져온 후
]);
```

filter, map에 대한 사용 설명

### 배열에서 제거

```jsx
setArtists(artists.filter((a) => a.id !== artist.id));
```

id가 다른 것들만 모아서 다시 리턴

### 배열 중간에 삽입

```jsx
function handleClick() {
  const insertAt = 0; // Could be any index
  const nextArtists = [
    // slice로 자른수 중간에 삽입
    ...artists.slice(0, insertAt),
    // New item:
    { id: nextId++, name: name },
    // Items after the insertion point:
    ...artists.slice(insertAt),
  ];
  setArtists(nextArtists);
  setName("");
}
```


### 배열 내부의 객체 
깊은 복사를 해야한다..
```jsx
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```
이렇게 하면 얕은 복사가 된다. 



```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    return { ...artwork, seen: nextSeen };
  } else {
    return artwork;
  }
});
```
내부까지 한번 더 해줘야 한다. 