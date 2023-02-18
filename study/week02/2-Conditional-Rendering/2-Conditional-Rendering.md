### 조건부 렌더링

조건부 JSX 반환

```
const Item = ({ name, isPacked }) => {
  if (isPacked) return <li>{name} 트루</li>
  return <li>{name}</li>
}

// 아무것도 표시하고 싶지 않을때는 null을 반환한다.

/** 메인 컴포넌트 */
const PackingList = () => {
  return (
    <section>
      <ul>
        <Item isPacked={true} name="a" />
        <Item isPacked={true} name="b" />
        <Item isPacked={false} name="c" />
      </ul>
    </section>
  )
}
```

### 조건부(삼항) 연산자

```
if (isPacked) return <li>{name} 트루</li>
return <li>{name}</li>

아래와 같이 작성 가능

return (
  <li>
    {isPacked ? name + '트루' : name}
  </li>
)

false일 때 아무것도 반환하지 않으려고 할 때는

return (
  <li>
    {name} {isPacked && 트루}
  </li>
)
```

단, 논리 AND 연산자 좌항에 숫자가 올 시, 0이라도 그대로 노출하므로 주의

end.
