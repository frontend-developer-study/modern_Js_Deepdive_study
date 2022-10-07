# 33장 Symbol

## **1. Symbol**

**다른 값과 중복되지 않는 유일무이한 값**이다.

문자열과 같이 프로퍼티의 키값으로 사용할 수 있다.변경불가능한 원시값이다. ( 원시값이라서 `new`를 이용해서 생성하면 안됨 )

```
const symbol = Symbol("apple");
const copy = Symbol("apple");

// 유일무이한 값이기 때문에 같은 시드값을 넣어도 동일할 수 없음
console.log(symbol === copy);		// false

console.log(symbol.description);	// "apple"
console.log(symbol.toString());		// Symbol(apple)

// 문자열 or 숫자로 암묵적 변환 X
console.log(symbol + "");	// error
console.log(+symbol);		// error

// 불리언 암묵적 변환 O
console.log(!!symbol);		// true

// 전역 심벌 레지스트리에 값 저장 ( 없으면 생성 있으면 가져다 사용 )
const globalSymbol = Symbol.for("g");
const copySymbol = Symbol.for("g");
console.log(globalSymbol === copySymbol);	// true

// 전역 심벌 값의 키값 가져오기
Symbol.keyFor(globalSymbol);
```

- 타 언어의 `enum`처럼 활용가능함
- 프로퍼티로 만들면 기본적으로 은닉되며, `Object.getOwnPropertySymbols`로 찾을 수 있음

- 심벌은 중복되지않는 상수값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지않고 새로운 프로퍼티를 추가하기 우해, 즉 하위 호환성을 보장하기 위해 도입되었다.

# 34장 이터러블

## 34.1 이터레이션 프로토콜

- 순회가능한(iterable) 데이터 컬렉션( 자료구조)를 만들기위해 미리 약속한 규칙

- 이터러블 프로토콜
- 이터레이터 프로토콜

 

### 34.1.2 이터레이터

symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 

이터러블의 symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다. 

next 메서드를 소출하면 이터러블을 순차적으로 한단계씩 순회하며 순회결과를 나타내는 이터레이터 리절트객체(result object )를 반환한다

## 이터러블

이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 즉, 이터러블은Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

지연평가 

데이터가 필요할때 까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성한다 

# 35장 스프레드문법

## 스프레드 문법

ES6에서 도입된 스프레드 문법(전개 문법) ...은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개) 개별적인 값들의 목록으로 만든다.

스프레드 문법을 사용할 수 있는 대상은for ... of 문으로 순회할 수 있는 이터러블에 한정한다.

```jsx

//개별 요소로 분리한다.
console.log(...[1,2,3]); // 1 2 3

//문자열은 이터러블이다.
console.log(... 'Hello'); // H e l l o

//Map Set은 이터러블이다.
console.log(... new Map([['a','1'], ['b','2']])); // ['a', '1'] ['b', '2']
console.log(... new Set([1,2,3]));
// 1 2 3

```

스프레드 문법의 결과물은 값으로 사용할 수 없고,쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용할 수 있다.

함수 호출문의 인수 목록

배열 리터럴의 요소 목록

객체 리터럴의 프로퍼티 목록

배열에서 

splice??

# 36장 디스트럭처링 할당

# 37장 Set 과 Map

- Set 객체는 중복되지 않는 유일한 값들의 집합
- Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다