## 33장 7번째 데이터 타입 Symbol

- 다른 값과 절대 중복되지 않는 유일무이한 값
- Symbol은 값을 반환하지 않기 때문에 암묵적 타입변환이 불가능하다. 하지만 `boolean`타입으로 암묵적 타입변환은 가능하다.
- 유일무이하기 때문에 전역에 선언하여 사용할 수 있는 것은 Symbol.for() 메서드
- 심벌로 키값을 만든다면 다른 프로퍼티 키와 충돌할 위험이 없다.
- 키의 충돌위험이 없기 때문에 자바스크립트가 확장하면서 `미래에 추가될 프로퍼티`와 개인 or 팀에서 기존에 만들어진 코드의 프로퍼티가 `중복되지 않기` 위해 사용
- 프로퍼티 키로 사용할 때 외부에 노출이 되지않아 for…in문, Object.keys등과 같은 메서드로 찾지 못한다.

### 의미가 있는 상수 만들기(a.k.a Enum) - Symbol 사용예제

```jsx
// value값에 상수를 넣어도 되지만 변경/중복될 가능성이 있기 때문에 Symbol을 사용한다.
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};
```

## 34장 이터러블

- 이터러블 프로토콜을 준수한 객체를 이터러블이라한다.
- 이터러블 프로토콜: Well-Known Symbol인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator메서드를 호출하는 것
- for…of로 순회가 가능하지만 for…in은 아니다. for…in은 property의 `numable한 값으로 순회`함
- 객체는 이터러블이 아니기 때문에 `for…in으로 밖에 순회`를 못한다.
- 이터레이터는 next메서드를 가지며 끝의 값은 `{value: 값, done: true}`이다.

### 이터레이터 프로토콜의 필요성

- ES6문법 이전에는 `배열, 문자열, 유사배열객체, DOM`등을 각자 나름의 구조로 `for, for…in, forEach`메서드를 통해서 순회했다. ES6문법 이후(이터레이터 프로토콜) 순회가능한 데이터를 `for…of, 스프레드문법, 배열 디스트럭처링`의 대상으로 일원화했다.
- 데이터 공급자가 `각자의 순회방식`이 있다면 각 순회방식을 지원해야되기 때문에 `비효율적`이다.

## 35장 스프레드 문법

- 이터러블에 한정하여 순회할 수 있게 해주는 문법이다
- Rest 파라미터와 형태가 동일하나 혼동에 주의해야된다.

```jsx
const arr = [1, { a: 1, b: 2 }, 3];

function foo(...rest) {
  console.log(rest);
}

console.log(...arr); // 1 { a: 1, b: 2 } 3
foo(...arr); // [ 1, { a: 1, b: 2 }, 3 ]
```

### 객체 스프레드

- 객체는 `이터러블이 아니기` 때문에 주의해야된다.

```jsx
const obj = { a: 1, b: 2, c: 3 };
console.log(...obj); // NO!! Uncaught TypeError: Found non-callable @@iterator
console.log({ ...obj }); // YES {a: 1, b: 2, c: 3}
```

## 37장 Set과 Map

### Set 객체

- 이터러블을 인수로 받아 중복되지 않는 유일한 값들의 이터러블한 Set객체를 생성한다.
- 배열과 유사하지만 순서에 의미가 없으며, 인덱스로 요소에 접근할 수 가 없다.
- Set으로 `집합`을 표현할 수 있다. 예제에서는 합집합, 교집합, 차집합을 구현함

### Map 객체

- 키와 값의 쌍으로 이루어진 이터러블한 유사한 객체이다.
- 중복된 값이 존재할 경우 앞의 키와 값이 덮어써진다.