//※22장 this
//this는 함수가 호출되는 방식에 따라 this에 바인딩될 값이 동적으로 결정된다.

//예제 22-05
//this는 어디서든지 참조 가능하다.
//전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); //window

function square(number) {
    //일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
    console.log(this); //window
    return number * number ;
}
square(2);

const person = {
    name: 'Lee',
    getName() {
        //메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
        console.log(this); // {name: "Lee", getName: f}
        return this.name;
    }
};
console.log(person.getName()); //Lee

function Person(name) {
    this.name = name;
    //생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    console.log(this); //person {name: "Lee"}
}

const me = new Person('Lee');

//this 바인딩동적으로 되는 경우
//함수 호출 방식
//일반 함수 -전역 객체
//메서드 호출 - 메서드를 호출한 객체
//생성자 함수 호출 - 새성자 함수가 (미래에) 생성할 인스턴스
//Function.prototype.apply,call,bind 메서드에 의한 간접 호출 - 메서드에 첫번째 인수로 전달한 객체


//※ 23장 실행 컨텍스트
//예제 23-02
// 전역 변수 선언
const x=1;
const y=2;

//함수 정의
function foo(a) {
    //지역 변수 선언
    const x=10;
    const y=20;

    //메서드 호출
    console.log(a+x+y); //130
}

//함수 호출
foo(100);

//메서드 호출
console.log(x+y); //3

// 소스코드의 평가 -> 실행컨텍스트 -> 소스코드의 실행 -> 실행콘텍스트에 실행 결과 돌려줌

//코드가 실행되는 과정
// 1.전역 코드 평가 -> 2.전역 코드 실행 -> 3.함수 코드 평가 -> 4.함수 코드 실행

//1. 전역 코드의 변수 선언문과 함수 선언문 먼저 실행
//생성된 전역 변수와 전역 함수가 실행 컨텍스트가 관리하는 전역 스코프에 등록
// var로 선언된 전역 변수와 함수 선언문은 전역 객체 프로퍼티와 메서드가 됨.

//2. 런타임 시작으로 코드가 순차적으로 실행됨.
//이때 전역 변수에 값이 할당되고 함수가 호출됨.
//함수가 호출되면 순차적으로 실행되던 전역 코드의 실행을 일시 중단하고
//코드 실행 순서를 변경하여 함수 내부로 진입함.

//3. 함수 내부 문들을 실행하기 앞서 함수 코드 평가 과정을 거침
//이때 매개변수와 지역 변수 선언문이 먼저 실행되고,
//그 결과 생성된 매개변수와 지역 변수가 실행 컨텍스트가 관리하는 지역 스코프에 등록됨.
//또한 함수 내부에서 지역 벼수처럼 사용할 수 있는 
//arguments 개체가 생성되어 지역 스코프에 등록되고 this바인딩도 결정됨.

//4. 함수코드 런타임이 시작되어 순차적으로 매개변수와 지역 변수가 할당되고,
//console.log 메서드가 호출된다.
//이때 식별자인 console을 스코프 체인을 통해 검색한다.
//이를 위해 함수 코드의 지역 스코프는 상위 스코프인 전역 스코프와 연결되어야한다.
//하지만 console 식별자는 스코프 체인에 등록되어 있지 않고 전역 객체에 프로퍼티로 존재한다.
//이는 전역 객체의 프로퍼티가 마치 전역 변수처럼 
//전역 스코프를 통해 검색 가능해야 한다는 것을 의미한다.
//다음은 log 프로퍼티를 console 객체의 프로토타입 체인을 통해 검색함.
//그 후 인수로 전달된 표현식 a+x+y 식별자는 스코프 체인을 통해 검색한다.
//console.log 종료되고 함수 호출 이전으로 돌아가 전역 코드를 계속 실행한다.


//* 선언에 의해 생성된 모든 식별자들의 스코프를 구분하여 등록하고 변화를 지속적으로 관리할 수 있어야함.
//** 스코프 중첩 관계에 체인을 형성하여 상위 스코프로 이동해 식별자를 검색할 수 있어야함.
//*** 현재 실행 중인 코드의 실행 순서를 변경해야함.

//**요약하자면 실행 컨텍스트는
// 소스코드를 실행하는데 필요한 환경을 제공하는 코드의 실행 결과를 실제로 관리하는 영역
// 식별자(변수, 함수, 클래스, 등의 이름)를 등록하고 관리하는 스코프와
// 코드 실행 순서 관리를 구현한 내부 메커니즘으로, 
// 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.
// 실행 순서 관리


//※23.5 렉시컬 환경
// 스코프와 식별자 관리
//예제 23-08
var xx=1;
const yy=2;

function fooo (a){
    var xx=3;
    const yy=4;

    function bar (b) {
        const z=5;
        console.log(a+b+xx+yy+z);
    }
    bar(10);
}

fooo(20); //42
console.log(xx);// 값은?

//책을 다시 보는게 좋지만 일단 요약해서 작성함.
//컨텍스트가 생기면서 내부 값에 렉세컬 환경이 구축됨
//렉세컬은 내부 환경 + this
//내부 환경에는 선언된 변수 및 인자 그리고 메소드가 포함될 수 있음.
//this는 바인딩 환경에 따라 윈도우 또는 객체를 가리킬 수 있음.
//외부 환경 부모의 스코프 영역이 포함되어있음.

//※24장 클로저

//예제 24-05
const xxx=1;

//[1]
function outer() {
    const xxx=10;
    const inner = function () { console.log(xxx);};//[2]
    return inner;
}

//outer 함수를 호출하면 중첩 함수 inner를 반환한다.
//그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc=outer(); //[3]
innerFunc(); // [4] 10

//outer 함수를 호출[3]하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기를 마감함.
//즉 실행컨텍스트가 종료되면서 스택에서 제거(pop)됨.
//그럼 innerFunc에서 값이 안찍혀야하는데 찍힘.
//외부 함수보다 중첩 함수가 더 오래 유지되는 경우
//중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 찹조할 수 있다.
//★이러한 중첩 함수를 글로저라고함.

//예전에 궁금했던 예제 코드 하나 추가함[출처 주원대리님~].

const increase = function (num) {
        return ++num;
    }
const decrease = function (num) {
        return --num;
    }
const auxs = { increase, decrease };
    
function makeCounter(aux) {
    let num = 0;
    return function () {
        num = aux(num);
        return num;
    }
}
    
const increaser = makeCounter(auxs.increase);
console.log(increaser()); //1 --> OK 이해됨
console.log(increaser()); //2 --> 왜 2가 나오는지?? 

//당시 클로저의 개념을 몰랐을경우
//함수를 다시 호출하기에 내부에 선언된 값이 다시 선언 되어 1이 나와야한다고 생각함.

function add() {
    let num =1;
    return ++num;
}

const Add = add();
Add;

//이때 함수 내부에 있는 num변수는 위에 Add변수 처럼 
//다시 선언되어 고정된 값만 나와야하는게 아닌가 라는 생각을함.
//이유 실행 컨텍스트가 끝났으니 더이상 내부 변수에 접근하지 못하기 때문.

function add2() {
    let num =1;
    return function(){
        return ++num
    };
}

const inAdd = add2();
inAdd();

//결론은 예제 24-06 ~ 24-08에 있다.
//1.중첩 함수에서 상위 스코프에 있는 변수를 참조하지 않을경우 최적화를 위해
//대부분 상위 스코프를 기억하지 않는다.
//2.상위 스코프 식별자를 참조하고 있어도 리턴하지 않는 경우 외부 함수보다 일찍 소멸함.
//즉 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질과 다름.

//클로저 최종 요약
// 1. 외부 함수보다 중첩 함수가 더 오래 유지되는 경우
//    중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.
// 2. 중첩 함수내에 상위 스코프 변수를 참조한 경우에만 해당
// 3. 스코프 변수를 자유 변수라고한다.


//※클래스
//예제25-54
class Animal {
    constructor(age, weight) {
        this.age = age;
        this.weight =weight;
    }

    eat() {return '먹다';}

    move() {return '움직이다';}
}

//상속을 통해 Animal 클래스를 확장한 bird 클래스
class Bird extends Animal {
    fly() {return '날다';}
}

const bird = new Bird(1,5);
console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); //true
console.log(bird instanceof Animal); //true

console.log(bird.eat()) //먹다
console.log(bird.move()) //움직이다
console.log(bird.fly()) //날다

//클래스는 기본적으로 extends 키워드가 제공된다.
