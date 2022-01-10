# Lesson 2

## Welcome Back!

In today's lesson, we'll learn about how to handle a few common scenarios.

### Getting Started

Let's start by creating a branch for today's work!

<!--
```shellSession
$ git switch -c lesson/2
```
-->

!['git switch -c lesson/2'](/.images/shell/2-step-shell-0.svg)

## Exercise 1: Restoring files

A common Git scenario is accidentally deleting a file - let's learn how to get out of this pickle.

Let's start by committing a few files that we can *accidentally* delete:

<!--
```shellSession
$ touch file1 file2 file3
$ git add file*
$ git commit -m "Added some files"
```
-->

![''touch file1 file2 file3' 'git add file\*' 'git commit -m "Added some files"''](/.images/shell/2-step-shell-1.svg)

Now, let's delete them:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-2.svg)

And make sure the files are actually deleted:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-3.svg)

Let's see what Git has to say:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-4.svg)

As expected, Git noticed a change to the *working directory*, namely, that we deleted our files.

Helpfully, Git also tells us what to do to restore the files, use `git restore`.

Let's give it a try:

<!--
```shellSession
$ git restore file1 file2 file3
```
-->

!['git restore file1 file2 file3'](/.images/shell/2-step-shell-5.svg)

Double-checking with an `ls -l`:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-6.svg)

Great!  But that was a lot of typing, let's try something...

Remember, with `git add` we were able to do `git add .`, let's see if `git restore` lets us do the same:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-7.svg)

Checking...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-8.svg)

And...

<!--
```shellSession
$ git restore .
```
-->

!['git restore .'](/.images/shell/2-step-shell-9.svg)

Yup...

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-10.svg)

Cool!

## Exercise 2: Reverting commits

Occasionally, we'll need to "undo" a commit, and one way of doing that is with `git revert`.

To test things out, let's create three commits, two ***good*** commits and one ***bad***commit.

Let's start by cleaning up the current directory:

<!--
```shellSession
$ rm file*
```
-->

!['rm file\*'](/.images/shell/2-step-shell-11.svg)

<!--
```shellSession
$ git commit -am "Cleanup"
```
-->

!['git commit -am "Cleanup"'](/.images/shell/2-step-shell-12.svg)

Next, let's do a ***good*** commit:

<!--
```shellSession
$ echo "good" > file1
$ git add file1
$ git commit -m "Added feature 1"
```
-->

![''echo "good" > file1' 'git add file1' 'git commit -m "Added feature 1"''](/.images/shell/2-step-shell-13.svg)

A ***bad*** commit:

<!--
```shellSession
$ echo "bad" > file2
$ git add file2
$ git commit -m "Added feature 2"
```
-->

![''echo "bad" > file2' 'git add file2' 'git commit -m "Added feature 2"''](/.images/shell/2-step-shell-14.svg)

And a ***good*** commit:

<!--
```shellSession
$ echo "good" > file3
$ git add file3
$ git commit -m "Added feature 3"
```
-->

![''echo "good" > file3' 'git add file3' 'git commit -m "Added feature 3"''](/.images/shell/2-step-shell-15.svg)

Now let's get rid of the "bad" commit (the one that was *one* commit ago):

<!--
```shellSession
$ git revert HEAD~1 --no-edit
```
-->

!['git revert HEAD~1 --no-edit'](/.images/shell/2-step-shell-16.svg)

Let's see what that did:

<!--
```shellSession
$ ls -l
```
-->

!['ls -l'](/.images/shell/2-step-shell-17.svg)

Cool, `file2` is missing, as we'd expect.

Let's check the log:

<!--
```shellSession
$ git log -n 5
```
-->

!['git log -n 5'](/.images/shell/2-step-shell-18.svg)

Interesting, so the old commit is still in the history, but we have a new "revert" commit...

To *really* get rid of a commit, we'll need to use `git rebase -i`, which we'll get to in Lesson 3.

The benefit of `git revert` over `git rebase` is that it is a ***non-destructive*** change.  This is especially useful when working on a shared codebase.  More on this soon.

## Exercise 3: Amending commits

Another common scenario is making a typo in a commit message or committing too early.  Let's see how to handle both of these situations.

First, let's create a commit message with a typo:

<!--
```shellSession
$ git commit -m "Bug fiix" --allow-empty
```
-->

!['git commit -m "Bug fiix" --allow-empty'](/.images/shell/2-step-shell-19.svg)

> Git normally doesn't allow empty commits unless you use the `--allow-empty` flag.

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-20.svg)

Now that's a beaut.  Let's fix it with a `git commit --amend`:

<!--
```shellSession
$ git commit -m "Fixed scrollbar bug" --amend
```
-->

!['git commit -m "Fixed scrollbar bug" --amend'](/.images/shell/2-step-shell-21.svg)

And checking `git log`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-22.svg)

That was easy enough!

## Exercise 4: Resetting your tree

Sometimes you just want to reset the changes to your repository to a specified branch or commit.

The `git reset` command allows you to do this by moving the `HEAD` pointer to a specific commit.

`git reset` comes in three flavors, which we'll get into below.

### Soft reset

A soft reset moves the `HEAD` pointer to a specific commit, but leaves the staging area and the working directory unchanged. This means that your changes are preserved and remain staged.

Let's see how this works.

First, let's clean up the directory:

<!--
```shellSession
$ rm file* && git commit -am "Cleanup"
```
-->

!['rm file\* && git commit -am "Cleanup"'](/.images/shell/2-step-shell-23.svg)

<!--
```shellSession
$ touch file1 && git add file1 && git commit -m "Added file1"
```
-->

!['touch file1 && git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-24.svg)

Next, let's check `git log` and `git status` before we execute `git reset`:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-25.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-26.svg)

Now let's run `git reset --soft HEAD~1`, which will move `HEAD` back one commit:

<!--
```shellSession
$ git reset --soft HEAD~1
```
-->

!['git reset --soft HEAD~1'](/.images/shell/2-step-shell-27.svg)

Checking `git log` and `git status` now:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-28.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-29.svg)

We can see that `HEAD` has been moved back one commit and that `file1` is still staged.

### Mixed reset

A mixed reset moves the `HEAD` pointer and also updates the staging area to match the specified commit, but leaves the working directory alone. This means that your changes are preserved but become unstaged.

Let's see how this works.

Since `file1` is still staged from the previous example, let's just re-commit it:

<!--
```shellSession
$ git commit -m "Added file1"
```
-->

!['git commit -m "Added file1"'](/.images/shell/2-step-shell-30.svg)

We know what `git log` and `git status` look like from the previous example, so let's go ahead and run `git reset --mixed HEAD~1`:

<!--
```shellSession
$ git reset --mixed HEAD~1
```
-->

!['git reset --mixed HEAD~1'](/.images/shell/2-step-shell-31.svg)

Checking `git log` and `git status` now:

<!--
```shellSession
$ git log -n 2
```
-->

!['git log -n 2'](/.images/shell/2-step-shell-32.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-33.svg)

We can see that `HEAD` has been moved back one commit and that `file1` has been unstaged, but is still in the working directory.

### Hard reset

A hard reset moves the `HEAD` pointer and also updates both the staging area and the working directory to match the specified commit. This means that your changes are permanently discarded.

Let's see how this works.

Since the previous example unstaged `file1`, let's go ahead and get it staged and committed:

<!--
```shellSession
$ git add file1 && git commit -m "Added file1"
```
-->

!['git add file1 && git commit -m "Added file1"'](/.images/shell/2-step-shell-34.svg)

We know what to expect with `git log` and `git status`, so let's execute `git reset --hard HEAD~1`:

<!--
```shellSession
$ git reset --hard HEAD~1
```
-->

!['git reset --hard HEAD~1'](/.images/shell/2-step-shell-35.svg)

Checking `git log` and `git status` now:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/2-step-shell-36.svg)

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/2-step-shell-37.svg)

We can see that `HEAD` has been moved back one commit and `file1` has not only been unstaged, but has been deleted completely!

> Remember, `git reset` can permanently discard your changes if used improperly. Always make sure you have a backup of your changes or have pushed your changes to a remote repository before using `git reset --hard`.

## Exercise 5: Cherry-picking commits

## Cherry-picking changes

`git cherry-pick` enables you to pick a commit from one branch and apply it onto another. This is useful when you want to apply some commit without merging or rebasing the whole branch.

### Basic cherry-picking

Let's start with a basic example. Suppose you have a repository with a `main` branch and a `feature` branch. You've made a commit in the `feature` branch that you want to apply to the `main` branch.

First, get the commit hash of the commit you want to cherry-pick. You can do this with the `git log` command:

```bash
git log
```

This will show you a list of commits. Each commit has a hash, like `3a0b9b6`.

Now, switch to the `main` branch:

```bash
git switch main
```

Then, cherry-pick the commit:

```bash
git cherry-pick 3a0b9b6
```

This will apply the changes from the specified commit to the `main` branch.

### Cherry-picking multiple commits

You can also cherry-pick multiple commits at once. To do this, list the commit hashes separated by spaces:

```bash
git cherry-pick 3a0b9b6 5b6c7d6f
```

This will apply the changes from both commits to the `main` branch.

### Cherry-picking with conflicts

Sometimes, cherry-picking a commit might result in conflicts, especially if the commit depends on changes that are not present in the current branch. In this case, Git will pause the cherry-pick and allow you to resolve the conflicts.

When you try to cherry-pick, you'll see an output like this:

```bash
git cherry-pick 3a0b9b6
```

**Output:**

```bash
error: could not apply 3a0b9b6... Some commit message
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git commit -a'
hint: and commit the result with 'git commit'
```

To resolve the conflicts, open the file with conflicts in your text editor. You'll see the conflicting changes marked like this:

```bash
<<<<<<< HEAD
This is some content from the main branch.
=======
This is some content from the feature branch.
>>>>>>> feature
```

Edit the file to resolve the conflicts, then add the file to the staging area:

```bash
git add file.txt
```

And continue the cherry-pick:

```bash
git cherry-pick --continue
```

### Aborting a cherry-pick

If you start a cherry-pick and then decide you want to stop, you can abort the cherry-pick with the `--abort` option:

```bash
git cherry-pick --abort
```

## Wrapping Things Up

Now let's push today's work back to GitHub.

<!--
```shellSession
$ git push --set-upstream origin lesson/2
```
-->

!['git push --set-upstream origin lesson/2'](/.images/shell/2-step-shell-38.svg)
