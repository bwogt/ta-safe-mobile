## Description

Provide a brief overview of what this PR introduces, changes, or removes, explaining the technical
reason behind these modification.

## 🔧 What was done

List the main changes made the code in bullet points (e.g., file creation, refactoring, new dependencies,
or configuration adjustments).

## 🧪 How to test

Step-by-step instructions for the reviewer to test the changes (e.g., commands to run, tests to be performed,
specific endpoints to call, or UI flows to follow).

1. Start the backend API ([ta-safe-api](https://github.com/bwogt/ta-safe-api))

```zsh
docker compose --profile web up -d
```

2. Start the Expo development server:

```zsh
npx expo start -c
```

3. Run the automated test suite

```bash
npm run test:ci
```

## 🔗 Related Issue

Closes #**ISSUE_NUMBER**
