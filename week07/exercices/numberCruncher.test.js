'use strict';

function factorsOf(n) {
    const factors = [];
    for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
        if (n % i === 0) {
            factors.push(i, n / i);
        }
    }
    return factors.sort((a, b) => a - b);
}

function isPrime(n) {
    try {
        return factorsOf(n).length === 2;
    } catch (error) {
        return false;
    }
}


test('2 is prime', () => {
    expect(isPrime(2)).toBe(true);
});
test('10 is not prime', () => {
    expect(isPrime(10)).not.toBe(true);
});

test('non-numerical data returns not prime', () => {
    expect(isPrime('two')).toBe(false);
});

test('non-integer numbers return not prime', () => {
    expect(isPrime(1.2)).toBe(false);
});

test('negative numbers return not prime', () => {
    expect(isPrime(-1)).toBe(false);
});