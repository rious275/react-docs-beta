# 상태 구조화 원칙

<b>그룹 관련 상태.</b> 항상 두 개 이상의 상태 변수를 동시에 업데이트하는 경우 단일 상태 변수로 병합하는 것이 좋습니다.
<b>상태의 모순을 피하십시오.</b> 여러 국가가 서로 모순되고 "동의하지 않는" 방식으로 국가가 구조화되면 실수할 여지가 생깁니다. 이것을 피하십시오.
<b>중복 상태를 피하십시오.</b> 렌더링 중에 구성 요소의 props 또는 기존 상태 변수에서 일부 정보를 계산할 수 있는 경우 해당 정보를 해당 구성 요소의 상태에 입력하면 안 됩니다.
<b>상태에서 중복을 피하십시오.</b> 동일한 데이터가 여러 상태 변수 간에 또는 중첩된 개체 내에 중복되면 동기화를 유지하기 어렵습니다. 가능하면 중복을 줄이십시오.
<b>깊게 중첩된 상태를 피하십시오.</b> 계층 구조가 깊은 상태는 업데이트하기가 그리 편리하지 않습니다. 가능하면 평평한 방식으로 상태를 구성하는 것이 좋습니다.

하나로 묶을 수 있는것은 묶자

```
const [x, setX] = useState(0);
const [y, setY] = useState(0);

const [position, setPosition] = useState({ x: 0, y: 0 });
```

상태에 대한 정의를 잘하자

```
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
```
```
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
```
여기도 마찬가지..중복됨

##### 데이터가 변경되어야 한다면 같은 데이터를 활용하자.


###<b>깊게 중첩된 상태 피하기</b>
객체의 depth가 길다면 트리구조가 아닌 인덱싱 구조로 만든다.


과제1
https://codesandbox.io/s/choosing-the01-jouncg?file=/App.js

과제2
https://codesandbox.io/s/choosing-the02-7tppeh?file=/index.js

과제3
https://codesandbox.io/s/choosing-the03-skpvkb?file=/App.js
단순호버인데 이렇게 짜다니 ㅠㅠ
