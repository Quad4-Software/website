---
title: Preview Deployments with Coolify
date: 2026-02-19
description: How we use Coolify for branch preview deployments.
---

Preview deployments let you test branches before merging. This post describes our setup.

## Why previews

- Test PRs in a real environment
- Share a URL with reviewers
- Catch build or runtime issues early

## Coolify

We use Coolify for self-hosted preview deployments. Each branch can get its own URL so you can verify the blog (or any feature) before it lands on master.
