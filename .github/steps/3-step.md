# Lesson 3

## Welcome Back!

In today's lesson, we'll learn about `git rebase`.

### Getting Started

Let's start by creating a branch for today's work!

<!--
```shellSession
$ git switch -c lesson/3
```
-->

!['git switch -c lesson/3'](/.images/shell/3-step-shell-0.svg)

## Exercise 1: Understanding rebase

Rebasing allows you to move or combine a sequence of commits to a new base commit.  In other words, it allows you to give your commits a new *base*.

There are two forms of rebasing: ***basic*** and ***interactive***

### Basic rebasing

A basic rebase is very similar to a **fast-forward merge**.  Suppose you're working in a feature branch and the master branch gets updated.

To include those updates in your feature branch you could either `git merge` or `git rebase`.

Let's work through an example to illustrate.

First, let's create a "feature" branch to work on:

<!--
```shellSession
$ git switch -c lesson/3-rebase
```
-->

!['git switch -c lesson/3-rebase'](/.images/shell/3-step-shell-1.svg)

Let's create a few commits in the `lesson/3-rebase` branch:

<!--
```shellSession
$ git commit -m "lesson/3-rebase commit 1" --allow-empty
$ git commit -m "lesson/3-rebase commit 2" --allow-empty
```
-->

![''git commit -m "lesson/3-rebase commit 1" --allow-empty' 'git commit -m "lesson/3-rebase commit 2" --allow-empty''](/.images/shell/3-step-shell-2.svg)

Now, let's switch back to the `lesson/3` branch:

<!--
```shellSession
$ git switch lesson/3
```
-->

!['git switch lesson/3'](/.images/shell/3-step-shell-3.svg)

And create a few commits to `lesson/3` branch:

<!--
```shellSession
$ git commit -m "lesson/3 commit 1" --allow-empty
$ git commit -m "lesson/3 commit 2" --allow-empty
```
-->

![''git commit -m "lesson/3 commit 1" --allow-empty' 'git commit -m "lesson/3 commit 2" --allow-empty''](/.images/shell/3-step-shell-4.svg)

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 7
```
-->

!['git log --oneline --graph --decorate --all -n 7'](/.images/shell/3-step-shell-5.svg)

Let's switch back to `lesson/3-rebase`:

<!--
```shellSession
$ git switch lesson/3-rebase
```
-->

!['git switch lesson/3-rebase'](/.images/shell/3-step-shell-6.svg)

And finally rebase `lesson/3-rebase` onto `lesson/3`:

<!--
```shellSession
$ git rebase lesson/3
```
-->

!['git rebase lesson/3'](/.images/shell/3-step-shell-7.svg)

Checking `git log`, we can see that the :

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 7
```
-->

!['git log --oneline --graph --decorate --all -n 7'](/.images/shell/3-step-shell-8.svg)

### Interactive rebasing

Interactive rebasing allows you to alter individual commits in the process. You can squash commits (combine them), reorder them, amend them, or split them.

#### Squashing commits

Create a new branch:

<!--
```shellSession
$ git switch -c lesson/3-squash
```
-->

!['git switch -c lesson/3-squash'](/.images/shell/3-step-shell-9.svg)

... and make several commits:

<!--
```shellSession
$ touch squash1 && git add squash1 && git commit -m "Added squash1"
$ touch squash2 && git add squash2 && git commit -m "Added squash2"
```
-->

![''touch squash1 && git add squash1 && git commit -m "Added squash1"' 'touch squash2 && git add squash2 && git commit -m "Added squash2"''](/.images/shell/3-step-shell-10.svg)

Peeking at the `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 5
```
-->

!['git log --oneline --decorate --all --graph -n 5'](/.images/shell/3-step-shell-11.svg)

Now, initiate the rebase with `git rebase -i HEAD~2`:

```shell
git rebase -i HEAD~2
```

This opens a text editor with:

![''](/.images/3-step-shell-squash-editor-1.svg)

Change `pick` to `squash` on the second line and save the file:

![''](/.images/3-step-shell-squash-editor-2.svg)

Another text editor window will open for you to enter the new commit message. Save the file.

![''](/.images/3-step-shell-squash-editor-3.svg)

Change the commit message as desired and save the file:

![''](/.images/3-step-shell-squash-editor-4.svg)

After saving the file, the terminal output will be:

![''](/.images/3-step-shell-squash-editor-5.svg)

Looking at the `git log`:

!['git log --oneline --decorate --all --graph -n 5'](/.images/3-step-shell-squash-log-2.svg)

#### Reordering commits

TBD

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push --set-upstream origin lesson/3
```
-->

!['git push --set-upstream origin lesson/3'](/.images/shell/3-step-shell-12.svg)
