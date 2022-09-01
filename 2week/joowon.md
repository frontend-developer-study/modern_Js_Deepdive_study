12.4.1 함수 선언문
자바스크립트 엔진은 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다. 함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자를 호출한다.

>> 12.7.2 재귀함수에서 “함수 표현식으로 정의한 함수 내부에서는 함수 이름은 물론 함수를 가리키는 식별자로도 자기 자신을 재귀호출할 수 있다. 단, 함수 외부에서 함수를 호출할 때는 반드시 함수를 가리키는 식별자로 해야한다.” 라고 나오므로 함수 선언문을 또 읽어야 해서 정리함.


12.6 참조에 의한 전달과 외부 상태의 변경
매개변수도 변수다. 함수 몸체 내부에서 변수와 동일하게 취급 되므로 매개변수 또한 타입에 따라 값에 의한 전달, 참조에 의한 전달 방식을 그대로 따른다.

1. 예제 (p.175)
var num = 100;
var person = { name: "Lee" };

function changeVal(primitive, obj) {
    primitive += 100;
    obj.name = 'kim';
}
changeVal(num, person);

console.log(num); // 100
console.log(person); // 결괏값: {name: 'kim'} 


2. 추가로 알아본거
var num = 100;
var person = { name: "Lee" }

function changeVal2(primitive, obj) {
    primitive += 100;
    obj = { name : "kim" } // 이렇게 해도 바뀌지 않을까?
}
changeVal2(num, person);

console.log(num); // 100
console.log(person); // 결괏값: ??

cf) 11.2.2 참조에 의한 전달
var a = { name: "Lee" };
var b = { name: "Lee" };

a === b // false