# 스터디 4주차 정리자료

## 19장 프로토 타입

### 자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어이다.

- 객체란? : 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 뜻한다.
- 객체지향 프로그래밍이란? : 객체의 상태 데이터를 프로퍼티, 동작을 메서드라 부른다. 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어 생각한다.
```javascript
const sara = {
  name: 'Ryu',
  address: 'Seoul'
};
```

- 프로토타입의 이점: 프로토타입은 내용이 동일한 메서드가 중복 생성되는 것을 막아주고, 상속을 받아 생성자 함수를 사용하는 모든 인스턴스가 상속에 의해 메서드를 공유할 수 있게 해준다. 프로토타입에 메서드를 할당해주면 메서드는 여러 인스턴스를 생성하더라도 프로토타입안에 단 하나만 생성되어 있다.

- 프로토타입의 객체란? : 모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다. 즉 객체와 프로토타입과 생성자 함수는 서로 연결되어 있다.

- [[Prototype]] 내부 슬롯의 값이 null인 객체는 프로토타입이 없다.

- 서로가 서로의 프로토타입이 되는 비정상적인 프로토타입체인이 되는 것을 막기 위해 아무런 체크 없이 무조건적으로 프로토타입을 교체하지 못하도록 __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

- 모든 객체가 Object.prototype을 상속받는 것이 아니다! 때문에 __proto__ 접근자 프로퍼티를 사용할 수 없는 경우가 있다.

- 이해 안되는 부분!
```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);
```

- 직접적인 코드에서는 Object.getPrototypeOf();로 프로토타입의 참조를 가져오고, Object.setPrototypeOf()로 프로토타입을 교체하자!

## 20장 strict mode 

### 자바스크립트 언어의 문법을 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

- 함수 몸체에 선두에 'use strict'를 추가하자!

### strict mode가 발생시키는 에러
 - 암묵적 전역
 - 변수, 함수, 매개변수의 삭제
 - 매개변수 이름의 중복
 - with문의 사용
 
### strict mode 적용에 의한 변화
- 일반 함수의 this
- arguments 객체


## 21장 빌트인 객체

### 자바스크립트 객체의 분류

- 표준 빌트인 객체 :  표준 빌트인 객체는 ECMAScript 사양에 정의된 객체를 말하며, 애플리케이션 전역의 공통 기능을 제공한다.

표준 빌트인 객체는 ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경(브라우저 또는 Node.js 환경)과 관계없이 언제나 사용할 수 있다. 표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공된다.

따라서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.

- 호스트 객체 : 호스트 객체는 ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경(브라우저 또는 Node.js 환경)에서 추가로 제공하는 객체 를 말한다.

브라우저 환경에서는 DOM, BOM, CANVAS, XMLHttpRequest, fetch, Web Storage, Web Component 와 같은 클라이언트 사이드 Web API를 호스트 객체로 제공하고,

Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다.

- 사용자 정의 객체



