//38장 브라우저의 렌더링 과정
//전체적으로 브라우저의 렌더링 과정을 설명해준다
//필요시 책에서 읽을 것

//39장 DOM
// 기본적으로 html에서 노드를 취득하여 수정하는 부분에 대해 설명해주고 있다.
//id, class,태그네임 등으로 찾을 수 있다.

//HTMLCollection
//실시간으로 객체의 상태 변화를 반영함.

//NodeList(querySelectiorAll)
//대부분의 경우 노드 객체의 상태 변화를 실시간으로 하지 않는다.

//40장 이벤트
//이벤트가 발생될때 홀출될 함수를 이벤트 핸들러라고 하고, 이벤트 핸들러의 호출을 위임하는 것을
//이벤트 핸들러 등록이라 한다.

//예제 40-28

<ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
</ul>

const $fruits = document.getElementById('fruits');


// #fruits 요소의 하위인 li 요소를 클릭한 경우
$fruits.addEventListener('click', e =>{
    console.log(`이벤트 단계: ${e.eventPhase}`) //버블링 단계
    console.log(`이벤트 타깃: ${e.target}`) // [object HTMLLIELement]
    console.log(`커런트 타깃: ${e.currentTarget}`) // [object HTMLULISTElement]
});

//41장 타이머

//자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 각지 때문에 두가지 이상의 태스트를
//동시에 실행할 수 없다.
//싱글 스레드로 동작한다.
//위와 같은 이유로 타이머 함수 setTimeout과 setInterval은 비동기 처리 방식으로 동작한다.

//예제 41-01
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출됨.
setTimeout(() => console.log('Hi'), 1000);

// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출됨.
// 이때 콜백 함수에 'Lee'가 인수로 전달된다.
setTimeout(name => console.log(`Hi ${name}.`), 1000, 'Lee');

// 두 번째 인수(delay)를 생략하면 기본값 0이 지정됨.
setTimeout(()=> console.log('Hello'));

//전체적으로 익숙해짐의 문제 인것같다 나중에 다시 읽어 보자..