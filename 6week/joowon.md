35. 스프레드 문법
: 스프레드 문법의 결과는 값이 아니다. 즉 변수에 할당할 수 없다.
const list = ...[1,2,3] //Syntax Error

36. 객체 디스트럭처링
 가. 객체의 프로퍼티 키와 다른 변수의 이름으로 프로퍼티 값을 할당할 때 → :
 나. 객체 디스트럭처링 할당을 위한 변수에 기본값을 설정할 때 → =

const user = {firstName : 'joowon', lastName : 'hyun'};
const {firstName, lastName} = user;
console.log(firstName, lastName) // joowon Hyun;

const todos = [
    { id : 1, content: 'HTML', completed: true },
    { id : 1, content: 'HTML', completed: true },
    { id : 1, content: 'HTML', completed: true },
];
const [, {id} ] = todos;
console.log(id); // 2;

→ API 받아서 출력할 때 꽤 유용하게 쓸 수 있을 듯

37. Set 자료형
중복을 허용하지 않는 Set 객체의 특성을 활용하여 중복된 요소를 제거할 수 있다.
[ 예제37-02 변형]
const set1 = new Set([1, 2, 3, 3]); //set으로 중복 제거
const set2 = [...set1] // array로 바꾸기