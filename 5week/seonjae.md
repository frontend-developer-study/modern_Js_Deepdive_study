## 22장 this

### 정의

자신이 `속한 객체` 또는 `자신이 생성할 인스턴스`를 가리키는 자기 참조 변수. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

### 함수 호출에 따른 this바인딩

**일반 함수 호출**

- 어떻게 호출하든 this는 전역객체에 바인딩된다.

```jsx
function foo() {
  console.log(this); // 브라우저: window, nodejs: global, strictmode: undefined
}

const obj = {
  value: 100,
  bar() {
    console.log(this); // obj
    function zar() {
      console.log(this); // 브라우저: window, nodejs: global, strictmode: undefined
    }
  },
};
```

**메서드 호출**

- 메서드를 호출할 때 메서드 이름 앞의 마침표연산자 앞에 기술한 객체가 바인딩된다.

```jsx
const value = 'global';

const obj = {
  value: 1,
  foo() {
    console.log(this.value);
  },
  bar: function () {
    console.log(this.value);
  },
};

obj.foo();
obj.bar();
```

**생성자 함수 호출**

- 미래의 생성될 인스턴스에 바인딩된다.

```jsx
function Person(age) {
  this.age = age;
  this.yourAge = function () {
    return `${age}세`;
  };
}

const young = new Person(10);
const old = new Person(80);

console.log(young.yourAge()); //10세
console.log(old.yourAge()); // 80세
```

**apply, call, bind 메서드에 의한 간접호출**

- 이 메서드들은 함수 프로토타입의 메서드들이며 사용시 함수의 this에 바인딩된다.

```jsx
function This() {
  return this;
}

const bindingThis = { example: true };

console.log(This()); // 전역객체
console.log(This.apply(bindingThis)); // { example: true }
console.log(This.call(bindingThis)); // { example: true }
console.log(This.bind(bindingThis)()); // { example: true } 바인드만되어 호출을 해줘야된다.
```

---

## 23장 실행컨텍스트

- `전역코드, 함수코드, eval코드, 모듈코드`를 코드평가 단계에서 각 코드의 실행컨텍스트가 생성된다.
- 코드평가 단계에서는 `실행컨텍스트를 만들어 스코프에 등록하는 과정`을 거친다.
- 코드실행 단계에서는 선언문을 제외한 문을 순차적으로 실행하며 실행컨텍스트에 있는 `값들을 참조해 실행`한다.
- 코드를 실행하는 단계에서 실행컨텍스트는 `스택구조`로 이루어져 있어 `최상위 실행컨텍스트만 실행`하고 사용이 끝나면 실행컨텍스트스택에서 `제거`된다.
- 블록레벨스코프를 만난다면 실행컨텍스트는 블록렉시컬환경을 실행컨텍스트스택의 `최상단`으로 만들어준다.

### 전역코드에서 렉시컬환경

- 환경레코드 = 선언적레코드 + 객체 환경 레코드 + `GlobalThisValue`
- 외부렉시컬환경참조

함수코드에서 렉시컬 환경

- 환경레코드 = 함수환경레코드 + ThisValue
- 외부렉시컬환경참조

```jsx
// 23-22 예시코드
var x = 1;
const y = 2;

function foo(a) {
  var x = 3;
  const y = 4;

  function bar(b) {
    const z = 5;
    console.log(a + b + x + y + z);
  }
  bar(10);
}

foo(20);
```

---

## 24장 클로저

- 외부 함수보다 `중첩 함수가 더 오래 유지`되는 경우 중첩 함수는 이미 생명주기가 종료한 외부함수의 변수를 참조하는 함수를 `클로저`라고한다.
- 클로저일 경우 외부함수의 실행컨텍스트가 사라진다고 해서(생명주기종료) `외부함수의 렉시컬 스코프가 사라지는 것은 아니다.`
- 클로저가 아닌경우
  - 외부함수의 식별자를 중첩함수(클로저)가 참조하지 않을 경우
  - 식별자를 참조하더라도 외부함수의 생명주기보다 중첩함수의 생명주기가 짧을 경우
- 클로저의 활용 - 캡슐화, 은닉

---

## 25장 클래스

- `new 연산자 없이 호출하면 에러`가 발생한다.
- 상속을 지원하는 extends, super 키워드를 사용할 수 있다.
- 호이스팅이 발생한다.
- 클래스 내부는 strict mode이다.
- 클래스의 `모든 프로퍼티는 Enumerable`한 값이다.

### constructor

- 클래스의 인스턴스를 생성해주는 생성자 함수이다.
- 중복선언이 불가능
- 생략가능

```jsx
class Person {
  constructor() {
    //파라미터 선언
    // 미래에 생성될 인스턴스에 바인딩
  }
}
```

### 정적메서드 vs 프로토타입 메서드

- this가 바인딩 된 것을 보면 정적메서드 - 클래스 vs 프로토타입메서드 - 인스턴스
- this로 인해 나타나는 현상들
  - 자신이 속한 프로토타입체인이 다름
  - 인스턴스의 프로퍼티를 참조 유무

### 클래스의 인스턴스 생성과정

1. constructor가 실행되기 전에 빈객체가 생성되어 this에 바인딩된다.
2. constructor가 실행되면서 this를 초기화한다. 추가 or 생략
3. 인스턴스를 반환하는데 암묵적으로 반환되며 원시값일 경우는 this 참조값일 경우는 this가 아닌 지정된 값으로 반환된다.

### 자식클래스(derived, child)

- 부모클래스에서 extends키워드를 사용하여 상속받아 확장한다.
- `constructor 생성자함수는 생략되지 않으며` super키워드를 사용해서 초기화해야된다.
- 메서드내에서 super를 참조하여 부모클래스의 메서드를 호출할 수 있다.
- 내부슬롯[[ConstructorKind]]를 갖으며 ‘derived’로 설정된다. 부모일 경우 ‘base’

### 자식클래스의 인스턴스 생성과정

1. 내부슬롯을 확인하여 ‘base’, ‘derived’를 확인한다.
2. 자신이 직접 인스턴스를 생성하지 않고 부모클래스에 인스턴스 생성을 위임한다.
3. 위의 클래스의 인스턴스 생성과정과 동일 하지만 this가 반환될 때는 `new.target으로 인스턴스가 누구의 것인지를 알려주어 그때 바인딩`된다.
4. super가 종료되어 만들어진 this에 값을 추가한다.
5. 인스턴스의 초기화가 완료되면 생성된 인스턴스를 반환한다.

---

## 26장 ES6함수의 추가기능

### 화살표함수

- 표현의 간략화 및 내부동작도 기존 함수보다 간략함
- 기존함수가 콜백함수로 쓰여졌을 때 this가 전역객체를 참조하고 있는 문제를 해결
- 화살표함수는 인스턴스를 생성할 수 없다.
- 중복된 매개변수를 이름을 선언할 수 없다.
- 함수자체의 this, arguments, super, new.target바인딩을 갖지않는다.
- `렉시컬this`를 가진다. → 자신의 상위 스코프의 this를 바인딩함
