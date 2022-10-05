19.3.1 __proto__ 접근자 프로퍼티
모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉[[Prototype]] 내부슬롯에 간접적으로 접근할 수 있다.

How: getter / setter 접근자 함수를 통해서

Process1 (비 권장)
가. __proto__접근자 프로퍼티를 통해 프로토타입에 접근
나. getter 함수 호출 (프로토타입 취득)
다. 새로운 프로퍼티 할당
라. setter 함수 호출 (프로토타입 교체)
const obj = {};
const parent = { x: 1};
// getter 함수인 get__proto__가 호출되어 obj 객체의 프로토타입 취득
obj.__proto___;
// setter 함수인 set__proto__가 호출되어 obj 객체의 프로토타입 교체
obj.__proto__ = parent;
console.log(obj.x); // 1

Why
프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서임.

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다,(상호참조 순환X)

따라서 아무 체크없이 무조건적으로 프로토타입을 교체할 수 없도록 __proto__접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어있다.

Process2 (권장)
코드 내에서 __proto__접근자 프로퍼티를 직접 사용하는 것은 권장하지 않음.
프로토타입 참조를 취득하고 싶은경우 : object.getPrototypeOf 메서드
프로토타입 교체하고 싶은경우 : object.setPrototypeOf 메서드

19.7 프로토타입 체인
자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 매커니즘이다.

특징
프로토타입 체인의 최상위 위치하는 객체는 언제나 object.prototype임.
**object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라고 부름
따라서 모든 객체는 object.prototype을 상속받음.
object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다.
(별도 에러없음)

