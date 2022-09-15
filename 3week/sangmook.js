// 파일이 분리되어 있다 해도 하나의 전역 스코프를 공유한다

//네임스페이스 객체로 관리
var MYAPP ={};

//모듈

var Counter = ( function (){
    var num = 0;// private

    return {
        increase(){
            return ++num;
        },
        decrease(){
            return --num;
        }
    };
}()

);