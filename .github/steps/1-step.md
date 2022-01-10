# Lesson 1

## Overview

Before starting this lesson, please review the following sections of the guide:

* [What is a Repository?](https://im-github-training.github.io/#/./docs/basic/git/repositories)
* [What is a Commit?](https://im-github-training.github.io/#/./docs/basic/git/commits)

## Exercise 1: Cloning repositories

To get started, we'll need a local copy of this repository.  To do that:

1. Click the "Code" button, and then click the "Copy url to clipboard" icon

2. Open a terminal window and do a `git clone`:

   ```shell
   git clone https://github.com/im-sampm/exercises.git
   ```

3. Then use `git status` to make sure everything is in order with our repository:
   !['git status'](/.images/1-step-git-status.svg)

Looks good!

Git is telling us the following things:

* we are on the `main` branch
* that our ***staging area*** is empty
* and no changes have been detected in our ***working tree*** (aka "working directory")

## Exercise 2: Understanding commits

Let's start by creating a few files:

<!--
```shellSession
$ touch file1 file2 file3
```
-->

!['touch file1 file2 file3'](/.images/shell/1-step-shell-0.svg)

Now, let's see if Git noticed this change to our ***working tree***:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-1.svg)

So, Git noticed that we added the files but states that they're *untracked*.

> In Git, files are considered *untracked* until tracking is *explicitly* enabled by adding them to the repository with `git add`.

Let's go ahead and start tracking the files with a `git add`:

<!--
```shellSession
$ git add .
```
-->

!['git add .'](/.images/shell/1-step-shell-2.svg)

Now, let's see how things look:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-3.svg)

Alright, it looks like our files are ***staged*** and ready to be committed!

Let's go ahead and do that with `git commit -m "Added stuff"`:

<!--
```shellSession
$ git commit -m "Added stuff"
```
-->

!['git commit -m "Added stuff"'](/.images/shell/1-step-shell-4.svg)

> Entering `git commit` without `-m` or `--message` brings up a text editor, useful when entering longer commit messages.

Now, let's see what `git status` says:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-5.svg)

Nice, looks like the files were moved from the ***staging area*** to the ***repository***!

Finally, let's confirm that the commit is part of our repository by doing a `git log`:

<!--
```shellSession
$ git log -n 1
```
-->

!['git log -n 1'](/.images/shell/1-step-shell-6.svg)

## Exercise 3: Understanding branches

To help us understand branches, let's create a branch to help us keep track of the files we create for this lesson.

### Listing branches

Let's see what branches this repo contains so we can pick a unique name.

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-7.svg)

Cool, so there's only one branch called `main`.

But if you recall, repositories can have both *local* and *remote* branches and `git branch` only displays *local* branches.

So let's use `git branch --all` to see *all* branches associated with this repository:

<!--
```shellSession
$ git branch --all
```
-->

!['git branch --all'](/.images/shell/1-step-shell-8.svg)

Interesting, so it looks like in addition to the *local* branch `main`, there are two *remote* branches:

* `origin/main` is the remote counterpart to our local `main` branch
* `upstream/main` is created by GitHub when a repository is forked

> `origin/HEAD` isn't a branch, it's something called a *reference*, which we'll dive into later on in this lesson.

### Creating branches

Now that we know we can pick any name but `main`, let's go ahead and create *our* local branch with a `git branch <branchname>`:

<!--
```shellSession
$ git branch feature
```
-->

!['git branch feature'](/.images/shell/1-step-shell-9.svg)

Let's see what `git branch` has to say about our new branch:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-10.svg)

Interesting, we can see that `feature` was created, but the `*` is still in front of `main`.

> The `*` next to main indicates that main is the currently active branch

To make `feature` the active branch, we need to ***switch*** to it using `git switch`:

<!--
```shellSession
$ git switch feature
```
-->

!['git switch feature'](/.images/shell/1-step-shell-11.svg)

And just to double-check:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-12.svg)

Great!

> Git often has multiple ways of doing the same thing, for example, `git switch` provides the `--create` or `-c` flag, which lets you create and switch all in one go.

Let's give it a shot and create a throwaway branch:

<!--
```shellSession
$ git switch -c throwaway
```
-->

!['git switch -c throwaway'](/.images/shell/1-step-shell-13.svg)

And checking `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-14.svg)

Perfect!

### Deleting branches

Now let's get rid of the throwaway branch using `git branch`'s `--delete` or `-d` flag.

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-15.svg)

Ah, so we cannot delete a branch that is currently active or "checked out".

So let's switch back to `feature` using the handy `git switch -`:

<!--
```shellSession
$ git switch -
```
-->

!['git switch -'](/.images/shell/1-step-shell-16.svg)

Trying the delete again:

<!--
```shellSession
$ git branch -d throwaway
```
-->

!['git branch -d throwaway'](/.images/shell/1-step-shell-17.svg)

Great, and checking `git branch`:

<!--
```shellSession
$ git branch
```
-->

!['git branch'](/.images/shell/1-step-shell-18.svg)

And a `git status` for good measure:

<!--
```shellSession
$ git status
```
-->

!['git status'](/.images/shell/1-step-shell-19.svg)

*Magnifique.*

### Renaming branches

So we created a branch called `feature`, but we aren't really building anything in this lesson.

Perhaps a more appropriate name would be something like `lesson/1`.

Let's go ahead and rename `feature` to `lesson/1` by using `git branch -m`:

<!--
```shellSession
$ git branch -m feature lesson/1
```
-->

!['git branch -m feature lesson/1'](/.images/shell/1-step-shell-20.svg)

### Merging branches

As mentioned in [What is a Branch?](), Git supports two main types of merges:

1. Fast-forward merges
2. Three-way merge

To better understand the difference between these two types of merges, let's merge some branches!

#### The fast-forward merge

First, let's create a few commits in the `lesson/1` branch:

<!--
```shellSession
$ git commit -m "First lesson/1 commit" --allow-empty
$ git commit -m "Second lesson/1 commit" --allow-empty
```
-->

![''git commit -m "First lesson/1 commit" --allow-empty' 'git commit -m "Second lesson/1 commit" --allow-empty''](/.images/shell/1-step-shell-21.svg)

> Git doesn't let you create empty commits without the `--allow-empty` flag

Next, let's create a `lesson/1-merge` branch to merge into `lesson/1`:

<!--
```shellSession
$ git switch -c lesson/1-merge
```
-->

!['git switch -c lesson/1-merge'](/.images/shell/1-step-shell-22.svg)

And add a few commits:

<!--
```shellSession
$ git commit -m "First lesson/1-merge commit" --allow-empty
$ git commit -m "Second lesson/1-merge commit" --allow-empty
```
-->

![''git commit -m "First lesson/1-merge commit" --allow-empty' 'git commit -m "Second lesson/1-merge commit" --allow-empty''](/.images/shell/1-step-shell-23.svg)

Now let's switch back to the `lesson/1` branch:

<!--
```shellSession
$ git switch lesson/1
```
-->

!['git switch lesson/1'](/.images/shell/1-step-shell-24.svg)

And check `git log` before we perform the merge:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-25.svg)

Now, let's do the merge:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-26.svg)

As Git reports, it has performed a ***fast-forward*** merge.

Checking `git log` we can see that the `lesson/1-merge` commits were tacked on after the `lesson/1` commits:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 5
```
-->

!['git log --oneline --graph --decorate --all -n 5'](/.images/shell/1-step-shell-27.svg)

In this simple scenario, Git was able to perform a fast-forward merge because there were no conflicts between the commits on the `lesson/1` and `lesson/1-merge` branches.

#### Three-way merges

Now let's try a more complex scenario, and see what happens if we add commits to both `lesson/1` ***and*** `lesson/1-merge`:

<!--
```shellSession
$ git switch lesson/1-merge
$ git commit -m "First lesson/1-merge commit" --allow-empty
$ git commit -m "Second lesson/1-merge commit" --allow-empty
```
-->

![''git switch lesson/1-merge' 'git commit -m "First lesson/1-merge commit" --allow-empty' 'git commit -m "Second lesson/1-merge commit" --allow-empty''](/.images/shell/1-step-shell-28.svg)

Now let's switch back to `lesson/1` and add a few commits:

<!--
```shellSession
$ git switch lesson/1
$ git commit -m "First lesson/1 commit" --allow-empty
$ git commit -m "Second lesson/1 commit" --allow-empty
```
-->

![''git switch lesson/1' 'git commit -m "First lesson/1 commit" --allow-empty' 'git commit -m "Second lesson/1 commit" --allow-empty''](/.images/shell/1-step-shell-29.svg)

Using `git log` we can now see two separate branches:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 10
```
-->

!['git log --oneline --graph --decorate --all -n 10'](/.images/shell/1-step-shell-30.svg)

Let's try merging these:

<!--
```shellSession
$ git merge lesson/1-merge -m "Merging branches"
```
-->

!['git merge lesson/1-merge -m "Merging branches"'](/.images/shell/1-step-shell-31.svg)

Now looking at `git log` we can now see the three-way merge:

<!--
```shellSession
$ git log --oneline --graph --decorate --all -n 10
```
-->

!['git log --oneline --graph --decorate --all -n 10'](/.images/shell/1-step-shell-32.svg)

### Dealing with merge *conflicts*

A common occurrence when merging branches are ***merge conflicts***.

Let's learn how to handle them by intentionally creating a merge conflict and then resolving it.

Start by creating a change to `file1` in the `lesson/1-merge` branch:

<!--
```shellSession
$ git switch lesson/1-merge
$ echo "lesson/1-merge" > file1
$ git commit -am "Updated file1 in lesson/1-merge"
```
-->

![''git switch lesson/1-merge' 'echo "lesson/1-merge" > file1' 'git commit -am "Updated file1 in lesson/1-merge"''](/.images/shell/1-step-shell-33.svg)

Next, create a change to `file1` in the `lesson/1` branch:

<!--
```shellSession
$ git switch lesson/1
$ echo "lesson/1" > file1
$ git commit -am "Updated file1 in lesson/1"
```
-->

![''git switch lesson/1' 'echo "lesson/1" > file1' 'git commit -am "Updated file1 in lesson/1"''](/.images/shell/1-step-shell-34.svg)

And now let's try to merge `lesson/1-merge` into `lesson/1`:

<!--
```shellSession
$ git merge lesson/1-merge
```
-->

!['git merge lesson/1-merge'](/.images/shell/1-step-shell-35.svg)

As expected, Git aborts the automatic merge and asks us to fix the conflicts and commit the result.

To start, let's take a look at `file1`:

<!--
```shellSession
$ cat file1
```
-->

!['cat file1'](/.images/shell/1-step-shell-36.svg)

We can see that Git has added [conflict markers]() to `file1`.

To ***resolve*** the conflict, we have to update `file1` to remove the conflict markers and make sure `file1` has the change or changes that we actually want.

For example, let's say we want to keep *both* changes, all we need to do is update `file1` so it looks like:

```diff
lesson/1
lesson/1-merge
```

And continue the merge with `git commit -a`:

<!--
```shellSession
$ git commit -am "Merging branches"
$ git log --oneline --graph --decorate --all -n 10
```
-->

![''git commit -am "Merging branches"' 'git log --oneline --graph --decorate --all -n 10''](/.images/shell/1-step-shell-37.svg)

## Wrapping Things Up

Phew, that was a whirlwind tour of Git, let's end things on a high-note and push your changes back to GitHub.

<!--
```shellSession
$ git push
```
-->

!['git push'](/.images/shell/1-step-shell-38.svg)

*No bueno.*

What this error is telling us is that Git did not know *where* to push our changes to when we typed `git push`.

If you recall, when we `git clone` a repository, Git automatically manages the connection between the local and remote copy of the repository by using `remotes`.

Let's dig in to see what went wrong.

## Exercise 4: Understanding remotes

### Listing remotes

Let's start by taking a look at the remotes currently defined for the repository:

<!--
```shellSession
$ git remote -v
```
-->

!['git remote -v'](/.images/shell/1-step-shell-39.svg)

This shows us that Git has configured the *default* remote, `origin`, to the repository we cloned in Exercise 1.

What `git remote -v` doesn't show us is which *branches* have defined upstreams.

This means that when we do a `git fetch <remote> <branch>`, `git pull <remote> <branch>`, or `git push <remote> <branch>`, Git will automatically use the URL defined in `origin` as the `<remote>` parameter.

### Showing remote configuration

To view the configuration of the `origin` remote, we use:

<!--
```shellSession
$ git remote show origin
```
-->

!['git remote show origin'](/.images/shell/1-step-shell-40.svg)

Similar to `git remote -v`, this command shows us the default fetch/push URLs.  More importantly, it shows us which branches have upstream branches defined.

As we can see under the last two sections, only `main` has been configured for `git pull` and `git push`.

### Setting upstream

To fix this, let's follow Git's guidance and use `git push --set-upstream`:

<!--
```shellSession
$ git push --set-upstream origin lesson/1
```
-->

!['git push --set-upstream origin lesson/1'](/.images/shell/1-step-shell-41.svg)

And checking `origin`s configuration:

<!--
```shellSession
$ git remote show origin
```
-->

!['git remote show origin'](/.images/shell/1-step-shell-42.svg)


## Wrapped Up

With that last push of `lesson/1` back to GitHub, you've completed this lesson.  To continue to Lesson 2, wait about 20 seconds and refresh this page.
