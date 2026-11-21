// Expanded DSA and advanced engineering curriculum.
// The question banks below are learning material, not predictions of an exact interview.
const currentDSAReport = 'https://prachub.com/resources/most-common-coding-interview-patterns-by-company-analysis-of-prachub-data';
const databricksPrep = 'https://www.databricks.com/sites/default/files/2025-04/engineering-careers-site-interview-prep-april-2025-002.pdf';
const openaiEvalsRef = 'https://platform.openai.com/docs/guides/evals';
const openaiRealtime = 'https://platform.openai.com/docs/guides/realtime';
const openaiRateLimits = 'https://platform.openai.com/docs/guides/rate-limits';
const k8sAutoscaling = 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/';
const terraformState = 'https://developer.hashicorp.com/terraform/language/state';
const postgresLocks = 'https://www.postgresql.org/docs/current/explicit-locking.html';
const postgresPartitioning = 'https://www.postgresql.org/docs/current/ddl-partitioning.html';
const springSecurity = 'https://docs.spring.io/spring-security/reference/servlet/architecture.html';
const javaGC = 'https://docs.oracle.com/en/java/javase/25/gctuning/';
const java26Language = 'https://docs.oracle.com/en/java/javase/26/language/java-language-changes-summary.html';
const java26VirtualThreads = 'https://docs.oracle.com/en/java/javase/26/core/virtual-threads.html';
const java26ScopedValues = 'https://docs.oracle.com/en/java/javase/26/core/scoped-values.html';
const java26StructuredConcurrency = 'https://docs.oracle.com/en/java/javase/26/core/structured-concurrency.html';
const javaFFM = 'https://docs.oracle.com/en/java/javase/25/core/foreign-function-and-memory-api.html';

const lesson = (id, title, level, shortDesc, detailed, example, explanation, keyPoints, sources = []) => ({
  id, title, level, shortDesc, detailed,
  examples: [{ title: 'Worked interview example', type: 'code', language: 'java', code: example, explanation }],
  keyPoints, sources
});

export const dsaTopics = [
  {
    id: 'dsa-start-here', name: 'Start Here: Problem Solving & Complexity', icon: '🧭', concepts: [
      lesson('dsa-interview-workflow', 'A repeatable coding interview workflow', 'fresher',
        'Clarify the contract, work a small example, choose an approach, state complexity, implement, and test edge cases.',
        `**Definition**\nA coding interview evaluates how you reason and communicate as well as whether your code works. Treat the prompt as a specification to clarify, not a puzzle to guess.\n\n**A useful sequence**\n1. Restate inputs, outputs, constraints, and error behavior.\n2. Ask about duplicates, ordering, empty input, and limits.\n3. Work a small example and a boundary case.\n4. Describe a simple solution, then optimize if constraints require it.\n5. Implement in small steps, test, and state time/space cost.`,
        `Input: [2, 7, 11, 15], target 9\nClarify: exactly one answer? can values repeat?\nPlan: map each value to its index; for x, check target - x.\nTest: empty input, duplicate [3,3], no pair.`,
        'The candidate confirms the contract first, explains why a hash map improves the nested-loop search, and verifies the duplicate case before finishing.',
        ['Say assumptions before coding.', 'Name the invariant or reason the approach works.', 'Explain Big O in terms of input size.', 'Reserve time to run edge cases aloud.'], [{ title: 'Databricks Engineering Interview Preparation', url: databricksPrep }]),
      lesson('dsa-2026-interview-patterns', 'What current coding interviews emphasize', 'junior',
        'Recent candidate-question analyses still show classic DSA, alongside more practical stateful coding, parsing, and simulation tasks.',
        `**A useful signal, not a guarantee**\nA 2026 analysis of 2,818 company-tagged coding records found stateful implementation/simulation was the largest identifiable category in that dataset, followed by strings/parsing, trees/graphs, and arrays/hashing. It explicitly warns that this is a question-bank sample, not a randomized survey of every employer.\n\nAnother 2026 candidate-report analysis includes practical class design, BFS, trees, arrays/hash maps, intervals, and a long tail of DP, binary search, tries, and union-find. The lesson is to build a broad foundation and practice small APIs that evolve through follow-ups—not to predict one company’s exact next question.`,
        `// Core practice: arrays + hashing, strings + parsing, trees + graphs\n// Add: intervals, stacks/queues, heaps, DP, binary search\n// Practice: stateful APIs, caches, schedulers, and operation sequences`,
        'These datasets are useful for prioritizing practice, but samples and taxonomies differ. Use them as curriculum evidence, not interview odds.',
        ['Keep arrays/hash maps, strings, trees, and graphs in the core rotation.', 'Practice practical stateful coding and parsing as well as algorithm puzzles.', 'Company and level change the topic mix.', 'Use report samples as directional evidence, not a promise.'], [{ title: 'PracHub: 2,818 coding-record pattern analysis', url: currentDSAReport }, { title: 'AceOffer: 2026 candidate-report topic analysis', url: 'https://aceoffer.app/learn/coding-interview-topics' }]),
      lesson('dsa-roadmap', 'A 12-week path from fundamentals to interviews', 'fresher',
        'Follow the topic sections in order, then mix them in timed practice and revisit weak patterns.',
        `**Weeks 1–2: foundations** — Big O, Java collections, arrays, strings, hashing, and clean implementation.\n**Weeks 3–4: linear patterns** — two pointers, sliding window, prefix sums, linked lists, stacks, queues, and monotonic stacks.\n**Weeks 5–6: search and ordering** — binary search boundaries, answer search, sorting, heaps, and intervals.\n**Weeks 7–8: trees and graphs** — DFS/BFS, BSTs, tries, topological sort, union-find, and shortest paths.\n**Weeks 9–10: optimization** — recursion, backtracking, greedy reasoning, and common dynamic-programming states.\n**Week 11: advanced and practical coding** — bit operations, range queries, parsing, caches, stateful APIs, and simulation.\n**Week 12: interview loops** — mixed timed problems, mock explanations, debugging, and targeted review.\n\nSolve a few carefully chosen problems per pattern. After solving, explain why the approach works and write one variant without looking at notes.`,
        `// Weekly loop\n// Learn one pattern → solve 3–5 varied problems → explain complexity\n// Re-solve missed problems after 2 days and 1 week\n// Every week: one mixed timed session + one mock explanation`,
        'The plan spirals topics back into mixed sessions so recognition becomes flexible rather than tied to one chapter.',
        ['Use this as a 12-week template; adjust to your available time.', 'Prefer deliberate practice and review to problem-count grinding.', 'Keep an error log: missed pattern, edge case, or implementation bug.', 'Finish each week with a mixed session.'], [{ title: 'Databricks Engineering Interview Preparation', url: databricksPrep }]),
      lesson('dsa-big-o', 'Time and space complexity (Big O)', 'fresher',
        'Big O describes how resource use grows as input size grows; it helps compare approaches under scale.',
        `**Definition**\nFor input size n, O(1) is constant work, O(log n) often halves a search range, O(n) scans items, O(n log n) is common for efficient comparison sorting, and O(n²) compares pairs. Big O ignores constants and lower-order terms but does not replace real measurement.\n\n**State both costs**\nMention auxiliary memory and output memory separately when the distinction matters. An algorithm can have linear time and linear extra storage, or use the input array in place.`,
        `for (int i = 0; i < n; i++) {       // O(n)\n    for (int j = i + 1; j < n; j++) { // O(n²) total pairs\n        compare(i, j);\n    }\n}`, 'The inner work is not n for every outer loop, but the total pair count is n(n-1)/2, which is O(n²).',
        ['Describe worst-case unless asked otherwise.', 'Nested loops are not automatically quadratic if the inner pointer only moves forward.', 'Include extra space and recursion stack.', 'For multiple input sizes use O(n + m), not O(n).']),
      lesson('dsa-invariants', 'Correctness with invariants and edge cases', 'junior',
        'An invariant is a condition that remains true as an algorithm runs; it gives a compact way to justify correctness.',
        `**Definition**\nA loop invariant explains what is true before and after every iteration. Prove initialization, preservation, and termination. For a two-pointer search, the invariant may say that every pair already ruled out cannot be a solution.\n\n**Test design**\nBuild tests from the contract: smallest valid input, empty input if allowed, repeated values, already sorted/reversed data, overflow boundaries, and a case that triggers the main branch.`,
        `Binary search invariant: if target exists, it remains inside [lo, hi).\nAfter each step, discard only a region proven unable to contain target.\nStop when lo == hi; the remaining range is empty.`,
        'The half-open interval avoids off-by-one ambiguity: its length is hi - lo, and an empty interval occurs at lo == hi.',
        ['Write the invariant in plain language.', 'Check interval boundaries and integer overflow.', 'Include a test for every branch and failure mode.', 'Do not claim correctness from a few passing examples.'])
    ]
  },
  {
    id: 'dsa-arrays-strings', name: 'Arrays, Strings & Two Pointers', icon: '🧱', concepts: [
      lesson('dsa-prefix-sum', 'Prefix sums and subarray queries', 'fresher',
        'A prefix sum stores cumulative totals so a range sum can be answered with one subtraction.',
        `**Definition**\nLet prefix[i] be the sum of the first i values. Then the sum of the half-open range [left, right) is prefix[right] - prefix[left]. This moves repeated range queries from O(n) each to O(1) after O(n) preprocessing.\n\nFor counting subarrays with a target sum, store how often each prefix value has appeared. At current sum s, earlier prefix s-target identifies matching subarrays.`,
        `int[] prefix = new int[a.length + 1];\nfor (int i = 0; i < a.length; i++) prefix[i + 1] = prefix[i] + a[i];\nint rangeSum = prefix[right] - prefix[left];`,
        'The leading zero makes range boundaries uniform. Use long when the maximum possible sum can exceed int.',
        ['Prefix arrays often use n + 1 cells.', 'For target-subarray counts, add the current prefix only after counting matches.', 'Negative values invalidate sliding-window sum assumptions but prefix sums still work.', 'Check integer overflow.']),
      lesson('dsa-two-pointers', 'Two pointers on sorted data', 'fresher',
        'Two pointers scan from different positions and discard impossible candidates using a monotonic property.',
        `**Definition**\nTwo pointers reduce repeated search when moving one pointer makes a candidate range smaller or larger in a predictable way. On a sorted array, if the sum is too small, moving the left pointer right increases it; if too large, moving the right pointer left decreases it.\n\nAlways state why the discarded candidates cannot contain a valid answer.`,
        `int left = 0, right = a.length - 1;\nwhile (left < right) {\n    int sum = a[left] + a[right];\n    if (sum == target) return true;\n    if (sum < target) left++; else right--;\n}`, 'Sorting supplies the monotonic property that makes each pointer move safe. If original indices matter, keep them before sorting.',
        ['Know whether sorting changes required output indices.', 'Each pointer should move only in a direction that rules out candidates.', 'The scan is O(n) after sorting; sorting may cost O(n log n).']),
      lesson('dsa-sliding-window', 'Sliding window: fixed and variable size', 'junior',
        'A sliding window maintains information for a contiguous range while moving its boundaries once through the input.',
        `**When it fits**\nUse a window for contiguous subarrays or substrings. Fixed-size windows add the incoming item and remove the outgoing item. Variable-size windows expand and shrink when a condition is monotonic, such as the number of distinct characters exceeding a limit.\n\nA classic pitfall: a sum-based shrink rule usually assumes non-negative values. With negative values, use a different technique such as prefix sums plus a deque.`,
        `int left = 0;\nfor (int right = 0; right < s.length(); right++) {\n    add(s.charAt(right));\n    while (windowInvalid()) remove(s.charAt(left++));\n    best = Math.max(best, right - left + 1);\n}`, 'Each character enters and leaves at most once, so the scan is O(n), even though a while loop is nested inside the for loop.',
        ['The target range must be contiguous.', 'Prove that shrinking can restore validity without missing an answer.', 'Count each pointer movement for the O(n) proof.', 'Handle empty strings and duplicate characters.']),
      lesson('dsa-string-frequency', 'String frequency maps and anagrams', 'junior',
        'Frequency counting maps symbols to counts; equal frequency vectors identify anagrams when the character set is handled correctly.',
        `**Definition**\nTwo strings are anagrams when they contain the same multiset of characters. For a known small alphabet, an integer array is faster and simpler than a map. For arbitrary Unicode text, define normalization and code point behavior first.\n\nThis same idea supports grouping words, checking permutations, and detecting repeated patterns.`,
        `int[] count = new int[26];\nfor (char c : word.toCharArray()) count[c - 'a']++;\nfor (char c : other.toCharArray()) count[c - 'a']--;\nboolean same = Arrays.stream(count).allMatch(n -> n == 0);`,
        'This example assumes lowercase English letters. The input contract must justify that assumption.',
        ['Choose array vs map based on alphabet constraints.', 'Normalize case or Unicode only if the product definition requires it.', 'Time is O(n + m); the fixed alphabet uses O(1) extra space.', 'Test empty strings, repeated letters, and differing lengths.'])
    ]
  },
  {
    id: 'dsa-hashing-linear-structures', name: 'Hashing, Linked Lists, Stacks & Queues', icon: '🧰', concepts: [
      lesson('dsa-hashmap-pattern', 'Hash maps: lookup, counting, and complements', 'fresher',
        'A hash map turns repeated membership or key lookup into expected constant-time operations by storing computed keys.',
        `**Definition**\nA hash function maps a key to a bucket. Collisions are resolved internally; the expected lookup is O(1), while pathological cases can be slower. Hash maps are useful for complements, frequencies, grouping, and visited-state tracking.\n\nWhen a problem needs original positions, store the index as the value. Decide whether the current item should be inserted before or after looking up its partner.`,
        `Map<Integer, Integer> seen = new HashMap<>();\nfor (int i = 0; i < a.length; i++) {\n    int need = target - a[i];\n    if (seen.containsKey(need)) return new int[]{seen.get(need), i};\n    seen.put(a[i], i);\n}`, 'Lookup occurs before insert so an element cannot pair with itself. Duplicate values still work because a later copy can find the earlier index.',
        ['Expected O(n) time and O(n) extra space for a one-pass pair search.', 'State how duplicates should be treated.', 'Use the right map operation; avoid accidental overwrite when grouping.', 'Hashing trades memory for fewer repeated scans.']),
      lesson('dsa-linked-list', 'Linked-list reversal and pointer safety', 'junior',
        'A linked list stores nodes connected by references; pointer updates must preserve the unvisited suffix.',
        `**Definition**\nA singly linked list node points to the next node. Reversal changes each next reference. Save the next node before rewiring, or the remainder of the list becomes unreachable.\n\nIterative reversal uses O(1) extra space. Recursive reversal uses call-stack space and can overflow for a very long list.`,
        `ListNode prev = null, current = head;\nwhile (current != null) {\n    ListNode next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n}\nreturn prev;`, 'The three references have clear roles: prev is the reversed prefix, current is the node being handled, and next preserves the suffix.',
        ['Save next before changing current.next.', 'Empty and one-node lists should work without special cases.', 'Time O(n), extra space O(1).', 'Draw 3–4 nodes before coding pointer changes.']),
      lesson('dsa-monotonic-stack', 'Monotonic stacks and next-greater queries', 'mid',
        'A monotonic stack maintains an increasing or decreasing candidate sequence to answer nearest-greater/smaller questions in linear time.',
        `**Definition**\nStore unresolved indices on a stack. When a new value resolves previous candidates, pop them and record the answer. Each index is pushed once and popped once, so total work is O(n).\n\nUse indices rather than values when distances or output positions matter. Decide carefully whether equal values should remain on the stack.`,
        `int[] nextGreater = new int[a.length];\nArrays.fill(nextGreater, -1);\nDeque<Integer> stack = new ArrayDeque<>();\nfor (int i = 0; i < a.length; i++) {\n    while (!stack.isEmpty() && a[stack.peek()] < a[i]) nextGreater[stack.pop()] = a[i];\n    stack.push(i);\n}`, 'The stack holds indices whose next greater value has not yet appeared. The strict comparison means equal values do not resolve one another.',
        ['Identify the nearest previous or next greater/smaller relation.', 'Use indices for distances and circular-array variants.', 'Choose < vs <= based on duplicate semantics.', 'Amortized time is O(n), not O(n²).'])
    ]
  },
  {
    id: 'dsa-search-sort', name: 'Binary Search, Sorting & Selection', icon: '🔍', concepts: [
      lesson('dsa-binary-boundary', 'Lower bound and boundary-safe binary search', 'junior',
        'Lower bound finds the first position whose value is at least the target in sorted data.',
        `**Definition**\nA lower bound returns an insertion position in [0, n]. Use a half-open search range [lo, hi): it is empty when lo == hi, and mid is always inside the current range when non-empty.\n\nThis pattern handles duplicates and answers “first true” questions on a monotonic predicate.`,
        `int lo = 0, hi = a.length;\nwhile (lo < hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid;\n}\nreturn lo;`, 'If a[mid] is too small, every position through mid is too small; otherwise mid may still be the first valid answer.',
        ['Use lo + (hi - lo) / 2 to avoid overflow.', 'State the range invariant and loop exit meaning.', 'Return n when every element is less than target.', 'Test duplicates, before-first, after-last, and empty arrays.']),
      lesson('dsa-binary-answer', 'Binary search on the answer', 'mid',
        'When feasibility changes monotonically with a numeric answer, binary search can find the smallest or largest feasible value.',
        `**Recognition**\nThe prompt asks to minimize a maximum or maximize a minimum. Define a predicate feasible(x) and prove it flips only once. Then binary search the first true or last true value.\n\nThe difficult part is often a correct feasibility check, not the binary-search loop. Pick bounds from the input and explain why they contain the optimum.`,
        `// Minimize the maximum load per day.\nboolean feasible(long capacity) {\n    int days = 1; long load = 0;\n    for (int weight : weights) {\n        if (load + weight > capacity) { days++; load = 0; }\n        load += weight;\n    }\n    return days <= limit;\n}`, 'As capacity increases, the number of days needed cannot increase. This monotonicity makes the first feasible capacity searchable.',
        ['Define and test the feasibility predicate independently.', 'Prove monotonicity.', 'Use long if sums can overflow int.', 'Check whether the answer is first true or last true.']),
      lesson('dsa-merge-sort', 'Merge sort and divide-and-conquer', 'junior',
        'Divide-and-conquer splits a problem, solves smaller instances, and combines their results.',
        `**Definition**\nMerge sort splits an array in half until singleton ranges, then merges sorted halves. Its time is O(n log n) in all cases and its auxiliary array is O(n).\n\nThe merge step is also a building block for counting inversions or combining sorted event streams. State whether stability matters and how equal keys are handled.`,
        `while (i < mid && j < right) {\n    if (a[i] <= a[j]) temp[k++] = a[i++];\n    else temp[k++] = a[j++];\n}\n// copy any remaining values from either half`,
        'Choosing the left element on equality preserves the original order of equal keys, making the merge stable.',
        ['Recurrence: T(n)=2T(n/2)+O(n)=O(n log n).', 'The merge is linear in the combined range.', 'Use a reusable temp buffer to avoid repeated allocations.', 'Know the extra-space trade-off vs in-place sorts.']),
      lesson('dsa-quickselect', 'Quickselect for the kth element', 'senior',
        'Quickselect partitions around a pivot and continues only in the side containing the requested rank.',
        `**Definition**\nSelection asks for the kth smallest/largest value without fully sorting. Quickselect has expected O(n) time with randomized pivots and O(n²) worst case.\n\nClarify whether k is zero-based, one-based, smallest, or largest. For predictable worst-case behavior, consider a heap or a deterministic selection algorithm if constraints demand it.`,
        `int target = k;\nint pivotIndex = partition(values, left, right);\nif (pivotIndex == target) return values[pivotIndex];\nif (pivotIndex < target) left = pivotIndex + 1;\nelse right = pivotIndex - 1;`, 'Partition places the pivot in its final sorted position, so only one side can contain the target rank.',
        ['Expected O(n), worst O(n²) for basic Quickselect.', 'Randomize pivots to reduce adversarial behavior.', 'Be precise about rank convention.', 'A size-k heap is often easier for streaming input.'])
    ]
  },
  {
    id: 'dsa-trees-heaps-tries', name: 'Trees, Heaps & Tries', icon: '🌳', concepts: [
      lesson('dsa-tree-traversal', 'Tree DFS, BFS, and recursion contracts', 'fresher',
        'DFS explores a branch deeply; BFS explores nodes by distance using a queue.',
        `**Definition**\nA tree traversal visits nodes according to a rule. Preorder is node-left-right, inorder is left-node-right, and postorder is left-right-node. BFS uses a queue and is useful for level order or minimum edge distance in an unweighted tree.\n\nBefore writing recursion, define the function contract: what does it return for one subtree?`,
        `int height(TreeNode node) {\n    if (node == null) return 0;\n    return 1 + Math.max(height(node.left), height(node.right));\n}`, 'The recursive contract is “return the height of this subtree.” The null base case has height zero, so a leaf returns one.',
        ['Name the traversal and why it fits.', 'Write the base case first.', 'DFS recursion uses O(h) stack; BFS may use O(w) queue.', 'An unbalanced tree can have height n.']),
      lesson('dsa-bst-lca', 'BST invariants and lowest common ancestor', 'junior',
        'A binary search tree orders keys so left descendants are smaller and right descendants larger; this enables directed search.',
        `**Definition**\nFor a valid BST, every key in a node's left subtree is smaller and every key in its right subtree is larger, subject to a consistent duplicate policy. The lowest common ancestor is the deepest node that is an ancestor of both targets.\n\nIn a BST, if both targets are smaller, move left; if both are larger, move right; otherwise the current node is the split point.`,
        `while (node != null) {\n    if (p.val < node.val && q.val < node.val) node = node.left;\n    else if (p.val > node.val && q.val > node.val) node = node.right;\n    else return node;\n}`, 'The first node where the target paths diverge is the lowest shared ancestor. The search is O(h), which is O(log n) only for a balanced tree.',
        ['Do not assume a BST is balanced.', 'Clarify whether target nodes are guaranteed to exist.', 'A general binary tree needs a different LCA algorithm.', 'Duplicates require a defined ordering rule.']),
      lesson('dsa-heap-topk', 'Heaps and top-k selection', 'junior',
        'A heap exposes the smallest or largest element efficiently while keeping the rest only partially ordered.',
        `**Definition**\nA binary heap supports peek in O(1), insertion and removal in O(log n). To keep the largest k values while scanning n inputs, keep a min-heap of size k; its root is the smallest retained value.\n\nA heap is not a sorted array: iteration does not produce sorted order.`,
        `PriorityQueue<Integer> top = new PriorityQueue<>();\nfor (int x : values) {\n    top.offer(x);\n    if (top.size() > k) top.poll();\n}\n// top contains the k largest values; poll to retrieve ascending`, 'The smallest retained item is evicted whenever size exceeds k. Complexity is O(n log k) time and O(k) space.',
        ['Choose min-heap vs max-heap based on what should be evicted.', 'State tie behavior when ordering objects.', 'Use a heap for streaming or repeated best-next extraction.', 'Sort the final k results if order is required.']),
      lesson('dsa-trie', 'Trie for prefix search and autocomplete', 'mid',
        'A trie stores strings by shared prefixes, enabling prefix lookup in time proportional to the query length.',
        `**Definition**\nEach edge represents a character and each node can mark the end of a word. Insert and exact/prefix search are O(L) for string length L, while memory depends on the number of distinct prefixes.\n\nUse a trie for prefix queries, dictionary matching, and autocomplete. For large alphabets or sparse nodes, a map of child edges saves memory over a fixed-size child array.`,
        `class TrieNode { Map<Character, TrieNode> next = new HashMap<>(); boolean terminal; }\n// Walk one child per character; terminal distinguishes word from prefix.`,
        'The terminal flag is necessary because "app" and "apple" share a path but are different complete words.',
        ['Prefix search is O(L); memory can be large.', 'Separate “path exists” from “word ends here.”', 'Choose array vs map based on alphabet and memory.', 'Autocomplete ranking needs extra per-node or global state.'])
    ]
  },
  {
    id: 'dsa-graphs', name: 'Graphs: Traversal, Dependencies & Paths', icon: '🕸️', concepts: [
      lesson('dsa-graph-representation', 'Graph representation and BFS/DFS', 'junior',
        'A graph models entities and their relationships; adjacency lists are usually efficient for sparse graphs.',
        `**Definition**\nRepresent vertices and edges as an adjacency list, matrix, or edge list. BFS finds shortest path length in an unweighted graph. DFS is useful for reachability, components, and cycle exploration.\n\nMark a node visited when it is enqueued (BFS) or immediately before exploring it (DFS) so it is not repeatedly added. For disconnected graphs, start a traversal from every unvisited vertex.`,
        `Queue<Integer> q = new ArrayDeque<>();\nboolean[] seen = new boolean[n];\nq.add(source); seen[source] = true;\nwhile (!q.isEmpty()) {\n    int u = q.remove();\n    for (int v : graph[u]) if (!seen[v]) { seen[v] = true; q.add(v); }\n}`, 'An adjacency-list BFS runs in O(V + E). Marking at enqueue prevents duplicate queue entries.',
        ['Use an adjacency list for sparse graphs.', 'BFS gives shortest edge-count paths only when edges are unweighted/equal cost.', 'Handle disconnected components.', 'Choose visited timing deliberately.']),
      lesson('dsa-topological-sort', 'Topological ordering and cycle detection', 'mid',
        'A topological order lists every prerequisite before the item that depends on it; it exists only for a directed acyclic graph.',
        `**Kahn’s algorithm**\nCompute each node’s indegree, enqueue all zero-indegree nodes, then repeatedly remove one and decrement its neighbors. If fewer than V nodes are emitted, a cycle remains. The algorithm is O(V + E).\n\nThe order may not be unique. If the question asks for the lexicographically smallest valid order, use a priority queue instead of a FIFO queue.`,
        `Queue<Integer> ready = new ArrayDeque<>();\nfor (int v = 0; v < n; v++) if (indegree[v] == 0) ready.add(v);\nwhile (!ready.isEmpty()) {\n    int u = ready.remove(); order.add(u);\n    for (int v : graph[u]) if (--indegree[v] == 0) ready.add(v);\n}\nboolean hasCycle = order.size() != n;`, 'A cycle prevents all vertices from reaching indegree zero, which makes cycle detection explicit.',
        ['Model prerequisite edges in the correct direction.', 'Cycle exists if output contains fewer than V nodes.', 'Multiple valid orders are common.', 'Use DFS coloring as an alternative.']),
      lesson('dsa-union-find', 'Union-find for connected components', 'mid',
        'Disjoint-set union tracks components as undirected connections are added.',
        `**Definition**\nfind(x) returns a representative for x's component; union(a,b) merges two components. Path compression and union by size/rank make operations nearly constant amortized time.\n\nUnion-find is ideal for incremental connectivity and Kruskal’s minimum spanning tree. It is not a general shortest-path structure and does not handle arbitrary edge deletions efficiently.`,
        `int find(int x) {\n    if (parent[x] != x) parent[x] = find(parent[x]);\n    return parent[x];\n}\nvoid union(int a, int b) {\n    int ra = find(a), rb = find(b);\n    if (ra != rb) parent[rb] = ra;\n}`, 'Path compression shortens future finds. A production implementation should also track size/rank and component count.',
        ['Use for undirected connectivity as edges are added.', 'Add union by size/rank.', 'Cycle in an undirected edge list exists when endpoints already share a root.', 'Does not provide paths or handle deletions naturally.']),
      lesson('dsa-shortest-path', 'Choose the shortest-path algorithm by edge weights', 'senior',
        'BFS, Dijkstra, Bellman–Ford, and Floyd–Warshall solve different shortest-path settings.',
        `**Decision guide**\n• Unweighted/equal weights: BFS, O(V+E).\n• Non-negative weights: Dijkstra with a min-priority queue, typically O((V+E) log V).\n• Negative edges, no reachable negative cycle: Bellman–Ford, O(VE).\n• All-pairs on a small dense graph: Floyd–Warshall, O(V³).\n\nNever use Dijkstra when a reachable negative edge can invalidate the greedy settled-distance assumption.`,
        `Dijkstra relaxation: if dist[u] + weight(u,v) < dist[v], update dist[v] and push (dist[v], v). Ignore a popped entry if its distance is stale.`,
        'The stale-entry check lets Java PriorityQueue work without a decrease-key operation.',
        ['Ask whether weights can be negative.', 'Use long for path sums when needed.', 'Track parent pointers if an actual path is required.', 'Disconnected nodes remain at infinity/unreachable.'])
    ]
  },
  {
    id: 'dsa-dynamic-programming', name: 'Dynamic Programming & Greedy Reasoning', icon: '🧩', concepts: [
      lesson('dsa-dp-framework', 'Build a DP from state, transition, and base case', 'junior',
        'Dynamic programming stores solutions to overlapping subproblems so they are not recomputed.',
        `**Four questions**\n1. What does dp[state] mean?\n2. Which smaller states can reach it?\n3. What are the base cases?\n4. In what order can states be computed?\n\nMemoization follows recursion and caches results. Tabulation fills a table in dependency order. Optimize memory only after the recurrence is clear.`,
        `dp[i] = minimum cost to reach step i\ndp[0] = 0\ndp[i] = cost[i] + min(dp[i-1], dp[i-2])\nAnswer: dp[n-1]`, 'The sentence defining dp[i] prevents index meaning from drifting. The recurrence only uses already computed states.',
        ['Define the state in one sentence.', 'Derive transitions from the final choice.', 'Prove base cases and iteration order.', 'Check whether a greedy choice can replace the DP.']),
      lesson('dsa-dp-1d', 'One-dimensional DP: take/skip and prefix decisions', 'mid',
        'Many one-dimensional problems choose whether to use the current item and combine the best result from earlier positions.',
        `**Pattern**\nFor “cannot choose adjacent items,” each position has a take and skip decision: dp[i] = max(dp[i-1], value[i] + dp[i-2]). Similar recurrences appear in scheduling and path choices.\n\nDefine whether dp[i] covers indices through i or a prefix of length i; this determines all indexes and base cases.`,
        `long twoBack = 0, oneBack = 0;\nfor (int value : values) {\n    long current = Math.max(oneBack, twoBack + value);\n    twoBack = oneBack;\n    oneBack = current;\n}\nreturn oneBack;`, 'Only the previous two states are needed, so space can be reduced from O(n) to O(1).',
        ['Translate choose/skip into competing transitions.', 'Check negative values and the empty-selection rule.', 'Use long for large totals.', 'Rolling memory is valid only when older states are not needed.']),
      lesson('dsa-dp-grid', 'Grid DP and path counting', 'mid',
        'Grid DP combines results from predecessor cells while respecting obstacles and movement rules.',
        `**Definition**\nFor right/down movement, the state dp[r][c] may count paths from the start to cell (r,c). Its value comes from the top and left cells. Obstacles set a state to zero.\n\nA rolling row reduces O(RC) memory to O(C) if transitions only need the current row and previous row.`,
        `dp[0] = 1;\nfor (int r = 0; r < rows; r++) {\n    for (int c = 0; c < cols; c++) {\n        if (blocked[r][c]) dp[c] = 0;\n        else if (c > 0) dp[c] += dp[c - 1];\n    }\n}`, 'Before processing each cell, dp[c] represents the value from above and dp[c-1] the value from the left.',
        ['State what each cell stores.', 'Initialize start and obstacle cells carefully.', 'Check integer overflow; path counts grow quickly.', 'Respect movement direction in the iteration order.']),
      lesson('dsa-knapsack', '0/1 knapsack and subsequence DP', 'senior',
        'Knapsack DP tracks the best value achievable for a capacity while deciding whether each item is used once.',
        `**Definition**\nLet dp[c] be the best value using processed items with capacity at most c. For each item (weight, value), update capacities downward so the item cannot be reused in the same iteration.\n\nFor unbounded knapsack, update upward because the same item may be selected again. This loop direction is a frequent interview trap.`,
        `for (int i = 0; i < weights.length; i++) {\n    for (int c = capacity; c >= weights[i]; c--) {\n        dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);\n    }\n}`, 'Descending capacity preserves the previous item layer. An ascending loop changes the model to allow repeated use.',
        ['Name the state and whether the item can be reused.', '0/1 updates capacities downward.', 'Unbounded updates upward.', 'Complexity is O(items × capacity); consider limits before using it.'])
    ]
  },
  {
    id: 'dsa-practical-coding', name: 'Practical Coding: Stateful Design & Parsing', icon: '🛠️', concepts: [
      lesson('dsa-stateful-implementation', 'Stateful class design and operation sequences', 'junior',
        'Practical coding prompts ask you to implement a small API whose methods share mutable state and evolve through follow-up requirements.',
        `**Why it matters**\nRecent candidate-question analyses include stateful implementation, parsing, and simulations alongside classic algorithm problems. The interview still evaluates data structures, invariants, complexity, and edge cases.\n\nStart by listing operations and their contract. Identify the state that must persist, write invariants, implement the simplest correct version, then add requirements without breaking earlier behavior. Test sequences, not only isolated calls.`,
        `class Inventory {\n    private final Map<String, Integer> stock = new HashMap<>();\n    void add(String sku, int count) { /* validate and update */ }\n    boolean reserve(String sku, int count) { /* atomic contract */ return false; }\n    int available(String sku) { return stock.getOrDefault(sku, 0); }\n}`, 'The map is the shared state. Correctness requires defining behavior for missing SKUs, zero/negative counts, repeated reservations, and failed operations.',
        ['Clarify method behavior before coding.', 'Write down invariants such as non-negative stock.', 'Use a data structure that supports expected operation costs.', 'Test sequences and failed operations for unintended mutation.'], [{ title: '2026 coding interview pattern analysis and methodology', url: currentDSAReport }, { title: 'Databricks Interview Preparation', url: databricksPrep }]),
      lesson('dsa-lru-cache', 'LRU cache: hash map plus doubly linked list', 'mid',
        'An LRU cache evicts the least recently used item while keeping get and put operations O(1).',
        `**Design**\nA hash map locates each node by key. A doubly linked list stores recency order: most-recent at the front, least-recent at the back. A get moves its node to the front; put updates or inserts and evicts from the back if capacity is exceeded.\n\nUse sentinel head/tail nodes to simplify boundary operations. Define capacity zero and update-existing-key behavior.`,
        `get(key): node = map.get(key); if absent return -1; unlink(node); addAfterHead(node); return node.value\nput(key,value): update/move existing OR insert new; if size > capacity remove tail.prev`, 'The map gives lookup; the list gives O(1) removal and recency updates. Together both get and put are O(1).',
        ['Hash map + doubly linked list.', 'Sentinel nodes simplify insert/remove.', 'Update makes an existing key most-recent.', 'Test capacity 0/1 and repeated updates.']),
      lesson('dsa-parsing', 'Robust parsing and state machines', 'senior',
        'A parser converts structured text into meaningful records while handling delimiters, escapes, malformed input, and state.',
        `**Approach**\nDo not split blindly if delimiters can appear inside quoted or escaped fields. Define parser states such as START_FIELD, IN_UNQUOTED, IN_QUOTED, and AFTER_QUOTE. Move one character at a time, emit a field only at a valid boundary, and report malformed input deliberately.\n\nThis state-machine method is useful for CSV-like formats, log lines, expressions, and command interpreters.`,
        `for (int i = 0; i < input.length(); i++) {\n    char ch = input.charAt(i);\n    switch (state) {\n        case IN_QUOTED -> { if (ch == '"') state = AFTER_QUOTE; else field.append(ch); }\n        case START_FIELD -> { /* choose quoted or unquoted mode */ }\n        default -> { /* handle delimiter and escapes */ }\n    }\n}`, 'Explicit states make valid and invalid transitions visible. A real parser must decide how to handle doubled quotes and end-of-input inside a quote.',
        ['Write down grammar and escape rules.', 'Track state explicitly rather than stacking fragile split calls.', 'Test delimiter in quotes, escaped quotes, empty fields, and malformed end-of-input.', 'Report line/column or a clear error when invalid input is possible.'], [{ title: '2026 coding interview pattern analysis', url: currentDSAReport }])
    ]
  },
  {
    id: 'dsa-advanced', name: 'Advanced Patterns: Backtracking, Ranges & Strings', icon: '🚀', concepts: [
      lesson('dsa-backtracking', 'Backtracking with pruning and duplicate control', 'mid',
        'Backtracking explores a decision tree and undoes a choice before trying the next branch.',
        `**Template**\nChoose → recurse → unchoose. Prune a branch as soon as it cannot produce a valid solution. For combinations over sorted values, skip duplicates at the same recursion depth to avoid duplicate output.\n\nWorst-case search is exponential, so explain the branching factor and what pruning reduces.`,
        `void search(int start) {\n    if (complete()) { answer.add(copyOf(path)); return; }\n    for (int i = start; i < nums.length; i++) {\n        if (i > start && nums[i] == nums[i - 1]) continue;\n        path.add(nums[i]); search(i + 1); path.remove(path.size() - 1);\n    }\n}`, 'Sorting puts duplicates together. The i > start condition skips equivalent sibling choices while still allowing repeated values from different levels when the contract permits them.',
        ['Copy the current path when saving a result.', 'Undo every mutation after recursion.', 'Sort when it enables duplicate handling or pruning.', 'State output size; enumeration can be exponential.']),
      lesson('dsa-bit-manipulation', 'Bit operations and XOR patterns', 'mid',
        'Bit operations manipulate the binary representation directly and can encode flags, parity, or subsets.',
        `**Core operations**\nAND masks bits, OR sets bits, XOR toggles differing bits, and shifts move bits. For an integer x, x & (x-1) clears its lowest set bit. XOR has the property x ^ x = 0 and x ^ 0 = x.\n\nUse bit tricks only when they clarify the invariant; check signedness and shift width in the chosen language.`,
        `int parity = 0;\nfor (int x : values) parity ^= x;\n// If every value occurs twice except one, parity is the unique value.`, 'Duplicate values cancel in pairs under XOR, leaving the single unpaired value.',
        ['Know mask, set, clear, toggle, and test operations.', 'Document assumptions about value counts and sign.', 'For subsets of n items, bitmask states have 2^n possibilities.', 'Do not use a bitmask DP when n is too large.']),
      lesson('dsa-fenwick', 'Fenwick tree for dynamic prefix sums', 'senior',
        'A Fenwick tree supports point updates and prefix-sum queries in O(log n) using the lowest set bit.',
        `**Definition**\nEach tree cell stores a range of values determined by its least significant set bit. Query walks toward zero; update walks to larger responsible ranges. It is compact and useful for dynamic cumulative counts.\n\nUse a segment tree when queries/updates need more general associative operations or range updates.`,
        `int sum(int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }\nvoid add(int i, int delta) { for (; i < bit.length; i += i & -i) bit[i] += delta; }`, 'This one-indexed sketch queries prefix [1,i] and adds delta at index i. Convert carefully from zero-based problem indexes.',
        ['Both update and prefix query are O(log n).', 'Classic Fenwick supports point updates and prefix sums.', 'Coordinate-compress values when indexes are large.', 'Be explicit about one-based indexing.']),
      lesson('dsa-kmp', 'KMP prefix function for linear string matching', 'senior',
        'Knuth–Morris–Pratt reuses information about matched prefixes so the pattern pointer never moves backward over the text.',
        `**Definition**\nThe prefix function pi[i] is the length of the longest proper prefix of pattern[0..i] that is also a suffix. On a mismatch, KMP falls back to pi[j-1] rather than restarting from zero.\n\nPreprocessing and search are O(n + m), where n is text length and m is pattern length.`,
        `int j = 0;\nfor (int i = 0; i < text.length(); i++) {\n    while (j > 0 && text.charAt(i) != pattern.charAt(j)) j = pi[j - 1];\n    if (text.charAt(i) == pattern.charAt(j)) j++;\n    if (j == pattern.length()) { found(i - j + 1); j = pi[j - 1]; }\n}`, 'The fallback preserves the longest prefix that could still match. Handle an empty pattern separately before indexing pattern[j].',
        ['Build the prefix array first.', 'Mismatch fallback uses pi[j-1].', 'Time is O(n+m), space O(m).', 'Test repeated-prefix patterns such as "ababaca".'])
    ]
  },
  {
    id: 'dsa-practice-by-level', name: 'Practice Sets by Interview Level', icon: '🎯', concepts: [
      lesson('dsa-practice-foundations', 'Foundations practice set', 'fresher',
        'Build fluency with arrays, strings, maps, and careful input/output contracts before moving to harder patterns.',
        `**Practice prompts**\n1. Return the indices of two values that sum to a target.\n2. Decide whether two strings are anagrams.\n3. Merge two already sorted arrays.\n4. Find the first occurrence of a target in a sorted array.\n5. Count how often each word appears in a sentence.\n\nFor each prompt, first solve the direct version, then identify the input size where a better data structure matters.`,
        `Two Sum → HashMap, O(n) expected time / O(n) space\nAnagram check → frequency array or map, O(n) time\nMerge sorted arrays → two pointers, O(n + m) time`,
        'These prompts exercise basic array scans and maps while making duplicate handling and complexity visible.',
        ['Explain the contract and return behavior.', 'Handle empty input and duplicates.', 'Know a simple baseline and an optimized approach.', 'Write readable Java with descriptive variable names.']),
      lesson('dsa-practice-patterns', 'Core pattern practice set', 'junior',
        'Combine sliding windows, prefix sums, linked lists, stacks, and binary search with edge-case reasoning.',
        `**Practice prompts**\n1. Find the length of the longest substring with no repeated characters.\n2. Count subarrays with sum equal to k, including negative values.\n3. Reverse a linked list and detect a cycle.\n4. Find the next greater value for every array element.\n5. Return the first index at which a sorted value could be inserted.\n\nBefore coding, explain why the pattern applies. For example, a classic positive-sum sliding window does not safely handle negative numbers.`,
        `Subarray sum k with negatives → prefix sum + frequency map\nNext greater element → monotonic stack\nLower bound → binary search on half-open range [0,n)`,
        'The set deliberately mixes patterns that look similar but need different assumptions.',
        ['State assumptions that make the pattern correct.', 'Use a counterexample to reject an invalid shortcut.', 'Test duplicates, no answer, and boundary indexes.', 'Give time and space complexity.']),
      lesson('dsa-practice-advanced', 'Advanced algorithms practice set', 'mid',
        'Practice graph traversal, dependency ordering, heaps, intervals, and dynamic programming with follow-up constraints.',
        `**Practice prompts**\n1. Determine whether all courses can be completed from prerequisite pairs; return one valid order.\n2. Find the k most frequent values.\n3. Merge overlapping intervals and explain touching endpoints.\n4. Find the minimum number of coins for a target amount.\n5. Count connected regions in a grid.\n\nAdd follow-ups: return the actual path/order, support much larger input, or explain what changes when edge costs are weighted.`,
        `Prerequisites → topological sort\nTop k → bounded heap or bucket counts\nConnected regions → grid BFS/DFS\nMinimum coins → DP over amount`,
        'The follow-ups test whether the candidate understands the model and limits, not just a memorized solution.',
        ['Draw the graph/state before coding.', 'Explain the invariant for the queue, heap, or DP table.', 'Ask whether costs are weighted and whether cycles exist.', 'Check memory limits as well as runtime.']),
      lesson('dsa-practice-senior', 'Senior practical coding and design set', 'senior',
        'Practice multi-step prompts that require API design, persistent state, complexity targets, and safe follow-up changes.',
        `**Practice prompts**\n1. Implement an LRU cache, then add expiration.\n2. Build a rate limiter with a sliding time window and per-user quotas.\n3. Parse a quoted CSV-like record and report malformed input.\n4. Implement a versioned in-memory key/value store with snapshots and rollback.\n5. Design a scheduler that returns the next eligible task by priority and deadline.\n\nFor each, clarify method semantics, state invariants, expected operation volume, time source, thread-safety requirements, and what happens on invalid input. Add one requirement at a time and re-run prior scenarios.`,
        `Design notes:\nAPI contract → state model → invariant → operations + complexity → boundary tests → follow-up changes\nExample invariant: every live cache key has exactly one map entry and one list node.`,
        'Senior coding screens often expose system-design judgment through a small implementation: state ownership, invariants, extensibility, and operational constraints.',
        ['Start by designing the API and state representation.', 'Give complexity for every public operation.', 'Test operation sequences, not just isolated calls.', 'Discuss concurrency and failure semantics when relevant.'], [{ title: 'PracHub: current coding pattern analysis', url: currentDSAReport }])
    ]
  }
];

export const aiAdvancedTopics = [{
  id: 'ai-production-systems', name: 'Advanced LLM Systems & Operations', icon: '🧪', concepts: [
    lesson('ai-rag-diagnosis', 'Debug a RAG system that gives wrong answers', 'mid',
      'Diagnose retrieval, context assembly, generation, and citation failures separately instead of changing the prompt blindly.',
      `**Failure tree**\n1. Was the correct source ingested and current?\n2. Did chunking preserve the useful context?\n3. Did retrieval return the right passage under the user’s access filters?\n4. Did reranking/context limits remove it?\n5. Did the model answer beyond the evidence?\n\nLog retrieval IDs and score bands, not sensitive document contents by default. Build a test query for each fix so quality changes are measurable.`,
      `Question → no correct result in top-k: investigate query/chunking/index\nCorrect result retrieved but absent from prompt: inspect filtering/token budget\nEvidence in prompt but false claim: inspect instructions/model/eval and add abstention case`,
      'Segmenting failures tells you which stage to improve. A prompt change cannot recover a passage that was never retrieved.',
      ['Inspect each pipeline stage independently.', 'Check ACL filters and source freshness before retrieval tuning.', 'Use representative failure cases as regression tests.', 'Track citation correctness, not citation presence alone.'], [{ title: 'OpenAI Evals', url: openaiEvalsRef }]),
    lesson('ai-finetune-vs-rag', 'Choose RAG, fine-tuning, or a hybrid', 'senior',
      'RAG supplies changing or attributable facts at inference time; fine-tuning changes learned behavior or style using training examples.',
      `**Decision guide**\nChoose RAG when answers need current, private, or citable source material. Consider fine-tuning when repeated examples show a stable task behavior, format, or domain pattern that prompting cannot achieve efficiently. Fine-tuning does not automatically give a model up-to-date knowledge or guarantee retrieval.\n\nA hybrid may use a tuned model to follow a domain format while retrieved documents supply current evidence. Compare on held-out evaluation data, operating cost, and update frequency.`,
      `Frequently changing policy facts + citations → RAG\nConsistent structured extraction style across many examples → evaluate fine-tuning\nAlways compare baseline, quality, latency, privacy, and ongoing maintenance cost`,
      'The decision follows the failure mode: missing knowledge calls for retrieval; inconsistent behavior may call for better prompts or tuning.',
      ['RAG improves access to external/current evidence.', 'Fine-tuning changes model behavior, not live database contents.', 'Do not fine-tune before establishing a measured baseline.', 'Evaluate leakage, privacy, and maintenance needs.'], [{ title: 'OpenAI Evals', url: openaiEvalsRef }]),
    lesson('ai-streaming', 'Streaming responses and cancellation', 'mid',
      'Streaming sends generated output incrementally to improve perceived latency, but requires explicit handling for partial results and client disconnects.',
      `**Definition**\nA streaming response exposes chunks as they arrive instead of waiting for full completion. The client should handle text deltas, completion, errors, and cancellation. Server-side work should stop when the caller disconnects where possible.\n\nDo not treat partial output as a completed, validated result. For tool calls or structured output, the final message may require buffering and validation before acting.`,
      `Request → model stream → render deltas\nIf client closes: cancel upstream request\nIf structured/action result: wait for completion → parse → validate → execute`,
      'Streaming reduces time to first token but does not reduce total generation time or make partial output safe to execute.',
      ['Measure time to first token and total time.', 'Handle disconnects, errors, and cancellation.', 'Never execute a partial tool call.', 'Design safe behavior for interrupted responses.'], [{ title: 'OpenAI: Realtime and Streaming', url: openaiRealtime }]),
    lesson('ai-rate-retries', 'Rate limits, retries, queues, and backpressure', 'senior',
      'Reliable model integration respects provider limits and uses bounded retries, queues, and graceful degradation to absorb bursts.',
      `**Failure modes**\nA request may fail due to request-per-minute limits, token throughput, temporary provider errors, or exhausted billing quota. These errors need different actions.\n\nHonor Retry-After when present, use exponential backoff with jitter for retryable failures, set an attempt/deadline budget, and do not endlessly retry a quota or permission error. Queueing smooths bursts but adds wait time; enforce queue size and expiry.`,
      `429 retryable → honor retry-after + jitter → bounded retry\nquota/billing error → stop retries + alert\nqueue full or deadline exceeded → return controlled fallback`,
      'Retrying all 429 responses can worsen an outage or consume budget. Classify the provider error and monitor queue age, token rate, and failure type.',
      ['Classify errors before retrying.', 'Honor retry-after and add jitter.', 'Bound retries, queue length, and end-to-end deadline.', 'Provide a fallback or clear overload response.'], [{ title: 'OpenAI: Rate Limits', url: openaiRateLimits }]),
    lesson('ai-llm-eval-design', 'Design an LLM evaluation set and release gate', 'senior',
      'An evaluation set turns product expectations into repeatable checks for each prompt, retrieval, or model change.',
      `**Build the set**\nSample real task types with privacy controls; include common, rare, ambiguous, adversarial, and unanswerable cases. Record expected evidence or criteria rather than requiring one exact wording. Split development examples from a held-out set to reduce tuning to the benchmark.\n\n**Release gate**\nTrack task success/faithfulness, retrieval recall, refusal behavior, latency, and cost. Review regressions by slice. Automated model graders can help but need calibration against human judgment.`,
      `Release candidate: quality ≥ agreed threshold; no critical safety regression; p95 latency and cost within budget; reviewed failures for high-risk slices`,
      'A gate protects against a prompt improving one happy-path example while degrading a high-risk or low-frequency category.',
      ['Use a representative, versioned dataset.', 'Keep a held-out evaluation set.', 'Break results into meaningful slices.', 'Combine deterministic checks, calibrated graders, and human review.'], [{ title: 'OpenAI: Evals', url: openaiEvalsRef }]),
    lesson('ai-data-governance', 'Privacy and data governance for LLM features', 'senior',
      'AI data governance defines which data may enter prompts, where it is processed, how long it is retained, and who may retrieve it.',
      `**Design checklist**\nClassify user data; minimize fields sent to the model; enforce document ACLs during retrieval; use approved providers and retention settings; redact secrets from logs; and define deletion behavior for source indexes and cached responses.\n\nDo not assume that prompt instructions enforce privacy. Access control and retention must be enforced by application architecture, provider configuration, and operational process.`,
      `Authenticated user → permission-scoped retrieval → minimize prompt fields → approved model endpoint → redact telemetry → honor deletion across source, index, and cache`,
      'The application controls authorization and data flow. Model prompts do not replace identity checks or retention policy.',
      ['Apply least privilege before retrieval.', 'Minimize and classify prompt data.', 'Review provider retention, residency, and training terms.', 'Redact logs and implement deletion end to end.']),
    lesson('ai-mcp-tools', 'Tool interoperability and MCP-style servers', 'senior',
      'A tool protocol can standardize how a model host discovers and calls capabilities, but it does not provide authorization by itself.',
      `**Architecture**\nA host connects to a tool server, discovers available tools/resources, and mediates calls. Treat each server as an integration boundary: authenticate connections, scope credentials, validate inputs, audit actions, and pin trusted servers.\n\nDo not expose every internal capability to every agent. Separate read-only tools from write tools, and require approval for consequential operations.`,
      `User task → host discovers approved tools → model proposes call → host checks user + tool policy → server executes → result is returned with provenance`,
      'Interoperability makes integrations easier to compose; security still depends on host and server policy.',
      ['Protocol discovery is not permission.', 'Use per-user authorization and least privilege.', 'Audit tool name, actor, arguments, and outcome safely.', 'Treat tool results as untrusted content.'], [{ title: 'Anthropic: Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }]),
    lesson('ai-caching', 'Prompt, semantic, and response caching', 'mid',
      'Caching can reduce model calls, but keys must include every input that can change the answer or authorization scope.',
      `**Cache layers**\nExact response cache: same normalized request and context. Prompt-prefix cache: provider reuses computation for repeated prefixes. Semantic cache: similar queries may share an answer, but false matches can be dangerous.\n\nInclude model/version, system prompt version, retrieval/index version, tenant and permission scope, and relevant freshness key. Avoid caching personalized or time-sensitive results without a clear invalidation strategy.`,
      `cacheKey = hash(tenantId, permissionVersion, promptVersion, modelId, normalizedQuery, sourceVersion)`,
      'A query alone is not a safe key when users have different permissions or the underlying policy changes.',
      ['Cache only when freshness and scope are explicit.', 'Include prompt/model/index versions in the key.', 'Apply access control before returning cached content.', 'Measure hit rate and stale-answer risk.'])
  ]
}];

export const javaAdvancedTopics = [{
  id: 'java-performance-advanced', name: 'JVM Performance & Concurrency Diagnostics', icon: '📈', concepts: [
    lesson('java-gc-diagnosis', 'Garbage collection and memory-pressure diagnosis', 'senior',
      'GC reclaims unreachable heap objects; diagnose memory issues using allocation, live-set, pause, and throughput evidence.',
      `**Useful distinctions**\nHeap usage after a collection approximates the live set; allocation rate measures how quickly objects are created; pause time describes stop-the-world latency. A high allocation rate may hurt throughput without a leak. A growing post-GC live set can indicate retained objects.\n\nStart with GC logs/JFR and heap histograms or dumps. Find retention paths before changing heap size or collector flags.`,
      `Incident: p99 latency rises\n1. Compare GC pauses and allocation rate.\n2. Check whether post-GC old-generation occupancy keeps rising.\n3. Use a heap dump to inspect dominators and retained paths.\n4. Fix retention/allocation source, then remeasure.`,
      'The diagnosis distinguishes normal churn from objects that remain reachable unexpectedly. Bigger heaps can hide a leak and change pause behavior.',
      ['Measure allocation and post-GC live set.', 'A memory leak is retained reachable memory, not only high allocation.', 'Use JFR, GC logs, heap histograms, and dumps appropriately.', 'Change one JVM setting at a time and benchmark.'], [{ title: 'Oracle Java: Garbage Collection Tuning', url: javaGC }]),
    lesson('java-deadlock', 'Deadlocks, lock ordering, and thread dumps', 'senior',
      'A deadlock occurs when threads wait forever on a cycle of locks held by one another.',
      `**Four conditions**\nMutual exclusion, hold-and-wait, no forced preemption, and circular wait. Prevent common deadlocks by acquiring multiple locks in a consistent global order, minimizing lock scope, and avoiding unknown callbacks while holding locks.\n\nA thread dump can reveal each thread’s state and the monitor it owns or awaits. A timeout detects some stalls but does not replace a sound locking design.`,
      `Thread A: holds accountLock → waits for ledgerLock\nThread B: holds ledgerLock → waits for accountLock\nFix: acquire locks in one order everywhere, or redesign to avoid nested locks.`,
      'The wait-for cycle explains why neither thread can progress. Thread dumps make the cycle visible during an incident.',
      ['Look for lock cycles in thread dumps.', 'Use a consistent lock order.', 'Keep synchronized regions small.', 'Prefer higher-level concurrent abstractions where appropriate.']),
    lesson('java-completablefuture', 'CompletableFuture composition and failure handling', 'mid',
      'CompletableFuture composes asynchronous operations; thenApply transforms a value, thenCompose flattens another async stage, and exceptionally/handle manage failures.',
      `**Composition**\nUse thenApply for a synchronous transformation and thenCompose when the transformation itself returns a future. allOf waits for multiple stages but does not collect their values automatically. Decide which executor runs blocking work; avoid performing blocking I/O on a small common pool.\n\nPropagate timeouts and cancellation deliberately, and preserve useful exception context.`,
      `CompletableFuture<User> user = loadUser(id);\nCompletableFuture<List<Order>> orders = user.thenCompose(u -> loadOrders(u.id()));\nreturn orders.thenApply(this::summarize)\n             .exceptionally(this::fallback);`,
      'thenCompose flattens CompletionStage<CompletionStage<T>> into CompletionStage<T>. The error path must fit the caller’s contract.',
      ['thenApply maps; thenCompose chains async stages.', 'allOf does not collect typed results.', 'Choose executors for blocking work.', 'Handle timeout, cancellation, and exceptions explicitly.'])
  ]
}];

export const javaModernTopics = [
  {
    id: 'java-modern-runtime', name: 'Modern Java: Language & Runtime (21–26)', icon: '🧩', concepts: [
      lesson('java-virtual-threads-practical', 'Virtual threads: when they help and when they do not', 'senior',
        'Virtual threads make large numbers of mostly-waiting tasks cheaper to manage; they improve throughput for blocking workloads, not CPU speed.',
        `**How to reason about them**\nA virtual thread is scheduled by the Java runtime onto a smaller set of OS threads. It lets a thread-per-request design handle many concurrent I/O waits without needing an equally large platform-thread pool. The familiar blocking style remains useful, and the runtime can suspend a virtual thread while it waits on supported blocking operations.\n\nThey do not make CPU-bound work faster. Avoid pooling virtual threads as if they were scarce platform threads; instead, limit the scarce resource such as database connections or downstream request slots with a semaphore or connection pool. Pinning and native or monitor behavior are version-sensitive, so inspect current JDK guidance and profile the actual workload.`,
        `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    Future<Response> response = executor.submit(() -> client.fetch(uri));\n    return response.get();\n}\n// Bound database/downstream concurrency separately.`,
        'The executor creates a task-scoped virtual thread. The database connection pool still controls how many database operations can run at once.',
        ['Best fit: high concurrency with blocking I/O.', 'Not a CPU parallelism or latency optimization by itself.', 'Do not pool virtual threads; constrain scarce downstream resources.', 'Measure throughput, tail latency, memory, and pinning on the deployed JDK.'], [{ title: 'Oracle Java 26: Virtual Threads', url: java26VirtualThreads }]),
      lesson('java-scoped-values', 'Scoped values for safe context sharing', 'senior',
        'Scoped values provide a bounded, read-only way to make context available to callees without threading it through every method signature.',
        `**The problem they address**\nRequest IDs, security identity, or locale may need to travel through a call tree. Mutable ThreadLocal state can outlive its intended scope or be awkward with task lifecycles. A scoped value is bound for a dynamic scope, read by code called within that scope, and then unbound automatically.\n\nUse explicit parameters when they make dependencies clearer. Use scoped values for context whose lifetime and read-only sharing match the operation. Check the target JDK because API status and interaction with structured concurrency can evolve.`,
        `private static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();\n\nScopedValue.where(REQUEST_ID, "req-42").run(() -> {\n    handleRequest(); // callees can read REQUEST_ID.get()\n});`,
        'The binding exists only while the callback runs, so later unrelated work cannot accidentally inherit a stale value.',
        ['Bindings follow a bounded dynamic scope.', 'Prefer immutable context values.', 'Do not use it to hide ordinary business dependencies.', 'Verify the exact JDK/API status for your deployment target.'], [{ title: 'Oracle Java 26: Scoped Values', url: java26ScopedValues }]),
      lesson('java-structured-concurrency', 'Structured concurrency and task ownership', 'senior',
        'Structured concurrency groups related concurrent tasks into a lexical scope so their lifetime, cancellation, and failures are handled together.',
        `**Why structure matters**\nWith unstructured futures, a child task can outlive the request that started it, and failure handling can become scattered. A structured task scope makes the parent responsible for child completion and provides a place to define join, failure, and cancellation policy. This improves reasoning and observability; it does not remove the need for deadlines or resource limits.\n\nThe API has been previewed across releases. Treat snippets as version-specific and use the API status documented for the JDK you compile and deploy with.`,
        `// Illustrative API shape; preview APIs require the matching JDK flags.\ntry (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n    var user = scope.fork(() -> findUser(id));\n    var orders = scope.fork(() -> findOrders(id));\n    scope.join().throwIfFailed();\n    return new Dashboard(user.get(), orders.get());\n}`,
        'The parent joins both related tasks and applies one failure policy before assembling the result.',
        ['Keep child tasks within the request or operation scope.', 'Define cancellation, timeout, and failure behavior.', 'The API has been preview and is JDK-version-sensitive.', 'Use virtual threads for blocking tasks; bound downstream resources separately.'], [{ title: 'Oracle Java 26: Structured Concurrency', url: java26StructuredConcurrency }]),
      lesson('java-pattern-matching', 'Pattern matching, record patterns, and switch', 'mid',
        'Pattern matching combines a type check with a binding, while record patterns can deconstruct data and switch patterns can express exhaustive cases.',
        `**From casting to describing**\nAn instanceof pattern binds a correctly typed variable only when the test succeeds. Record patterns can unpack record components, and pattern switch can select behavior by type or shape. Sealed hierarchies help the compiler reason about a closed set of variants.\n\nPrefer a switch expression when every permitted case should produce a value. Keep guards simple and avoid deeply nested deconstruction that makes the flow harder to read. Recent Java releases also preview new pattern capabilities, so distinguish permanent features from preview features in interviews and production decisions.`,
        `sealed interface Result permits Ok, Failure {}\nrecord Ok(String value) implements Result {}\nrecord Failure(String reason) implements Result {}\n\nString message = switch (result) {\n    case Ok(var value) -> value;\n    case Failure(var reason) -> "Error: " + reason;\n};`,
        'The compiler can check that the switch covers the permitted result variants. Adding a new permitted subtype may require updating the switch.',
        ['Use instanceof patterns to remove redundant casts.', 'Sealed types make a hierarchy intentionally closed.', 'Switch expressions can be exhaustive and return a value.', 'Label preview features accurately for the target JDK.'], [{ title: 'Oracle Java 26: Language Changes Summary', url: java26Language }]),
      lesson('java-foreign-function-memory', 'Foreign Function & Memory API', 'senior',
        'The Foreign Function & Memory API provides Java access to native memory and foreign functions without relying on JNI wrappers for every call.',
        `**What it is for**\nUse the API when integrating with a native library or accessing off-heap memory with explicit layouts and lifetimes. Arenas govern the lifetime of allocated native segments; layouts describe the data shape; linkers describe native calls. The API makes boundaries more visible, but native access still carries safety, ABI, and platform risks.\n\nPrefer ordinary Java libraries when they meet the requirement. Isolate native interop behind a small adapter, validate input and ownership, and test against the exact OS and architecture you support.`,
        `// Shape only: native access requires an explicit, bounded arena.\ntry (Arena arena = Arena.ofConfined()) {\n    MemorySegment nativeBuffer = arena.allocate(1024);\n    // pass the segment to a downcall handle with a matching layout\n}`,
        'The confined arena bounds native memory lifetime to the try block, reducing accidental lifetime leaks.',
        ['The API became final in JDK 22; confirm the supported baseline.', 'Native memory lifetime and ABI must be explicit.', 'Keep FFM behind a narrow adapter and validate ownership.', 'Use Java-managed memory unless native integration is justified.'], [{ title: 'Oracle Java 25: Foreign Function & Memory API', url: javaFFM }])
    ]
  },
  {
    id: 'java-interview-core', name: 'Java Interview Deep Dives', icon: '🎯', concepts: [
      lesson('java-equals-hashcode-contract', 'equals and hashCode contracts in collections', 'mid',
        'Hash-based collections use hashCode to find a bucket and equals to distinguish keys within it; both methods must follow their contracts.',
        `**The contract**\nIf two objects are equal according to equals, they must return the same hash code. Unequal objects may share a hash code, so collisions are expected and are resolved using equality. Equality should be reflexive, symmetric, transitive, and consistent while the compared state is stable.\n\nA mutable key is dangerous: changing a field used by equals/hashCode after insertion can make the entry unreachable through normal lookup. Use immutable key fields and implement both methods from the same identity fields.`,
        `record EmployeeKey(String tenantId, long employeeId) {}\nMap<EmployeeKey, String> cache = new HashMap<>();\ncache.put(new EmployeeKey("acme", 7), "Asha");\nString name = cache.get(new EmployeeKey("acme", 7)); // Asha`,
        'Records derive equals and hashCode from their components, so equivalent key values can retrieve the same map entry.',
        ['Equal objects must have equal hash codes.', 'Hash collisions are legal; equals resolves them.', 'Never mutate hash-relevant key state while stored.', 'Use immutable value keys and test equality symmetry/transitivity.']),
      lesson('java-generics-type-erasure', 'Generics, type erasure, and PECS', 'junior',
        'Generics provide compile-time type safety; Java implements most generic types through type erasure, with limited runtime type information retained.',
        `**Erasure consequences**\nA List<String> and List<Integer> do not have distinct runtime classes. This is why code cannot use new T(), create generic arrays directly, or overload solely on List<String> versus List<Integer>. The compiler inserts casts and checks bounds where possible.\n\nFor variance, use PECS: a producer of T can be ? extends T; a consumer of T can be ? super T. A wildcard makes the allowed operations explicit without claiming that List<Subtype> is a subtype of List<Supertype>.`,
        `static <T> void copy(List<? extends T> source, List<? super T> target) {\n    for (T item : source) target.add(item);\n}`,
        'The source produces values assignable to T; the destination accepts T values. The method does not need to know their exact concrete list types.',
        ['Generics are invariant: List<Dog> is not List<Animal>.', 'Use extends for producers and super for consumers.', 'Erasure prevents most parameterized-type checks at runtime.', 'Use Class<T> tokens or sealed/value-specific APIs when runtime type data is needed.']),
      lesson('java-executor-service-design', 'ExecutorService, pools, and backpressure', 'senior',
        'ExecutorService separates task submission from execution, but pool sizing and queue policy determine resource use and overload behavior.',
        `**Choose limits from the workload**\nCPU-bound work is usually limited near available processors; blocking workloads need a measured concurrency budget and bounded downstream resources. An unbounded queue can turn overload into rising memory use and long latency. Rejection is a signal that the system cannot safely accept more work.\n\nShut down executors deliberately, await completion when required, and preserve interruption. For request fan-out, set deadlines and avoid multiplying retries across layers.`,
        `var pool = new ThreadPoolExecutor(8, 8, 0, TimeUnit.SECONDS,\n    new ArrayBlockingQueue<>(200), new ThreadPoolExecutor.AbortPolicy());\ntry { pool.execute(this::process); }\ncatch (RejectedExecutionException overloaded) {\n    // fail fast, shed load, or return a controlled response\n}`,
        'A bounded queue creates a defined overload point. The application can then shed work or report backpressure instead of silently accumulating it.',
        ['Size pools according to CPU, blocking, and downstream limits.', 'Bound queues and define a rejection policy.', 'Preserve interruption and shut pools down cleanly.', 'Avoid retries that amplify overload.'])
    ]
  }
];

export const springAdvancedTopics = [{
  id: 'spring-data-security-advanced', name: 'JPA Performance, Security & Resilience', icon: '🔐', concepts: [
    lesson('spring-n-plus-one', 'Diagnose and fix the JPA N+1 query problem', 'mid',
      'N+1 occurs when one query loads parent rows and an additional query runs for each parent to load related data.',
      `**Diagnosis**\nEnable SQL/query metrics in a safe environment and inspect query count for one API call. Lazy loading is not inherently wrong; accidental iteration can trigger many round trips.\n\n**Fix by use case**\nUse a DTO projection, fetch join, entity graph, or batch fetching to load only the required data. Avoid globally switching every relation to EAGER; that can create large joins and unrelated over-fetching.`,
      `Bad shape: SELECT orders ... (1 query) then SELECT items WHERE order_id=? repeated per order\nBetter: project only order fields and item count in one grouped query for a summary endpoint`,
      'The endpoint needs a summary, so a projection avoids loading full entity graphs. Measure rows returned as well as query count.',
      ['Confirm query count and affected rows.', 'Choose the fetch shape per endpoint.', 'Avoid EAGER as a blanket fix.', 'Add a regression check around query volume.']),
    lesson('spring-security-chain', 'Spring Security filter chain and authorization', 'senior',
      'Spring Security processes servlet requests through an ordered filter chain that handles authentication, security context, and authorization.',
      `**Request flow**\nA request passes through SecurityFilterChain filters before reaching the controller. Authentication establishes a principal; authorization decides whether that principal may perform the requested action. Configure explicit public routes and secure defaults.\n\nFor stateless APIs, understand token validation and CSRF trade-offs rather than disabling protections by habit. Method security adds checks near business operations but should complement route policy.`,
      `Request → security filters → authenticate token → authorize request matcher → controller → method-level authorization`,
      'A 401 means authentication is missing/invalid; 403 means the identity is known but lacks permission, subject to the application’s response policy.',
      ['Know filter-chain order and request matchers.', 'Separate authentication from authorization.', 'Use deny-by-default policy for protected routes.', 'Review CSRF based on credential transport, not framework folklore.'], [{ title: 'Spring Security: Servlet Architecture', url: springSecurity }]),
    lesson('spring-resilience', 'Timeouts, retries, circuit breakers, and bulkheads', 'senior',
      'Resilience patterns contain failures in dependencies instead of allowing one slow service to exhaust the whole application.',
      `**Use each mechanism intentionally**\nTimeout bounds how long a call may occupy resources. Retry handles selected transient failures, with backoff and idempotency. A circuit breaker stops calls to a dependency that is persistently failing. A bulkhead limits concurrency so one dependency cannot consume every worker.\n\nRetries amplify load during an outage if unbounded. Set an end-to-end deadline and ensure inner timeouts fit inside it.`,
      `Request budget 900 ms\nInventory call timeout 250 ms; retry once only for safe transient errors\nPayment bulkhead 20 concurrent calls\nCircuit opens after sustained failures → cached/degraded response`,
      'The example reserves time for the rest of the request and limits dependency pressure. The fallback must be truthful and acceptable to the product.',
      ['Bound each dependency call by the end-to-end deadline.', 'Retry only transient, safe/idempotent operations.', 'Use bulkheads to isolate dependency pools.', 'Define meaningful circuit-breaker and fallback behavior.'])
  ]
}];

export const devopsAdvancedTopics = [{
  id: 'platform-reliability-advanced', name: 'Platform Engineering, IaC & Reliability', icon: '☸️', concepts: [
    lesson('devops-hpa-pdb', 'Autoscaling, requests, and disruption budgets', 'senior',
      'Kubernetes autoscaling adjusts replica count from observed metrics; it depends on meaningful resource requests and does not replace capacity planning.',
      `**Horizontal Pod Autoscaler**\nHPA compares observed utilization with a target and adjusts replicas within configured bounds. CPU utilization is generally relative to CPU requests; absent or unrealistic requests distort scaling.\n\nPodDisruptionBudget limits voluntary disruptions, not all failures. It helps protect availability during maintenance but can also block drain operations if set too strictly.`,
      `Scale on sustained queue depth or CPU → set min/max replicas → verify cluster capacity and downstream DB limits → use PDB for safe voluntary maintenance`,
      'Scaling pods without scaling the database may increase contention. Validate the whole dependency chain and test scale-up/down behavior.',
      ['Requests influence scheduling and utilization-based scaling.', 'Set min/max replicas and stabilization behavior.', 'PDB covers voluntary disruption, not node failure.', 'Autoscale against a metric tied to real demand.'], [{ title: 'Kubernetes: Horizontal Pod Autoscaling', url: k8sAutoscaling }]),
    lesson('devops-terraform-state', 'Terraform state, drift, and safe collaboration', 'mid',
      'Terraform state maps configuration resources to real infrastructure objects and records attributes needed for future plans.',
      `**Operational rules**\nUse a remote backend with locking and access controls; never commit secrets from state to public source control. Review the plan before apply. Drift means actual infrastructure differs from the recorded/configured expectation; refresh and understand the cause before overwriting a manual change.\n\nSeparate state by ownership and blast radius, and plan migrations with backups.`,
      `terraform plan → review creates/updates/destroys → obtain required approval → terraform apply → inspect state and service health`,
      'The saved state and reviewed plan make changes auditable. A plan that destroys production resources needs particular scrutiny.',
      ['Protect remote state and enable locking.', 'Review plan output before apply.', 'Investigate drift rather than blindly applying.', 'Partition state around ownership and blast radius.'], [{ title: 'Terraform: State', url: terraformState }]),
    lesson('devops-slo-error-budget', 'SLOs, SLIs, and error budgets', 'senior',
      'An SLI measures a user-relevant service outcome; an SLO sets a target, and the error budget is the tolerated unreliability over that window.',
      `**Example**\nSLI: successful, non-timeout requests / eligible requests. SLO: 99.9% over 30 days. Error budget: 0.1% of eligible requests may fail in that window.\n\nChoose indicators users feel, define the measurement window, and alert on fast budget burn. Error budgets help balance release speed with reliability investment; they are not permission to ignore individual incidents.`,
      `For 1,000,000 eligible requests: 99.9% availability permits at most 1,000 bad requests during the window, under this simple request-based SLI.`,
      'The denominator and exclusions must be specified; otherwise teams can report the same service as both healthy and unhealthy.',
      ['Choose a user-visible SLI.', 'Define window, denominator, and exclusions.', 'Alert on burn rate, not only static thresholds.', 'Use budget trends to guide release risk.'])
  ]
}];

export const databaseAdvancedTopics = [{
  id: 'database-scale-advanced', name: 'Database Concurrency & Scale', icon: '🗄️', concepts: [
    lesson('db-deadlocks', 'Locks, deadlocks, and retry-safe transactions', 'senior',
      'Locks coordinate concurrent access; deadlocks occur when transactions wait on a cycle and the database aborts one participant.',
      `**Reduce risk**\nKeep transactions short, access shared rows in a consistent order, index predicates so fewer rows are locked, and avoid user/network waits inside transactions. A deadlock victim may be retried only if the operation is idempotent or protected by a unique request key.\n\nInspect database deadlock details and lock-wait metrics rather than guessing from application latency alone.`,
      `Transfer A locks account 1 then 2; transfer B locks account 2 then 1 → cycle\nConsistent ascending account-id lock order removes the cycle.`,
      'Ordering lock acquisition removes the circular-wait condition for this workflow. It does not eliminate all lock waits or all deadlocks.',
      ['Keep transaction scope small.', 'Use a consistent lock order.', 'Index common locking predicates.', 'Retry the aborted transaction only when safe.'], [{ title: 'PostgreSQL: Explicit Locking', url: postgresLocks }]),
    lesson('db-partitioning', 'Partitioning vs sharding', 'senior',
      'Partitioning divides one logical table into manageable pieces; sharding distributes data across independent database nodes.',
      `**Partitioning**\nA partitioned table keeps one logical relation and routes rows based on a key, such as date. It can improve pruning, maintenance, and retention when queries filter by the partition key.\n\n**Sharding**\nSharding distributes ownership across nodes. It may improve capacity but adds routing, cross-shard query, rebalancing, and transaction complexity. Do not shard before measuring whether a single database can meet requirements.`,
      `Time-series orders partitioned by month; queries with created_at bounds can prune old partitions. A tenant-id shard requires every request to route using tenant id.`,
      'Partition pruning helps only when the query predicate matches the partition key and the planner can determine relevant partitions.',
      ['Partition within one database; shard across independent nodes.', 'Pick keys based on query and growth patterns.', 'Consider skew, rebalancing, and cross-partition writes.', 'Measure before adding distributed complexity.'], [{ title: 'PostgreSQL: Table Partitioning', url: postgresPartitioning }]),
    lesson('db-replica-consistency', 'Read replicas and consistency trade-offs', 'mid',
      'A read replica can scale read traffic, but replication lag means a recent write may not yet be visible there.',
      `**Read-after-write**\nIf a user updates a record and immediately reads from a lagging replica, the old value may appear. Route consistency-sensitive reads to the primary, use session stickiness for a bounded period, or use a replication position/watermark when supported.\n\nReplicas improve read capacity and recovery options but do not remove primary write bottlenecks or replace backups.`,
      `User updates profile on primary → response succeeds → next profile read routes to primary for a short consistency window → later reads may use replica`,
      'Routing policy should match the consistency contract; “read replica” alone does not guarantee immediate consistency.',
      ['Understand replication mode and lag.', 'Define read-after-write behavior.', 'Monitor replica freshness.', 'Replicas are not backups.'])
  ]
}];
