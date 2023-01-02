//45장 프로미스

//예제 45-10
const promise = new Promise((resolve,reject) => {
    //Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
    if(/* 비동기 처리 성공*/){
        resolve('result');
    }else{
        reject('failure reason')
    }
});

//예제 45-11
const promiseGet = url =>{
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () =>{
            if(xhr.status === 200){
                //성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
                resolve(JSON.parse(xhr.response));
            }else{
                reject(new Error(xhr.status));
            }
        };
    });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1');

//프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정된다.

//promiseGet2 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1')
.then(res => {
    return console.log(res)
})
.catch(err => {
    console.log(err)
})
.finally(() => {
    console.log('Bye!')
});


//46장 제너레이터와 async/await

//예제 46-14
const fetch = require('node-fetch');

async function fetchTodo(){
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    const response = await fetch(url);
    const todo = await response.json();
    console.log(todo);
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();
