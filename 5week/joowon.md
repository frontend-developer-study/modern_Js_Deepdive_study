22. this 키워드
this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.
객체리터럴의 메서드 내부 this : 메서드를 호출한 객체
생성자 함수 내부의 this : 생성자 함수가 (미래에) 생성할 인스턴스
전역/일반함수에서 this : window
+) eventListener 안에서 this는 설명에 없는건가..? eventListener 안에 this 쓰면 e.currentTarget (이벤트 객체)


24. 클로저
정의1.
: 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.
정의2.
: 외부함수보다 중첩함수가 더 오래 유지되는 경우 중첩함수는 이미 생명주기가 종료한 외부함수의 변수를 참조할 수 있다. 이러한 중첩함수를 클로저라고 부른다.

24.3 클로저와 렉시컬 환경
“자바스크립트의 모든 함수는 자신의 상위스코프를 기억한다. 이론상으로는 모든 함수는 클로저다.”
상위 스코프의 식별자 참조 && 외부함수의 외부로 중첩함수 반환 → 클로저

+):그래서 클로저는 어디에 쓰는가? (24.4 클로저의 활용)
: 클로저는 상태를 인전하게 변경하고 유지하기 위해 사용된다. 다시말해 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용된다.

[예제 24-14]
function makeCounter(aux) {
  let counter = 0;

  return function () {
    counter = aux(counter);
    return counter;
  };
}
function increase(n) {
  return ++n;
}
function decrease(n) {
  return --n;
}
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
