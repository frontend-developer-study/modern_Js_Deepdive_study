# 스터디 4주차

## 19장 프로토 타입

### \_\_proto\_\_란 무엇인가?

1. value를 갖지않고, get, set을 포함하고 있어 데이터 프로퍼티가 아닌 `접근자 프로퍼티`이다.
   그래서 get으로 사용할 때는 해당 객체의 `프로토타입을 반환`하고, set으로 호출될 때는 `프로토타입 교체`가 가능하다.
2. `상속`을 통해 사용된다. 객체에 프로퍼티가 있는지 확인(hasOwnProperty메서드)했을 때 false값이 나오고, Object의 프로퍼티 확인(getOwnPropertyDescriptors)시 가능하다. 그렇기 때문에 모든 객체의 프로토타입의 상속은 Object이다.
3. 무한루프에 빠지지않기 위해 사용해야된다. 프로퍼티 교체 시 사이클이 형성되면 `에러를 반환`하기 때문에 접근자프로퍼티로 사용해야된다.
4. 접근자프로퍼티로 직접 사용하는 것은 권장하지 않는다. null일 때 사용한다면 에러를 반환하기 때문이다.

### 프로토타입 체인 null까지 파보기

```javascript
const obj = {};
console.log(obj.__proto__); //Object
console.log(obj.__proto__.__proto__); //null

function foo() {}
console.log(foo.prototype); //function
console.log(foo.prototype.__proto__); //Object
console.log(foo.prototype.__proto__.__proto__); //null

const bar = new foo();
console.log(bar.__proto__); //function
console.log(bar.__proto__.__proto__); //Object
console.log(bar.__proto__.__proto__.__proto__); //null

const zar = 'zar';
console.log(zar.__proto__); //String
console.log(zar.__proto__.__proto__); //Object
console.log(zar.__proto__.__proto__.__proto__); //null

const aar = true;
console.log(aar.__proto__); //Boolean
console.log(aar.__proto__.__proto__); //Object
console.log(aar.__proto__.__proto__.__proto__); //null

const car = undefined; //TypeError
const tar = null; //TypeError
```

### 직접상속 두가지 방법

1. Object.create를 통해 직접상속한다.
2. 객체리터럴 내부에서 \_\_proto\_\_에 선언해준다.

### 정적 vs 프로토타입 (프로퍼티/메서드)

- 정적 프로퍼티/메서드 - 인스턴스를 생성하지 않아도 참조, 호출가능한 프로퍼티/메서드이다.

- 프로토타입 프로퍼티/메서드 - 생성된 인스턴스가 참조, 호출 가능한 프로퍼티/메서드이다.

두 개념은 인스턴스의 사용에 따라 다를 수 있다.

## 20장 strict mode

ES5부터 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여, 문법적 오류나 최적화 작업문제를 일으킬수 있는 코드에 대한 `명시적인 에러`를 발생시키는 모드이다.

### strict mode가 발생시키는 에러

- ReferenceError - 선언하지 않는 변수를 참조할 때 발생
- SyntaxError - delete연산자로 삭제 연산 수행 시, 중복된 매개변수 선언시, with문 사용시

### strict mode 적용 시 변화

- this가 어떠한 환경에서 undefined로 바인딩된다.
- 매개변수에 전달된 인수를 재할당하여 변경해도 arguments객체 반영되지 않는다.

### strict mode 적용 시 주의할 점

- 전역에 적용하거나, 함수단위로 적용하지 말고 즉시 실행 함수 단위로 적용하는 것이 바람직하다.

## 21장 빌트인 객체

- 표준 빌트인 객체: ECMAScript 사양에 정의된 객체를 말한다. 그렇기 때문에 실행환경에 관계없이 언제나 사용할 수 있다.
- 호스트 객체: ECMAScript사양에 정의되어있지 않지만 자바스크립트 실행 환경에서 추가되어 제공되는 객체를 뜻한다. ex) 브라우저: window, nodejs: global
- 사용자 정의 객체: 사용자가 직접 정의한 객체를 말한다.
