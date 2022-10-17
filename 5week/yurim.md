# 22장 this

- 자신이 속한 객체를 가리키는 식별자를 참조할수있어야한다.
- 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수 다. this 를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

### this바인딩

바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수선언은 변수이름(식별자)와 확보된 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this (키워드로 분류되지만 식별자 역할을 한다)와 this 가 가르킬 객체를 바인딩 하는 것이다. 

- 자바스크립트의 this 는 함수가 호출되는 방식에 따라 this 에 바인딩 될 값, 즉 this 바인딩이 동적으로 결정된다.

# 23장 실행 컨텍스트

- 소스코드의 타입
1. 전역 코드
2. 함수 코드
3. eval 코드
4. 모듈 코드 

## 23.2 소스코드의 평가와 실행

자바스크립트엔진은 소스코드의 평가와 소스코드의 실행 과정으로 나누어 처리한다. 

## 23.3 실행컨텍스트의 역할

식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드실행 순서 관리를 구현한 내부 메커니즘으로 , 모든코드는 실행컨텍스트를 통해 실행되고 관리된다. 

## 23.4 실행컨텍스트 스택

실행컨텍스트 스택 : 실행컨텍스틑의 자료구조는 스택

실행컨텍스트 스택은 **코드의 실행순서**를 관리한다

실행컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 실행중인 실행 컨텍스트다

## 23.5 렉시컬환경

실행 컨텍스트 스택이 코드의 실행 순서를 관리 한다면 렉시컬 환경은 **스코프와 식별자**를 관리한다.

# 24장클로저

## 24.2 함수객체의 내부슬록 [ [ Environment ]]

함수는 자신의 내부슬롯에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다. 

# 25장 클래스

- 클래스는 함수
- constructor 내부에서 return 문을 반드시 생략해야한다.
- 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

- 정적메서드는 클래스로 호출
- 인스턴스 없이도 호출할 수 있다.

### 25.8.3 동적상속

동적으로상속받을 대상을 결정할 수 있다. 

p453

### 25.8.3 super 키워드

- super 를 호출하면 수퍼클래스의 constructor 를 호출한다.
- super 를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.