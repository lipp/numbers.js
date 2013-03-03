/**
 * numbers.js
 *
 * top level management of numbers extensions
 *
 * (C) 2013 Steve Kaliski
 * MIT License
 *
 */
 
var core = exports;

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used in calculations.
 * Can be set and retrieved freely. Defaults to 0.001
 * 
 * Given the float-point handling by JavaScript, as well as the numbersal proficiency
 * of some methods, it is common practice to include a bound by which discrepency
 * between the "true" answer and the returned value is acceptable.
 */
core.EPSILON = 0.001;

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance to adjust for floating point errors.
 * 
 * @param {Number} a A number.
 * @param {Number} b A number.
 * @param {Number} tolerance (optional) tolerance range; falls back to numbers.EPSILON.
 * @return {Boolean} Whether {@code a} and {@code b} are nearly equal.
 */
core.nearlyEquals = function(a, b, tolerance) {
  return Math.abs(a - b) <= (tolerance || core.EPSILON);
};

/**
 * Determine the summation of numbers in a given array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} sum of numbers in array.
 */
core.sum = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    for (var i = 0, total = 0; i < arr.length; i++) {
      if (typeof(arr[i]) === 'number') {
        total = total + arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Subtracts elements from one another in array.
 *
 * e.g [5,3,1,-1] -> 5 - 3 - 1 - (-1) = 2
 *
 * @param {Array} collection of numbers.
 * @return {Number} difference.
 */
core.subtraction = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    for (var i = arr.length - 2, total = arr[arr.length - 1]; i >= 0; i--) {
      if (typeof(arr[i]) === 'number') {
        total -= arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Product of all elements in an array.
 *
 * @param {Array} collection of numbers.
 * @return {Number} product.
 */
core.product = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    for (var i = 1, length = arr.length, total = arr[0]; i < length; i++) {
      if (typeof(arr[i]) === 'number') {
        total = total * arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

/**
 * Return the square of any value.
 *
 * @param {Number} number.
 * @return {Number} square of number.
 */
core.square = function (num) {
  return num * num;
};

/**
 * Calculate the binomial coefficient (n choose k).
 *
 * @param {Number} available choices.
 * @param {Number} number chosen.
 * @return {Number} number of possible choices.
 */
core.binomial = function(n, k) {
  var arr = [];

  function _binomial(n, k) {
    if(n >= 0 && k === 0) return 1;

    if(n === 0 && k > 0) return 0;

    if(arr[n] && arr[n][k] > 0) return arr[n][k];

    if(!arr[n]) arr[n] = [];

    return arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
  }

  return _binomial(n, k);
};

/**
 * Factorial for some integer.
 *
 * @param {Number} integer.
 * @return {Number} result.
 */
core.factorial = function (num){
  var i = 2, o = 1;
  while (i <= num) {
    o *= i++;
  }

  return o;
};

/**
 * Calculate the greastest common divisor amongst two integers.
 * Taken from Ratio.js https://github.com/LarryBattle/Ratio.js
 * 
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} greatest common divisor for integers A, B.
 */
core.gcd = function (a, b) {
  var c;
  b = (+b && +a) ? +b : 0;
  a = b ? a : 1;
  
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }

  return Math.abs(a);
};

/**
 * Calculate the least common multiple amongst two integers.
 *
 * @param {Number} number A.
 * @param {Number} number B.
 * @return {Number} least common multiple for integers A, B.
 */
core.lcm = function (num1, num2) {
  return Math.abs(num1 * num2) / core.gcd(num1,num2);
};

/**
 * Retrieve a specified quantity of elements from an array, at random.
 *
 * @param {Array} set of values to select from.
 * @param {Number} quantity of elements to retrieve.
 * @param {Boolean} allow the same number to be returned twice.
 * @return {Array} random elements.
 */
core.random = function (arr, quant, allowDuplicates) {
  if (arr.length === 0) {
    throw new Error('Empty array');
  } else if (quant > arr.length  && !allowDuplicates){
    throw new Error('Quantity requested exceeds size of array');
  }
  
  if (allowDuplicates === true) {
    var result = [], i;
    for(i = 0; i < quant; i++) {
      result[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    return result;    
  } else {
    return core.shuffle(arr).slice(0, quant);
  }
};

/**
 * Shuffle an array, in place.
 *
 * @param {Array} array to be shuffled.
 * @return {Array} shuffled array.
 */
core.shuffle = function (array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/**
 * Find maximum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} maximum value in the array.
 */
core.max = function (array) {
  return Math.max.apply(Math, array);
};

/**
 * Find minimum value in an array.
 *
 * @param {Array} array to be traversed.
 * @return {Number} minimum value in the array.
 */
core.min = function (array) {
  return Math.min.apply(Math, array);
};

/**
 * Create a range of numbers.
 *
 * @param {Number} The start of the range.
 * @param {Number} The end of the range.
 * @return {Array} An array containing numbers within the range.
 */
core.range = function (start, stop, step) {
  var array, i = 0, len;

  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;

  if (stop < start) {
    step = 0 - Math.abs(step);
  }

  len = Math.max(Math.ceil((stop - start) / step) + 1, 0);

  array = new Array(len);

  while (i < len) {
    array[i++] = start;
    start += step;
  }

  return array;
};