# Problem Solution Template

Use this template when creating new problem solutions. Copy the metadata header to the top of your `.js` file.

## Metadata Format

```javascript
/**
 * @problem Problem Name Here
 * @difficulty Easy | Medium | Hard
 * @topic Arrays | Strings | LinkedLists | Trees | Graphs | DynamicProgramming | Sorting
 * @date YYYY-MM-DD
 * @url https://leetcode.com/problems/problem-slug/
 */

// Your solution code here
function solutionName() {
  // Implementation
}
```

## Example: Two Sum

```javascript
/**
 * @problem Two Sum
 * @difficulty Easy
 * @topic Arrays
 * @date 2026-04-07
 * @url https://leetcode.com/problems/two-sum/
 */

/**
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers that add up to target.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
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
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
```

## Field Descriptions

- **@problem**: The exact name of the problem (e.g., "Two Sum", "Reverse Linked List")
- **@difficulty**: Choose from: Easy, Medium, or Hard
- **@topic**: The topic folder where this file lives (must match folder name)
- **@date**: Date you solved it (YYYY-MM-DD format)
- **@url**: (Optional) Link to the problem on LeetCode, HackerRank, etc.

## Tips

1. **Always include the metadata header** - This is what the automation script reads
2. **Match @topic to folder name** - Use exact folder names (Arrays, LinkedLists, not "Linked Lists")
3. **Use today's date** - The script uses this for streak calculation
4. **Add comments** - Explain your approach, time/space complexity
5. **Include test cases** - Shows your solution works

## After Adding a Problem

Run the updater to refresh your README:

```bash
npm run update-readme
```

Or just push to GitHub - the action will run automatically!
