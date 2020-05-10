// implementation based on https://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/
// n = number of bits
const randomNumber = (n) => {
    let result = 0n;

    for(let i = 0n; i < n; i++)
        result |=  (0n).constructor(Math.floor(Math.random() * 2)) << i;

    return result
}

const randomOddNNumber = (n) => randomNumber(n) |  ((1n << n - 1n) | 1n)

const modPower = (base, exp, mod) => { 
    let res = 1n;
    base = base % mod;  
               
    while (exp > 0n){
    
        if (exp & 1n) 
            res = (res * base) % mod; 
  
        exp  = exp >> 1n;
        base = (base * base) % mod; 
    } 

    return res; 
}

// d is a number such that d * 2 ^ r = n - 1 (when n is odd)
const millerTest = (d, n, bit_num) => {

    let a = 2n + randomNumber(bit_num) % (n - 4n)
    let x = modPower(a, d, n);

    if (x === 1n  || x === n - 1n) 
       return true; 

    while (d !== n - 1n) 
    { 
        x = (x * x) % n; 
        d *= 2n; 

        if (x === 1n)      return false; 
        if (x === n - 1n)  return true; 
    } 

    return false; 
}

// n = number, k = number of tests.
const isPrime = (n, k, bit_num) => {
    
    if(n === 2n || n === 3n)     return true; 
    if(n % 2n === 0n || n <= 1n) return false;

    let d = n - 1n

    while (d % 2n === 0n) 
        d /= 2n;
    
    for (let i = 0; i < k; i++) 
        if (!millerTest(d, n, bit_num)) 
             return false; 
    
    return true;
}

export const genLargePrime = (size, k = 128) => {
    let result = 0n;

    while(!isPrime(result, k, size)){
        result = randomOddNNumber(size);
    }
    
    return result;
}

//https://kevincobain2000.github.io/miller-rabin-primality-test-online/