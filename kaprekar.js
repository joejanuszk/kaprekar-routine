const readline = require('readline');

const KAPREKAR_CONSTANT = 6174;

function padCandidate(candidate) {
    if (typeof candidate === 'number') {
        candidate = candidate.toString();
    }
    if (candidate.length < 4) {
        return padCandidate('0' + candidate);
    }
    return candidate;
}

function isComposedOfSingleDigit(candidate) {
    const paddedCandidate = padCandidate(candidate);
    const digits = paddedCandidate.split('');
    return Object.keys(digits.reduce((digitsMap, digit) => {
        digitsMap[digit] = true;
        return digitsMap;
    }, {})).length < 2;
}

function demonstrateKaprekarConvergence(candidate, iterationNumber = 1) {
    const paddedCandidate = padCandidate(candidate);
    const numericDigits = paddedCandidate.split('').map(d => parseInt(d, 10));

    const increasingOrderDigits = [...numericDigits].sort();
    const decreasingOrderDigits = [...increasingOrderDigits].reverse();

    const increasingOrderValue = parseInt(increasingOrderDigits.map(d => d.toString()).join(''), 10);
    const decreasingOrderValue = parseInt(decreasingOrderDigits.map(d => d.toString()).join(''), 10);

    const nextCandidateValue = decreasingOrderValue - increasingOrderValue;
    const paddedNextCandidate = padCandidate(nextCandidateValue);
    console.log(`Iteration #${iterationNumber}: ${padCandidate(decreasingOrderValue)} - ${padCandidate(increasingOrderValue)} = ${paddedNextCandidate}`);
    if (nextCandidateValue === KAPREKAR_CONSTANT) {
        console.log(`Convergence reached in ${iterationNumber} iteration${iterationNumber === 1 ? '' : 's'}.`);
        return iterationNumber;
    } else {
        return demonstrateKaprekarConvergence(paddedNextCandidate, iterationNumber + 1);
    }
}

function kaprekar(rl) {
    rl.question('Please provide a 4 digit number: ', (candidate) => {
        const maybeInt = parseInt(candidate, 10);
        if (candidate.length <= 4 && maybeInt && maybeInt === parseFloat(candidate)) {
            if (isComposedOfSingleDigit(candidate)) {
                console.log(`Candidate ${candidate} must use at least 2 unique digits.`);
            } else {
                demonstrateKaprekarConvergence(candidate);
            }
        } else {
            console.log(`Candidate ${candidate} is not a 4-digit number.`);
        }
        kaprekar(rl);
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
kaprekar(rl);
