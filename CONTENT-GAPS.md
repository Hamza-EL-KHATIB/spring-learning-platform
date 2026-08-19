# Content gaps

Topics that exist in the Obsidian vault (`<notes vault>`)
but have no page in the app. Adding one is a JSON file in `src/data/`, a five-line
page component, a route in `App.js`, and entries in `src/navigation.js` and
`src/searchIndex.js` — see CLAUDE.md.

Sizes are of the vault source. Nothing here has been imported yet.

## Critical for a Spring backend role

| Topic | Vault source | Size | Why it matters |
|---|---|---|---|
| Microservices | `Architecture/Microservices.md` + `json/microservices.json` | 24 KB | Service boundaries, resilience patterns, saga, inter-service comms. Biggest single gap. |
| Kafka & Messaging | `Architecture/Kafka & Messaging.md` | 7.4 KB | Partitions, consumer groups, delivery semantics. Expected wherever Kafka is on the JD. |
| System Design | `Architecture/System Design.md` | 7.2 KB | Usually its own interview stage; nothing in the app covers it. |
| JVM Internals & GC | `Java Core/JVM Internals & GC.md` | 8.5 KB | Heap/metaspace, GC algorithms, tuning flags, OOM diagnosis. Classic senior differentiator. |
| Technical Questions | `Practice/Technical Questions.md` + `json/technical-questions.json` | 104 KB JSON | Largest asset in the vault, entirely unused. Would suit a dedicated Practice section. |

There is a second cut of microservices under `Agile & DevOps/json/microservices.json`
(16 KB) — reconcile the two before importing either.

## High value

| Topic | Vault source | Size | Note |
|---|---|---|---|
| Modern Java (21-25) | `Java Core/Modern Java (21-25).md` | 7.5 KB | Records, sealed types, pattern matching, virtual threads. The app stops at Java 8+. |
| DevOps Practices | `Agile & DevOps/DevOps Practices.md` + json | 36 KB JSON | Largest unused vault JSON. |
| Technical Scenarios | `Practice/Technical Scenarios.md` | 12.3 KB | "How would you handle…" prompts; complements the Q&A bank. |
| DSA Patterns & Big-O | `Practice/DSA Patterns & Big-O.md` | 7.5 KB | Screening rounds are frequently DSA-only. |
| HR & Behavioral | `HR & Behavioral Preparation/` (3 notes + json) | 43 KB | STAR answers; every loop has a behavioural round. |
| Java-Interview-QA | vault root `Java-Interview-QA.md` | 120 KB | Biggest single note, unfiled. Likely overlaps Technical Questions — de-duplicate first. |

## Empty placeholder files already in the repo

These import cleanly today only because nothing references them. `nosql.json` is
referenced from a commented-out import in `TopicPage.js`.

| Repo file | Vault source | Status |
|---|---|---|
| `src/data/databases/nosql.json` | `Databases/NoSQL Concepts.md` + json (27 KB) | 0 bytes — source ready, interview-critical |
| `src/data/devops/cicd.json` | `Agile & DevOps/CI-CD Pipeline.md` (10.8 KB) | 0 bytes — source ready |
| `src/data/devops/containers.json` | `Agile & DevOps/Docker & Kubernetes.md` (6.9 KB) | 0 bytes — source ready |
| `src/data/architecture/best-practices.json` | none | 0 bytes, no source — delete |
| `src/data/architecture/performance.json` | none | 0 bytes, no source — would need writing from scratch |

## Medium

Cloud Fundamentals (AWS & Azure) 6 KB · Questions to Ask 7.1 KB · Strengths and
Weaknesses 5.3 KB · Behavioral Scenarios 9.3 KB (overlaps the HR notes — merge).

`Architecture/Design Patterns in Spring Boot & Java.md` (23 KB) was partially
harvested into `design-patterns.json`; its `advanced_patterns`,
`network_proxy_types` and `pattern_decision_guide` sections remain unused.

## Known vault errors

Two claims in `Java Core/Concurrency.md` are wrong and were corrected in the repo
against the vault. Fix them in Obsidian so a future sync doesn't reintroduce them:

- ConcurrentHashMap described with segment locking — that is the Java 7 design.
- An `AutoCloseable` `ExecutorService` wrapper presented as necessary — `ExecutorService`
  has extended `AutoCloseable` since Java 19.
