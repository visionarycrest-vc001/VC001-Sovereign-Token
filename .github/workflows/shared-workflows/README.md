# Shared Workflow — Setup Node.js Environment (Pinned v4.4.0)

This workflow provides a **single, authoritative setup** for Node.js across all repositories, ensuring every run uses the same pinned `actions/setup-node` version, cache settings, and install logic.

By centralizing this logic here, you avoid duplicating configuration in each workflow, and future changes (Node version bumps, cache strategy updates) are made in one place.

## Invocation

From any consuming workflow:

```yaml
- name: Setup Node.js via shared workflow
  if: ${{ matrix.language == 'javascript-typescript' }} # or other condition
  uses: your-org/shared-workflows/.github/workflows/setup-node.yml@main
  with:
    node-version: 18                 # Optional — defaults to 18
    cache: npm                       # Optional — defaults to npm
    cache-dependency-path: package-lock.json  # Optional — defaults as shown
