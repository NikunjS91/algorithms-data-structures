/**
 * @problem Two Sum
 * @difficulty Easy
 * @topic Arrays
 * @date 2026-04-07
 * @url https://leetcode.com/problems/two-sum/
 */

/**
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 * 
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: nums[0] + nums[1] = 2 + 7 = 9
 * 
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(n) - HashMap storage
 * 
 * Approach: Hash Map for O(1) Lookup
 * - Store each number and its index in a Map
 * - For each number, check if (target - number) exists in Map
 * - If found, return both indices
 */
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9));  // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));       // Expected: [1, 2]
console.log(twoSum([3, 3], 6));          // Expected: [0, 1]

module.exports = twoSum;
