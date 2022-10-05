//※19장 자바스크립트 프로토타입을 기반으로 상속 구현
//예제 19-04

//생성자 함수
function Circle(radius){
    this.radius = radius;
}

//Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메소드를
//공유해서 사용할 수 있도록 프로토타입에 추가한다.
//프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function(){
    return Math.PI * this.radius **2;
};

//인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

//Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
//프로토타입 circle.prototype으로부터 getArea 메서드를 상속받는다.
//즉, Circle 생성자 함수가 생성하는 모든 인스터스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); ///true

console.log(circle1.getArea()); //3.141592...
console.log(circle2.getArea()); //12.56637...

//예제 19-10
const obj = {};
const parent = {x:1};

//obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
//obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj,parent); // obj.__proto__ = parent;

console.log(obj.x); //1

//__proto__ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶으면 Object.getPrototypeOf() 사용할것을 권장
//프로토타입을 교체하고 싶다면 Object.setPrototypeOf() 사용을 권장

//※19.6 객체 생성 방식과 프로토타입의 결정
//객체 리터럴(obj{x:1};)과 Object생성자 함수(obj=new Object(); obj.x = 1;)에 의한 객체 생성 방식의 차이
//객체 리터럴 방식은 리터럴 내부에 프로퍼티를 추가함.
//Object생성자 함수 방식은 빈 객체를 생성 후 프로퍼티를 추가해야함.

//※19.8 오버라이딩과 프로퍼티 새도잉
//예제 19-36
const Person = (function () {
    //생성자 함수
    function Person(name){
        this.name = name;
    }

    //프로토타입 메서드
    Person.prototype.sayHello = function () {
        console.log(`prototype method ${this.name}`)
    }

    //생성자 함수를 반환
    return Person;
}());

const me = new Person('Lee');

//인스턴스 메서드(다시 정의)
me.sayHello = function () {
    console.log(`instance method ${this.name}`)
}

//인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
//삭제 아니고 가려짐.
me.sayHello(); // instance method Lee

//20장 strict mode
//예제 20-01
function foo() {
    x = 10;
}
foo();
console.log(x); //10
'strict mode';
function foo2() {

    y = 10;
}
foo2();
console.log(y); //err
// 난 엄격 모드라고 생각한다 적용할 꺼라면 스코프 단위로 적용할 것.