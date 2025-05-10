# Technical Documentation JSON Template

## Overview
This template provides a structure for creating comprehensive technical documentation in JSON format. Based on the provided sample, this template offers a flexible way to document technical topics with their concepts, definitions, examples, and code snippets.

## Basic Structure
```json
{
  "id": "topic-identifier",
  "title": "Topic Name",
  "topics": [
    {
      "title": "Concept Name",
      "multi-content": [
        // Content elements
      ]
    }
  ]
}
```

## Content Elements
Each topic can have multiple content elements structured in one of the following ways:

### Simple Content
For straightforward explanations, definitions, or single code examples:
```json
{
  "title": "Description",
  "simple-content": "A detailed explanation of the concept."
}
```

### Multi-Content as Array of Strings
For lists of items like benefits, best practices, or steps:
```json
{
  "title": "Benefits",
  "multi-content": [
    "First benefit description",
    "Second benefit description",
    "Third benefit description"
  ]
}
```

### Multi-Content as Array of Objects
For more complex content like examples with variations or types with attributes:
```json
{
  "title": "Types",
  "multi-content": [
    {
      "title": "Type One",
      "multi-content": [
        {
          "title": "Description",
          "simple-content": "Description of Type One"
        },
        {
          "title": "Best For",
          "simple-content": "Use cases for Type One"
        }
      ]
    },
    {
      "title": "Type Two",
      "multi-content": [
        // Content for Type Two
      ]
    }
  ]
}
```

## Code Examples
Code examples should be structured as follows (note that "code_examples" uses snake_case unlike most other titles):

```json
{
  "title": "code_examples",
  "multi-content": [
    {
      "title": "Example One",
      "simple-content": "public class Example {\n  // Code implementation\n}"
    },
    {
      "title": "Example Two",
      "simple-content": "@Annotation\npublic class AnotherExample {\n  // Another implementation\n}"
    }
  ]
}
```

## Title Formatting
Most title fields should be display-ready with proper spaces and capitalization. For example:
- Use "Constructor Injection" instead of "constructor_injection"
- Use "Bean Lifecycle" instead of "beanLifecycle"

However, code examples are an exception - the title for the code examples section should be "code_examples" in snake_case.

## Complete Example
Here's a complete example for a "Dependency Injection" topic:

```json
{
  "title": "Dependency Injection",
  "multi-content": [
    {
      "title": "Description",
      "simple-content": "A specific pattern of implementing IoC where object dependencies are provided from an external source rather than created internally."
    },
    {
      "title": "Definition",
      "simple-content": "A pattern in which an object's dependencies are provided by an external source (usually the IoC container) rather than the object instantiating them itself, promoting loose coupling."
    },
    {
      "title": "Types",
      "multi-content": [
        {
          "title": "Constructor Injection",
          "multi-content": [
            {
              "title": "Description",
              "simple-content": "Dependencies provided via constructor"
            },
            {
              "title": "Best For",
              "simple-content": "Required dependencies, immutable objects"
            },
            {
              "title": "Advantages",
              "multi-content": [
                "Ensures required dependencies are provided",
                "Promotes immutability (dependencies can be final)",
                "Makes dependencies explicit and visible at construction"
              ]
            }
          ]
        },
        {
          "title": "Setter Injection",
          "multi-content": [
            {
              "title": "Description",
              "simple-content": "Dependencies provided via setter methods"
            },
            {
              "title": "Best For",
              "simple-content": "Optional dependencies, reconfigurable objects"
            }
          ]
        }
      ]
    },
    {
      "title": "code_examples",
      "multi-content": [
        {
          "title": "Constructor Injection",
          "simple-content": "@Service\npublic class UserService {\n    private final UserRepository userRepository;\n    \n    @Autowired\n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n}"
        },
        {
          "title": "Setter Injection",
          "simple-content": "@Service\npublic class UserService {\n    private UserRepository userRepository;\n    \n    @Autowired\n    public void setUserRepository(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n}"
        }
      ]
    }
  ]
}
```

## Guidelines
1. Maintain consistent structure across similar concepts
2. Use display-ready titles with proper capitalization and spaces
3. Group related information logically using nested multi-content
4. For code examples, use proper indentation and formatting in the simple-content field
5. Include all relevant details: descriptions, definitions, examples, code samples, best practices, etc.
