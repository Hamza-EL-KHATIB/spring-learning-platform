# Content coverage

Every topic in the Obsidian vault (`<notes vault>`)
now has a page. This file records what was imported, the judgement calls made along
the way, and what is genuinely left.

To add a page: JSON in `src/data/`, a `TopicPageTemplate` one-liner in
`src/pages/topics/`, a route in `App.js`, and entries in `src/navigation.js` and
`src/searchIndex.js` — see CLAUDE.md.

## Imported

| Topic | Route | Vault source |
|---|---|---|
| Microservices | `/architecture/microservices` | `Architecture/Microservices.md` + both json cuts |
| Kafka & Messaging | `/architecture/kafka` | `Architecture/Kafka & Messaging.md` |
| System Design | `/architecture/system-design` | `Architecture/System Design.md` |
| JVM Internals & GC | `/java/jvm` | `Java Core/JVM Internals & GC.md` |
| Modern Java (21-25) | `/java/modern` | `Java Core/Modern Java (21-25).md` |
| NoSQL Concepts | `/databases/nosql` | `Databases/NoSQL Concepts.md` |
| CI/CD Pipeline | `/devops/cicd` | `Agile & DevOps/CI-CD Pipeline.md` |
| Docker & Kubernetes | `/devops/containers` | `Agile & DevOps/Docker & Kubernetes.md` |
| DevOps Practices | `/devops/practices` | `Agile & DevOps/DevOps Practices.md` |
| Cloud Fundamentals | `/devops/cloud` | `Agile & DevOps/Cloud Fundamentals (AWS & Azure).md` |
| Question Bank (207 q) | `/practice/questions` | `Practice/json/technical-questions.json` |
| Q&A by Level (133 q) | `/practice/by-level` | `Java-Interview-QA.md` (vault root) |
| DSA Patterns & Big-O | `/practice/dsa` | `Practice/DSA Patterns & Big-O.md` |
| Technical Scenarios | `/practice/scenarios` | `Practice/Technical Scenarios.md` |
| Behavioral & HR | `/practice/behavioral` | `HR & Behavioral Preparation/` (3 notes) + `Practice/Behavioral Scenarios.md` |
| Performance Tuning | `/architecture/performance` | none — written from scratch |

## Judgement calls worth knowing

**Two question banks, two axes.** `/practice/questions` is organised by subject,
`/practice/by-level` by seniority. The level-based one came from the 120 KB unfiled
root note; its topic sections duplicated the subject bank, so ~30 such questions were
dropped and only the seniority material kept.

**Behavioral & HR merges four overlapping notes** into themed tabs rather than one tab
per source. Each story is told once: STAR breakdowns in the STAR Method tab, the rest
as prose in Signature Stories.

**Some vault JSON files are structural mirrors of their `.md`,** not extra content —
`nosql-concepts.json`, `devops-practices.json` and the three HR companions all turned
out to be subsets. Check before assuming a `json/` file adds anything.

**Deliberate non-duplication:** the Git command reference inside `DevOps Practices.md`
was left out because `/devops/git` already covers it; the JVM note's interview answers
were filed under the topic each one is about rather than given a questions tab.

**Dropped everywhere:** vault-internal `[[wikilinks]]`, "Related Topics" lists, and
`#hashtag` footers (the hashtags became each page's tag pills).

## What's actually left

Nothing in the vault is unconverted, and the one gap with no vault source
(performance tuning) has been written. Remaining ideas:

- `architecture/best-practices.json` was deleted: 0 bytes, no vault source, and its
  subject is already covered by the SOLID, YAGNI/KISS/DRY and Code Reviews pages.
- `Architecture/Design Patterns in Spring Boot & Java.md` was partially harvested into
  `design-patterns.json`; its `advanced_patterns`, `network_proxy_types` and
  `pattern_decision_guide` sections remain unused and could justify their own page.

## Vault errors — fixed

Two wrong claims were corrected in **both** the repo and the Obsidian vault, so a future
sync won't reintroduce them:

- **ConcurrentHashMap segment locking.** That is the Java 7 design; Java 8 replaced it
  with per-bin locking (CAS on an empty bin, `synchronized` on the bin head otherwise).
  It appeared in seven places: `Java Core/Concurrency.md` (×2), `Collections.md` (×2),
  `Practice/Technical Questions.md`, and the three mirroring `json/` files.
- **`AutoCloseable` `ExecutorService` wrapper presented as necessary.** `ExecutorService`
  has extended `AutoCloseable` since Java 19, so try-with-resources works directly — and
  `close()` also *waits* for tasks, unlike `shutdown()` alone. In `Concurrency.md` and its
  companion JSON.
