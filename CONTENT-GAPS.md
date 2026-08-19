# Content gaps

Topics that exist in the Obsidian vault (`<notes vault>`)
but have no page in the app. Adding one is a JSON file in `src/data/`, a five-line
page component, a route in `App.js`, and entries in `src/navigation.js` and
`src/searchIndex.js` — see CLAUDE.md.

Sizes are of the vault source. Nothing here has been imported yet.

## Imported ✅

These were the critical gaps; all five now have pages.

| Topic | Page | Route |
|---|---|---|
| Microservices | 13 tabs | `/architecture/microservices` |
| Kafka & Messaging | 11 tabs | `/architecture/kafka` |
| System Design | 13 tabs | `/architecture/system-design` |
| JVM Internals & GC | 10 tabs | `/java/jvm` |
| Technical Questions | 207 questions, 11 tabs | `/practice/questions` |

Notes on those imports: the two microservices cuts (`Architecture/json/` and
`Agile & DevOps/json/`) turned out to be the same content in different shapes and
were reconciled. The JVM note's interview answers were filed under the topic each
one is about rather than duplicated into a questions tab. Vault `[[wikilinks]]` and
`#hashtag` footers were dropped; the hashtags became the pages' tag pills.

## High value

| Topic | Vault source | Size | Note |
|---|---|---|---|
| Modern Java (21-25) | `Java Core/Modern Java (21-25).md` | 7.5 KB | Records, sealed types, pattern matching, virtual threads. The app stops at Java 8+. |
| DevOps Practices | `Agile & DevOps/DevOps Practices.md` + json | 36 KB JSON | Largest unused vault JSON. |
| Technical Scenarios | `Practice/Technical Scenarios.md` | 12.3 KB | "How would you handle…" prompts; complements the Q&A bank. |
| DSA Patterns & Big-O | `Practice/DSA Patterns & Big-O.md` | 7.5 KB | Screening rounds are frequently DSA-only. |
| HR & Behavioral | `HR & Behavioral Preparation/` (3 notes + json) | 43 KB | STAR answers; every loop has a behavioural round. |
| Java-Interview-QA | vault root `Java-Interview-QA.md` | 120 KB | Biggest single note, unfiled. Overlaps the imported Technical Questions bank — de-duplicate against `/practice/questions` before importing. |

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
