# Lesson 4

## Welcome Back!

Let's start by creating a branch for today's work!

<!--
```shellSession
$ git switch -c lesson/4
```
-->

!['git switch -c lesson/4'](/.images/shell/4-step-shell-0.svg)

Great, but while we're here, what's that long number-like thing next to `commit`, above?

It's a **commit ID**.

## What is a Commit ID?

A **commit ID** (or **commit hash**) is a unique identifier for each commit. It is a 40-character alpha-numeric string calculated based on the contents of a commit.

> When using a commit ID, you only need to type out the first few characters, just enough to uniquely identify the commit within your repository. For example, you might see short versions of commit hashes in `git log` output, like `e83c516`.

## What is HEAD?

To the right of the **commit ID** in the `git log` output is `(HEAD -> lesson/3)`, which seems to indicate that something called `HEAD` is pointing to `lesson/3`.

Let's dig in.

In Git, `HEAD` can be thought of as the "you are here" marker in your repository. It's a pointer that indicates what the currently "checked out" commit is.

### Understanding HEAD

To get an intuitive understanding of `HEAD`, let's take a look at our `git log` (using some flags to make things easier to see):

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-1.svg)

This is a text-based graph of the commits in your repository. The commit that `HEAD` is pointing to is marked with `(HEAD)`.

> Note that `HEAD` is pointing to the latest commit on the `lesson/3` branch.

### Moving HEAD

Now let's switch over to `main`:

<!--
```shellSession
$ git switch main
```
-->

!['git switch main'](/.images/shell/4-step-shell-2.svg)

And see what `HEAD` is pointing to:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-3.svg)

> Notice how `HEAD` has moved to the latest commit on `main`?

Now let's switch back to `lesson/3`:

<!--
```shellSession
$ git switch lesson/3
```
-->

!['git switch lesson/3'](/.images/shell/4-step-shell-4.svg)

And make a commit:

<!--
```shellSession
$ touch head-test && git add head-test && git commit -m "Learning about HEAD"
```
-->

!['touch head-test && git add head-test && git commit -m "Learning about HEAD"'](/.images/shell/4-step-shell-5.svg)

And see what happens to `HEAD`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-6.svg)

> `HEAD` has been automatically moved to the new commit!

### Detached HEAD

Now let's see what happens when we checkout a specific commit, instead of a `branch`:

<!--
```shellSession
$ git checkout HEAD~3
```
-->

!['git checkout HEAD~3'](/.images/shell/4-step-shell-7.svg)

This warning seems quite scary, `detached HEAD` and all...  Get used to it, because you'll be seeing it a lot. `detached HEAD` happens so often that it's a perennial right of passage for Git users.  Having an intuitive understanding on what it means is key to Git success.

## Understanding Detached HEAD

First, let's take a look at `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-8.svg)

Seems pretty normal.

In fact, the only thing remotely "strange" is that `HEAD` doesn't have an arrow (`->`) pointing to a branch like `main` or `lesson/3`.

Let's see what happens when we **commit** something:

<!--
```shellSession
$ touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"
```
-->

!['touch detached-test && git add detached-test && git commit -m "Testing detached HEAD"'](/.images/shell/4-step-shell-9.svg)

And seeing what we have wrought:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-10.svg)

It looks like we've created a `branch`! Or, at least something that *looks* like a `branch`...

Let's think about that `detached HEAD` warning...

```shell
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -
...
```

... `git checkout` is advising us to create a *branch*...

For the sake of adventure, let's try the second option `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/.images/shell/4-step-shell-11.svg)

Now Git is literally *begging* us to create a *branch* at that commit, even giving us a whole ***new*** command for doing so...

Let's check `git log`:

<!--
```shellSession
$ git log --oneline --decorate --all --graph -n 10
```
-->

!['git log --oneline --decorate --all --graph -n 10'](/.images/shell/4-step-shell-12.svg)

And the commit is gone.

But is it *really*?  I mean, we have the commit ID right there on our screen... what's stopping us from doing a `git branch <new-branch-name> <commit-id>` now?  In ten minutes?  A month from now?

So here's the important thing you need to learn about Git:

> It is *nearly* **impossible** to lose anything that you've committed to a Git repository... as long as you have a ***reference***.

## What is a reference?

In Git, a reference (or "ref") is a **file** that contains the commit ID of a commit - it's a way to save a pointer to a specific commit.

### Types of references

There are three main types of references in Git:

1. **Branches**: branch references are pointers to the latest commit in a branch.
   * They are stored in the `.git/refs/heads/` directory

2. **Tags**: are references to specific points in history, often used to capture a point where a particular version of a project was released.
   * They are stored in the `.git/refs/tags/` directory

3. **Remotes**: are references to commits in other repositories.
   * They are stored in the `.git/refs/remotes/` directory

### Wait, they're ***files***?

Yes, references are *files*:

Let's take a quick peek into the `.git` directory mentioned above:

<!--
```shellSession
$ tree -n -I objects ../.git
```
-->

!['tree -n -I objects ../.git'](/.images/shell/4-step-shell-13.svg)

> The `-I objects` flag excludes the .git/objects folder because it contains a lot of files

Let's examine `.git/HEAD` and the contents of `.git/refs/heads/*`:

<!--
```shellSession
$ cat ../.git/HEAD
```
-->

!['cat ../.git/HEAD'](/.images/shell/4-step-shell-14.svg)

So `.git/HEAD` points to `refs/heads/lesson/3`, which makes sense, since we currently have `lesson/3` checked out.

<!--
```shellSession
$ cat ../.git/refs/heads/lesson/3
```
-->

!['cat ../.git/refs/heads/lesson/3'](/.images/shell/4-step-shell-15.svg)

This commit ID seems familiar, in fact, it looks like the commit ID that `HEAD` and `lesson/3` are pointing to from the `git log` above.

<!--
```shellSession
$ cat ../.git/refs/heads/main
```
-->

!['cat ../.git/refs/heads/main'](/.images/shell/4-step-shell-16.svg)

No surprise here, so references ***are*** files!

Let's try something crazy, let's see if we can recover that 'lost' commit from the `detached HEAD` episode.  From what we've just discovered, it feels like all we have to do is create a file in `.git/refs/heads` containing the commit ID of the commit.

What, you don't remember the commit ID?

Check the reflog.

### Introducing the reflog

<!--
```shellSession
$ git reflog
```
-->

!['git reflog'](/.images/shell/4-step-shell-17.svg)

There it is, near the top.  So let's take that commit ID and put it in a file called `.git/refs/heads/tada`:

<!--
```shellSession
$ git rev-parse HEAD@{1} > ../.git/refs/heads/tada
```
-->

!['git rev-parse HEAD@{1} > ../.git/refs/heads/tada'](/.images/shell/4-step-shell-18.svg)

And checking `git log`:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 10
```
-->

!['git log --oneline --graph --decorate --all -n 10'](/.images/shell/4-step-shell-19.svg)

***TADA!***
