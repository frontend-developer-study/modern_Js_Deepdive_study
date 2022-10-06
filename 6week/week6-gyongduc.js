//※34장 이터러블
// 배열, 문자열(arguments,nodeList,HTMLCollection), Map, set 등은 이터러블이다.

//예제 34-02
const array = [1,2,3];

//배열은 Array.prototype의 Symbor.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in array) //true

//이터러블인 배열은 for ... of 문으로 순회 가능하다.
for (const item of array){
    console.log(item);
}

//이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); [1,2,3]

//이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); //1,[2,3]

//예제 34-14 ~ 15
//피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수
//수열의 최대값 인수로 전달받는다.

const fibonacciFunc = function (max){
    let [pre, cur] = [0,1];

    //Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
    return{
        [Symbol.iterator](){
            return {
                next(){
                    [pre, cur] = [cur, pre +cur];
                    return {value: cur, done:cur >= max};
                }
            };
        }
    };
};

//이터러블을 반환하는 함수에 수열의 최대값을 인수로 전달하면서 호출한다.
//fibonacciFunc(10)은 이터러블을 반환한다.
for (const num of fibonacciFunc(10)){
    console.log(num);
}


//fibonacciFunc 함수는 이터러블을 반환한다.
const iterable = fibonacciFunc(5);
//이터러블의 Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator1 = iterable[Symbol.iterator]();

console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());


//※스프레드 문법

//예제 35-01 ~ 02
//...[1,2,3]은 [1,2,3]을 개별 요소로 분리한다.(1,2,3)
console.log(...[1,2,3]);

//문자열은 이터러블이다.
console.log(...'Hello'); // H e l l o

//Map과 Set은 이터러블이다.
console.log(...new Map([['a','1'],['b','2']])); // ['a','1'] ['b','2']
console.log(...new Set([1,2,3])); //1 2 3

//이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{a:1,b:2});//TypeError:found non-callable @@iterator

//스프레드 문법의 결과는 값이 아니다.
const list = ...[1,2,3]; //SyntaxError: Unexpected token ...

//쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용할 수 있다.
//-함수 호출문의 인수 목록
//-배열 리터럴의 요소 목록
//-객체 리터럴의 프로퍼티 목록

//-함수 호출문의 인수 목록에서 사용하는경우
//예제 35-07

Math.max([1,2,3]); // NaN

//스프레드 문법사용
Math.max(...[1,2,3]); // 3

//*Rest 파라미터와 스프레드 문법은 형태가 동일하여 혼동될 수 있음 주의 요망

// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(...rest){
    console.log(rest); // 1,2,3 -> [1,2,3]
}

//스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
//[1,2,3] -> 1,2,3
foo(...[1,2,3]);

//-배열 리터럴의 요소 목록
//예제 35-10
const arr = [...[1,2],...[3,4]];
console.log(arr); //[1,2,3,4]

//-객체 리터럴의 프로퍼티 목록
//예제 35-22
//객체 복사(얕은 복사)
const obj = {x:1,y:2};
const copy = {...obj};
console.log(copy); //{x:1,y:2}
console.log(obj === copy); //false

//객체 병합
const merged = {x:1,y:2,...{a:3,b:4}};
console.log(); //{x:1,y;2,a:3,b:4}


//※디스트럭처링 할당
// 구조화된 배열과 같은 이터러블 또는 객체를 디스트럭처링하여 1개 이상의 변수에 개별적으로 할당하는 것
// 배열과 같은 이터러블 또는 객체 리터럴에서 필요한 값만 추출할때 유용

//예전 방법과 현재 방법
//ES5
let arr1 = [1,2,3];
let one1 = arr1[0];

//ES6
const arr2 = [1,2,3];
const [one,two, three] = arr;

console.log(one,two,three); //1 2 3 

//예제36-06~07

//순서대로 할당되며 기준은 배열의 인덱스다.
const [c,d] = [1];
console.log(c, d); // 1 undefined

const [e,f] = [1,2,3];
console.log(c, f); // 1 2

const [g, ,h] = [1,2,3];
console.log(g, h); // 1 3

//기본 값보다 할당된 값이 우선하다.
const [i,j=10,k=3] =[1,2];
console.log(i,j,k); //123

//37장 Set과 Map
//Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체를 생성한다.
//이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.

//예제37-02~03
const set1 = new Set([1,2,3,3]);
console.log(set1); // set(3){1,2,3}

const set2 = new Set('Hello');
console.log(set2); // set(4){'H','e','l','o'}

//set을 사용한 배열의 중복 요소 제거
const uniq = array => [...new Set(array)];
console.log(uniq([2,1,2,3,4,3,4])); //[2,1,3,4]

//37.1.2요소 개수확인
//예제 37-05
const set = new Set([1,2,3]);
console.log(set.size); //3
// 객체의 요소 개수를 확인 할때는 size를 사용하면 됩니다.

//37.1.3요소 추가
//예제37-06~09
const set3 = new Set();
console.log(set3); // set3(0){}

//add를 사용하여 값을 추가할 수 있다.
set3.add(1);
console.log(set3); // set3(1){1}

//add를 연속적으로 사용하여 추가할 수 있고 중복값은 추가되지 않는다.
set3.add(2).add(3).add(3)
console.log(set3); // set3(3){1,2,3}

//NaN과 NaN을 같다고 평가하여 중복 추가가 되지 않음.
set3.add(NaN).add(NaN);
console.log(set3); // Set(4) {1, 2, 3, NaN}

//+0과 -0을 같다고 평가함.
set3.add(+0).add(-0);
console.log(set3); // Set(5) {1, 2, 3, NaN, 0}

//37.1.4 요소 존재 여부 확인
//예제37-11
const set4 = new Set([1,2,3]);
//불리언 값을 반환한다.
console.log(set4.has(2));//true
console.log(set4.has(4));//false

//37.1.5 요소 삭제
const set5 = new Set([1,2,3]);
//요소 2를 삭제한다.
set.delete(2);
console.log(set5); //set(2) {1,3}

//존재하지 않는 요소 0을 삭제하면 에러 없이 무시된다.
set.delete(0);
console.log(set5); //set(2) {1,3}

//add와 같이 연속적으로 호출할 수 없음.
set.delete(1).delete(3) // TypeError: set.delete(...)delete is not function

//37.1.6 요소 일괄 삭제
//clear메서드는 언제나 undefined를 반환한다.
const set6 = new Set([1,2,3]);
set.clear();
console.log(set6); //set(0) {}

//37.1.7 요소 순회
const set7 = new Set([1,2,3]);

//이터러블인 set 객체는 for...of 문으로 순회할 수 있다.
for( const value of set7){
    console.log(value); //1 2 3
}

//이터러블인 set 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set7]); //[1,2,3]


//37.2Map
//map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.
//객체와 유사하지만 차이가 있따.

//*Map
//-객체를 포함한 모든 값
//-이터러블임
//-map.size로 개수를 확인함.

//*객체
//-문자열 또는 신벌 값을 키로 사용할 수 있음.
//-이터러블이 아님
//-Object.Keys(obj).length로 개수 확인함.

//map은 set으로 값을 추가 get으로 값을 받는다.
//중복키 값은 허용하지 않아 덮어쓰기됨.

//37.2.4 요소 취득
//예제 37-36
const map = new Map();
const lee = {name:'Lee'};
const Kim = {name:'Kim'};

map
.set(lee, 'gyong')

console.log(map.get(lee));
console.log(map.get('key'));

//set과 비슷하며 관련 자료는 책에서 볼것.......
