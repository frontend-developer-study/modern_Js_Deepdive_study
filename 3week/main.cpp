#include <stdio.h>

void swap(int* a, int* b)
{
	int temp;

	temp = *a;
	*a = *b;
	*b = temp;
}

void swap2(int& a, int& b)
{
	int temp;

	temp = a;
	a = b;
	b = temp;
}


int main()
{
	int a, b;

	a = 10;
	b = 20;

	swap(&a, &b);

	swap2(a, b);

	return 0;
}