# Core Patterns & Learnings

This file tracks important patterns, techniques, and "Aha!" moments from your DSA journey.

## Two Pointers Pattern

**When to use:** Sorted arrays, finding pairs, removing duplicates

**Example Problems:**
- Two Sum (sorted array version)
- Remove Duplicates from Sorted Array
- Container With Most Water

**Key Insight:** 
> Using two pointers from opposite ends can reduce O(n²) brute force to O(n)

---

## Sliding Window Pattern

**When to use:** Subarray/substring problems, max/min of contiguous elements

**Example Problems:**
- Maximum Sum Subarray of Size K
- Longest Substring Without Repeating Characters

**Key Insight:**
> Instead of recalculating the entire window, slide it by removing left and adding right

---

## Hash Map for O(1) Lookup

**When to use:** Finding complements, counting frequency, detecting duplicates

**Example Problems:**
- Two Sum
- Group Anagrams
- First Unique Character

**Key Insight:**
> Trading space for time - Map gives O(1) lookup vs O(n) array search

---

## Fast & Slow Pointers (Floyd's Cycle Detection)

**When to use:** Linked list cycles, finding middle element

**Example Problems:**
- Linked List Cycle
- Find Middle of Linked List
- Happy Number

**Key Insight:**
> If there's a cycle, fast pointer will eventually meet slow pointer

---

## Weekly Reflections

### Week 1 (Add Date)
- **Problems Solved:** 
- **Main Focus:** 
- **Breakthrough Moment:** 
- **Struggled With:** 

---

## JavaScript-Specific Tips

### Array Methods Performance
```javascript
// ❌ Slow - O(n) for each operation
array.shift()   // Removes first element
array.unshift() // Adds to beginning

// ✅ Fast - O(1)
array.push()    // Adds to end
array.pop()     // Removes from end
```

### When to use Map vs Object
```javascript
// Use Map when:
// - Keys are not strings
// - Need to iterate in insertion order
// - Need size property

// Use Object when:
// - Keys are strings
// - Need JSON serialization
// - Simple key-value storage
```

### Set for Uniqueness
```javascript
// Quick deduplication
const unique = [...new Set(array)];

// Check existence in O(1)
const set = new Set([1, 2, 3]);
set.has(2); // true
```

---

## Resources

- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [JavaScript Algorithm Visualizations](https://visualgo.net/)
- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/)

---

*Update this file weekly with new patterns and insights!*
