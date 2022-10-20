42.2 이벤트 루프와 태스크 큐

1) 비동기 함수의 콜백 함수는 태스크 큐에 푸시되어 대기하다가
콜 스택이 비게 되면, 비로소 콜 스택에 푸시되어 실행된다.

2) 자바스크립트는 싱글 스레드 방식으로 동작한다.
이때 싱글 스레드 방식으로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이다.
모든 자바스크립트 코드가 자바스크립트 엔진에서 싱글 스레드 방식으로 동작한다면 자바스크립트는 비동기로 동작할 수 없다.
즉 자바스크립트 엔진은 싱글스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.


45.7 마이크로태스크 큐
setTimeout(() => {console.log(1)}, 0);
Promise.resolve()
  .then(setTimeout(() => console.log(2)))
  .then(setTimeout(() => console.log(3))); // 2->3->1 순으로 실행됨

프로미스의 후속처리 메서드의 콜백함수는 태스크 큐가 아니라
마이크로태스크 큐이기 때문에 우선순위가 높다.

47.4 throw문
에러 객체 생성과 에러 발생은 의미가 다르다.
에러를 발생시키려면 try 코드 블록에서 throw문으로 에러 객체를 던져야 한다.

try {
  function repeat(n,f) {
    if (typeof f !== 'function') { throw new TypeError('f must be a function');}
    for (let i = 0; i < n; i++) {
       f(i);
      }
  };
  repeat(2,1);
} catch (err) {
  console.error(err);
}
