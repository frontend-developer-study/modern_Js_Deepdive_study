#include <stdio.h>


void functionB(int& b) { //0x1000 int& 참조자
    b++;
}

int callByReference(void) {
    int a = 10;
    functionB(a);
    printf("%d\n", a);
    return 0;
}



void functionD(int* v) { //0x1012 포인터 변수
    (*v)++; //v라는 포인터 변수가 가리키는 주소를 찾아가서 해당 값을 읽어라
}

int callByAddress(void) {
    int a = 10;
    functionD(&a); // 주소를 대입  0x1000
    printf("%d\n", a);
    return 0;
}