## Updating Objects in State

불변성을 지키기 위해서 state에 담긴 객체를 직접 조작하지않는다.

이전값을 유지한체 변경한 값만 바꿀때
```jsx
const [person, setPerson] = useState({
  firstName: "Barbara",
  lastName: "Hepworth",
  email: "bhepworth@sculpture.com",
});

function handleFirstNameChange(e) {
  setPerson({
    ...person,
    firstName: e.target.value,
  });
}
```

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

immer 를 쓰면 타겟된 애만 직접 선택할 수 있다.

```jsx
updatePerson((draft) => {
  draft.artwork.city = "Lagos";
});
```
