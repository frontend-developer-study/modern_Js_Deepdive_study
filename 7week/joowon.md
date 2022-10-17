# 38.9 script 태그의 async / defer 어트리뷰트
: 외부 자바스크립트 파일을 로드하는 경우 파일의 로드가 비동기적으로 동시에 실행 가능

가. async 어트리뷰트
: script 태그의 순서와 상관없이 로드가 완료된 자바스크립트부터 먼저 실행
(단, 순서 보장이 필요한 script 태그에는 async 어트리뷰트 지정x)

나. defer 어트리뷰트
: DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용

# 39.2.6 HTMLCollection과 NodeList
> HTMLCollection : live객체
: getElementsByTagName, getElementsByClassName 메서드가 반환

> NodeList : non-live객체 (경우에 따라 live객체로 동작)
: querySelectorAll 메서드가 반환

*노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면
배열로 변환하여 사용하는 것을 권장*

# 39.6.6 노드 복제
> 얕은복사는 자손도 없고 텍스트 노드도 없다. cloneNode()
> 깊은 복사는 자손까지 모두 복사한다. cloneNode(true)
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul id="fruits">
    <li>apple</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');
  const $apple = $fruits.firstElementChild;
  
  const $shallowClone = $apple.cloneNode();
  $shallowClone.textContent = 'banana'
  $fruits.appendChild($shallowClone);

  const $deepClone = $fruits.cloneNode(true);
  $fruits.appendChild($deepClone);
</script>
</html>

# 41.3 디바운스와 스로틀
> 디바운스는 일정시간이 경과한 이후 한번만 호출
 : 일정 시간이 지나면 완료된 것으로 간주

> 스로틀은 일정시간 간격으로 이벤트 핸들러가 최대 한 번만 호출
 : 시간(delay)이 경과 했을 때 이벤트가 발생하면 콜백함수 호출