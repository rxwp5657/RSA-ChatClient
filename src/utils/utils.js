import {genLargePrime} from './primes'

export const makeContact = ({name, image, pubKey}) => ({
    name  : name,
    image : image,
    pubKey: pubKey
});

export const makeMessage = ({content, encripted, status, sender,}) => ({
    message          : content, 
    encriptedMessage : encripted, 
    sender           : sender,
    status           : status 
});

export const changeMessageParam = (paramName, value, message) => {
    let change = {}
    change[paramName] = value 
    return Object.assign({}, message, change)
}

export const updateMessage = (messages, id, paramName, value) => {
    return messages.map((message, i) => {
        if(i !== id){
            return message
        }
        return changeMessageParam(paramName, value, message);
    })
}

const gcd = (a, b) => { 
    if (a === 0n) 
        return b; 
    return gcd(b % a, a); 
} 

const extendedEuclidean = (m, b) => {

    const extended = (A1, A2, A3, B1, B2, B3) => {

        if(B3 === 0n || B3 === 1n){
            return {inv: B2 < 0 ? ((B2 % m) + m) % m : (B2 % m), status: B3};
        }

        let Q = A3 / B3;
        let T1 = A1 - Q * B1;
        let T2 = A2 - Q * B2;
        let T3 = A3 - Q * B3;

        return extended(B1, B2, B3, T1, T2, T3);
    }
    return extended(1n, 0n, m, 0n, 1n, b)
}

export const generateKeysRSA = ({p, q, e}) => {

    let n = p * q;
    let totient = (p - 1n) * (q - 1n);
    let d = extendedEuclidean(totient, e);

    console.log(d);

    if(d.status === 1n){
        return {public: [e.toString(10), n.toString(10)], private: [d.inv, n]}
    }
    else {
        return {public: [7, 65], private: [7, 65]}
    }
}

export const generatePrimes = async (size) => {
    
    let p = genLargePrime(size);
    let q = genLargePrime(size);
    let e = genLargePrime(size);

    return {p: p, q: q, e: e};
}