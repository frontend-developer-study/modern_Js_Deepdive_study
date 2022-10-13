## 38장 브라우저의 렌더링 과정

**렌더링**

HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 `브라우저에 시각적으로 출력`하는 것이다.

**URL 입력 시**

1. URL을 입력하여 엔터키를 누른다.
2. URL이름이 DNS를 통해 IP로 변환된다.
3. 변환된 IP주소를 갖는 서버에게 요청을 전송한다.

**Http/1.1**

- 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가한다

**Http/2.0**

- 커넥션당 여러 개의 요청과 응답, 즉 다중 요청/응답이 가능하기 때문에 HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠르다.

### HTML 파싱

1. HTML요청 시 서버에 존재하는 HTML파일이 브라우저의 요청에 의해 응답된다.
2. 서버는 요청한 HTML파일을 읽어 메모리에 저장한 다음 `메모리에 저장된 바이트(2진수)`를 인터넷에 경유하여 응답한다.
3. 브라우저는 바이트 형태로 응답받은 HTML문서를 받는다.
4. HTML문서의 meta태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식 기준으로 `문자열`로 반환한다(2바이트 → HTML)
5. 반환된 문자열을 문법적 의미를 갖는 `코드의 최소 단위인 토큰`들로 분해한다.
6. 다시 토큰을 객체로 변환하여 `노드(DOM을 구성하는 기본 요소)`들을 생성한다.
7. 노드들은 중첩관계를 가지며, 중첩관계에 의해 `부자 관계가 형성`된다. 부자관계를 반영하여 트리 자료구조인 DOM을 구성한다.

### CSS 파싱

1. HTML파일을 순차적으로 해석하면서 link태그를 만나면 href에 지정된 CSS파일을 서버에 요청한다.
2. 요청이 완료되면 렌더링엔진은 HTML과 동일한 해석과정(바이트→문자→토큰→노드→CSSOM)을 거쳐 CSS를 파싱한다.

### Javascript 파싱

1. script 태그를 만나 scr 어트리뷰트에 정의된 자바스크립트 파일을 서버에 요청하여 자바스크립트 파일을 로드한다.
2. 자바스크립트파싱은 렌더링엔진이 아닌 `자바스크립트 엔진에 제어권`을 넘긴다.
3. 자바스크립트 코드를 문법적의미를 갖는 최소단위인 `토큰`으로 분해한다.
4. 토큰집합을 구문분석하여 `추상적 구문 트리`를 생성한다.
5. 바이트 코드로 변환하여 인터프리터에 의해 실행된다.

### 렌더트리

- 파싱을 통해 생성된 DOM과 CSSOM은 렌더링을 위해 렌더트리로 `결합`된다.
- 브라우저 화면에 렌더링되는 노드만으로 구성된다.
- 페인팅: 브라우저 화면에 픽셀을 렌더링 하는 작업

### 리렌더링

**반복될 수 있는 작업**

DOM + CSSOM = 렌더트리 생성 + 페인팅

**리렌더링 조건**

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 창의 리사이징에 의한 뷰포트 크기 변경
- HTML요소의 `레이아웃(위치, 크기)에 변경`을 발생시키는 width, height, margin, padding, border, display, position, top/right/bottom/left등의 스타일 변경

리렌더링은 `비용이 많이 드는 작업`이므로 빈번하게 발생하지 않게 해야된다.

**리플로우**

- 레이아웃 계산을 다시 하는 것을 말하며, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생할 때 실행된다.

**리페인트**

- 재결합된 렌더 트리 기반으로 다시 페인트를 한다.
- `레이아웃에 영향이 없다면 리플로우 없이 리페인트만 실행` 될 수 있다.

### script태그를 body 하단에 넣는 이유

- 브라우저는 렌더링엔진과 자바스크립트 엔진이 병렬적으로 파싱되지 않고 직렬적으로 파싱되기 때문에 script태그가 DOM 트리가 생성되기 이전에 있으면 문제가 될 수 있다.

### src 어트리뷰트

- async: HTML이 파싱될 때 자바스크립트를 로드할 때 HTML 파싱을 중단하지 않으며, 자바스크립트가 로드가 완료되면 자바스크립트를 실행한다.
- defer: async와 유사하지만 자바스크립트 로드 이후에서 차이가 있다. `로드이후에 HTML이 파싱완료`후에 실행된다.

---

## 39장 DOM

**노드객체의 상속 구조**

Object ←EventTarget ← Node ← Element ← HTMLElement ← HTML\*\*\*\*Element

**노드 취득하는 방법**

1. id이용: getElementById
2. 태그이름: getElementByTagName
3. class: getElementsByClassName
4. css 선택자: querySelector

이중 `가장 느린것은 css로 취득`하는 것이다.

**HTMLCollection**

NodeList의 대부분은 노드객체의 상태 변화가 실시간으로 반영하지 않지만 `getElementsByTagName, getElementsByClassName` 는 과거의 상태를 유지하는게 아니라 실시간으로 반영되기 때문에 주의해야된다.

이를 해결하기 위한 방법은 HTMLCollection객체를 사용하지 않는것이다.

- 무한으로 돌리는 while문을 사용하기
- 얕은 복사를 통해 고차함수를 사용하기
- NodeList사용

**NodeList**

실시간으로 반영되지 않는 객체이다. HTMLCollection보다 NodeList를 권장한다.

- querySelector

### **DOM조작**

DOM이 추가되거나 삭제될 때 리플로우와 리페인트가 발생한다.

**innerHTML**

- 마크업을 문자열로 조작한다.
- 사용자에게 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격에 취약하므로 위험하다.
- 기존에 있던 자식노드를 제거하고 새롭게 생성한다.
- 새로운 요소를 삽입할 때 삽입 위치를 지정할 수 없다.

**insertAdjacentHTML**

- 새롭게 삽일 될 요소만 파싱해서 자식요소에 추가하므로 innerHTML보다 효율적이고 빠르다.
- 문자열을 파싱하므로 크로스 사이트 스크립팅에 약하다.

**DOM API**

- 노드 생성, 추가, 삽입, 이동, 복사, 교체, 삭제에 해당하는 메서드를 사용해서 렌더링을 크로스사이트 스크립팅에서 벗어날 수 있다.

**HTML어트리뷰트**

- HTML 요소의 초기 상태를 지정하며 이는 변하지 않는다.

**DOM 프로퍼티**

- 언제든지 동적으로 변경되는 요소노드의 최신상태를 관리한다.

대응관계 p.743

---

## 40장 이벤트

### 이벤트 핸들러 등록 3가지

1. 이벤트 핸들러 어트리뷰트 방식
   - HTML요소의 어트리뷰트에 접두사: on과 이벤트타입: @@@ 에 함수 호출문을 등록
   - HTML과 자바스크립트 관심사가 다르므로 혼재하는것보다 분리하는 것이 좋다.
   - 이벤트 핸들러에 `인수를 전달하기 곤란`하다.
   - 인자를 `event가 아닌 다른 이름으로는 이벤트 객체를 전달받지 못한다.`
2. 이벤트 핸들러 프로퍼티 방식
   - DOM노드 객체에 대응하는 이벤트 핸들러 프로퍼티에 함수를 바인딩한다.
   - `하나의 이벤트 핸들러만 바인딩`할 수 있다.
3. addEventListener 메서드 방식
   - 이벤트 타깃에 메서드와 첫번째 매개변수에 이벤트타입, 두번째 매개변수에는 이벤트 핸들러를 전달한다.
   - 이벤트 핸들러 프로퍼티 방식과 다르게 `여러개의 이벤트 핸들러를 바인딩`할 수 있다.
   - removeEventListener를 통해 이벤트 핸들러 등록을 제거할 수 있다.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="event-attribute" onclick="showClick(event)">
      Event Attribute
    </button>
    <button id="event-property">Event Property</button>
    <button id="addEventListener-method">AddEventListener Method</button>

    <script>
      function showClick(e) {
        console.log(e);
      }

      const eventPropertyButton = document.getElementById('event-property');
      eventPropertyButton.onclick = showClick;

      const AddEventListenerMethodButton = document.getElementById(
        'addEventListener-method'
      );
      AddEventListenerMethodButton.addEventListener('click', showClick);
    </script>
  </body>
</html>
```

### 이벤트 전파

- 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 DOM트리를 통해 전파된다.
- 캡처링 단계: 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계: 이벤트가 이벤트 타깃에 도달
- 버블링 단계: 이벤트가 하위 요소에서 상위 요소 방향으로 전파
- 이벤트 핸들러 어트리뷰트/프로퍼티 방식은 `타깃, 버블링 단계`만 캐치할 수 있다.
- addEventListener메서드 방식은 `타깃, 버블링, 캡처링 단계`들을 캐치할 수 있다.
- 버블링 단계가 없는 이벤트: 포커스, 리소스, 마우스 이벤트 → 782p에 대체할 수 있는 이벤트가 나옴

### 이벤트 위임

- list같이 중복이 많은 구조일 때 모든 요소에 이벤트핸들러 등록시키는 것은 `성능 저하의 원인`이 되기 때문에 상위 부모에게 이벤트를 걸어주어 `다수의 이벤트를 등록시키지 않고` 이벤트가 전파가 되는 특성을 고려하여 이벤트를 바인딩해주는 방식이다.

---

## 41장 타이머

**호출스케줄링**

함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록하는 `함수 호출 예약`

**디바운스와 스로틀**

짧은 시간간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법

- 디바운스: 짧은 시간 간격으로 이벤트가 연속발생하면 이벤트 핸들러를 `호출하지 않다가` 일정 시간이 경과한 이후 이벤트 핸들러가 `한 번만 호출`
  - 자동완성, 버튼 중복 클릭 방지처리등에 유용하게 사용
- 스로틀: 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 `일정 시간 간격`으로 이벤트 핸들러가 `최대한 한 번만` 호출 되도록함
  - scroll 이벤트 처리, 무한 스크롤UI구현등에 사용된다.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button>Click</button>
    <pre>일반 클릭 카운터 <span class="normal-msg">0</span></pre>
    <pre>디바운스 클릭 이벤트 카운터<span class="debounce-msg">0</span></pre>
    <pre>스로틀 클릭 이벤트 카운터<span class="throttle-msg">0</span></pre>

    <script>
      const $button = document.querySelector('button');
      const $normalMsg = document.querySelector('.normal-msg');
      const $debounceMsg = document.querySelector('.debounce-msg');
      const $throttleMsg = document.querySelector('.throttle-msg');

      const debounce = (cb, delay) => {
        let timerId;

        return (event) => {
          if (timerId) clearInterval(timerId);
          timerId = setTimeout(cb, delay);
        };
      };

      const throttle = (cb, delay) => {
        let timerId;

        return (event) => {
          if (timerId) return;
          timerId = setTimeout(
            () => {
              cb(event);
              timerId = null;
            },
            delay,
            event
          );
        };
      };

      $button.addEventListener('click', () => {
        $normalMsg.textContent = +$normalMsg.textContent + 1;
      });
      $button.addEventListener(
        'click',
        debounce(() => {
          $debounceMsg.textContent = +$debounceMsg.textContent + 1;
        }, 500)
      );
      $button.addEventListener(
        'click',
        throttle(() => {
          $throttleMsg.textContent = +$throttleMsg.textContent + 1;
        }, 500)
      );
    </script>
  </body>
</html>
```
