/**
 * Curated Sequential Problem Bank for Code Rush
 * Modeled after Chess.com Puzzle Rush:
 * Starts at 400 (FooBar, simple math) -> Ramps up through 800-1400 (Strings, Arrays, Two-Pointer, Stacks)
 * -> Climbs to 1600-2000 (Kadane's, DP, Sliding Window, Prefix Products).
 *
 * Every problem includes:
 * - starter code (JS & TS)
 * - reference solution (verified by Vitest test suite)
 * - visible test cases
 * - hidden test cases (edge cases, boundary values)
 */

export const PROBLEMS = [
  {
    id: 'p01_foobar',
    title: 'Foo Bar',
    rating: 400,
    difficulty: 'Warmup',
    tags: ['Conditionals', 'Math'],
    description: `Given an integer \`n\`, return:
- \`"FooBar"\` if \`n\` is divisible by both 3 and 5.
- \`"Foo"\` if \`n\` is divisible by 3.
- \`"Bar"\` if \`n\` is divisible by 5.
- \`String(n)\` if \`n\` is not divisible by 3 or 5.`,
    functionName: 'fooBar',
    params: ['n'],
    starterCode: `function fooBar(n) {
  // Your code here
  
}`,
    typescriptStarter: `function fooBar(n: number): string {
  // Your code here
  
}`,
    referenceSolution: `function fooBar(n) {
  if (n % 15 === 0) return "FooBar";
  if (n % 3 === 0) return "Foo";
  if (n % 5 === 0) return "Bar";
  return String(n);
}`,
    testCases: [
      { name: 'Divisible by 3', args: [9], expected: 'Foo' },
      { name: 'Divisible by 5', args: [10], expected: 'Bar' },
      { name: 'Divisible by 15', args: [30], expected: 'FooBar' },
      { name: 'Neither', args: [7], expected: '7' },
      { name: 'Zero', args: [0], expected: 'FooBar', hidden: true },
      { name: 'Negative divisible by 3', args: [-6], expected: 'Foo', hidden: true },
      { name: 'Negative divisible by 5', args: [-20], expected: 'Bar', hidden: true },
      { name: 'Another neither', args: [13], expected: '13', hidden: true },
    ],
  },
  {
    id: 'p02_add_two',
    title: 'Add Two Numbers',
    rating: 450,
    difficulty: 'Warmup',
    tags: ['Math', 'Basics'],
    description: `Write a function that returns the sum of two integers \`a\` and \`b\`.`,
    functionName: 'add',
    params: ['a', 'b'],
    starterCode: `function add(a, b) {
  // Your code here
  
}`,
    typescriptStarter: `function add(a: number, b: number): number {
  // Your code here
  
}`,
    referenceSolution: `function add(a, b) {
  return a + b;
}`,
    testCases: [
      { name: 'Positive numbers', args: [2, 3], expected: 5 },
      { name: 'With zero', args: [10, 0], expected: 10 },
      { name: 'Negative numbers', args: [-5, 8], expected: 3 },
      { name: 'Both negative', args: [-4, -9], expected: -13, hidden: true },
      { name: 'Large numbers', args: [100000, 250000], expected: 350000, hidden: true },
    ],
  },
  {
    id: 'p03_is_even',
    title: 'Is Even',
    rating: 500,
    difficulty: 'Warmup',
    tags: ['Logic', 'Math'],
    description: `Return \`true\` if the integer \`n\` is even, and \`false\` if it is odd.`,
    functionName: 'isEven',
    params: ['n'],
    starterCode: `function isEven(n) {
  // Your code here
  
}`,
    typescriptStarter: `function isEven(n: number): boolean {
  // Your code here
  
}`,
    referenceSolution: `function isEven(n) {
  return n % 2 === 0;
}`,
    testCases: [
      { name: 'Even number', args: [4], expected: true },
      { name: 'Odd number', args: [7], expected: false },
      { name: 'Zero is even', args: [0], expected: true },
      { name: 'Negative even', args: [-8], expected: true, hidden: true },
      { name: 'Negative odd', args: [-13], expected: false, hidden: true },
    ],
  },
  {
    id: 'p04_reverse_string',
    title: 'Reverse String',
    rating: 550,
    difficulty: 'Warmup',
    tags: ['Strings'],
    description: `Return the reversed version of the input string \`str\`.`,
    functionName: 'reverseString',
    params: ['str'],
    starterCode: `function reverseString(str) {
  // Your code here
  
}`,
    typescriptStarter: `function reverseString(str: string): string {
  // Your code here
  
}`,
    referenceSolution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    testCases: [
      { name: 'Standard string', args: ['hello'], expected: 'olleh' },
      { name: 'Rush', args: ['rush'], expected: 'hsur' },
      { name: 'Single character', args: ['a'], expected: 'a' },
      { name: 'Empty string', args: [''], expected: '', hidden: true },
      { name: 'With spaces', args: ['code rush'], expected: 'hsur edoc', hidden: true },
    ],
  },
  {
    id: 'p05_sum_array',
    title: 'Sum Array',
    rating: 600,
    difficulty: 'Warmup',
    tags: ['Arrays', 'Math'],
    description: `Given an array of numbers \`nums\`, return the sum of all elements. Return \`0\` if the array is empty.`,
    functionName: 'sumArray',
    params: ['nums'],
    starterCode: `function sumArray(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function sumArray(nums: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function sumArray(nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}`,
    testCases: [
      { name: 'Small array', args: [[1, 2, 3, 4]], expected: 10 },
      { name: 'Contains negatives', args: [[-2, 5, -1, 3]], expected: 5 },
      { name: 'Single element', args: [[42]], expected: 42 },
      { name: 'Empty array', args: [[]], expected: 0, hidden: true },
      { name: 'All zeros', args: [[0, 0, 0]], expected: 0, hidden: true },
    ],
  },
  {
    id: 'p06_find_max',
    title: 'Find Maximum',
    rating: 650,
    difficulty: 'Warmup',
    tags: ['Arrays'],
    description: `Given a non-empty array of numbers \`nums\`, return the largest number.`,
    functionName: 'findMax',
    params: ['nums'],
    starterCode: `function findMax(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function findMax(nums: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function findMax(nums) {
  return Math.max(...nums);
}`,
    testCases: [
      { name: 'Positive integers', args: [[3, 8, 2, 5, 1]], expected: 8 },
      { name: 'Negative numbers', args: [[-10, -3, -50, -2]], expected: -2 },
      { name: 'Single element', args: [[99]], expected: 99 },
      { name: 'All identical', args: [[7, 7, 7]], expected: 7, hidden: true },
      { name: 'Max at end', args: [[1, 2, 3, 4, 100]], expected: 100, hidden: true },
    ],
  },
  {
    id: 'p07_count_vowels',
    title: 'Count Vowels',
    rating: 700,
    difficulty: 'Easy',
    tags: ['Strings'],
    description: `Return the count of vowels (\`a, e, i, o, u\`, case-insensitive) in the string \`str\`.`,
    functionName: 'countVowels',
    params: ['str'],
    starterCode: `function countVowels(str) {
  // Your code here
  
}`,
    typescriptStarter: `function countVowels(str: string): number {
  // Your code here
  
}`,
    referenceSolution: `function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}`,
    testCases: [
      { name: 'Word', args: ['celebration'], expected: 5 },
      { name: 'Uppercase', args: ['AEIOU'], expected: 5 },
      { name: 'No vowels', args: ['rhythm'], expected: 0 },
      { name: 'Empty string', args: [''], expected: 0, hidden: true },
      { name: 'Sentence with mixed case', args: ['The Quick Brown Fox'], expected: 5, hidden: true },
    ],
  },
  {
    id: 'p08_factorial',
    title: 'Factorial',
    rating: 750,
    difficulty: 'Easy',
    tags: ['Math', 'Recursion'],
    description: `Calculate the factorial of non-negative integer \`n\` (\`n!\`). Note that \`0! = 1\`.`,
    functionName: 'factorial',
    params: ['n'],
    starterCode: `function factorial(n) {
  // Your code here
  
}`,
    typescriptStarter: `function factorial(n: number): number {
  // Your code here
  
}`,
    referenceSolution: `function factorial(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}`,
    testCases: [
      { name: '5!', args: [5], expected: 120 },
      { name: '0!', args: [0], expected: 1 },
      { name: '1!', args: [1], expected: 1 },
      { name: '3!', args: [3], expected: 6, hidden: true },
      { name: '7!', args: [7], expected: 5040, hidden: true },
    ],
  },
  {
    id: 'p09_is_palindrome',
    title: 'Valid Palindrome',
    rating: 800,
    difficulty: 'Easy',
    tags: ['Strings', 'Two Pointers'],
    description: `Return \`true\` if string \`s\` is a palindrome, considering only alphanumeric characters and ignoring case. Return \`false\` otherwise.`,
    functionName: 'isPalindrome',
    params: ['s'],
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    typescriptStarter: `function isPalindrome(s: string): boolean {
  // Your code here
  
}`,
    referenceSolution: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
    testCases: [
      { name: 'Classic phrase', args: ['A man, a plan, a canal: Panama'], expected: true },
      { name: 'Race a car', args: ['race a car'], expected: false },
      { name: 'Simple word', args: ['racecar'], expected: true },
      { name: 'Empty string', args: ['   '], expected: true, hidden: true },
      { name: 'Alphanumeric with numbers', args: ['0P'], expected: false, hidden: true },
      { name: 'Single char', args: ['a.'], expected: true, hidden: true },
    ],
  },
  {
    id: 'p10_fibonacci',
    title: 'Fibonacci Number',
    rating: 850,
    difficulty: 'Easy',
    tags: ['Math', 'Dynamic Programming'],
    description: `Given \`n\`, calculate the \`n\`-th Fibonacci number.
\`F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2)\` for \`n > 1\`.`,
    functionName: 'fibonacci',
    params: ['n'],
    starterCode: `function fibonacci(n) {
  // Your code here
  
}`,
    typescriptStarter: `function fibonacci(n: number): number {
  // Your code here
  
}`,
    referenceSolution: `function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    testCases: [
      { name: 'F(2)', args: [2], expected: 1 },
      { name: 'F(3)', args: [3], expected: 2 },
      { name: 'F(4)', args: [4], expected: 3 },
      { name: 'F(0)', args: [0], expected: 0, hidden: true },
      { name: 'F(1)', args: [1], expected: 1, hidden: true },
      { name: 'F(10)', args: [10], expected: 55, hidden: true },
      { name: 'F(15)', args: [15], expected: 610, hidden: true },
    ],
  },
  {
    id: 'p11_remove_duplicates',
    title: 'Remove Duplicates',
    rating: 900,
    difficulty: 'Easy',
    tags: ['Arrays'],
    description: `Given an array \`nums\`, return a new array with all duplicate elements removed, keeping their first occurrence order.`,
    functionName: 'removeDuplicates',
    params: ['nums'],
    starterCode: `function removeDuplicates(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function removeDuplicates(nums: number[]): number[] {
  // Your code here
  
}`,
    referenceSolution: `function removeDuplicates(nums) {
  return [...new Set(nums)];
}`,
    testCases: [
      { name: 'Duplicates present', args: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
      { name: 'All identical', args: [[7, 7, 7]], expected: [7] },
      { name: 'Already unique', args: [[1, 2, 3]], expected: [1, 2, 3] },
      { name: 'Empty', args: [[]], expected: [], hidden: true },
      { name: 'Negative numbers', args: [[-1, 0, -1, 2, 0]], expected: [-1, 0, 2], hidden: true },
    ],
  },
  {
    id: 'p12_two_sum',
    title: 'Two Sum',
    rating: 950,
    difficulty: 'Easy',
    tags: ['Arrays', 'Hash Map'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices \`[i, j]\` of the two numbers such that they add up to \`target\`.
You may assume exactly one valid answer exists. Order of indices in output should be ascending \`[i, j]\` where \`i < j\`.`,
    functionName: 'twoSum',
    params: ['nums', 'target'],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    typescriptStarter: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  
}`,
    referenceSolution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      { name: 'Standard example', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: 'Middle numbers', args: [[3, 2, 4], 6], expected: [1, 2] },
      { name: 'Duplicates summing target', args: [[3, 3], 6], expected: [0, 1] },
      { name: 'With negative numbers', args: [[-3, 4, 3, 90], 0], expected: [0, 2], hidden: true },
      { name: 'Larger array', args: [[10, 20, 30, 40, 75, 80], 85], expected: [0, 4], hidden: true },
    ],
  },
  {
    id: 'p13_valid_parentheses',
    title: 'Valid Parentheses',
    rating: 1000,
    difficulty: 'Easy',
    tags: ['Stack', 'Strings'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.
Open brackets must be closed by the same type of brackets in the correct order.`,
    functionName: 'isValid',
    params: ['s'],
    starterCode: `function isValid(s) {
  // Your code here
  
}`,
    typescriptStarter: `function isValid(s: string): boolean {
  // Your code here
  
}`,
    referenceSolution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
    testCases: [
      { name: 'Simple round', args: ['()'], expected: true },
      { name: 'Multiple pairs', args: ['()[]{}'], expected: true },
      { name: 'Mismatched', args: ['(]'], expected: false },
      { name: 'Nested pairs', args: ['{[]}'], expected: true },
      { name: 'Incomplete open', args: ['(['], expected: false, hidden: true },
      { name: 'Empty string', args: [''], expected: true, hidden: true },
      { name: 'Starting with close', args: [')('], expected: false, hidden: true },
    ],
  },
  {
    id: 'p14_missing_number',
    title: 'Missing Number',
    rating: 1050,
    difficulty: 'Easy',
    tags: ['Arrays', 'Math', 'Bit Manipulation'],
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    functionName: 'missingNumber',
    params: ['nums'],
    starterCode: `function missingNumber(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function missingNumber(nums: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}`,
    testCases: [
      { name: 'Missing 2', args: [[3, 0, 1]], expected: 2 },
      { name: 'Missing 8', args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { name: 'Missing 2 in pair', args: [[0, 1]], expected: 2 },
      { name: 'Missing 0', args: [[1]], expected: 0, hidden: true },
      { name: 'Missing intermediate', args: [[0, 2, 3]], expected: 1, hidden: true },
    ],
  },
  {
    id: 'p15_chunk_array',
    title: 'Chunk Array',
    rating: 1100,
    difficulty: 'Easy',
    tags: ['Arrays'],
    description: `Given an array \`arr\` and a chunk size \`size\`, return a chunked array where each subarray has length \`size\` (the last subarray may be shorter).`,
    functionName: 'chunk',
    params: ['arr', 'size'],
    starterCode: `function chunk(arr, size) {
  // Your code here
  
}`,
    typescriptStarter: `function chunk(arr: any[], size: number): any[][] {
  // Your code here
  
}`,
    referenceSolution: `function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}`,
    testCases: [
      { name: 'Even chunks', args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
      { name: 'Chunk size 1', args: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
      { name: 'Size larger than array', args: [[1, 9, 6], 5], expected: [[1, 9, 6]] },
      { name: 'Empty array', args: [[], 3], expected: [], hidden: true },
    ],
  },
  {
    id: 'p16_valid_anagram',
    title: 'Valid Anagram',
    rating: 1150,
    difficulty: 'Easy',
    tags: ['Strings', 'Hash Map'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    functionName: 'isAnagram',
    params: ['s', 't'],
    starterCode: `function isAnagram(s, t) {
  // Your code here
  
}`,
    typescriptStarter: `function isAnagram(s: string, t: string): boolean {
  // Your code here
  
}`,
    referenceSolution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    testCases: [
      { name: 'Anagram word pair', args: ['anagram', 'nagaram'], expected: true },
      { name: 'Not anagram', args: ['rat', 'car'], expected: false },
      { name: 'Different lengths', args: ['a', 'ab'], expected: false },
      { name: 'Empty strings', args: ['', ''], expected: true, hidden: true },
      { name: 'Duplicate letter counts mismatch', args: ['aacc', 'ccac'], expected: false, hidden: true },
    ],
  },
  {
    id: 'p17_single_number',
    title: 'Single Number',
    rating: 1200,
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'Arrays'],
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find and return that single element.`,
    functionName: 'singleNumber',
    params: ['nums'],
    starterCode: `function singleNumber(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function singleNumber(nums: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function singleNumber(nums) {
  return nums.reduce((acc, curr) => acc ^ curr, 0);
}`,
    testCases: [
      { name: 'Example 1', args: [[2, 2, 1]], expected: 1 },
      { name: 'Example 2', args: [[4, 1, 2, 1, 2]], expected: 4 },
      { name: 'Single element array', args: [[1]], expected: 1 },
      { name: 'Negative single number', args: [[-1, -1, -2]], expected: -2, hidden: true },
      { name: 'Longer list', args: [[10, 20, 30, 20, 10]], expected: 30, hidden: true },
    ],
  },
  {
    id: 'p18_longest_common_prefix',
    title: 'Longest Common Prefix',
    rating: 1250,
    difficulty: 'Easy',
    tags: ['Strings'],
    description: `Write a function to find the longest common prefix string amongst an array of strings \`strs\`. If there is no common prefix, return an empty string \`""\`.`,
    functionName: 'longestCommonPrefix',
    params: ['strs'],
    starterCode: `function longestCommonPrefix(strs) {
  // Your code here
  
}`,
    typescriptStarter: `function longestCommonPrefix(strs: string[]): string {
  // Your code here
  
}`,
    referenceSolution: `function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
    testCases: [
      { name: 'Common prefix "fl"', args: [['flower', 'flow', 'flight']], expected: 'fl' },
      { name: 'No common prefix', args: [['dog', 'racecar', 'car']], expected: '' },
      { name: 'Identical strings', args: [['rush', 'rush', 'rush']], expected: 'rush' },
      { name: 'Single string', args: [['alone']], expected: 'alone', hidden: true },
      { name: 'First string is shortest', args: [['a', 'ab', 'abc']], expected: 'a', hidden: true },
    ],
  },
  {
    id: 'p19_merge_sorted_arrays',
    title: 'Merge Sorted Arrays',
    rating: 1300,
    difficulty: 'Easy',
    tags: ['Arrays', 'Two Pointers'],
    description: `Given two sorted integer arrays \`arr1\` and \`arr2\`, merge them into a single sorted array and return it.`,
    functionName: 'mergeSorted',
    params: ['arr1', 'arr2'],
    starterCode: `function mergeSorted(arr1, arr2) {
  // Your code here
  
}`,
    typescriptStarter: `function mergeSorted(arr1: number[], arr2: number[]): number[] {
  // Your code here
  
}`,
    referenceSolution: `function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);
  return result;
}`,
    testCases: [
      { name: 'Interleaved values', args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
      { name: 'One array all smaller', args: [[1, 2], [3, 4]], expected: [1, 2, 3, 4] },
      { name: 'One empty array', args: [[], [1, 2]], expected: [1, 2] },
      { name: 'Both empty', args: [[], []], expected: [], hidden: true },
      { name: 'Duplicates across arrays', args: [[2, 2], [2, 3]], expected: [2, 2, 2, 3], hidden: true },
    ],
  },
  {
    id: 'p20_roman_to_int',
    title: 'Roman to Integer',
    rating: 1350,
    difficulty: 'Easy',
    tags: ['Math', 'Strings'],
    description: `Given a roman numeral string \`s\`, convert it to an integer.
Symbols: \`I=1, V=5, X=10, L=50, C=100, D=500, M=1000\`.
Subtractive notation: \`IV=4, IX=9, XL=40, XC=90, CD=400, CM=900\`.`,
    functionName: 'romanToInt',
    params: ['s'],
    starterCode: `function romanToInt(s) {
  // Your code here
  
}`,
    typescriptStarter: `function romanToInt(s: string): number {
  // Your code here
  
}`,
    referenceSolution: `function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]];
    const next = map[s[i + 1]];
    if (next && curr < next) {
      total -= curr;
    } else {
      total += curr;
    }
  }
  return total;
}`,
    testCases: [
      { name: 'III = 3', args: ['III'], expected: 3 },
      { name: 'LVIII = 58', args: ['LVIII'], expected: 58 },
      { name: 'MCMXCIV = 1994', args: ['MCMXCIV'], expected: 1994 },
      { name: 'IV = 4', args: ['IV'], expected: 4, hidden: true },
      { name: 'XLIX = 49', args: ['XLIX'], expected: 49, hidden: true },
    ],
  },
  {
    id: 'p21_first_unique_char',
    title: 'First Unique Character',
    rating: 1400,
    difficulty: 'Easy',
    tags: ['Strings', 'Hash Map'],
    description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.`,
    functionName: 'firstUniqueChar',
    params: ['s'],
    starterCode: `function firstUniqueChar(s) {
  // Your code here
  
}`,
    typescriptStarter: `function firstUniqueChar(s: string): number {
  // Your code here
  
}`,
    referenceSolution: `function firstUniqueChar(s) {
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}`,
    testCases: [
      { name: 'leetcode -> index 0', args: ['leetcode'], expected: 0 },
      { name: 'loveleetcode -> index 2 (v)', args: ['loveleetcode'], expected: 2 },
      { name: 'aabb -> -1', args: ['aabb'], expected: -1 },
      { name: 'Single char', args: ['z'], expected: 0, hidden: true },
      { name: 'At the end', args: ['aabbc'], expected: 4, hidden: true },
    ],
  },
  {
    id: 'p22_binary_search',
    title: 'Binary Search',
    rating: 1450,
    difficulty: 'Easy',
    tags: ['Binary Search', 'Arrays'],
    description: `Given an array of integers \`nums\` sorted in ascending order and a target value \`target\`, write a function to search for \`target\` in \`nums\`.
If target exists, return its index. Otherwise, return \`-1\`. Your algorithm should run in \`O(log n)\` runtime complexity.`,
    functionName: 'binarySearch',
    params: ['nums', 'target'],
    starterCode: `function binarySearch(nums, target) {
  // Your code here
  
}`,
    typescriptStarter: `function binarySearch(nums: number[], target: number): number {
  // Your code here
  
}`,
    referenceSolution: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { name: 'Found in array', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { name: 'Not in array', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { name: 'Single found', args: [[5], 5], expected: 0 },
      { name: 'Single not found', args: [[5], 10], expected: -1, hidden: true },
      { name: 'First element', args: [[1, 3, 5, 7, 9], 1], expected: 0, hidden: true },
      { name: 'Last element', args: [[1, 3, 5, 7, 9], 9], expected: 4, hidden: true },
    ],
  },
  {
    id: 'p23_max_subarray',
    title: 'Maximum Subarray (Kadane)',
    rating: 1500,
    difficulty: 'Medium',
    tags: ['Arrays', 'Dynamic Programming'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    functionName: 'maxSubArray',
    params: ['nums'],
    starterCode: `function maxSubArray(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function maxSubArray(nums: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function maxSubArray(nums) {
  let currentMax = nums[0];
  let globalMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }
  return globalMax;
}`,
    testCases: [
      { name: 'Standard Kadane test', args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: 'Single element', args: [[1]], expected: 1 },
      { name: 'All positive', args: [[5, 4, -1, 7, 8]], expected: 23 },
      { name: 'All negative', args: [[-5, -2, -8, -1]], expected: -1, hidden: true },
      { name: 'Two negatives', args: [[-1, -2]], expected: -1, hidden: true },
    ],
  },
  {
    id: 'p24_climbing_stairs',
    title: 'Climbing Stairs',
    rating: 1550,
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'Math'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    functionName: 'climbStairs',
    params: ['n'],
    starterCode: `function climbStairs(n) {
  // Your code here
  
}`,
    typescriptStarter: `function climbStairs(n: number): number {
  // Your code here
  
}`,
    referenceSolution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    testCases: [
      { name: '2 steps', args: [2], expected: 2 },
      { name: '3 steps', args: [3], expected: 3 },
      { name: '4 steps', args: [4], expected: 5 },
      { name: '1 step', args: [1], expected: 1, hidden: true },
      { name: '6 steps', args: [6], expected: 13, hidden: true },
      { name: '10 steps', args: [10], expected: 89, hidden: true },
    ],
  },
  {
    id: 'p25_intersection',
    title: 'Intersection of Two Arrays',
    rating: 1600,
    difficulty: 'Medium',
    tags: ['Arrays', 'Hash Map'],
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must be unique and may be returned in any order.`,
    functionName: 'intersection',
    params: ['nums1', 'nums2'],
    starterCode: `function intersection(nums1, nums2) {
  // Your code here
  
}`,
    typescriptStarter: `function intersection(nums1: number[], nums2: number[]): number[] {
  // Your code here
  
}`,
    referenceSolution: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();
  for (const n of nums2) {
    if (set1.has(n)) result.add(n);
  }
  return [...result];
}`,
    testCases: [
      { name: 'Common elements', args: [[1, 2, 2, 1], [2, 2]], expected: [2], unordered: true },
      { name: 'Multiple common elements', args: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [9, 4], unordered: true },
      { name: 'No overlap', args: [[1, 2, 3], [4, 5, 6]], expected: [], unordered: true },
      { name: 'One empty', args: [[], [1, 2]], expected: [], unordered: true, hidden: true },
    ],
  },
  {
    id: 'p26_move_zeroes',
    title: 'Move Zeroes',
    rating: 1650,
    difficulty: 'Medium',
    tags: ['Arrays', 'Two Pointers'],
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements. Return the modified array.`,
    functionName: 'moveZeroes',
    params: ['nums'],
    starterCode: `function moveZeroes(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function moveZeroes(nums: number[]): number[] {
  // Your code here
  
}`,
    referenceSolution: `function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
  return nums;
}`,
    testCases: [
      { name: 'Mixed array', args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { name: 'Single zero', args: [[0]], expected: [0] },
      { name: 'Already zero at end', args: [[1, 2, 0, 0]], expected: [1, 2, 0, 0] },
      { name: 'No zeroes', args: [[4, 5, 6]], expected: [4, 5, 6], hidden: true },
      { name: 'All zeroes', args: [[0, 0, 0]], expected: [0, 0, 0], hidden: true },
    ],
  },
  {
    id: 'p27_product_except_self',
    title: 'Product of Array Except Self',
    rating: 1700,
    difficulty: 'Medium',
    tags: ['Arrays', 'Prefix Sum'],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.
You must solve it in \`O(n)\` without using the division operation.`,
    functionName: 'productExceptSelf',
    params: ['nums'],
    starterCode: `function productExceptSelf(nums) {
  // Your code here
  
}`,
    typescriptStarter: `function productExceptSelf(nums: number[]): number[] {
  // Your code here
  
}`,
    referenceSolution: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    res[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }
  return res;
}`,
    testCases: [
      { name: 'Standard product', args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { name: 'Contains a zero', args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { name: 'Two elements', args: [[2, 5]], expected: [5, 2] },
      { name: 'Multiple zeroes', args: [[0, 4, 0]], expected: [0, 0, 0], hidden: true },
    ],
  },
  {
    id: 'p28_longest_substring',
    title: 'Longest Substring Without Repeating',
    rating: 1750,
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Map', 'Strings'],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    functionName: 'lengthOfLongestSubstring',
    params: ['s'],
    starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
  
}`,
    typescriptStarter: `function lengthOfLongestSubstring(s: string): number {
  // Your code here
  
}`,
    referenceSolution: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0;
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (map.has(char) && map.get(char) >= start) {
      start = map.get(char) + 1;
    }
    map.set(char, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    testCases: [
      { name: 'abcabcbb -> 3 ("abc")', args: ['abcabcbb'], expected: 3 },
      { name: 'bbbbb -> 1 ("b")', args: ['bbbbb'], expected: 1 },
      { name: 'pwwkew -> 3 ("wke")', args: ['pwwkew'], expected: 3 },
      { name: 'Empty string', args: [''], expected: 0, hidden: true },
      { name: 'All unique', args: ['abcdef'], expected: 6, hidden: true },
      { name: 'Space inside', args: ['a b c'], expected: 3, hidden: true },
    ],
  },
  {
    id: 'p29_group_anagrams',
    title: 'Group Anagrams',
    rating: 1850,
    difficulty: 'Medium',
    tags: ['Hash Map', 'Sorting', 'Arrays'],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order, and each group's items can be in any order.`,
    functionName: 'groupAnagrams',
    params: ['strs'],
    starterCode: `function groupAnagrams(strs) {
  // Your code here
  
}`,
    typescriptStarter: `function groupAnagrams(strs: string[]): string[][] {
  // Your code here
  
}`,
    referenceSolution: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values()).map(group => group.sort());
}`,
    testCases: [
      {
        name: 'Standard anagram groups',
        args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
        expected: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']],
        unordered: true,
      },
      { name: 'Single empty string', args: [['']], expected: [['']], unordered: true },
      { name: 'Single letter', args: [['a']], expected: [['a']], unordered: true },
      {
        name: 'All anagrams',
        args: [['ab', 'ba']],
        expected: [['ab', 'ba']],
        unordered: true,
        hidden: true,
      },
    ],
  },
  {
    id: 'p30_trap_rain_water',
    title: 'Trap Rain Water (Rush Boss)',
    rating: 2000,
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Dynamic Programming', 'Stack'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    functionName: 'trap',
    params: ['height'],
    starterCode: `function trap(height) {
  // Your code here
  
}`,
    typescriptStarter: `function trap(height: number[]): number {
  // Your code here
  
}`,
    referenceSolution: `function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }
  return totalWater;
}`,
    testCases: [
      { name: 'Classic elevation map', args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { name: 'Larger basin', args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { name: 'Flat plane', args: [[1, 1, 1, 1]], expected: 0 },
      { name: 'V-shaped valley', args: [[3, 0, 3]], expected: 3, hidden: true },
      { name: 'Decreasing heights', args: [[4, 3, 2, 1]], expected: 0, hidden: true },
    ],
  },
];
