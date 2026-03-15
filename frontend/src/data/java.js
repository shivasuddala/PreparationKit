// ============================================================
// JAVA - Complete Interview Preparation Data
// ============================================================

const javaTopics = [
  // ──────────────────────────────────────────────
  // 1. JAVA OVERVIEW & JVM ARCHITECTURE
  // ──────────────────────────────────────────────
  {
    id: 'java-overview',
    name: 'Java, JVM, JDK & JRE',
    icon: '☕',
    concepts: [
      {
        id: 'j-what-is-java',
        title: 'What is Java?',
        level: 'fresher',
        shortDesc: 'High-level, object-oriented, platform-independent programming language developed by Sun Microsystems in 1995.',
        keyPoints: [
          'Platform independent — Write Once, Run Anywhere (WORA)',
          'Object-oriented programming language',
          'Strongly typed and compiled to bytecode',
          'Runs on JVM (Java Virtual Machine)',
          'Automatic garbage collection',
          'Supports multithreading natively',
          'Secure — no explicit pointers, bytecode verification',
          'Current owner: Oracle Corporation'
        ],
        detailed: `Java is a versatile, platform-independent, object-oriented programming language developed by James Gosling at Sun Microsystems in 1995 (now owned by Oracle).

**Key Characteristics:**
- **Platform Independent**: Write Once, Run Anywhere (WORA) — Java bytecode runs on any platform with a JVM
- **Object-Oriented**: Everything in Java is an object (except primitives)
- **Robust**: Strong memory management, exception handling, strict type checking
- **Secure**: No explicit pointers, bytecode verification, security manager
- **Multi-threaded**: Built-in support for concurrent programming
- **High Performance**: JIT (Just-In-Time) compilation optimizes bytecode at runtime

**Architecture:**
Source Code (.java) → Compiler (javac) → Bytecode (.class) → JVM → Machine Code`,
        examples: [
          {
            title: 'Hello World — Basic Java Program',
            type: 'code',
            language: 'java',
            code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            explanation: 'Every Java program needs a class and a main() method as the entry point. The public static void main(String[] args) signature is required.'
          },
          {
            title: 'Compilation & Execution Flow',
            type: 'scenario',
            language: 'bash',
            code: `# Step 1: Write source code
echo 'public class Demo { public static void main(String[] args) { System.out.println("Demo"); } }' > Demo.java

# Step 2: Compile to bytecode
javac Demo.java    # Produces Demo.class

# Step 3: Run on JVM
java Demo          # Output: Demo`,
            explanation: 'Java source (.java) is compiled to bytecode (.class) by javac, then executed by the JVM. The same .class file runs on any OS with a compatible JVM.'
          }
        ]
      },
      {
        id: 'j-jvm-jre-jdk',
        title: 'JVM vs JRE vs JDK',
        level: 'fresher',
        shortDesc: 'JDK = development kit (compiler + tools + JRE). JRE = runtime (JVM + libraries). JVM = virtual machine that executes bytecode.',
        keyPoints: [
          'JDK = JRE + Development Tools (javac, jar, javadoc, jdb)',
          'JRE = JVM + Core Libraries + Supporting Files',
          'JVM = Execution Engine + Memory Areas + Class Loader',
          'JVM is platform-specific; bytecode is platform-independent',
          'Developers need JDK; end-users need only JRE',
          'JVM memory areas: Heap, Stack, Method Area, PC Register, Native Method Stack',
          'JIT compiler inside JVM converts hot bytecode to native code',
          'From Java 11+, JRE is no longer distributed separately'
        ],
        detailed: `**JDK (Java Development Kit):**
Complete development environment. Contains JRE plus development tools like javac (compiler), jar, javadoc, and debugging tools. Required by developers.

**JRE (Java Runtime Environment):**
Provides runtime environment. Contains JVM plus core class libraries and supporting files. Required to run Java applications. End users only need JRE.

**JVM (Java Virtual Machine):**
Abstract machine that provides a runtime environment for executing Java bytecode. It is platform-specific (each OS has its own JVM implementation), but the bytecode it runs is platform-independent.

**JVM Components:**
- Class Loader Subsystem (Loading, Linking, Initialization)
- Runtime Data Areas (Method Area, Heap, Stack, PC Register, Native Method Stack)
- Execution Engine (Interpreter, JIT Compiler, Garbage Collector)

**Hierarchy:** JDK ⊃ JRE ⊃ JVM`,
        examples: [
          {
            title: 'JDK / JRE / JVM Hierarchy',
            type: 'comparison',
            language: 'text',
            code: `┌──────────────────────────────────────────────┐
│ JDK (Java Development Kit)                   │
│  ┌───────────────────────────────────────┐   │
│  │ JRE (Java Runtime Environment)        │   │
│  │  ┌────────────────────────────────┐   │   │
│  │  │ JVM (Java Virtual Machine)     │   │   │
│  │  │  • Class Loader                │   │   │
│  │  │  • Bytecode Verifier           │   │   │
│  │  │  • Execution Engine (JIT)      │   │   │
│  │  │  • Garbage Collector           │   │   │
│  │  └────────────────────────────────┘   │   │
│  │  + Core Libraries (java.lang, etc.)   │   │
│  └───────────────────────────────────────┘   │
│  + javac, jar, javadoc, jdb, jconsole        │
└──────────────────────────────────────────────┘`,
            explanation: 'JDK contains everything needed to develop and run Java applications. JRE is for running only. JVM is the core execution engine.'
          },
          {
            title: 'JVM Memory Areas',
            type: 'code',
            language: 'text',
            code: `JVM Memory Structure:
┌─────────────────────────────────────────┐
│ Method Area (shared)                    │  ← Class metadata, static vars, constant pool
├─────────────────────────────────────────┤
│ Heap (shared)                           │  ← Objects, instance variables
│   ├── Young Gen (Eden + S0 + S1)        │
│   └── Old Gen (Tenured)                 │
├──────────────┬──────────────────────────┤
│ Stack        │ PC Register              │  ← Per-thread
│ (per thread) │ (per thread)             │
├──────────────┼──────────────────────────┤
│ Native Method Stack (per thread)        │
└─────────────────────────────────────────┘`,
            explanation: 'Heap and Method Area are shared across threads. Stack, PC Register, and Native Method Stack are per-thread. Young Gen uses minor GC; Old Gen uses major GC.'
          }
        ]
      },
      {
        id: 'j-bytecode-jit',
        title: 'Bytecode & JIT Compilation',
        level: 'fresher',
        shortDesc: 'Bytecode is intermediate platform-independent code (.class). JIT compiler converts frequently-used bytecode to native machine code at runtime for performance.',
        keyPoints: [
          'Bytecode is intermediate code stored in .class files',
          'Generated by javac compiler from .java source files',
          'Platform-independent — same bytecode runs on any JVM',
          'JIT (Just-In-Time) compiler optimizes hot code paths at runtime',
          'JIT converts frequently executed bytecode into native machine code',
          'Bytecode verification ensures security before execution',
          'JVM uses interpreter for cold paths, JIT for hot paths'
        ],
        detailed: `**Bytecode** is the intermediate representation of Java code. When you compile a .java file, the Java compiler (javac) produces .class files containing bytecode instructions that the JVM understands.

**JIT (Just-In-Time) Compiler** is part of the JVM execution engine. It monitors which methods are called frequently ("hot spots") and compiles them to native machine code for direct execution, bypassing the interpreter. This is why Java performance improves over time during execution.

**Process:**
1. Source code (.java) → javac → Bytecode (.class)
2. JVM loads bytecode via Class Loader
3. Bytecode Verifier checks for safety
4. Interpreter executes bytecode line by line
5. JIT compiler identifies hot methods and compiles them to native code
6. Subsequent calls to hot methods execute native code directly`,
        examples: [
          {
            title: 'Viewing Bytecode with javap',
            type: 'code',
            language: 'bash',
            code: `# Compile
javac Example.java

# View bytecode
javap -c Example.class

# Output (simplified):
# public static void main(java.lang.String[]);
#   Code:
#     0: getstatic     #2  // System.out
#     3: ldc           #3  // "Hello"
#     5: invokevirtual #4  // println
#     8: return`,
            explanation: 'Use javap -c to disassemble .class files and inspect the bytecode instructions generated by the compiler.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 2. MEMORY MANAGEMENT
  // ──────────────────────────────────────────────
  {
    id: 'java-memory',
    name: 'Memory Management',
    icon: '🧠',
    concepts: [
      {
        id: 'j-heap-stack',
        title: 'Heap vs Stack Memory',
        level: 'fresher',
        shortDesc: 'Stack stores method frames and local variables (LIFO, per-thread). Heap stores objects and instance variables (shared, GC-managed).',
        keyPoints: [
          'Stack: stores local variables, method frames, references — LIFO per thread',
          'Heap: stores objects and instance variables — shared across threads',
          'Stack memory is faster (contiguous allocation)',
          'Heap memory is managed by Garbage Collector',
          'StackOverflowError: deep/infinite recursion',
          'OutOfMemoryError: heap is full, GC can\'t reclaim enough',
          'Primitives on stack, objects on heap, references on stack',
          '-Xms (initial heap), -Xmx (max heap), -Xss (stack size)'
        ],
        detailed: `**Stack Memory:**
- Stores method call frames, local variables, and references
- Each thread has its own stack (thread-safe)
- Follows LIFO (Last In, First Out) order
- Memory is automatically allocated/deallocated with method calls
- Very fast access (contiguous memory)
- StackOverflowError thrown when stack is full (deep recursion)

**Heap Memory:**
- Stores all objects and their instance variables
- Shared across all threads (not thread-safe by default)
- Managed by Garbage Collector
- Divided into Young Generation and Old Generation
- OutOfMemoryError thrown when heap is full

**Key Differences:**
Stack is per-thread, fast, auto-managed; Heap is shared, slower, GC-managed.`,
        examples: [
          {
            title: 'Stack vs Heap in Action',
            type: 'code',
            language: 'java',
            code: `public class MemoryDemo {
    int instanceVar = 10;       // Heap (part of object)
    static int staticVar = 20;  // Method Area

    public static void main(String[] args) {  // Stack frame: main
        int localVar = 30;                     // Stack
        String name = "Java";                  // "Java" in String Pool, ref on Stack
        MemoryDemo obj = new MemoryDemo();     // obj ref on Stack, object on Heap
        obj.calculate(5);                      // New stack frame: calculate
    }

    void calculate(int x) {     // Stack frame: calculate
        int result = x * 2;     // Stack
        Object temp = new Object(); // temp ref on Stack, Object on Heap
    }  // calculate frame popped, temp eligible for GC
}`,
            explanation: 'Local variables and references live on the stack. Actual objects are allocated on the heap. When methods return, their stack frame is popped.'
          },
          {
            title: 'JVM Flags for Memory Tuning',
            type: 'code',
            language: 'bash',
            code: `# Set initial and max heap size
java -Xms256m -Xmx1024m MyApp

# Set thread stack size
java -Xss512k MyApp

# Enable GC logging
java -verbose:gc -Xlog:gc* MyApp

# Set Young Generation size
java -Xmn256m MyApp`,
            explanation: 'JVM provides flags to control memory allocation. -Xms sets initial heap, -Xmx sets maximum heap, -Xss sets stack size per thread.'
          }
        ]
      },
      {
        id: 'j-garbage-collection',
        title: 'Garbage Collection',
        level: 'junior',
        shortDesc: 'GC automatically reclaims memory from unreachable objects. Generational: Young Gen (minor GC), Old Gen (major GC). Types: Serial, Parallel, G1, ZGC.',
        keyPoints: [
          'GC automatically reclaims heap memory from unreachable objects',
          'Young Gen: Eden + Survivor spaces (S0, S1) — minor GC',
          'Old Gen (Tenured): long-lived objects — major GC',
          'GC Roots: stack references, static fields, JNI references',
          'Mark-Sweep-Compact algorithm for Old Gen',
          'Serial GC: single-threaded, small heaps',
          'Parallel GC: multi-threaded, throughput-focused (default until Java 8)',
          'G1 GC: region-based, low-latency (default Java 9+)',
          'ZGC: ultra-low pause time (<10ms), Java 11+',
          'System.gc() is only a suggestion, not guaranteed',
          'finalize() is deprecated — use try-with-resources or Cleaner'
        ],
        detailed: `**How GC Works:**
1. **Mark**: Traverse from GC roots, mark all reachable objects
2. **Sweep**: Remove unmarked (unreachable) objects
3. **Compact**: Defragment memory (move live objects together)

**Generational Collection:**
- New objects go to Eden (Young Gen)
- Surviving objects move to Survivor spaces (S0 ↔ S1)
- After several minor GC cycles, promoted to Old Gen
- Major GC cleans Old Gen (more expensive, causes longer pauses)

**GC Types:**
| GC Type   | Threads | Best For                   |
|-----------|---------|----------------------------|
| Serial    | Single  | Small apps, client machines |
| Parallel  | Multi   | Throughput, batch jobs      |
| G1        | Multi   | Balanced latency/throughput |
| ZGC       | Multi   | Ultra-low latency (<10ms)  |
| Shenandoah| Multi   | Low-latency, large heaps   |`,
        examples: [
          {
            title: 'Object Lifecycle & GC',
            type: 'code',
            language: 'java',
            code: `public class GCDemo {
    public static void main(String[] args) {
        // Object created in Eden
        Object obj1 = new Object();
        Object obj2 = new Object();

        // obj1 becomes eligible for GC
        obj1 = null;

        // Suggest GC (not guaranteed)
        System.gc();

        // Circular reference — still eligible for GC
        // (Java uses reachability, not reference counting)
        class Node { Node next; }
        Node a = new Node();
        Node b = new Node();
        a.next = b;
        b.next = a;
        a = null;
        b = null;
        // Both nodes are now unreachable — eligible for GC
    }
}`,
            explanation: 'Objects become eligible for GC when they are unreachable from any GC root. Java does NOT use reference counting, so circular references are handled correctly.'
          },
          {
            title: 'GC Algorithm Selection',
            type: 'code',
            language: 'bash',
            code: `# Serial GC
java -XX:+UseSerialGC MyApp

# Parallel GC (default Java 8)
java -XX:+UseParallelGC MyApp

# G1 GC (default Java 9+)
java -XX:+UseG1GC MyApp

# ZGC (Java 11+)
java -XX:+UseZGC MyApp

# Shenandoah GC
java -XX:+UseShenandoahGC MyApp`,
            explanation: 'Choose GC based on your application needs: throughput vs latency vs memory footprint.'
          }
        ]
      },
      {
        id: 'j-string-pool',
        title: 'String Pool & Memory',
        level: 'fresher',
        shortDesc: 'String Pool (in Heap since Java 7) caches string literals for reuse. String is immutable. new String() creates separate heap object.',
        keyPoints: [
          'String Pool is a special area in Heap memory (moved from PermGen in Java 7)',
          'String literals are automatically interned (stored in pool)',
          'new String("abc") creates 2 objects: one in pool, one in heap',
          'intern() method explicitly adds string to pool',
          'String is immutable — concatenation creates new objects',
          'StringBuilder for single-threaded mutable strings',
          'StringBuffer for thread-safe mutable strings (synchronized)',
          '+ operator on Strings uses StringBuilder internally (since Java 5)'
        ],
        detailed: `**String Pool** is a cache of String objects stored in the Heap. When you use a string literal, Java checks if an identical string already exists in the pool. If yes, it returns the existing reference. If no, it creates a new string in the pool.

**Why Strings Are Immutable:**
- Thread safety without synchronization
- String pool would break if strings were mutable
- Hashcode caching for HashMap keys
- Security (class loading, network connections use strings)

**Memory Comparison:**
- \`String s = "hello"\` → 1 object (in pool)
- \`String s = new String("hello")\` → 2 objects (pool + heap)
- \`s.intern()\` → returns pool reference`,
        examples: [
          {
            title: 'String Pool Behavior',
            type: 'code',
            language: 'java',
            code: `String s1 = "Hello";              // Pool
String s2 = "Hello";              // Same pool ref
String s3 = new String("Hello");  // New heap object
String s4 = s3.intern();          // Returns pool ref

System.out.println(s1 == s2);      // true  (same pool reference)
System.out.println(s1 == s3);      // false (different objects)
System.out.println(s1 == s4);      // true  (intern returns pool ref)
System.out.println(s1.equals(s3)); // true  (same content)`,
            explanation: '== compares references. .equals() compares content. String pool ensures literals with same content share the same object.'
          },
          {
            title: 'String vs StringBuilder vs StringBuffer',
            type: 'comparison',
            language: 'java',
            code: `// String — immutable, creates new objects on modification
String str = "Hello";
str = str + " World";  // New object created, old "Hello" eligible for GC

// StringBuilder — mutable, NOT thread-safe, faster
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");   // Same object modified
sb.insert(5, ",");     // "Hello, World"
sb.reverse();          // "dlroW ,olleH"

// StringBuffer — mutable, thread-safe (synchronized), slower
StringBuffer sbuf = new StringBuffer("Hello");
sbuf.append(" World"); // Thread-safe modification

// Performance: StringBuilder > StringBuffer > String (for concatenation)
// Use String for constants, StringBuilder in methods, StringBuffer for shared data`,
            explanation: 'Choose String for immutable text, StringBuilder for building strings in a single thread, StringBuffer when thread safety is needed.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 3. DATA TYPES & VARIABLES
  // ──────────────────────────────────────────────
  {
    id: 'java-datatypes',
    name: 'Data Types & Variables',
    icon: '🔢',
    concepts: [
      {
        id: 'j-primitives',
        title: 'Primitive Data Types',
        level: 'fresher',
        shortDesc: '8 primitive types: byte(1), short(2), int(4), long(8), float(4), double(8), char(2), boolean. Stored on stack, not objects.',
        keyPoints: [
          'byte: 1 byte, -128 to 127',
          'short: 2 bytes, -32768 to 32767',
          'int: 4 bytes, -2^31 to 2^31-1 (default integer type)',
          'long: 4 bytes, -2^63 to 2^63-1 (suffix L)',
          'float: 4 bytes, ~7 decimal digits (suffix f)',
          'double: 8 bytes, ~15 decimal digits (default decimal type)',
          'char: 2 bytes, Unicode character (0 to 65535)',
          'boolean: true or false (size JVM-dependent)',
          'Default values: 0 for numeric, false for boolean, \\u0000 for char',
          'Autoboxing: automatic conversion between primitive and wrapper'
        ],
        detailed: `Java has 8 primitive data types that are not objects. They are stored directly in stack memory (for local variables) and offer better performance than wrapper objects.

**Type Promotion Rules:**
byte → short → int → long → float → double
char → int (automatically promoted in expressions)

**Wrapper Classes:** Each primitive has a corresponding wrapper class (Integer, Double, etc.) for use in collections and generics. Autoboxing/unboxing handles conversion automatically since Java 5.

**Default Values** apply to instance/static variables. Local variables MUST be initialized before use.`,
        examples: [
          {
            title: 'Primitive Types & Ranges',
            type: 'code',
            language: 'java',
            code: `byte b = 127;                  // 1 byte
short s = 32767;               // 2 bytes
int i = 2_147_483_647;         // 4 bytes (underscores for readability)
long l = 9_223_372_036_854_775_807L; // 8 bytes (L suffix)
float f = 3.14f;               // 4 bytes (f suffix required)
double d = 3.141592653589793;  // 8 bytes (default decimal)
char c = 'A';                  // 2 bytes (Unicode)
boolean flag = true;           // JVM-dependent size

// Type promotion
int result = b + s;            // byte + short → int
double mix = i + f;            // int + float → float → assigned to double

// Overflow
byte overflow = (byte) 128;   // -128 (wraps around)`,
            explanation: 'Java is strongly typed. Narrowing conversions require explicit casting. Widening conversions happen automatically.'
          },
          {
            title: 'Autoboxing & Unboxing',
            type: 'code',
            language: 'java',
            code: `// Autoboxing: primitive → Wrapper
Integer num = 42;            // int → Integer (autoboxing)
Double price = 9.99;         // double → Double

// Unboxing: Wrapper → primitive
int val = num;               // Integer → int (unboxing)

// Integer Cache: -128 to 127 are cached
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true (same cached object)

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false (different objects!)
System.out.println(c.equals(d)); // true (same value)

// NullPointerException risk
Integer nullInt = null;
int unboxed = nullInt;       // NullPointerException!`,
            explanation: 'Integer values between -128 and 127 are cached. Beyond that range, == compares references not values. Always use .equals() for wrapper comparison.'
          }
        ]
      },
      {
        id: 'j-variables',
        title: 'Types of Variables',
        level: 'fresher',
        shortDesc: 'Local (inside method, stack), Instance (per object, heap), Static/Class (shared, method area). var for local type inference (Java 10+).',
        keyPoints: [
          'Local variables: declared inside methods, stored on stack, no default value',
          'Instance variables: declared in class, stored on heap with object, have default values',
          'Static variables: belong to class, stored in method area, shared across all instances',
          'var keyword (Java 10+): local variable type inference',
          'final variables: value cannot be changed after assignment',
          'volatile: ensures visibility across threads',
          'transient: excluded from serialization'
        ],
        detailed: `**Local Variables:** Declared inside methods, constructors, or blocks. Must be initialized before use. Stored on the thread's stack. Not accessible outside the declaring method.

**Instance Variables (Non-static fields):** Declared in a class outside methods. Each object gets its own copy. Stored in heap memory with the object. Have default values (0, null, false).

**Static Variables (Class fields):** Declared with \`static\` keyword. Only one copy shared across all instances. Stored in Method Area. Initialized when class is loaded.

**var (Java 10+):** Allows the compiler to infer the type of local variables. The variable is still strongly typed at compile time.`,
        examples: [
          {
            title: 'Variable Types Demo',
            type: 'code',
            language: 'java',
            code: `public class VariableTypes {
    static int classCount = 0;     // Static variable (Method Area)
    int instanceId;                // Instance variable (Heap)
    final String TYPE = "DEMO";   // Final instance variable

    public void process() {
        int localVar = 10;         // Local variable (Stack) — must initialize
        var name = "Java";         // var — inferred as String (Java 10+)
        var list = List.of(1,2,3); // Inferred as List<Integer>

        classCount++;              // Shared across all instances
        instanceId = classCount;   // Unique per object
    }

    public static void main(String[] args) {
        VariableTypes v1 = new VariableTypes();
        VariableTypes v2 = new VariableTypes();
        v1.process();  // classCount=1, v1.instanceId=1
        v2.process();  // classCount=2, v2.instanceId=2
    }
}`,
            explanation: 'Static vars are shared, instance vars are per-object, local vars are per-method-call. var enables type inference for local variables only.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 4. KEYWORDS & MODIFIERS
  // ──────────────────────────────────────────────
  {
    id: 'java-keywords',
    name: 'Keywords & Modifiers',
    icon: '🔑',
    concepts: [
      {
        id: 'j-keywords',
        title: 'Java Keywords',
        level: 'fresher',
        shortDesc: 'Java has 50+ reserved keywords (abstract, class, final, static, etc.) that cannot be used as identifiers. null, true, false are literals, not keywords.',
        keyPoints: [
          '50+ reserved keywords in Java (cannot be used as variable names)',
          'Access: public, protected, private (+ default/package-private)',
          'Class: class, interface, enum, extends, implements, abstract',
          'Control: if, else, switch, case, default, for, while, do, break, continue, return',
          'Exception: try, catch, finally, throw, throws',
          'Modifier: static, final, abstract, synchronized, volatile, transient, native, strictfp',
          'Object: new, this, super, instanceof',
          'Type: void, byte, short, int, long, float, double, char, boolean',
          'Other: package, import, assert',
          'Reserved but unused: goto, const',
          'null, true, false are literals (not keywords)',
          'var, record, sealed, permits, yield are context-sensitive (Java 10+)'
        ],
        detailed: `Java keywords are reserved words with predefined meaning. They cannot be used as identifiers (variable names, class names, etc.).

**Categories:**
1. **Access Modifiers:** public, protected, private
2. **Non-Access Modifiers:** static, final, abstract, synchronized, volatile, transient, native
3. **Control Flow:** if, else, switch, for, while, do, break, continue, return
4. **Exception Handling:** try, catch, finally, throw, throws
5. **Class/Object:** class, interface, enum, extends, implements, new, this, super, instanceof
6. **Package:** package, import
7. **Data Types:** all primitive types + void

**Context-Sensitive Keywords (Java 10+):** var, record, sealed, permits, yield — these can be used as identifiers in some contexts but have special meaning in others.`,
        examples: [
          {
            title: 'Common Keywords in Action',
            type: 'code',
            language: 'java',
            code: `public class KeywordDemo {                   // public, class
    private static final int MAX = 100;      // private, static, final

    protected abstract void process();        // protected, abstract, void

    public synchronized void sync() {        // synchronized
        volatile int flag;                   // volatile (usually for fields)
    }

    public void control() {
        for (int i = 0; i < MAX; i++) {      // for, int
            if (i % 2 == 0) continue;        // if, continue
            else break;                      // else, break
        }

        try {                                // try
            throw new Exception();           // throw, new
        } catch (Exception e) {              // catch
            e.printStackTrace();
        } finally {                          // finally
            System.out.println("Done");
        }
    }
}`,
            explanation: 'Keywords define the structure and behavior of Java programs. They cannot be used as variable, method, or class names.'
          }
        ]
      },
      {
        id: 'j-access-modifiers',
        title: 'Access Modifiers',
        level: 'fresher',
        shortDesc: 'public (everywhere), protected (same package + subclass), default (same package), private (same class only).',
        keyPoints: [
          'public: accessible from everywhere',
          'protected: same package + subclasses (even in different packages)',
          'default (no modifier): same package only (package-private)',
          'private: same class only',
          'Top-level classes can only be public or default',
          'Inner classes can use all four modifiers',
          'protected allows subclass access even across packages',
          'Encapsulation: make fields private, provide getters/setters'
        ],
        detailed: `Access modifiers control the visibility and accessibility of classes, methods, and variables.

**Accessibility Table:**
| Modifier  | Same Class | Same Package | Subclass | Everywhere |
|-----------|-----------|--------------|----------|------------|
| private   | ✅        | ❌          | ❌      | ❌        |
| default   | ✅        | ✅          | ❌      | ❌        |
| protected | ✅        | ✅          | ✅      | ❌        |
| public    | ✅        | ✅          | ✅      | ✅        |

**Best Practices:**
- Use private for fields (encapsulation)
- Use public for API methods
- Use protected for methods meant for extension
- Use default for package-internal classes`,
        examples: [
          {
            title: 'Access Modifier Visibility',
            type: 'code',
            language: 'java',
            code: `// File: com/example/Parent.java
package com.example;

public class Parent {
    public int pubField = 1;        // Accessible everywhere
    protected int proField = 2;     // Same package + subclasses
    int defField = 3;               // Same package only (default)
    private int priField = 4;       // This class only

    public void show() {
        // All accessible here
        System.out.println(pubField + proField + defField + priField);
    }
}

// File: com/other/Child.java
package com.other;
import com.example.Parent;

public class Child extends Parent {
    public void access() {
        System.out.println(pubField);   // ✅ public
        System.out.println(proField);   // ✅ protected (subclass)
        // System.out.println(defField); // ❌ default (different package)
        // System.out.println(priField); // ❌ private
    }
}`,
            explanation: 'Protected members are accessible in subclasses even across packages. Default (package-private) members are only visible within the same package.'
          }
        ]
      },
      {
        id: 'j-non-access-modifiers',
        title: 'Non-Access Modifiers (static, final, abstract)',
        level: 'fresher',
        shortDesc: 'static (class-level), final (immutable/uninheritable), abstract (no implementation), transient (skip serialization), volatile (thread visibility).',
        keyPoints: [
          'static: belongs to class, not instance. Shared across objects',
          'final class: cannot be extended. final method: cannot be overridden. final variable: value cannot change',
          'abstract class: cannot be instantiated, can have abstract methods',
          'abstract method: declared without body, must be implemented by subclass',
          'transient: field excluded from serialization',
          'volatile: ensures variable changes are visible to all threads',
          'native: method implemented in C/C++ via JNI',
          'strictfp: ensures consistent floating-point across platforms',
          'static methods cannot access instance members directly',
          'static blocks run once when class is first loaded'
        ],
        detailed: `**static:** Members belong to the class rather than any instance. Static methods can be called without creating an object. Static variables are shared across all instances. Static blocks execute when the class is loaded.

**final:** Makes things unchangeable. Final variable = constant, final method = can't override, final class = can't extend. String, Integer, etc. are final classes.

**abstract:** Defines a template. Abstract classes can have both abstract and concrete methods. Abstract methods declare the signature but no implementation. Subclasses must implement all abstract methods.

**transient:** Marks fields to be skipped during Java serialization.
**volatile:** Guarantees that reads/writes to the variable go directly to main memory (visibility guarantee for multithreading).`,
        examples: [
          {
            title: 'static, final, abstract in Action',
            type: 'code',
            language: 'java',
            code: `// Abstract class — cannot instantiate
abstract class Shape {
    static int count = 0;                // Shared counter
    final String type;                   // Must initialize in constructor

    Shape(String type) {
        this.type = type;
        count++;
    }

    abstract double area();              // Abstract — no body

    final void display() {               // Final — cannot override
        System.out.println(type + ": " + area());
    }

    static int getCount() {              // Static — class-level method
        return count;
    }
}

final class Circle extends Shape {       // Final — cannot extend further
    private final double radius;

    Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override                 // Must implement abstract method
    double area() {
        return Math.PI * radius * radius;
    }
}

// Usage
Circle c = new Circle(5);
c.display();                             // "Circle: 78.539..."
System.out.println(Shape.getCount());    // 1`,
            explanation: 'This example shows abstract class with abstract method, final class and method, static variable and method, all working together.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 5. OOPs CONCEPTS
  // ──────────────────────────────────────────────
  {
    id: 'java-oops',
    name: 'OOPs Concepts',
    icon: '🏗️',
    concepts: [
      {
        id: 'j-encapsulation',
        title: 'Encapsulation',
        level: 'fresher',
        shortDesc: 'Bundling data (fields) and methods that operate on that data in a single class, with restricted access via access modifiers. Achieved through private fields + public getters/setters.',
        keyPoints: [
          'Wrapping data and code together as a single unit (class)',
          'Data hiding: make fields private, expose via public getters/setters',
          'Protects internal state from unauthorized access',
          'Allows validation in setters',
          'Provides controlled access to data',
          'Improves maintainability and flexibility',
          'Immutable classes are a form of strong encapsulation',
          'Example: Java Bean pattern, records (Java 16+)'
        ],
        detailed: `**Encapsulation** is the mechanism of wrapping data (variables) and code acting on the data (methods) together as a single unit. In Java, a class is the best example of encapsulation.

**Data Hiding** is achieved using access modifiers — typically making fields private and providing public getter/setter methods. This prevents direct access to the internal state and allows validation.

**Benefits:**
1. Control over data (validation in setters)
2. Flexibility to change internal implementation without affecting clients
3. Increased security (hide sensitive data)
4. Reduced coupling between components`,
        examples: [
          {
            title: 'Encapsulation with Validation',
            type: 'code',
            language: 'java',
            code: `public class BankAccount {
    private String accountNo;
    private double balance;      // Hidden from outside

    public BankAccount(String accountNo, double initialBalance) {
        this.accountNo = accountNo;
        this.balance = initialBalance;
    }

    // Getter — read-only access
    public double getBalance() { return balance; }
    public String getAccountNo() { return accountNo; }

    // Setter with validation
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }
}

// Usage
BankAccount acc = new BankAccount("ACC001", 1000);
acc.deposit(500);     // balance = 1500
acc.withdraw(200);    // balance = 1300
// acc.balance = -999; // ❌ Compile error — field is private`,
            explanation: 'Private fields ensure balance can only be modified through controlled methods with validation.'
          }
        ]
      },
      {
        id: 'j-inheritance',
        title: 'Inheritance',
        level: 'fresher',
        shortDesc: 'Mechanism where a child class acquires properties and methods of parent class using "extends". Java supports single inheritance (one parent class) + multiple interface implementation.',
        keyPoints: [
          'IS-A relationship: Child extends Parent',
          'Child inherits all non-private members of parent',
          'Java supports single class inheritance only',
          'Multiple inheritance via interfaces (Java 8+ default methods)',
          'super keyword accesses parent class members/constructor',
          'Constructor chaining: child constructor calls parent constructor',
          'Method overriding: child provides specific implementation',
          'Object class is the root of all classes',
          'Types: Single, Multilevel, Hierarchical (no multiple via classes)',
          'final classes cannot be inherited'
        ],
        detailed: `**Inheritance** allows a class to inherit fields and methods from another class. The class that inherits is called the subclass (child), and the class being inherited from is called the superclass (parent).

**Types of Inheritance:**
1. **Single**: A → B
2. **Multilevel**: A → B → C
3. **Hierarchical**: A → B, A → C
4. **Multiple** (via interfaces only): class C implements A, B

Java does NOT support multiple class inheritance to avoid the Diamond Problem.

**Key Rules:**
- Constructors are NOT inherited
- private members are NOT accessible in subclass
- super() must be first statement in child constructor
- All classes implicitly extend Object class`,
        examples: [
          {
            title: 'Inheritance with Method Overriding',
            type: 'code',
            language: 'java',
            code: `class Animal {
    String name;

    Animal(String name) { this.name = name; }

    void speak() {
        System.out.println(name + " makes a sound");
    }

    void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {  // Single inheritance
    String breed;

    Dog(String name, String breed) {
        super(name);          // Call parent constructor (must be first)
        this.breed = breed;
    }

    @Override                 // Method overriding
    void speak() {
        System.out.println(name + " barks!");
    }

    void fetch() {            // New method specific to Dog
        System.out.println(name + " fetches the ball");
    }
}

class GuideDog extends Dog { // Multilevel inheritance
    GuideDog(String name) { super(name, "Labrador"); }

    void guide() { System.out.println(name + " guides the owner"); }
}

// Usage
Animal a = new Dog("Rex", "Shepherd"); // Polymorphism
a.speak();     // "Rex barks!" (overridden method)
a.eat();       // "Rex is eating" (inherited method)
// a.fetch();  // ❌ Compile error — Animal ref doesn't know fetch()`,
            explanation: 'Dog inherits eat() from Animal, overrides speak(), and adds fetch(). GuideDog demonstrates multilevel inheritance.'
          }
        ]
      },
      {
        id: 'j-polymorphism',
        title: 'Polymorphism',
        level: 'fresher',
        shortDesc: 'Ability of an object to take many forms. Compile-time (method overloading) and Runtime (method overriding). Enables "one interface, multiple implementations".',
        keyPoints: [
          'Compile-time (Static): Method Overloading — same name, different parameters',
          'Runtime (Dynamic): Method Overriding — subclass redefines parent method',
          'Runtime polymorphism uses dynamic method dispatch',
          'Parent reference can hold child object',
          'Method called depends on actual object type (not reference type)',
          'Overloading: return type alone is NOT sufficient to differentiate',
          'Overriding: same signature, uses @Override annotation',
          'Overriding: cannot reduce access modifier (can widen)',
          'static, final, private methods cannot be overridden',
          'Covariant return type: overridden method can return subtype'
        ],
        detailed: `**Polymorphism** means "many forms." In Java, it allows objects of different types to be treated through a common interface.

**Compile-time Polymorphism (Method Overloading):**
Multiple methods with the same name but different parameter lists in the same class. Resolved at compile time.

**Runtime Polymorphism (Method Overriding):**
Subclass provides a specific implementation of a method declared in the parent class. Resolved at runtime using dynamic method dispatch — the JVM determines which method to call based on the actual object type, not the reference type.

**Rules for Overriding:**
- Same method signature (name + parameters)
- Cannot have more restrictive access
- Cannot throw broader checked exceptions
- \`@Override\` annotation recommended`,
        examples: [
          {
            title: 'Overloading vs Overriding',
            type: 'code',
            language: 'java',
            code: `class Calculator {
    // Method OVERLOADING — compile-time polymorphism
    int add(int a, int b)          { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c)   { return a + b + c; }
}

class Shape {
    void draw() { System.out.println("Drawing shape"); }
}

class Circle extends Shape {
    @Override  // Method OVERRIDING — runtime polymorphism
    void draw() { System.out.println("Drawing circle"); }
}

class Square extends Shape {
    @Override
    void draw() { System.out.println("Drawing square"); }
}

// Runtime Polymorphism in action
Shape[] shapes = { new Circle(), new Square(), new Shape() };
for (Shape s : shapes) {
    s.draw(); // JVM decides which draw() to call at runtime
}
// Output:
// Drawing circle
// Drawing square
// Drawing shape`,
            explanation: 'Overloading is resolved at compile time based on parameters. Overriding is resolved at runtime based on the actual object type.'
          }
        ]
      },
      {
        id: 'j-abstraction',
        title: 'Abstraction',
        level: 'fresher',
        shortDesc: 'Hiding implementation details and showing only functionality. Achieved through abstract classes (0-100% abstraction) and interfaces (100% abstraction).',
        keyPoints: [
          'Hides implementation complexity, shows only what is necessary',
          'Achieved via abstract classes and interfaces',
          'Abstract class: 0-100% abstraction, can have constructors, instance variables',
          'Interface: 100% abstraction (before Java 8), can have default/static methods (Java 8+)',
          'Cannot instantiate abstract classes or interfaces',
          'Abstract methods have no body — subclass must implement',
          'Reduces complexity and isolates impact of changes',
          'Real-world analogy: ATM — you see buttons, not internal circuitry'
        ],
        detailed: `**Abstraction** is the concept of hiding the internal implementation details and showing only functionality to the user.

**Abstract Class vs Interface:**
| Feature           | Abstract Class       | Interface (Java 8+)    |
|-------------------|---------------------|------------------------|
| Instantiation     | No                  | No                     |
| Abstract methods  | 0 to many           | All (except default)   |
| Concrete methods  | Yes                 | default, static        |
| Constructors      | Yes                 | No                     |
| Variables         | Any type            | public static final    |
| Inheritance       | extends (single)    | implements (multiple)  |
| Access modifiers  | Any                 | public (default)       |

**When to use what:**
- Abstract class: shared state/code among related classes
- Interface: define a contract for unrelated classes`,
        examples: [
          {
            title: 'Abstract Class vs Interface',
            type: 'code',
            language: 'java',
            code: `// Abstract class — cannot instantiate
abstract class Vehicle {
    String brand;
    Vehicle(String brand) { this.brand = brand; }

    abstract void start();       // Must be implemented
    void stop() {                // Concrete method
        System.out.println(brand + " stopped");
    }

    static int getCount() {      // Static — class-level method
        return count;
    }
}

final class Car extends Vehicle {
    Car(String brand) { super(brand); }

    @Override void start() { System.out.println(brand + " car started"); }
}

// Interface — full abstraction (contract)
interface Electric {
    void charge();              // Abstract by default
    default void showRange() {  // Default method (Java 8+)
        System.out.println("Range: 300km");
    }
}

interface GPS {
    void navigate(String dest);
}

// Multiple interface implementation
class Tesla extends Vehicle implements Electric, GPS {
    Tesla() { super("Tesla"); }

    @Override void start() { System.out.println("Tesla silently starts"); }
    @Override public void charge() { System.out.println("Charging at supercharger"); }
    @Override public void navigate(String dest) { System.out.println("Navigating to " + dest); }
}

// Usage
Vehicle v = new Tesla();
v.start();  // Tesla silently starts
v.stop();   // Tesla stopped
((Electric) v).charge(); // Charging at supercharger`,
            explanation: 'Modern interfaces combine contracts (abstract), reusable logic (default/private), utility methods (static), and lambda support (functional interface).'
          }
        ]
      },
      {
        id: 'j-aic',
        title: 'Anonymous Inner Classes',
        level: 'junior',
        shortDesc: 'Unnamed classes declared and instantiated in a single expression. Used to provide one-time implementations of interfaces or abstract classes. Replaced by lambdas for functional interfaces.',
        keyPoints: [
          'A class without a name, declared and instantiated simultaneously',
          'Used for one-time implementation of interfaces or abstract classes',
          'Can access final or effectively final local variables',
          'Creates a separate .class file (Outer$1.class)',
          'Can be replaced by lambdas for functional interfaces (Java 8+)',
          'Still needed for non-functional interfaces/abstract classes',
          'Common in event listeners, callbacks, comparators',
          'Has access to enclosing class members (including private)'
        ],
        detailed: `**Anonymous Inner Classes (AIC)** let you create a one-time-use class inline without explicitly defining a named class. They are useful when you need a quick implementation of an interface or abstract class.

**Syntax:** \`new InterfaceOrClass() { // implementation }\`

**Limitations:**
- Cannot have constructors (it's anonymous)
- Cannot be reused
- Can only access final/effectively final local variables
- Creates a separate class file (Outer$1.class, Outer$2.class, etc.)

**Lambda vs AIC:** For functional interfaces (single abstract method), prefer lambdas as they are more concise. For interfaces with multiple abstract methods or abstract classes, AIC is still required.`,
        examples: [
          {
            title: 'AIC vs Lambda Comparison',
            type: 'code',
            language: 'java',
            code: `// Anonymous Inner Class — before Java 8
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running with AIC");
    }
};

// Lambda — Java 8+ (for functional interfaces)
Runnable r2 = () -> System.out.println("Running with Lambda");

// AIC still needed for abstract classes
abstract class Processor {
    abstract void process();
    void complete() { System.out.println("Done"); }
}

Processor p = new Processor() {
    @Override
    void process() { System.out.println("Processing..."); }
};

// AIC for interface with multiple methods
interface Handler {
    void onSuccess(String data);
    void onError(String error);
}

Handler h = new Handler() {
    @Override public void onSuccess(String data) { System.out.println("OK: " + data); }
    @Override public void onError(String error) { System.out.println("ERR: " + error); }
};`,
            explanation: 'Use lambdas for functional interfaces, AIC when you need to implement abstract classes or interfaces with multiple methods.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 7. ENUMS & GENERICS
  // ──────────────────────────────────────────────
  {
    id: 'java-enums-generics',
    name: 'Enums & Generics',
    icon: '🎯',
    concepts: [
      {
        id: 'j-enums',
        title: 'Enums',
        level: 'fresher',
        shortDesc: 'Type-safe constants. Enums are classes that extend java.lang.Enum. Can have fields, constructors, methods. Used in switch, singletons, state machines.',
        keyPoints: [
          'Enum is a special class with fixed set of instances',
          'Implicitly extends java.lang.Enum (cannot extend other classes)',
          'Can implement interfaces',
          'Can have fields, constructors (private only), methods',
          'Thread-safe singleton by nature',
          'values() returns array of all constants',
          'valueOf(String) returns enum constant by name',
          'ordinal() returns position (0-based)',
          'Best practice: use enums instead of int/string constants',
          'Can be used in switch statements'
        ],
        detailed: `**Enums** in Java are type-safe constants that are actually special classes. Each enum constant is an instance of the enum class.

**Features:**
- Implicitly final and static
- Private constructors only
- Can have fields, methods, and implement interfaces
- Perfect for singleton pattern (guaranteed by JVM)
- Serialization-safe

**Common Use Cases:**
- Status codes (ACTIVE, INACTIVE, PENDING)
- Days of week, months
- Configuration options
- State machines
- Strategy pattern implementation`,
        examples: [
          {
            title: 'Advanced Enum with Methods',
            type: 'code',
            language: 'java',
            code: `public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);

    private final double mass;    // kg
    private final double radius;  // meters

    // Private constructor
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    // Method
    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }

    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// Enum implementing interface
interface Printable { String display(); }

enum Status implements Printable {
    ACTIVE("Active"), INACTIVE("Inactive"), PENDING("Pending");

    private final String label;
    Status(String label) { this.label = label; }

    @Override
    public String display() { return "Status: " + label; }
}

// Usage
Planet.EARTH.surfaceWeight(75); // Weight on Earth
for (Planet p : Planet.values()) { ... } // Iterate all
Planet mars = Planet.valueOf("MARS"); // By name`,
            explanation: 'Enums can hold state (fields), have behavior (methods), and implement interfaces. Much safer than using integer or string constants.'
          }
        ]
      },
      {
        id: 'j-generics',
        title: 'Generics',
        level: 'junior',
        shortDesc: 'Parameterized types enabling type-safe code. Compile-time type checking, eliminates casting. Uses type erasure at runtime. Wildcards: ?, extends, super.',
        keyPoints: [
          'Enable classes/methods to work with any type while maintaining type safety',
          'Compile-time checking — errors caught early, no ClassCastException',
          'Type erasure: generic type info removed at runtime (backward compatibility)',
          'Convention: T (type), E (element), K (key), V (value), N (number)',
          'Bounded types: <T extends Number> restricts to Number and subclasses',
          'Wildcard ?: unknown type. <? extends T> upper bound, <? super T> lower bound',
          'PECS: Producer Extends, Consumer Super',
          'Cannot use primitives (use Integer not int)',
          'Cannot create generic arrays: new T[] is illegal',
          'Cannot use instanceof with generic types'
        ],
        detailed: `**Generics** allow you to write code that works with any type while providing compile-time type safety.

**Type Erasure:** At runtime, all generic type information is erased. \`List<String>\` and \`List<Integer>\` are both just \`List\`. This is for backward compatibility with pre-Java 5 code.

**Wildcards:**
- \`?\` — unbounded: any type
- \`? extends T\` — upper bound: T or subtype (read-only / producer)
- \`? super T\` — lower bound: T or supertype (write-only / consumer)

**PECS Principle:** Producer Extends, Consumer Super
- If you READ from a collection → use extends
- If you WRITE to a collection → use super`,
        examples: [
          {
            title: 'Generic Class, Method & Wildcards',
            type: 'code',
            language: 'java',
            code: `// Generic class
class Pair<K, V> {
    private K key;
    private V value;
    Pair(K key, V value) { this.key = key; this.value = value; }
    K getKey() { return key; }
    V getValue() { return value; }
}

// Bounded generic
class NumberBox<T extends Number> {
    private T value;
    NumberBox(T value) { this.value = value; }
    double doubleValue() { return value.doubleValue(); }
}

// Generic method
static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Wildcards — PECS
void printAll(List<? extends Number> list) {   // Producer Extends (read)
    for (Number n : list) System.out.println(n);
    // list.add(1); ❌ Cannot add — unknown specific type
}

void addIntegers(List<? super Integer> list) { // Consumer Super (write)
    list.add(1);  // ✅ Can add Integer
    list.add(2);
    // Integer i = list.get(0); ❌ Get returns Object
}

// Usage
Pair<String, Integer> pair = new Pair<>("Age", 25);
NumberBox<Double> box = new NumberBox<>(3.14);
// NumberBox<String> bad = new NumberBox<>("hi"); ❌ String is not Number`,
            explanation: 'Generics provide compile-time safety. Bounded types restrict acceptable types. PECS guides wildcard usage: extends for reading, super for writing.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 8. COLLECTIONS FRAMEWORK
  // ──────────────────────────────────────────────
  {
    id: 'java-collections',
    name: 'Collections (List, Set, Queue, Map)',
    icon: '📦',
    concepts: [
      {
        id: 'j-collections-overview',
        title: 'Collections Framework Overview',
        level: 'fresher',
        shortDesc: 'Unified architecture for storing and manipulating groups of objects. Core interfaces: Collection (List, Set, Queue) and Map. Located in java.util package.',
        keyPoints: [
          'Collection interface: root of List, Set, Queue hierarchy',
          'Map interface: separate hierarchy (key-value pairs)',
          'List: ordered, allows duplicates (ArrayList, LinkedList, Vector)',
          'Set: no duplicates (HashSet, TreeSet, LinkedHashSet)',
          'Queue: FIFO ordering (PriorityQueue, ArrayDeque, LinkedList)',
          'Map: key-value pairs (HashMap, TreeMap, LinkedHashMap, ConcurrentHashMap)',
          'Collections utility class: sort, reverse, shuffle, synchronizedList, etc.',
          'Iterating: for-each, Iterator, ListIterator, Stream',
          'Fail-fast iterators throw ConcurrentModificationException',
          'Concurrent collections: CopyOnWriteArrayList, ConcurrentHashMap'
        ],
        detailed: `The **Java Collections Framework** provides a unified architecture to store, retrieve, and manipulate groups of objects.

**Hierarchy:**
Collection (interface) → List, Set, Queue
Map (interface) → HashMap, TreeMap, etc.

**Choosing the Right Collection:**
| Need               | Use              |
|---------------------|------------------|
| Ordered + Duplicates| ArrayList        |
| Fast insert/delete  | LinkedList       |
| No duplicates       | HashSet          |
| Sorted + No dupes   | TreeSet          |
| Key-Value pairs     | HashMap          |
| Sorted keys         | TreeMap          |
| Thread-safe map     | ConcurrentHashMap|
| FIFO queue          | ArrayDeque       |
| Priority ordering   | PriorityQueue    |`,
        examples: [
          {
            title: 'Collection Types Comparison',
            type: 'code',
            language: 'java',
            code: `// LIST — ordered, allows duplicates
List<String> arrayList = new ArrayList<>();   // O(1) access, O(n) insert
List<String> linkedList = new LinkedList<>(); // O(n) access, O(1) insert

// SET — no duplicates
Set<String> hashSet = new HashSet<>();        // O(1), no order
Set<String> treeSet = new TreeSet<>();        // O(log n), sorted
Set<String> linkedHS = new LinkedHashSet<>(); // O(1), insertion order

// QUEUE — FIFO
Queue<String> queue = new ArrayDeque<>();
queue.offer("First");  // Add to tail
queue.poll();           // Remove from head
PriorityQueue<Integer> pq = new PriorityQueue<>(); // Min-heap

// MAP — key-value pairs
Map<String, Integer> hashMap = new HashMap<>();    // O(1), no order
Map<String, Integer> treeMap = new TreeMap<>();    // O(log n), sorted keys
Map<String, Integer> linkedHM = new LinkedHashMap<>(); // O(1), insertion order

// Immutable collections (Java 9+)
List<String> immutableList = List.of("a", "b", "c");
Set<Integer> immutableSet = Set.of(1, 2, 3);
Map<String, Integer> immutableMap = Map.of("x", 1, "y", 2);`,
            explanation: 'Choose collection based on your needs: order, uniqueness, sort, thread-safety, and performance characteristics.'
          }
        ]
      },
      {
        id: 'j-hashmap-internals',
        title: 'HashMap Internals',
        level: 'mid',
        shortDesc: 'HashMap uses array of Node buckets. Hash → bucket index. Collision → linked list (→ tree if >8 nodes). Load factor 0.75, initial capacity 16. O(1) average, O(log n) worst.',
        keyPoints: [
          'Backed by array of `Node<K,V>` (bucket array)',
          'hashCode() → hash → bucket index (hash & (n-1))',
          'Collision handling: linked list → red-black tree (when bucket size > 8)',
          'Tree reverts to list when bucket size < 6 (treeify threshold)',
          'Default initial capacity: 16, load factor: 0.75',
          'Rehashing occurs when size > capacity * load factor',
          'Keys must properly implement hashCode() and equals()',
          'Null key allowed (stored at index 0)',
          'NOT thread-safe — use ConcurrentHashMap for concurrent access',
          'Java 8: treeification optimization for worst-case O(log n) instead of O(n)'
        ],
        detailed: `**HashMap Internal Structure:**

1. Array of \`Node<K,V>\` (buckets), default size 16
2. Each Node has: hash, key, value, next pointer
3. Bucket index = hash(key) & (capacity - 1)
4. **Collision handling:** Same bucket → linked list. If list length > 8 (and array size >= 64), converts to red-black tree for O(log n) lookup.
5. **Rehashing:** When entries exceed capacity × loadFactor (12 for default), array doubles in size and all entries are rehashed.

**Why capacity is power of 2:**
Allows using bitwise AND (hash & (n-1)) instead of modulo for faster index calculation.

**Contract:** If two objects are equal (equals() returns true), they MUST have the same hashCode(). But same hashCode does NOT mean equal objects.`,
        examples: [
          {
            title: 'HashMap Put/Get Process',
            type: 'code',
            language: 'java',
            code: `// How put() works internally (simplified):
// 1. Calculate hash: hash = key.hashCode() ^ (key.hashCode() >>> 16)
// 2. Find bucket: index = hash & (capacity - 1)
// 3. If bucket empty → insert new Node
// 4. If bucket occupied → check equals():
//    - If equal key found → update value
//    - If not → add to linked list (or tree)

Map<String, Integer> map = new HashMap<>(16, 0.75f);

// Custom key class — MUST override hashCode() and equals()
class Employee {
    int id;
    String name;

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee e = (Employee) o;
        return id == e.id && Objects.equals(name, e.name);
    }
}

// ConcurrentHashMap for thread safety
Map<String, Integer> concMap = new ConcurrentHashMap<>();
concMap.put("key", 1);
concMap.computeIfAbsent("key2", k -> 2);`,
            explanation: 'HashMap relies on hashCode() for bucket placement and equals() for key comparison. Always override both when using custom objects as keys.'
          }
        ]
      },
      {
        id: 'j-comparable-comparator',
        title: 'Comparable vs Comparator',
        level: 'junior',
        shortDesc: 'Comparable: natural ordering (compareTo in the class itself). Comparator: custom ordering (compare in a separate class/lambda). Both used for sorting.',
        keyPoints: [
          'Comparable: java.lang, compareTo(T o), defines natural ordering',
          'Comparator: java.util, compare(T o1, T o2), defines custom ordering',
          'Comparable: single sorting sequence, implemented in the class itself',
          'Comparator: multiple sorting sequences, external to the class',
          'Collections.sort() / Arrays.sort() use Comparable by default',
          'Pass Comparator to sort() for custom ordering',
          'Comparator.comparing() for method references (Java 8+)',
          'thenComparing() for chaining multiple sort criteria',
          'reversed() for descending order',
          'nullsFirst() / nullsLast() for handling null values'
        ],
        detailed: `**Comparable<T>** — Natural ordering defined within the class itself:
- Interface method: \`int compareTo(T other)\`
- Returns: negative (less), zero (equal), positive (greater)
- One fixed sorting logic per class

**Comparator<T>** — Custom ordering, external to the class:
- Interface method: \`int compare(T o1, T o2)\`
- Can define multiple Comparators for different sorting needs
- Java 8+: Comparator.comparing(), thenComparing(), reversed()`,
        examples: [
          {
            title: 'Comparable and Comparator Usage',
            type: 'code',
            language: 'java',
            code: `// Comparable — natural ordering
class Student implements Comparable<Student> {
    String name;
    int age;
    double gpa;

    Student(String name, int age, double gpa) {
        this.name = name; this.age = age; this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name); // Natural order: by name
    }
}

List<Student> students = List.of(
    new Student("Charlie", 22, 3.5),
    new Student("Alice", 20, 3.8),
    new Student("Bob", 21, 3.2)
);

// Sort by natural order (name)
Collections.sort(new ArrayList<>(students));

// Comparator — custom ordering (Java 8+)
Comparator<Student> byAge = Comparator.comparingInt(s -> s.age);
Comparator<Student> byGpaDesc = Comparator.comparingDouble((Student s) -> s.gpa).reversed();
Comparator<Student> byNameThenAge = Comparator.comparing((Student s) -> s.name)
                                               .thenComparingInt(s -> s.age);

students.stream().sorted(byAge).forEach(...);        // Sort by age
students.stream().sorted(byGpaDesc).forEach(...);    // Sort by GPA descending
students.stream().sorted(byNameThenAge).forEach(...); // Name then age`,
            explanation: 'Comparable defines ONE natural ordering in the class. Comparator defines multiple custom orderings externally, with Java 8+ method chaining.'
          }
        ]
      },
      {
        id: 'j-hashtable',
        title: 'HashTable vs HashMap vs ConcurrentHashMap',
        level: 'junior',
        shortDesc: 'HashTable: legacy, synchronized, no null keys/values. HashMap: modern, not synchronized, allows one null key. ConcurrentHashMap: modern thread-safe, segment locking.',
        keyPoints: [
          'HashTable: legacy (Java 1.0), synchronized (thread-safe), slow',
          'HashTable does NOT allow null keys or values',
          'HashMap: modern (Java 1.2), NOT synchronized, allows one null key',
          'ConcurrentHashMap: modern thread-safe, uses segment/stripe locking',
          'ConcurrentHashMap does NOT allow null keys or values',
          'ConcurrentHashMap: better performance than HashTable (fine-grained locking)',
          'Collections.synchronizedMap() wraps HashMap for thread safety',
          'Prefer ConcurrentHashMap over HashTable in modern code',
          'All three implement Map interface'
        ],
        detailed: `**Comparison:**
| Feature          | HashMap          | HashTable        | ConcurrentHashMap  |
|------------------|-----------------|------------------|--------------------|
| Thread-safe      | No              | Yes (synchronized)| Yes (segment locks)|
| Null key/value   | 1 null key, many null values | Neither | Neither |
| Performance      | Best (single)   | Worst            | Best (concurrent)  |
| Introduced       | Java 1.2        | Java 1.0         | Java 1.5           |
| Iterator         | Fail-fast       | Fail-fast        | Weakly consistent  |
| Inheritance      | AbstractMap      | Dictionary       | AbstractMap        |`,
        examples: [
          {
            title: 'Thread-Safe Map Options',
            type: 'code',
            language: 'java',
            code: `// HashMap — NOT thread-safe
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put(null, 0);      // ✅ null key allowed
hashMap.put("key", null);  // ✅ null value allowed

// HashTable — thread-safe but slow (legacy, avoid)
Map<String, Integer> hashTable = new Hashtable<>();
// hashTable.put(null, 0);  // ❌ NullPointerException
// hashTable.put("key", null); // ❌ NullPointerException

// ConcurrentHashMap — modern thread-safe (preferred)
Map<String, Integer> concMap = new ConcurrentHashMap<>();
concMap.put("key", 1);    // ✅
// concMap.put(null, 0);  // ❌ NullPointerException
concMap.computeIfAbsent("key2", k -> 2);
concMap.merge("key", 10, Integer::sum);  // Atomic merge

// Synchronized wrapper — alternative
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());`,
            explanation: 'Use HashMap for single-threaded, ConcurrentHashMap for multi-threaded scenarios. Avoid HashTable in modern code.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 9. JAVA 8 FEATURES
  // ──────────────────────────────────────────────
  {
    id: 'java-8-features',
    name: 'Java 8 Features',
    icon: '⚡',
    concepts: [
      {
        id: 'j-lambda',
        title: 'Lambda Expressions',
        level: 'junior',
        shortDesc: 'Anonymous functions for functional interfaces. Syntax: (params) -> expression or (params) -> { statements }. Enables functional programming in Java.',
        keyPoints: [
          'Lambda: concise way to represent a functional interface implementation',
          'Syntax: (params) -> expression or (params) -> { statements; }',
          'Target type must be a functional interface (one abstract method)',
          'Can capture effectively final variables from enclosing scope',
          'Method references: Class::method (shorthand for simple lambdas)',
          'Types: static (Math::abs), instance (str::length), constructor (ArrayList::new)',
          'Enables functional programming style in Java',
          'Used extensively with Streams, Collections, and CompletableFuture'
        ],
        detailed: `**Lambda Expressions** provide a clear and concise way to represent a single-method interface (functional interface) using an expression.

**Syntax Variations:**
- No params: \`() -> expression\`
- One param: \`x -> expression\` (parentheses optional)
- Multiple params: \`(x, y) -> expression\`
- Multi-line: \`(x, y) -> { statements; return result; }\`

**Method References** are shorthand for lambdas that call a single method:
- Static: \`ClassName::staticMethod\`
- Instance: \`instance::method\`
- Arbitrary instance: \`ClassName::instanceMethod\`
- Constructor: \`ClassName::new\``,
        examples: [
          {
            title: 'Lambda Expressions & Method References',
            type: 'code',
            language: 'java',
            code: `// Before Java 8 — Anonymous Inner Class
Comparator<String> comp1 = new Comparator<String>() {
    @Override public int compare(String a, String b) { return a.compareTo(b); }
};

// With Lambda
Comparator<String> comp2 = (a, b) -> a.compareTo(b);

// With Method Reference
Comparator<String> comp3 = String::compareTo;

// Common functional interfaces
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> toLength = String::length;
Consumer<String> printer = System.out::println;
Supplier<List<String>> listMaker = ArrayList::new;
UnaryOperator<String> toUpper = String::toUpperCase;
BinaryOperator<Integer> sum = Integer::sum;

// Usage
List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
names.sort(comp2);                            // Sort with lambda
names.forEach(System.out::println);           // Method reference
names.stream().filter(n -> n.startsWith("A")).collect(Collectors.toList());`,
            explanation: 'Lambdas replace verbose anonymous inner classes. Method references are even shorter for simple method calls.'
          }
        ]
      },
      {
        id: 'j-streams-api',
        title: 'Streams API',
        level: 'junior',
        shortDesc: 'Sequence of elements supporting aggregate operations. Intermediate (filter, map, sorted) and terminal (collect, forEach, reduce) operations. Lazy evaluation, supports parallelism.',
        keyPoints: [
          'Stream: sequence of elements supporting functional operations',
          'Created from Collections, arrays, or Stream.of()',
          'Intermediate ops (lazy): filter, map, flatMap, sorted, distinct, peek, limit, skip',
          'Terminal ops (trigger execution): collect, forEach, reduce, count, min, max, anyMatch, allMatch, findFirst',
          'Streams are single-use — cannot be reused after terminal operation',
          'Lazy evaluation — intermediate ops not executed until terminal op',
          'parallelStream() for parallel processing',
          'Collectors: toList(), toSet(), toMap(), groupingBy(), joining(), partitioningBy()',
          'reduce() for aggregation: identity, accumulator, combiner',
          'flatMap() flattens nested structures (Stream<Stream<T>> → Stream<T>)'
        ],
        detailed: `**Stream API** enables functional-style operations on collections. It does NOT modify the source data — it produces a new result.

**Pipeline:** Source → Intermediate Operations → Terminal Operation

**Key Characteristics:**
1. **Lazy:** Intermediate operations are not executed until a terminal operation is invoked
2. **Single-use:** A stream can only be consumed once
3. **Optionally parallel:** \`parallelStream()\` for multi-threaded processing
4. **Non-mutating:** Original collection is not modified`,
        examples: [
          {
            title: 'Stream Operations',
            type: 'code',
            language: 'java',
            code: `List<Employee> employees = List.of(
    new Employee("Alice", "IT", 85000),
    new Employee("Bob", "HR", 65000),
    new Employee("Charlie", "IT", 92000),
    new Employee("Diana", "HR", 72000),
    new Employee("Eve", "IT", 78000)
);

// Filter + Map + Collect
List<String> itNames = employees.stream()
    .filter(e -> e.getDept().equals("IT"))
    .map(Employee::getName)
    .sorted()
    .collect(Collectors.toList()); // [Alice, Charlie, Eve]

// Reduce — total salary
double totalSalary = employees.stream()
    .mapToDouble(Employee::getSalary)
    .sum(); // 392000.0

// GroupBy — employees by department
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDept));

// Statistics
DoubleSummaryStatistics stats = employees.stream()
    .mapToDouble(Employee::getSalary)
    .summaryStatistics();
// count=5, sum=392000, min=65000, avg=78400, max=92000

// FlatMap — flatten nested lists
List<List<String>> nested = List.of(List.of("a","b"), List.of("c","d"));
List<String> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList()); // [a, b, c, d]

// Parallel stream
long count = employees.parallelStream()
    .filter(e -> e.getSalary() > 70000)
    .count(); // 3`,
            explanation: 'Streams enable declarative data processing. Chain operations for readable, functional code. Use parallelStream() for large datasets.'
          }
        ]
      },
      {
        id: 'j-optional',
        title: 'Optional',
        level: 'junior',
        shortDesc: 'Container that may or may not hold a non-null value. Eliminates NullPointerException. Methods: of(), ofNullable(), isPresent(), orElse(), map(), flatMap().',
        keyPoints: [
          'Container object that may or may not contain a non-null value',
          'Designed to reduce NullPointerException',
          'Optional.of(value) — throws NPE if null',
          'Optional.ofNullable(value) — wraps value or empty',
          'Optional.empty() — empty optional',
          'isPresent() / isEmpty() (Java 11) — check if value exists',
          'orElse(default) — return value or default',
          'orElseGet(supplier) — lazy default evaluation',
          'orElseThrow() — throw exception if empty',
          'map() / flatMap() — transform the value if present',
          'Do NOT use Optional for fields or method parameters'
        ],
        detailed: `**Optional<T>** is a container object used to contain not-null objects. It is used to represent null with absent value. It provides methods to facilitate working with "optional" values instead of null checks.

**Best Practices:**
- Use as method return type when null is a valid result
- Do NOT use for class fields or method parameters
- Prefer orElseGet() over orElse() for expensive defaults
- Use map()/flatMap() instead of isPresent()/get() chains`,
        examples: [
          {
            title: 'Optional Usage Patterns',
            type: 'code',
            language: 'java',
            code: `// Creating Optionals
Optional<String> opt1 = Optional.of("Hello");       // Non-null
Optional<String> opt2 = Optional.ofNullable(null);   // May be null
Optional<String> opt3 = Optional.empty();            // Empty

// ❌ Bad: old-style null checks
String value = getUserName();
if (value != null) {
    System.out.println(value.toUpperCase());
}

// ✅ Good: Optional
Optional<String> optName = findUserName();
optName.map(String::toUpperCase)
       .ifPresent(System.out::println);

// Default values
String name = optName.orElse("Unknown");
String name2 = optName.orElseGet(() -> fetchDefault()); // Lazy
String name3 = optName.orElseThrow(() -> new NotFoundException("User not found"));

// Chaining with map/flatMap
Optional<String> city = findUser(id)
    .flatMap(User::getAddress)    // Returns Optional<Address>
    .map(Address::getCity);       // Returns Optional<String>

// Java 9+ additions
optName.ifPresentOrElse(
    name -> System.out.println(name),
    () -> System.out.println("Not found")
);
Optional<String> result = opt2.or(() -> Optional.of("Fallback")); // Java 9`,
            explanation: 'Optional eliminates null checks with a fluent API. Use map() for transformations, flatMap() for nested Optionals, orElse()/orElseThrow() for defaults.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // 10. JAVA 11, 17, 21 FEATURES
  // ──────────────────────────────────────────────
  {
    id: 'java-modern',
    name: 'Java 11, 17 & 21 Features',
    icon: '🚀',
    concepts: [
      {
        id: 'j-java11',
        title: 'Java 11 Features (LTS)',
        level: 'junior',
        shortDesc: 'String methods (isBlank, lines, strip, repeat), var in lambdas, HttpClient API, Files.readString/writeString, single-file source execution.',
        keyPoints: [
          'String: isBlank(), lines(), strip(), stripLeading(), stripTrailing(), repeat(n)',
          'var allowed in lambda parameters: (var x, var y) -> x + y',
          'HttpClient API: modern HTTP/2 client (java.net.http)',
          'Files.readString() and Files.writeString() for simple file I/O',
          'Single-file source execution: java HelloWorld.java (no javac needed)',
          'Optional.isEmpty() — opposite of isPresent()',
          'Collection.toArray(IntFunction): list.toArray(String[]::new)',
          'Predicate.not(): negate predicates easily',
          'Removed: Java EE modules, JavaFX, Nashorn JS engine'
        ],
        detailed: `Java 11 is a Long-Term Support (LTS) release with many practical improvements for everyday coding.

**Key Additions:**
1. Enhanced String methods for common operations
2. Local variable syntax (var) in lambda expressions
3. New HttpClient API replacing HttpURLConnection
4. Simplified file operations
5. Direct source file execution without compilation step`,
        examples: [
          {
            title: 'Java 11 New APIs',
            type: 'code',
            language: 'java',
            code: `// String enhancements
"  ".isBlank();              // true
"Hello\\nWorld".lines().toList(); // ["Hello", "World"]
"  Hi  ".strip();            // "Hi" (Unicode-aware trim)
"Ha".repeat(3);              // "HaHaHa"

// var in lambdas
list.stream()
    .map((@NotNull var s) -> s.toUpperCase())
    .collect(Collectors.toList());

// HttpClient (HTTP/2)
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .GET().build();
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());

// File operations
String content = Files.readString(Path.of("file.txt"));
Files.writeString(Path.of("output.txt"), "Hello Java 11");

// Optional.isEmpty()
Optional.empty().isEmpty();  // true

// Predicate.not()
lines.stream().filter(Predicate.not(String::isBlank)).toList();`,
            explanation: 'Java 11 brought practical utility methods that simplify everyday coding tasks.'
          }
        ]
      },
      {
        id: 'j-java17',
        title: 'Java 17 Features (LTS)',
        level: 'mid',
        shortDesc: 'Sealed classes, records, pattern matching for instanceof, switch expressions, text blocks, enhanced pseudo-random generators.',
        keyPoints: [
          'Sealed classes: restrict which classes can extend/implement (permits)',
          'Records: immutable data carriers with auto-generated equals/hashCode/toString',
          'Pattern matching for instanceof: no need for explicit casting',
          'Switch expressions: return values, arrow syntax, yield keyword',
          'Text blocks: multi-line strings with """ delimiter',
          'Enhanced pseudo-random number generators',
          'Helpful NullPointerExceptions with detailed messages',
          'Strong encapsulation of JDK internals',
          'Records are implicitly final, extend java.lang.Record'
        ],
        detailed: `Java 17 is an LTS release with significant language enhancements that improve code readability and safety.

**Sealed Classes:** Control which classes can extend a class or implement an interface. Use \`sealed\` keyword with \`permits\` clause. Subclasses must be \`final\`, \`sealed\`, or \`non-sealed\`.

**Records:** Compact syntax for immutable data carriers. Compiler auto-generates constructor, getters, equals(), hashCode(), and toString(). Cannot extend other classes but can implement interfaces.

**Pattern Matching for instanceof:** Combines type check and cast in a single expression, eliminating redundant casting.`,
        examples: [
          {
            title: 'Java 17 Language Features',
            type: 'code',
            language: 'java',
            code: `// Records — immutable data carriers
record Point(int x, int y) {}  // Auto: constructor, getters, equals, hashCode, toString
record Person(String name, int age) {
    // Compact constructor for validation
    Person {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
    }
}
var p = new Person("Alice", 30);
p.name();  // "Alice" (getter, no 'get' prefix)

// Sealed classes
sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
final class Triangle implements Shape { double base, height; }

// Pattern matching for instanceof
Object obj = "Hello";
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.toUpperCase()); // No explicit cast needed!
}

// Switch expressions
String result = switch (shape) {
    case Circle c    -> "Circle with radius " + c.radius();
    case Rectangle r -> "Rectangle " + r.w() + "x" + r.h();
    case Triangle t  -> "Triangle";
};

// Text blocks
String json = """
    {
        "name": "Alice",
        "age": 30
    }
    """;`,
            explanation: 'Java 17 brings records for data classes, sealed classes for controlled inheritance, and pattern matching for cleaner type checks.'
          }
        ]
      },
      {
        id: 'j-java21',
        title: 'Java 21 Features (LTS)',
        level: 'senior',
        shortDesc: 'Virtual threads (Project Loom), pattern matching for switch, record patterns, sequenced collections, string templates (preview).',
        keyPoints: [
          'Virtual threads: lightweight threads managed by JVM (Project Loom)',
          'Thread.ofVirtual().start(() -> ...) or Executors.newVirtualThreadPerTaskExecutor()',
          'Pattern matching for switch: exhaustive type patterns',
          'Record patterns: destructure records in instanceof and switch',
          'Sequenced collections: SequencedCollection, SequencedSet, SequencedMap interfaces',
          'String templates (preview): STR."Hello \\{name}"',
          'Virtual threads ideal for I/O-bound tasks (thousands of concurrent tasks)',
          'Platform threads still better for CPU-bound tasks',
          'Structured concurrency (preview): manage groups of related tasks'
        ],
        detailed: `Java 21 is an LTS release with game-changing features, especially Virtual Threads.

**Virtual Threads (Project Loom):** Lightweight threads managed by the JVM, not the OS. Each virtual thread uses a fraction of the memory of a platform thread. Ideal for I/O-bound workloads like web servers handling thousands of concurrent requests.

**Pattern Matching for Switch:** Exhaustive pattern matching with type patterns, guarded patterns, and null handling in switch statements.

**Sequenced Collections:** New interfaces (SequencedCollection, SequencedSet, SequencedMap) providing uniform access to first/last elements and reversed views.`,
        examples: [
          {
            title: 'Java 21 Virtual Threads & Patterns',
            type: 'code',
            language: 'java',
            code: `// Virtual Threads — lightweight concurrency
Thread vt = Thread.ofVirtual().start(() -> {
    System.out.println("Running on: " + Thread.currentThread());
});

// Virtual thread executor — handles millions of tasks
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i ->
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        })
    );
} // All 10,000 tasks run concurrently!

// Record patterns — destructuring
record Point(int x, int y) {}
Object obj = new Point(3, 4);
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y); // Destructured!
}

// Pattern matching for switch (exhaustive)
String describe(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "Positive int: " + i;
        case Integer i            -> "Non-positive int: " + i;
        case String s             -> "String: " + s;
        case null                 -> "null";
        default                   -> "Other: " + obj;
    };
}

// Sequenced Collections
SequencedCollection<String> seq = new LinkedHashSet<>(List.of("a","b","c"));
seq.getFirst();  // "a"
seq.getLast();   // "c"
seq.reversed();  // ["c", "b", "a"]`,
            explanation: 'Virtual threads enable massive concurrency for I/O-bound apps. Record patterns and switch patterns make code more expressive and safe.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MULTITHREADING & CONCURRENCY
  // ──────────────────────────────────────────────
  {
    id: 'java-threading',
    name: 'Multithreading & Concurrency',
    icon: '🔄',
    concepts: [
      {
        id: 'j-threads-basics',
        title: 'Threads, Runnable & Thread Lifecycle',
        level: 'junior',
        shortDesc: 'Thread: unit of execution. Create via extending Thread or implementing Runnable. States: NEW→RUNNABLE→RUNNING→BLOCKED/WAITING→TERMINATED.',
        keyPoints: [
          'Thread: smallest unit of execution within a process',
          'Create: extend Thread class OR implement Runnable (preferred)',
          'Runnable is a functional interface — use with lambdas',
          'Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED',
          'start() creates new thread; run() executes in current thread',
          'sleep(ms): pauses thread, keeps lock. wait(): releases lock',
          'join(): wait for another thread to finish',
          'yield(): hint to scheduler to give up CPU',
          'Daemon threads: background threads that don\'t prevent JVM shutdown',
          'Thread priority: 1 (MIN) to 10 (MAX), 5 (NORM) default'
        ],
        detailed: `**Thread Creation:**
1. Extend Thread class and override run()
2. Implement Runnable interface (preferred — allows extending another class)

**Thread Lifecycle:**
NEW → (start()) → RUNNABLE → (scheduled) → RUNNING
RUNNING → (sleep/wait/blocked) → BLOCKED/WAITING
RUNNING → (complete) → TERMINATED

**Important Methods:**
- start(): Creates OS thread and calls run()
- run(): Contains the task code
- sleep(long ms): Pauses current thread (static)
- join(): Calling thread waits for target thread to finish
- interrupt(): Requests thread to stop`,
        examples: [
          {
            title: 'Thread Creation & Lifecycle',
            type: 'code',
            language: 'java',
            code: `// Method 1: Extend Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread: " + getName());
    }
}

// Method 2: Implement Runnable (preferred)
Runnable task = () -> System.out.println("Runnable: " + Thread.currentThread().getName());

// Start threads
new MyThread().start();        // Method 1
new Thread(task).start();      // Method 2
new Thread(() -> {             // Lambda
    try {
        Thread.sleep(1000);    // Sleep 1 second
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}).start();

// Join — wait for thread to finish
Thread t = new Thread(() -> heavyComputation());
t.start();
t.join();  // Main thread waits here until t finishes
System.out.println("Thread finished");

// Daemon thread
Thread daemon = new Thread(() -> { while(true) { cleanup(); } });
daemon.setDaemon(true);  // Won't prevent JVM shutdown
daemon.start();`,
            explanation: 'Use Runnable (lambda) for tasks, Thread for thread management. Always call start() not run(). Use join() for coordination.'
          }
        ]
      },
      {
        id: 'j-volatile-atomic-sync',
        title: 'volatile, Atomic & synchronized',
        level: 'mid',
        shortDesc: 'volatile: visibility guarantee. synchronized: mutual exclusion (lock). Atomic: lock-free thread-safe operations (CAS). Choose based on need: visibility vs atomicity vs compound operations.',
        keyPoints: [
          'volatile: guarantees visibility of changes across threads (no caching)',
          'volatile does NOT guarantee atomicity (count++ is not atomic even with volatile)',
          'synchronized: provides both visibility AND mutual exclusion (locking)',
          'synchronized block: synchronized(lockObject) { ... }',
          'synchronized method: entire method is locked on "this" or Class object',
          'Atomic classes: AtomicInteger, AtomicLong, AtomicReference — lock-free CAS',
          'CAS (Compare-And-Swap): atomic hardware-level operation',
          'Atomic operations: incrementAndGet(), compareAndSet(), getAndUpdate()',
          'volatile for flags/simple reads. synchronized for compound operations. Atomic for counters',
          'Deadlock: two threads waiting for each other\'s locks indefinitely'
        ],
        detailed: `**volatile:** Ensures that writes to a variable are immediately visible to other threads. The variable is read from/written to main memory, not thread-local cache. Does NOT provide atomicity for compound operations.

**synchronized:** Provides mutual exclusion — only one thread can execute the synchronized block/method at a time. Also guarantees visibility (happens-before relationship).

**Atomic Classes:** Use hardware CAS (Compare-And-Swap) for lock-free thread safety. Better performance than synchronized for simple operations like counters.

**Choosing:**
- Simple flag/boolean: volatile
- Counter/numeric operations: AtomicInteger/AtomicLong
- Compound operations: synchronized or Lock`,
        examples: [
          {
            title: 'volatile vs synchronized vs Atomic',
            type: 'code',
            language: 'java',
            code: `// volatile — visibility only
class VolatileExample {
    private volatile boolean running = true; // All threads see latest value

    void stop() { running = false; }
    void run() { while (running) { /* work */ } }
}

// synchronized — mutual exclusion + visibility
class SyncCounter {
    private int count = 0;

    synchronized void increment() { count++; }       // Thread-safe
    synchronized int getCount() { return count; }

    void transfer(SyncCounter target, int amount) {
        synchronized (this) {            // Lock on this
            synchronized (target) {      // Lock on target (beware deadlock!)
                this.count -= amount;
                target.count += amount;
            }
        }
    }
}

// Atomic — lock-free CAS
class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0);

    void increment() { count.incrementAndGet(); }     // Atomic CAS
    int getCount() { return count.get(); }

    void updateIfPositive(int newVal) {
        count.updateAndGet(current -> current > 0 ? newVal : current);
    }
}

// Performance comparison (counter with 10 threads):
// Atomic > synchronized > volatile (volatile can't do count++ safely)`,
            explanation: 'volatile for visibility flags, Atomic for lock-free counters, synchronized for compound critical sections.'
          }
        ]
      },
      {
        id: 'j-locks',
        title: 'Locks (ReentrantLock, ReadWriteLock)',
        level: 'mid',
        shortDesc: 'java.util.concurrent.locks provides more flexible locking than synchronized. ReentrantLock: explicit lock/unlock. ReadWriteLock: separate read/write locks for better concurrency.',
        keyPoints: [
          'ReentrantLock: explicit lock() / unlock() — more flexible than synchronized',
          'Must always unlock in finally block to prevent deadlocks',
          'tryLock(): non-blocking attempt to acquire lock (with optional timeout)',
          'Fairness: new ReentrantLock(true) — FIFO order for waiting threads',
          'ReadWriteLock: multiple readers OR one writer (not both)',
          'ReadWriteLock improves concurrency for read-heavy workloads',
          'Condition: await()/signal() — like wait()/notify() but per-lock',
          'StampedLock (Java 8): optimistic read locking for even better performance',
          'Prefer synchronized for simple cases; Locks for advanced features'
        ],
        detailed: `**ReentrantLock vs synchronized:**
- Explicit lock/unlock gives more control
- Can try to acquire lock without blocking (tryLock)
- Can be interrupted while waiting for lock
- Supports fairness policy (FIFO)
- Multiple Condition objects per lock
- Must be manually unlocked (use try-finally)

**ReadWriteLock:**
- Multiple threads can read simultaneously
- Only one thread can write; writers have exclusive access
- Good for read-heavy scenarios`,
        examples: [
          {
            title: 'ReentrantLock with try-finally',
            type: 'code',
            language: 'java',
            code: `ReentrantLock lock = new ReentrantLock();

public void safeMethod() {
    lock.lock();
    try {
        // Critical section
        performOperation();
    } finally {
        lock.unlock();  // ALWAYS in finally!
    }
}

// Non-blocking try
if (lock.tryLock()) {
    try {
        // Got the lock
    } finally {
        lock.unlock();
    }
} else {
    // Lock not available, do something else
}
`,
            explanation: 'Always use try-finally with ReentrantLock to ensure unlock happens even if exception occurs.'
          }
        ]
      },
      {
        id: 'j-concurrent-collections',
        title: 'Concurrent Collections',
        level: 'mid',
        shortDesc: 'Thread-safe collections designed for concurrent access — ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue.',
        keyPoints: [
          'ConcurrentHashMap: segment-based locking, no full lock on reads',
          'computeIfAbsent(), merge() — atomic compound operations',
          'CopyOnWriteArrayList: snapshot iterator, writes copy array',
          'BlockingQueue: producer-consumer (put blocks if full, take blocks if empty)',
          'ConcurrentSkipListMap: sorted concurrent map',
          'Never use synchronized collections (synchronizedList) in production'
        ],
        detailed: `**ConcurrentHashMap:**
- Read operations don't block
- Atomic operations: computeIfAbsent, computeIfPresent, merge
- Parallel operations: forEach, reduce with parallelism threshold

**BlockingQueue variants:**
- ArrayBlockingQueue: bounded, optional fairness
- LinkedBlockingQueue: optionally bounded, higher throughput
- PriorityBlockingQueue: priority ordering`,
        examples: [
          {
            title: 'ConcurrentHashMap Atomic Operations',
            type: 'code',
            language: 'java',
            code: `ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Atomic put if absent
map.putIfAbsent("key", 1);

// Atomic compute — thread-safe increment
map.compute("key", (k, v) -> v == null ? 1 : v + 1);

// Atomic computeIfAbsent — lazy initialization
map.computeIfAbsent("cache", k -> expensiveComputation());

// Atomic merge — combine with existing
map.merge("key", 1, Integer::sum);`,
            explanation: 'ConcurrentHashMap provides atomic compound operations. No external synchronization needed.'
          }
        ]
      },
      {
        id: 'j-fork-join',
        title: 'Fork/Join Framework',
        level: 'senior',
        shortDesc: 'Divide-and-conquer parallelism with work-stealing. RecursiveTask returns result, RecursiveAction for side effects.',
        keyPoints: [
          'ForkJoinPool: work-stealing thread pool',
          'RecursiveTask<V>: returns a result',
          'RecursiveAction: no result (side effects only)',
          'fork(): async execute in pool',
          'join(): wait for result',
          'Common pool used by parallel streams',
          'Threshold tuning: below threshold run sequentially'
        ],
        detailed: `**Fork/Join Concepts:**
- Divide large task into smaller subtasks (fork)
- Process subtasks in parallel
- Combine results (join)
- Work-stealing: idle threads steal from busy threads`,
        examples: [
          {
            title: 'Parallel Sum with Fork/Join',
            type: 'code',
            language: 'java',
            code: `public class ParallelSum extends RecursiveTask<Long> {
    private static final int THRESHOLD = 10_000;
    private final long[] array;
    private final int start, end;

    protected Long compute() {
        if (end - start <= THRESHOLD) {
            // Base case: compute sequentially
            long sum = 0;
            for (int i = start; i < end; i++) sum += array[i];
            return sum;
        }
        int mid = (start + end) / 2;
        ParallelSum left = new ParallelSum(array, start, mid);
        ParallelSum right = new ParallelSum(array, mid, end);
        left.fork();                    // Async left
        long rightResult = right.compute();  // Direct compute right
        return left.join() + rightResult;
    }
}`,
            explanation: 'Divide array until threshold, then compute sequentially. Fork left, compute right directly, then join.'
          }
        ]
      },
      {
        id: 'j-memory-model',
        title: 'Java Memory Model (JMM)',
        level: 'senior',
        shortDesc: 'Defines how threads interact through memory — visibility, ordering, happens-before relationships.',
        keyPoints: [
          'Visibility: changes may not be visible to other threads',
          'Happens-before: guarantees visibility and ordering',
          'synchronized: establishes happens-before',
          'volatile: immediate visibility, prevents reordering',
          'final fields: safe after constructor',
          'Double-checked locking requires volatile'
        ],
        detailed: `**Happens-Before:**
- synchronized unlock → subsequent lock
- volatile write → subsequent read
- Thread.start() → thread run()
- Thread completion → join() returns`,
        examples: [
          {
            title: 'Double-Checked Locking (Correct)',
            type: 'code',
            language: 'java',
            code: `public class Singleton {
    // volatile is REQUIRED!
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
            explanation: 'Without volatile, JVM may reorder instructions causing partially constructed object visibility.'
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // JVM TUNING & PERFORMANCE
  // ──────────────────────────────────────────────
  {
    id: 'java-jvm-tuning',
    name: 'JVM Tuning & Performance',
    icon: '🔧',
    concepts: [
      {
        id: 'j-gc-algorithms',
        title: 'Garbage Collection Algorithms',
        level: 'senior',
        shortDesc: 'G1 (default), ZGC (low latency), Parallel GC. Understanding generations and tuning.',
        keyPoints: [
          'Serial GC: single-threaded, small heaps',
          'Parallel GC: throughput-focused',
          'G1 GC: balanced (default since Java 9)',
          'ZGC: ultra-low latency (<10ms)',
          'Young Gen (Eden + Survivor), Old Gen',
          'Minor GC: young gen; Major GC: old gen'
        ],
        detailed: `**GC Selection:**
- Small heap → Serial GC
- Throughput → Parallel GC
- Balanced → G1 GC
- Low latency → ZGC`,
        examples: [
          {
            title: 'GC Configuration',
            type: 'scenario',
            language: 'bash',
            code: `# G1 GC (Recommended)
java -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -Xms4g -Xmx4g -jar app.jar

# ZGC (Low latency, Java 15+)
java -XX:+UseZGC -Xms8g -Xmx8g -jar app.jar

# Enable GC logging
java -Xlog:gc*:file=gc.log:time -jar app.jar`,
            explanation: 'Set -Xms equal to -Xmx. G1 is default and works well for most apps.'
          }
        ]
      },
      {
        id: 'j-jvm-flags',
        title: 'Essential JVM Flags',
        level: 'mid',
        shortDesc: 'Key JVM options for heap size, GC, and debugging.',
        keyPoints: [
          '-Xms/-Xmx: initial/max heap (set equal)',
          '-XX:+UseG1GC: G1 collector',
          '-XX:MaxGCPauseMillis: target pause',
          '-XX:+HeapDumpOnOutOfMemoryError',
          '-XX:MetaspaceSize: initial metaspace'
        ],
        detailed: `**Production Settings:**
- Set heap sizes equal to avoid resizing
- Enable heap dump on OOM
- Use G1 GC with pause time goal`,
        examples: [
          {
            title: 'Production JVM Settings',
            type: 'scenario',
            language: 'bash',
            code: `java \\
  -Xms4g -Xmx4g \\
  -XX:+UseG1GC \\
  -XX:MaxGCPauseMillis=200 \\
  -XX:+HeapDumpOnOutOfMemoryError \\
  -XX:HeapDumpPath=/var/log/ \\
  -Xlog:gc*:file=gc.log \\
  -jar application.jar`,
            explanation: 'Standard production configuration with G1 GC and OOM heap dump.'
          }
        ]
      },
      {
        id: 'j-memory-analysis',
        title: 'Memory Leak Detection',
        level: 'senior',
        shortDesc: 'Heap dumps, jmap, VisualVM, JFR for finding memory leaks.',
        keyPoints: [
          'jps: list Java processes',
          'jmap -dump: create heap dump',
          'jstat -gc: GC statistics',
          'Eclipse MAT: heap analysis',
          'JFR: low-overhead profiling'
        ],
        detailed: `**Common Leak Patterns:**
- Static collections growing
- Listeners not unregistered
- Thread locals not removed
- Unclosed resources`,
        examples: [
          {
            title: 'Memory Analysis Commands',
            type: 'scenario',
            language: 'bash',
            code: `# List Java processes
jps -lv

# Create heap dump
jmap -dump:format=b,file=heap.hprof <pid>

# GC statistics every 1 second
jstat -gc <pid> 1000

# Start with JFR recording
java -XX:StartFlightRecording=duration=60s,filename=rec.jfr -jar app.jar`,
            explanation: 'Use jmap for heap dumps, analyze with Eclipse MAT.'
          }
        ]
      }
    ]
  }
];

export default javaTopics;

