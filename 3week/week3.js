
//※17.2 생성자 함수(예제 17-04)

//생성자 함수
function Circle(radius) {
//생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

//인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 객체 생성
const circle2 = new Circle(10); // 반지름이 10인 객체 생성

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());

//※함수와 일급 객체(예제 18-01)
//1. 함수는 무명의 리터럴로 생성할 수 있다/
//2. 함수는 변수에 저장할 수 있다.
//런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
    }
    const decrease = function (num) {
    return --num;
    }
//2. 함수는 객체에 저장할 수 있다.
    const auxs = { increase, decrease };

//3. 함수의 매개변수에 전달할 수 있다.
//4. 함수의 반환값으로 사용할 수 있다.
    function makeCounter(aux) {
        let num = 0;

        return function () {
            num = aux(num);        
        }
    }
//3. 함수는 매개변수에게 함수를 전달할 수 있다.
    let increaser = makeCounter(auxs.increase);
    console.log(increaser()); //1
    console.log(increaser()); //2

//3. 함수는 매개변수에게 함수를 전달할 수 있다.
    let decreaser = makeCounter(auxs.decrease);
    console.log(increaser()); //-1
    console.log(increaser()); //-2

//※함수와 일급 객체(예제 18-06)
function sum(){
    let res = 0;

    for (let i = 0; i < arguments.length; i++){
        res += arguments[i]
    }

    return res;
}

console.log(sum()); // 0
console.log(sum(1,2)); // 2
console.log(sum(1,2,3)); // 6

//arguments 객체는 유사 배열로 사용가능
//배열 함수를 사용해서는 컨트롤이 안됨.