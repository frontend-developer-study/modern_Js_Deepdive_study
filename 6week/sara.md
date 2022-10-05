# 스터디 6주차

## 33장 Symbol
- 다른 값과 절대 중복되지 않고 변경 불가능한 원시 타입의 값으로 유일무이하다.
-전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색하는 것과, 심벌 값에 대한 설명이 같더라도 다른 변수에 할당된 것은 엄연히 다르다.

```javascript
const saraSymbol = Symbol("my");
const saraSymbol_1 = Symbol("my");

console.log(saraSymbol === saraSymbol_1); //false

// Symbol.for에서는 전역 심벌 레스트리에서 검색했을 때 존재하지 않는 경우, 새로 생성해주고, 검색했을 때 존재할 경우 해당 심벌 값을 반환해준다.
const SS = Symbol.for("mySymbol");
const ss1 = Symbol.for("mySymbol");

console.log(ss1 === ss1_1); //true

```

+ 추가 설명
ES6의 const는 할당된 값이 상수가 되는 것은 아니고, 바인딩된 값이 상수가 되기 때문에 const라 할지라도 객체의 속성변경은 가능하다.(바인딩만 변경되지 않으면 됨!)

프로그래밍에서 상수는 코드 내에서 HUMAN ERROR로 인해 값이 변경되지 않도록 변수를 보호하거나 다른 코드에서 실수로 이미 할당된 변수를 재할당하지 않도록 하는데 유용하기 때문에 많이 사용된다.

하지만 자바스크립트의 const로 객체를 선언할 경우에 객체의 속성은 언제든지 변경이 가능하기 때문에 immutable한 상수로 사용된다고 보기 어렵다.

그래서 const와 같이 유용하게 사용되는 것이 Object.freeze()이다.

```javascript
  const HI = 'JS CONST';
  HI = "JS HI"; //에러발생

  const bb = {};
  bb.key = "value";

  console.log(bb); // {'key': 'value'};

  // Object.freeze()는 객체를 동결하기 위한 메소드이다.
  //1.동결된 객체를 만들 수 있고 2. 프로토 타입의 변경도 막을 수 있다
  //동결된 객체를 반환하지만 재할당은 허용한다.
  //let으로 선언된 객체는 Object.freeze를 사용하더라도 재할당 된다.
  let free = {
    my = 'name';
  };

  Object.freeze(free);

  free.my = 'age';
  console.log(free); //{my:"name"}으로 변경되지 않는다.
  
  free = {
    'you':"name";
  };
  console.log(free); //{'you':"name"}으로 재할당이 되어있다.

  // const를 사용하면 재할당은 되지 않지만, 객체의 속성을 변경하는 것이 가능하고 Object.freeze는 객체의 속성을 변경하는 것은 불가능하지만 재할당은 가능하므로 모든 것에서 불변가능하려면 const와 Object.freeze를 함께 사용하자!

  const truth = {
    'dogIs': 'Cute'
  };

  Object.freeze(truth);
  
  truth.dogIs = 'Not Cute';

  truth = {'catIs': 'Pretty'}; // 에러발생

  concole.log(truth); // {'dogIs': 'Cute'} // 바뀌지않는다
```

# 이터러블 : 자료를 반복할 수 있는 객체를 말한다.

- 이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

```javascript
let arr = [1,2,3]
for(const a of arr) console.log (a) // 정상작동 1,2,3
 
 
arr[Symbol.iterator] = null; // 이렇게 하면 순회가 되지 않는다
for(const a of arr) console.log (a) //arr는 순회가 되지 않는다.
```

-이터러블?
: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값

-이터레이터?
: { value, done } 객체를 리턴하는 next()를 가진 값

-사용자 정의 이터러블

# Set과 Map
- 엄밀히 따지면 독립된 자료형이지 객체나 배열은 아니다. 그럼에도 for..of문이 동작하는 이유는 인덱스로 접근하는 것이 아니라 이터러블 프로토콜을 따르고 있기 때문이다.(단 for문으로는 순회할 수 없다.)

```javascript
const set = new Set([1,2,3])
for (cosnt a of set) console.log(a) // 1,2,3

const map = new Map([['a',1],['b',2],['c',3]]);
// Map(3) {"a" => 1, "b" => 2, "c" => 3}
 
const iter = map[Symbol.itertator](); // 심볼.이터레이터가 자체 내장되었기에 불러오기만 하면
iter.next();
// {value: Array(2), done: false}
 
 
for(const a of map)
    console.log(a); // ['a',1],['b',2],['c',3]

```