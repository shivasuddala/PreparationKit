// ============================================================
// DATABASE / SQL - Complete Interview Preparation Data
// ============================================================

const databaseTopics = [
  {
    id: 'db-sql-fundamentals',
    name: 'SQL Fundamentals',
    icon: '📊',
    concepts: [
      {
        id: 'db-sql-categories',
        title: 'SQL Command Categories (DDL, DML, DQL, DCL, TCL)',
        level: 'fresher',
        shortDesc: 'DDL: CREATE/ALTER/DROP (structure). DML: INSERT/UPDATE/DELETE (data). DQL: SELECT (query). DCL: GRANT/REVOKE (permissions). TCL: COMMIT/ROLLBACK/SAVEPOINT (transactions).',
        keyPoints: [
          'DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE, RENAME',
          'DML (Data Manipulation Language): INSERT, UPDATE, DELETE, MERGE',
          'DQL (Data Query Language): SELECT',
          'DCL (Data Control Language): GRANT, REVOKE',
          'TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT',
          'DDL is auto-committed (cannot rollback)',
          'DML can be rolled back if within a transaction',
          'TRUNCATE vs DELETE: TRUNCATE is DDL (faster, no rollback), DELETE is DML',
          'GRANT gives permissions, REVOKE removes permissions',
          'COMMIT saves changes permanently, ROLLBACK undoes changes'
        ],
        detailed: `**SQL Command Categories:**

**DDL — Data Definition Language:** Defines database structure (tables, indexes, constraints).
Auto-committed — cannot be rolled back.

**DML — Data Manipulation Language:** Manipulates data within tables.
Can be rolled back if within a transaction.

**DQL — Data Query Language:** Retrieves data from the database.
SELECT is the only DQL command but the most complex.

**DCL — Data Control Language:** Controls access and permissions.

**TCL — Transaction Control Language:** Manages transactions for data integrity.`,
        examples: [
          {
            title: 'SQL Categories with Examples',
            type: 'code',
            language: 'sql',
            code: `-- DDL: Data Definition Language
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    hire_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

ALTER TABLE employees ADD COLUMN phone VARCHAR(15);
ALTER TABLE employees MODIFY COLUMN name VARCHAR(200);
DROP TABLE IF EXISTS temp_employees;
TRUNCATE TABLE logs;  -- Faster than DELETE, no rollback

-- DML: Data Manipulation Language
INSERT INTO employees (name, email, salary) VALUES ('Alice', 'alice@email.com', 85000);
UPDATE employees SET salary = salary * 1.10 WHERE department_id = 1;
DELETE FROM employees WHERE id = 5;

-- DQL: Data Query Language
SELECT name, salary FROM employees WHERE salary > 70000 ORDER BY salary DESC;

-- DCL: Data Control Language
GRANT SELECT, INSERT ON employees TO 'app_user'@'localhost';
REVOKE INSERT ON employees FROM 'app_user'@'localhost';

-- TCL: Transaction Control Language
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
SAVEPOINT transfer_done;
-- If something goes wrong:
ROLLBACK TO transfer_done;
-- Or confirm:
COMMIT;`,
            explanation: 'DDL defines structure, DML manipulates data, DQL queries data, DCL controls access, TCL manages transactions. Know which operations auto-commit.'
          }
        ]
      }
    ]
  },

  {
    id: 'db-joins',
    name: 'JOINs & Subqueries',
    icon: '🔗',
    concepts: [
      {
        id: 'db-joins',
        title: 'SQL JOINs',
        level: 'fresher',
        shortDesc: 'INNER: matching rows only. LEFT: all left + matching right. RIGHT: all right + matching left. FULL: all rows from both. CROSS: cartesian product. SELF: table joined with itself.',
        keyPoints: [
          'INNER JOIN: only matching rows from both tables',
          'LEFT JOIN: all rows from left table + matching from right (NULL if no match)',
          'RIGHT JOIN: all rows from right table + matching from left',
          'FULL OUTER JOIN: all rows from both tables (NULL for non-matching)',
          'CROSS JOIN: cartesian product (every row × every row)',
          'SELF JOIN: table joined with itself (hierarchical data)',
          'ON clause: specifies join condition',
          'Multiple joins: chain JOIN clauses for 3+ tables',
          'LEFT JOIN + WHERE right.id IS NULL: find unmatched (anti-join)',
          'Performance: JOINs on indexed columns are faster'
        ],
        detailed: `**SQL JOINs** combine rows from two or more tables based on a related column.

**Visual Representation:**
- INNER JOIN: A ∩ B (intersection)
- LEFT JOIN: A + (A ∩ B)
- RIGHT JOIN: B + (A ∩ B)
- FULL OUTER JOIN: A ∪ B (union)
- CROSS JOIN: A × B (cartesian product)

**Performance Tips:**
- Always JOIN on indexed columns
- Use INNER JOIN when you need only matching rows
- LEFT JOIN + IS NULL for finding missing relationships
- Avoid CROSS JOIN on large tables (explosion of rows)`,
        examples: [
          {
            title: 'JOIN Types with Examples',
            type: 'code',
            language: 'sql',
            code: `-- Sample data:
-- employees: (1,Alice,1), (2,Bob,2), (3,Charlie,NULL)
-- departments: (1,Engineering), (2,HR), (3,Marketing)

-- INNER JOIN — only matching rows
SELECT e.name, d.name AS dept
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
-- Alice-Engineering, Bob-HR (Charlie excluded — no dept)

-- LEFT JOIN — all employees + their department
SELECT e.name, COALESCE(d.name, 'Unassigned') AS dept
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- Alice-Engineering, Bob-HR, Charlie-Unassigned

-- RIGHT JOIN — all departments + their employees
SELECT e.name, d.name AS dept
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
-- Alice-Engineering, Bob-HR, NULL-Marketing

-- FULL OUTER JOIN (MySQL: use UNION)
SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT e.name, d.name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id;

-- Anti-join — employees without department
SELECT e.name FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;
-- Charlie

-- SELF JOIN — find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple JOINs
SELECT e.name, d.name AS dept, p.name AS project
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN employee_projects ep ON e.id = ep.employee_id
JOIN projects p ON ep.project_id = p.id;`,
            explanation: 'INNER for matching only. LEFT for all from left table. RIGHT for all from right. SELF JOIN for hierarchical relationships like manager-employee.'
          }
        ]
      },
      {
        id: 'db-subqueries',
        title: 'Subqueries & Correlated Queries',
        level: 'junior',
        shortDesc: 'Subquery: query inside another query. Non-correlated: runs once independently. Correlated: runs once per outer row (uses outer table reference). EXISTS checks for row existence.',
        keyPoints: [
          'Subquery (nested query): query within SELECT, FROM, WHERE, or HAVING',
          'Non-correlated: independent, runs once, result used by outer query',
          'Correlated: references outer query, runs once per outer row (slower)',
          'Scalar subquery: returns single value (used in SELECT, WHERE)',
          'Row subquery: returns single row',
          'Table subquery: returns multiple rows (used with IN, ANY, ALL)',
          'EXISTS: returns TRUE if subquery returns any rows (efficient)',
          'IN vs EXISTS: EXISTS is faster for large subquery results',
          'NOT EXISTS: efficient anti-join alternative',
          'Derived table: subquery in FROM clause (must have alias)'
        ],
        detailed: `**Subqueries** are queries nested inside another query. They can appear in SELECT, FROM, WHERE, or HAVING clauses.

**Types:**
1. **Non-correlated:** Independent of outer query. Executes once.
2. **Correlated:** References outer query columns. Executes once per outer row.

**Performance:**
- Non-correlated subqueries are generally efficient
- Correlated subqueries can be slow (row-by-row execution)
- EXISTS is often faster than IN for large datasets
- Rewrite correlated subqueries as JOINs when possible`,
        examples: [
          {
            title: 'Subquery Patterns',
            type: 'code',
            language: 'sql',
            code: `-- Non-correlated subquery (runs once)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);  -- Scalar subquery

-- Subquery with IN
SELECT name FROM employees
WHERE department_id IN (SELECT id FROM departments WHERE name LIKE '%Engineering%');

-- Correlated subquery (runs per row)
SELECT e.name, e.salary,
    (SELECT AVG(e2.salary) FROM employees e2
     WHERE e2.department_id = e.department_id) AS dept_avg
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary) FROM employees e2
    WHERE e2.department_id = e.department_id
);

-- EXISTS — efficient existence check
SELECT d.name FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id AND e.salary > 100000
);

-- NOT EXISTS — find departments with no employees
SELECT d.name FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id
);

-- Derived table (subquery in FROM)
SELECT dept_name, avg_salary
FROM (
    SELECT d.name AS dept_name, AVG(e.salary) AS avg_salary
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    GROUP BY d.name
) AS dept_stats
WHERE avg_salary > 80000;`,
            explanation: 'Non-correlated subqueries are efficient (run once). Correlated run per row (use sparingly). EXISTS is efficient for existence checks.'
          }
        ]
      }
    ]
  },

  {
    id: 'db-aggregation',
    name: 'GROUP BY, ORDER BY & Aggregation',
    icon: '📈',
    concepts: [
      {
        id: 'db-group-order',
        title: 'GROUP BY, HAVING & ORDER BY',
        level: 'fresher',
        shortDesc: 'GROUP BY groups rows for aggregation. HAVING filters groups (after GROUP BY). ORDER BY sorts results. LIMIT restricts row count. Execution order: FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT.',
        keyPoints: [
          'GROUP BY: groups rows sharing a value for aggregate functions',
          'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
          'HAVING: filters groups (like WHERE but for groups)',
          'WHERE filters rows before grouping, HAVING filters after',
          'ORDER BY: sorts result set (ASC default, DESC for descending)',
          'LIMIT n OFFSET m: pagination (skip m rows, return n)',
          'SQL execution order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT',
          'Every non-aggregate column in SELECT must be in GROUP BY',
          'NULL values form their own group in GROUP BY',
          'ORDER BY can use column aliases or position numbers'
        ],
        detailed: `**SQL Execution Order (logical):**
1. FROM & JOINs (determine data source)
2. WHERE (filter rows)
3. GROUP BY (group rows)
4. HAVING (filter groups)
5. SELECT (choose columns)
6. DISTINCT (remove duplicates)
7. ORDER BY (sort results)
8. LIMIT/OFFSET (restrict rows)

This explains why you can't use column aliases in WHERE (SELECT happens after WHERE) but can use them in ORDER BY (ORDER BY happens after SELECT).`,
        examples: [
          {
            title: 'Aggregation & Grouping',
            type: 'code',
            language: 'sql',
            code: `-- Basic aggregation
SELECT
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department_id;

-- HAVING — filter groups
SELECT department_id, AVG(salary) AS avg_sal
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 80000;  -- Can't use WHERE for aggregates

-- WHERE vs HAVING
SELECT department_id, AVG(salary) AS avg_sal
FROM employees
WHERE hire_date > '2020-01-01'     -- Filter rows BEFORE grouping
GROUP BY department_id
HAVING COUNT(*) >= 5               -- Filter groups AFTER grouping
ORDER BY avg_sal DESC
LIMIT 10;

-- Pagination
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;               -- Page 3 (20 items per page)

-- GROUP BY with multiple columns
SELECT department_id, YEAR(hire_date) AS hire_year, COUNT(*) AS hires
FROM employees
GROUP BY department_id, YEAR(hire_date)
ORDER BY department_id, hire_year;

-- Conditional aggregation (CASE in aggregate)
SELECT
    department_id,
    COUNT(CASE WHEN salary > 80000 THEN 1 END) AS high_earners,
    COUNT(CASE WHEN salary <= 80000 THEN 1 END) AS others
FROM employees
GROUP BY department_id;`,
            explanation: 'GROUP BY groups rows for aggregation. HAVING filters groups. WHERE filters individual rows before grouping. Know the SQL execution order!'
          }
        ]
      }
    ]
  },

  {
    id: 'db-advanced-sql',
    name: 'CTE, Window Functions & Advanced SQL',
    icon: '🏆',
    concepts: [
      {
        id: 'db-cte',
        title: 'Common Table Expressions (CTE)',
        level: 'junior',
        shortDesc: 'WITH clause defines temporary named result sets. Improves readability. Recursive CTEs for hierarchical data (tree traversal). CTE exists only during query execution.',
        keyPoints: [
          'CTE: named temporary result set (WITH ... AS (query))',
          'Improves readability of complex queries',
          'Exists only during query execution (not stored)',
          'Can reference previous CTEs in same WITH clause',
          'Recursive CTE: references itself (for hierarchical data)',
          'Recursive CTE has: anchor member + recursive member',
          'Use for: tree traversal, org charts, bill of materials',
          'CTE vs subquery: CTE is more readable and reusable within query',
          'CTE vs temp table: CTE exists only for one query, temp table persists',
          'Multiple CTEs: WITH cte1 AS (...), cte2 AS (...) SELECT ...'
        ],
        detailed: `**Common Table Expressions (CTEs)** are temporary named result sets defined using the WITH clause. They make complex queries more readable by breaking them into logical steps.

**Recursive CTEs** reference themselves, enabling queries on hierarchical/tree-structured data (org charts, categories, paths).

**Syntax:**
\`\`\`
WITH cte_name AS (
    SELECT ...
)
SELECT * FROM cte_name;
\`\`\`

**Recursive CTE:**
\`\`\`
WITH RECURSIVE cte AS (
    -- Anchor: starting rows
    SELECT ... WHERE parent IS NULL
    UNION ALL
    -- Recursive: join with itself
    SELECT ... FROM table JOIN cte ON ...
)
SELECT * FROM cte;
\`\`\``,
        examples: [
          {
            title: 'CTE & Recursive CTE',
            type: 'code',
            language: 'sql',
            code: `-- Simple CTE — improve readability
WITH dept_stats AS (
    SELECT department_id, AVG(salary) AS avg_salary, COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
),
high_paying_depts AS (
    SELECT department_id FROM dept_stats WHERE avg_salary > 80000
)
SELECT e.name, e.salary, ds.avg_salary
FROM employees e
JOIN dept_stats ds ON e.department_id = ds.department_id
WHERE e.department_id IN (SELECT department_id FROM high_paying_depts);

-- Recursive CTE — Organization hierarchy
WITH RECURSIVE org_tree AS (
    -- Anchor: top-level managers (no manager)
    SELECT id, name, manager_id, 1 AS level, CAST(name AS CHAR(500)) AS path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: find reports for each manager
    SELECT e.id, e.name, e.manager_id, ot.level + 1,
           CONCAT(ot.path, ' → ', e.name)
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT REPEAT('  ', level - 1) || name AS org_chart, level, path
FROM org_tree
ORDER BY path;

-- Result:
-- CEO                    level=1  path=CEO
--   VP Engineering       level=2  path=CEO → VP Engineering
--     Tech Lead          level=3  path=CEO → VP Engineering → Tech Lead
--       Developer        level=4  ...`,
            explanation: 'CTEs break complex queries into readable steps. Recursive CTEs traverse hierarchical data like org charts, categories, or file systems.'
          }
        ]
      },
      {
        id: 'db-window-functions',
        title: 'Window Functions (RANK, ROW_NUMBER, LEAD, LAG)',
        level: 'mid',
        shortDesc: 'Window functions compute values across a set of rows (window) without collapsing them. OVER(PARTITION BY ... ORDER BY ...). Types: ranking, aggregate, value functions.',
        keyPoints: [
          'Window functions operate on a "window" of rows defined by OVER()',
          'Unlike GROUP BY, window functions don\'t collapse rows',
          'PARTITION BY: divides rows into groups (like GROUP BY but keeps rows)',
          'ORDER BY: defines row order within partition',
          'ROW_NUMBER(): unique sequential number per partition',
          'RANK(): same rank for ties, gaps after (1,1,3)',
          'DENSE_RANK(): same rank for ties, no gaps (1,1,2)',
          'NTILE(n): divide rows into n equal groups',
          'LAG(col, n): access value from n rows before current',
          'LEAD(col, n): access value from n rows after current',
          'SUM/AVG/COUNT OVER(): running totals and moving averages',
          'ROWS BETWEEN: define window frame (UNBOUNDED PRECEDING, CURRENT ROW)'
        ],
        detailed: `**Window Functions** perform calculations across a set of table rows that are related to the current row, without grouping the result.

**Syntax:** \`function() OVER (PARTITION BY col ORDER BY col ROWS BETWEEN ...)\`

**Types:**
1. **Ranking:** ROW_NUMBER, RANK, DENSE_RANK, NTILE
2. **Aggregate:** SUM, AVG, COUNT, MIN, MAX (with OVER)
3. **Value:** LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE

**Common Interview Questions:**
- Find the Nth highest salary
- Find top N per group
- Running total / cumulative sum
- Compare with previous/next row`,
        examples: [
          {
            title: 'Window Functions Examples',
            type: 'code',
            language: 'sql',
            code: `-- Ranking functions
SELECT
    name, department_id, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,        -- 1,2,3,4,5
    RANK()       OVER (ORDER BY salary DESC) AS rnk,            -- 1,2,2,4,5
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk,      -- 1,2,2,3,4
    NTILE(4)     OVER (ORDER BY salary DESC) AS quartile         -- 1,1,2,2,3
FROM employees;

-- Top 3 salary per department
WITH ranked AS (
    SELECT name, department_id, salary,
           DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT * FROM ranked WHERE rnk <= 3;

-- Nth highest salary (e.g., 3rd highest)
SELECT DISTINCT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t WHERE rnk = 3;

-- LAG / LEAD — compare with previous/next row
SELECT
    name, salary,
    LAG(salary, 1)  OVER (ORDER BY hire_date) AS prev_salary,
    LEAD(salary, 1) OVER (ORDER BY hire_date) AS next_salary,
    salary - LAG(salary, 1) OVER (ORDER BY hire_date) AS salary_diff
FROM employees;

-- Running total
SELECT
    order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total,
    AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3
FROM orders;

-- Percentage of department total
SELECT name, department_id, salary,
    ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS pct_of_dept
FROM employees;`,
            explanation: 'Window functions are powerful for ranking, comparing rows, and computing running totals without losing detail rows.'
          }
        ]
      }
    ]
  },

  {
    id: 'db-procedures-functions',
    name: 'Stored Procedures & Functions',
    icon: '⚙️',
    concepts: [
      {
        id: 'db-procedures',
        title: 'Stored Procedures & Functions',
        level: 'junior',
        shortDesc: 'Stored Procedure: precompiled SQL program (can return multiple result sets, has IN/OUT params). Function: returns a single value, can be used in SELECT. Both stored in DB.',
        keyPoints: [
          'Stored Procedure: precompiled SQL block stored in database',
          'Parameters: IN (input), OUT (output), INOUT (both)',
          'Can return multiple result sets, perform DML operations',
          'Function: returns a single value, can be used in SQL expressions',
          'Function should be deterministic and side-effect free',
          'Procedures called with CALL, functions used in SELECT/WHERE',
          'Benefits: reduced network traffic, precompiled (faster), reusable, secure',
          'Drawbacks: hard to debug, vendor-specific, version control challenges',
          'Triggers: auto-execute on INSERT/UPDATE/DELETE events',
          'Cursors: iterate through result sets row by row'
        ],
        detailed: `**Stored Procedures** are precompiled SQL programs stored in the database. They can accept parameters, execute complex logic, and return results.

**Functions** return a single value and can be used within SQL statements (SELECT, WHERE, etc.).

**Procedure vs Function:**
| Feature        | Procedure          | Function          |
|----------------|-------------------|-------------------|
| Returns        | 0 to many results | Single value      |
| Use in SELECT  | No                | Yes               |
| DML operations | Yes               | Depends on DB     |
| Called via      | CALL              | In SQL expression |
| Transaction    | Can manage        | Usually not       |`,
        examples: [
          {
            title: 'Procedure & Function Examples',
            type: 'code',
            language: 'sql',
            code: `-- Stored Procedure with IN/OUT parameters
DELIMITER //
CREATE PROCEDURE GetEmployeeStats(
    IN dept_id INT,
    OUT emp_count INT,
    OUT avg_salary DECIMAL(10,2)
)
BEGIN
    SELECT COUNT(*), AVG(salary) INTO emp_count, avg_salary
    FROM employees
    WHERE department_id = dept_id;
END //
DELIMITER ;

-- Call procedure
CALL GetEmployeeStats(1, @count, @avg);
SELECT @count AS employee_count, @avg AS average_salary;

-- Stored Function
DELIMITER //
CREATE FUNCTION CalculateBonus(salary DECIMAL(10,2), rating INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE bonus DECIMAL(10,2);
    SET bonus = CASE
        WHEN rating >= 5 THEN salary * 0.20
        WHEN rating >= 3 THEN salary * 0.10
        ELSE salary * 0.05
    END;
    RETURN bonus;
END //
DELIMITER ;

-- Use function in query
SELECT name, salary, CalculateBonus(salary, performance_rating) AS bonus
FROM employees;

-- Trigger
CREATE TRIGGER audit_salary_change
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO salary_audit (employee_id, old_salary, new_salary, changed_at)
        VALUES (NEW.id, OLD.salary, NEW.salary, NOW());
    END IF;
END;`,
            explanation: 'Procedures handle complex operations with IN/OUT params. Functions return values for use in queries. Triggers auto-execute on data changes.'
          }
        ]
      }
    ]
  },

  {
    id: 'db-indexes-performance',
    name: 'Indexes & Performance',
    icon: '🚀',
    concepts: [
      {
        id: 'db-indexes',
        title: 'Indexes (B-Tree, Hash, Composite)',
        level: 'junior',
        shortDesc: 'Indexes speed up reads but slow writes. B-Tree: default, range queries. Hash: exact match only. Composite: multi-column (leftmost prefix rule). Clustered vs Non-clustered.',
        keyPoints: [
          'Index: data structure that speeds up data retrieval (like a book index)',
          'B-Tree index: default, supports range queries, sorting (most common)',
          'Hash index: only exact match (=), no range queries',
          'Composite index: multiple columns (follows leftmost prefix rule)',
          'Leftmost prefix: index on (a,b,c) can satisfy queries on (a), (a,b), (a,b,c)',
          'Clustered index: table data physically sorted by index (one per table)',
          'Non-clustered: separate structure pointing to data (multiple per table)',
          'Primary key creates clustered index automatically',
          'Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE',
          'EXPLAIN/EXPLAIN ANALYZE: analyze query execution plan',
          'Covering index: index contains all columns needed (no table lookup)',
          'Don\'t over-index: each index adds write overhead and storage'
        ],
        detailed: `**Indexes** are data structures maintained by the database to speed up data retrieval. Without an index, the database performs a full table scan.

**B-Tree Index (default):**
Balanced tree structure. Supports: =, <, >, <=, >=, BETWEEN, LIKE 'prefix%', ORDER BY. O(log n) lookup.

**Hash Index:**
Hash table structure. Supports only = comparisons. O(1) lookup but no range support.

**Composite Index (a, b, c):**
Follows leftmost prefix rule:
- WHERE a = 1 ✅ (uses index)
- WHERE a = 1 AND b = 2 ✅
- WHERE b = 2 ❌ (doesn't start with leftmost)
- WHERE a = 1 AND c = 3 ⚠️ (uses only 'a' portion)`,
        examples: [
          {
            title: 'Index Types & EXPLAIN',
            type: 'code',
            language: 'sql',
            code: `-- Create indexes
CREATE INDEX idx_emp_name ON employees(name);
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary);  -- Composite
CREATE UNIQUE INDEX idx_emp_email ON employees(email);

-- These queries USE the composite index (department_id, salary):
SELECT * FROM employees WHERE department_id = 1;              -- ✅ leftmost
SELECT * FROM employees WHERE department_id = 1 AND salary > 50000; -- ✅
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;    -- ✅

-- These DON'T use the composite index effectively:
SELECT * FROM employees WHERE salary > 50000;                -- ❌ skips leftmost
SELECT * FROM employees WHERE salary > 50000 AND department_id = 1; -- ⚠️ optimizer may reorder

-- EXPLAIN — analyze query plan
EXPLAIN SELECT * FROM employees WHERE department_id = 1;
-- Look for: type (ALL=full scan, ref=index, const=PK)
--           key (which index used), rows (estimated rows scanned)

EXPLAIN ANALYZE SELECT * FROM employees
WHERE department_id = 1 AND salary > 50000
ORDER BY salary;

-- Covering index (no table lookup needed)
CREATE INDEX idx_covering ON employees(department_id, salary, name);
SELECT name, salary FROM employees WHERE department_id = 1;
-- All columns in index → no table access needed!

-- When NOT to index:
-- Small tables (full scan is fast enough)
-- Columns with low cardinality (gender: M/F)
-- Tables with heavy INSERT/UPDATE/DELETE
-- Columns rarely used in WHERE/JOIN/ORDER BY`,
            explanation: 'B-Tree indexes are most common. Composite indexes follow leftmost prefix. Use EXPLAIN to verify query plans. Don\'t over-index.'
          }
        ]
      },
      {
        id: 'db-performance',
        title: 'Query Performance Optimization',
        level: 'mid',
        shortDesc: 'Use EXPLAIN to analyze. Add indexes on WHERE/JOIN/ORDER BY columns. Avoid SELECT *. Use pagination. Optimize JOINs. Avoid functions on indexed columns.',
        keyPoints: [
          'Use EXPLAIN/EXPLAIN ANALYZE to understand query plans',
          'Index columns used in WHERE, JOIN, ORDER BY, GROUP BY',
          'Avoid SELECT * — select only needed columns',
          'Use LIMIT for pagination (don\'t fetch all rows)',
          'Avoid functions on indexed columns: WHERE YEAR(date) = 2024 ❌',
          'Rewrite: WHERE date >= \'2024-01-01\' AND date < \'2025-01-01\' ✅',
          'Use JOINs instead of correlated subqueries',
          'Batch INSERT instead of one-by-one',
          'Use connection pooling (HikariCP)',
          'Normalize for writes, denormalize for reads',
          'Partitioning: split large tables by range/hash/list',
          'Query cache: cache frequently executed queries'
        ],
        detailed: `**Performance Optimization Steps:**

1. **Identify slow queries:** Enable slow query log, use monitoring tools
2. **Analyze with EXPLAIN:** Check for full table scans, missing indexes
3. **Optimize indexes:** Add missing indexes, remove unused ones
4. **Rewrite queries:** Avoid anti-patterns, use efficient constructs
5. **Optimize schema:** Proper data types, normalization/denormalization
6. **Application-level:** Caching, connection pooling, batch operations

**Common Anti-Patterns:**
- SELECT * (fetches unnecessary data)
- N+1 queries (use JOIN or batch fetch)
- Functions on indexed columns (prevents index usage)
- Missing indexes on JOIN conditions
- NOT IN with NULLs (use NOT EXISTS instead)`,
        examples: [
          {
            title: 'Performance Optimization Tips',
            type: 'code',
            language: 'sql',
            code: `-- ❌ Bad: Function on indexed column (can't use index)
SELECT * FROM orders WHERE YEAR(created_at) = 2024;
-- ✅ Good: Range comparison (uses index)
SELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';

-- ❌ Bad: SELECT * (fetches all columns)
SELECT * FROM employees WHERE department_id = 1;
-- ✅ Good: Select only needed columns
SELECT id, name, salary FROM employees WHERE department_id = 1;

-- ❌ Bad: NOT IN with potential NULLs
SELECT * FROM employees WHERE id NOT IN (SELECT manager_id FROM employees);
-- ✅ Good: NOT EXISTS
SELECT * FROM employees e
WHERE NOT EXISTS (SELECT 1 FROM employees e2 WHERE e2.manager_id = e.id);

-- ❌ Bad: Leading wildcard (can't use index)
SELECT * FROM products WHERE name LIKE '%phone%';
-- ✅ Better: Full-text index
CREATE FULLTEXT INDEX idx_name ON products(name);
SELECT * FROM products WHERE MATCH(name) AGAINST('phone');

-- Pagination optimization
-- ❌ Bad: Large OFFSET (scans and discards rows)
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 100000;
-- ✅ Good: Keyset pagination
SELECT * FROM products WHERE id > 100000 ORDER BY id LIMIT 20;

-- Batch operations
-- ❌ Bad: Insert one by one
INSERT INTO logs (msg) VALUES ('a');
INSERT INTO logs (msg) VALUES ('b');
-- ✅ Good: Batch insert
INSERT INTO logs (msg) VALUES ('a'), ('b'), ('c'), ('d');`,
            explanation: 'Avoid anti-patterns that prevent index usage. Use EXPLAIN to verify. Keyset pagination is much faster than OFFSET for large datasets.'
          }
        ]
      }
    ]
  },

  {
    id: 'db-normalization',
    name: 'Normalization & Architecture',
    icon: '🏛️',
    concepts: [
      {
        id: 'db-normalization',
        title: 'Normalization (1NF to BCNF)',
        level: 'junior',
        shortDesc: '1NF: atomic values. 2NF: no partial dependencies. 3NF: no transitive dependencies. BCNF: every determinant is a candidate key. Reduces redundancy.',
        keyPoints: [
          '1NF: atomic values (no repeating groups, no multi-valued columns)',
          '2NF: 1NF + no partial dependency (non-key depends on part of composite key)',
          '3NF: 2NF + no transitive dependency (non-key depends on another non-key)',
          'BCNF: 3NF + every determinant is a candidate key',
          'Normalization reduces data redundancy and anomalies',
          'Insert/Update/Delete anomalies prevented by normalization',
          'Denormalization: intentionally add redundancy for read performance',
          'OLTP (transactional): normalize (3NF). OLAP (analytics): denormalize (star schema)',
          'Trade-off: more JOINs (normalized) vs more storage + update complexity (denormalized)',
          'Most applications target 3NF as the sweet spot'
        ],
        detailed: `**Normalization** is the process of organizing data to minimize redundancy and dependency.

**Normal Forms:**
1. **1NF:** Each cell contains atomic (single) values. Each row is unique.
2. **2NF:** 1NF + every non-key column depends on the ENTIRE primary key (no partial dependency).
3. **3NF:** 2NF + no non-key column depends on another non-key column (no transitive dependency).
4. **BCNF:** 3NF + every determinant is a candidate key.

**When to Denormalize:**
- Read-heavy workloads (dashboards, reports)
- Reducing complex JOINs
- Caching computed values
- Data warehousing (star/snowflake schema)`,
        examples: [
          {
            title: 'Normalization Steps',
            type: 'code',
            language: 'sql',
            code: `-- ❌ Unnormalized (violates 1NF)
-- | id | name  | phones              | orders          |
-- | 1  | Alice | 123-456, 789-012    | Laptop, Mouse   |

-- ✅ 1NF: Atomic values, separate rows
CREATE TABLE customers (id INT, name VARCHAR(100));
CREATE TABLE phones (id INT, customer_id INT, phone VARCHAR(15));

-- ❌ Violates 2NF (partial dependency)
-- Table: order_items (order_id, product_id, product_name, quantity)
-- product_name depends only on product_id (partial dependency on composite key)

-- ✅ 2NF: Separate tables
CREATE TABLE products (product_id INT PRIMARY KEY, product_name VARCHAR(100));
CREATE TABLE order_items (order_id INT, product_id INT, quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id));

-- ❌ Violates 3NF (transitive dependency)
-- Table: employees (id, name, dept_id, dept_name, dept_location)
-- dept_name depends on dept_id, not directly on employee id

-- ✅ 3NF: Remove transitive dependency
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100),
    dept_location VARCHAR(100)
);
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Denormalized for reporting (intentional redundancy)
CREATE TABLE order_summary (
    order_id INT,
    customer_name VARCHAR(100),  -- Redundant but avoids JOIN
    total_amount DECIMAL(10,2),  -- Pre-calculated
    item_count INT               -- Pre-calculated
);`,
            explanation: '1NF→atomic values. 2NF→no partial deps. 3NF→no transitive deps. Normalize for OLTP (writes), denormalize for OLAP (reads).'
          }
        ]
      },
      {
        id: 'db-architecture',
        title: 'DB-First vs Application-First Architecture',
        level: 'mid',
        shortDesc: 'DB-First: design schema first, generate code (traditional). App-First: design domain model, generate schema (DDD, JPA). Code-First uses ORM for schema evolution.',
        keyPoints: [
          'DB-First: design database schema, then generate code/entities',
          'App-First (Code-First): design domain classes, generate schema from code',
          'DB-First: common in data-heavy applications, legacy systems',
          'App-First: common in DDD (Domain-Driven Design), greenfield projects',
          'JPA/Hibernate: ddl-auto=update generates schema from entities',
          'Flyway/Liquibase: database migration tools (version-controlled SQL)',
          'DB-First pros: DBA control, optimized schema, stored procedures',
          'App-First pros: faster development, ORM integration, cleaner domain model',
          'Production: always use migration tools (Flyway/Liquibase), not ddl-auto',
          'Hybrid: start code-first, then manage schema with migrations'
        ],
        detailed: `**DB-First Architecture:**
1. Design database schema (ER diagrams, DDL scripts)
2. Generate entity classes from schema
3. Application code works with generated entities
Best for: data-centric apps, legacy integration, DBA-managed schemas

**Application-First (Code-First) Architecture:**
1. Design domain model classes (Java entities)
2. ORM generates/updates database schema
3. Migrations manage schema evolution
Best for: DDD, agile development, microservices

**Migration Tools:**
- **Flyway:** SQL-based migrations (V1__create_users.sql, V2__add_email.sql)
- **Liquibase:** XML/YAML/JSON/SQL changesets with rollback support

**Production Best Practice:** Always use migration tools. Never use ddl-auto=update in production.`,
        examples: [
          {
            title: 'Code-First with Flyway Migrations',
            type: 'code',
            language: 'sql',
            code: `-- Application-First: JPA Entity → Schema
-- @Entity class:
-- @Entity
-- @Table(name = "users")
-- public class User {
--     @Id @GeneratedValue Long id;
--     @Column(nullable = false) String name;
--     @Column(unique = true) String email;
--     @OneToMany(mappedBy = "user") List<Order> orders;
-- }
-- spring.jpa.hibernate.ddl-auto=validate  (production: validate only!)

-- Flyway migration: V1__create_users.sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V2__add_phone_column.sql
ALTER TABLE users ADD COLUMN phone VARCHAR(15);

-- V3__create_orders.sql
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- V4__add_index.sql
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- application.properties:
-- spring.flyway.enabled=true
-- spring.flyway.locations=classpath:db/migration`,
            explanation: 'Code-First defines entities, Flyway manages schema migrations. Each migration is versioned and applied once. Use validate in production.'
          }
        ]
      },
      {
        id: 'db-transactions-acid',
        title: 'Transactions & ACID Properties',
        level: 'fresher',
        shortDesc: 'Atomicity: all-or-nothing. Consistency: valid state transitions. Isolation: concurrent transactions don\'t interfere. Durability: committed data persists.',
        keyPoints: [
          'Atomicity: all operations succeed or all fail (rollback)',
          'Consistency: database moves from one valid state to another',
          'Isolation: concurrent transactions don\'t affect each other',
          'Durability: committed data survives crashes (written to disk)',
          'Isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE',
          'READ UNCOMMITTED: dirty reads possible (fastest, least safe)',
          'READ COMMITTED: no dirty reads (PostgreSQL default)',
          'REPEATABLE READ: no non-repeatable reads (MySQL InnoDB default)',
          'SERIALIZABLE: no phantom reads (slowest, most safe)',
          'Dirty read: reading uncommitted data from another transaction',
          'Non-repeatable read: same query returns different results in same transaction',
          'Phantom read: new rows appear in repeated queries'
        ],
        detailed: `**ACID Properties** ensure reliable database transactions:

**Atomicity:** Transaction is atomic — either ALL operations complete or NONE. If any operation fails, the entire transaction is rolled back.

**Consistency:** Transaction brings the database from one valid state to another. Constraints, triggers, and cascades are enforced.

**Isolation:** Concurrent transactions execute as if they were serial. Isolation levels control the trade-off between concurrency and consistency.

**Durability:** Once committed, data is permanently saved even in case of power failure or crash.

**Isolation Levels:**
| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|-----------|----------------|---------|
| READ UNCOMMITTED | ✅ | ✅ | ✅ |
| READ COMMITTED | ❌ | ✅ | ✅ |
| REPEATABLE READ | ❌ | ❌ | ✅ |
| SERIALIZABLE | ❌ | ❌ | ❌ |`,
        examples: [
          {
            title: 'Transactions & Isolation',
            type: 'code',
            language: 'sql',
            code: `-- Transaction example: Bank transfer
START TRANSACTION;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A001';
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B002';

    -- Check constraints
    SELECT balance FROM accounts WHERE account_id = 'A001';
    -- If balance < 0, rollback:
    -- ROLLBACK;
COMMIT;

-- Savepoint: partial rollback
START TRANSACTION;
    INSERT INTO orders (customer_id, total) VALUES (1, 100);
    SAVEPOINT order_created;

    INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 101, 2);
    -- Oops, wrong item:
    ROLLBACK TO order_created;  -- Undo only items, keep order

    INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 102, 1);
COMMIT;

-- Set isolation level
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
    SELECT * FROM products WHERE price > 100;
    -- Another transaction inserts a product with price > 100
    SELECT * FROM products WHERE price > 100;  -- Same result (no phantom)
COMMIT;`,
            explanation: 'Transactions ensure ACID properties. SAVEPOINT enables partial rollback. Isolation levels control visibility of concurrent changes.'
          }
        ]
      }
    ]
  }
];

export default databaseTopics;

