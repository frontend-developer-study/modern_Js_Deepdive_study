##15.1.2 함수 레벨 스코프
>> 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 모두 전역변수가 된다.

var i = 0;
for (var i = 0; i < 5; i++) {
    console.log(i); // 0,1,2,3,4
}
console.log(i); // 5

>> 함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다. 이로 인해 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.
: addEventListener로 이벤트 처리할 때 var 쓰면 안되는 이유를 조금 더 명확하게 이해할 수 있었음

##17장 new.target
new.target의 존재를 처음 알았음.
용도: 생성자 함수에서 new 연산자 없이 호출되는 것을 방지하기 위해서 ES6부터 지원하는 문법

##18장 함수와 일급객체
일급객체의 정의
1. 무명의 리터럴로 생성할 수 있다.
2. 변수나 자료 구조에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다. (콜백함수?)
4. 함수의 변환값으로 사용할 수 있다. (고차함수?)

##2주차 보충

//#origin
var person = { name: "Lee" }

function changeVal2(obj) {
    obj = { name : "kim" }
}
changeVal2(person);

console.log(person); //{name : 'Lee'}
 
> 그렇다면 obj = {name : "kim"}에 접근 or 활용?

//#1 return
var person = { name: 'Lee' }

function changeVal2(changeName) {
   return  { name : changeName }
}
changeVal2('kim’'); //{name : 'Kim'}
                           
//#2 클래스 선언
class person {
    constructor(name) {
        this.name = name;
    }
}
let a = new person("Lee") // { name : 'Lee' }
let b = new person("park") // { name : 'park' }
