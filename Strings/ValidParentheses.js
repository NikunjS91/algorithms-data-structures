/**
 * @problem Valid Parentheses
 * @difficulty Easy
 * @topic Strings
 * @date 2026-04-07
 * @url https://leetcode.com/problems/valid-parentheses/
 */

/**
 * Given a string containing just '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * 
 * Brackets must close in the correct order.
 * 
 * Time Complexity: O(n) - Single pass through string
 * Space Complexity: O(n) - Stack storage in worst case
 */
function isValid(s) {
  const stack = [];
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let char of s) {
    // If opening bracket, push to stack
    if (pairs[char]) {
      stack.push(char);
    } else {
      // If closing bracket, check if it matches
      const last = stack.pop();
      if (pairs[last] !== char) {
        return false;
      }
    }
  }
  
  // Stack should be empty if all brackets matched
  return stack.length === 0;
}

// Test cases
console.log(isValid("()"));        // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));      // false
console.log(isValid("{[]}"));      // true

module.exports = isValid;
