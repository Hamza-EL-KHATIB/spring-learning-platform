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

Nothing in the vault is unconverted. Remaining ideas, in rough value order:

- **Deleted as unusable:** `architecture/best-practices.json` and
  `architecture/performance.json` were 0 bytes with no vault source. Performance
  tuning is a real gap, but there is no note to import — it would need writing.
- `Architecture/Design Patterns in Spring Boot & Java.md` was partially harvested into
  `design-patterns.json`; its `advanced_patterns`, `network_proxy_types` and
  `pattern_decision_guide` sections remain unused and could justify their own page.
- `src/data/topics.json` is dead — nothing imports it. Safe to delete.

## Known vault errors

Two claims in `Java Core/Concurrency.md` are wrong and were corrected in the repo
against the vault. Fix them in Obsidian so a future sync doesn't reintroduce them:

- ConcurrentHashMap described with segment locking — that is the Java 7 design.
- An `AutoCloseable` `ExecutorService` wrapper presented as necessary — `ExecutorService`
  has extended `AutoCloseable` since Java 19.
