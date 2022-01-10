#!/bin/bash

rm -Rf exercises
gh repo delete "im-sampm/exercises" --yes
gh repo fork https://github.com/im-github-training/exercises.git --clone --default-branch-only

# read -p "Go to your repo and enable Actions, then press enter to continue"

node update-shell-comments.mjs ../.github/steps/1-step.md exercises/book 0
node update-shell-comments.mjs ../.github/steps/2-step.md exercises/book 0
node update-shell-comments.mjs ../.github/steps/3-step.md exercises/book 0
node update-shell-comments.mjs ../.github/steps/4-step.md exercises/book 0

# read -p "Wait until the step 2 workflow completes, then press enter to continue"

# cd exercises

# term-transcript exec 'git pull' -o ../images/2-step-shell-0.svg -I 2s -T 2s --pty --no-wrap

# term-transcript exec 'git log -n 8' -o ../images/2-step-shell-1.svg -I 2s -T 2s --pty --no-wrap

# git rebase -i HEAD~7

# read -p "Finish rebasing, then press enter to continue"

# cd ..

# node update-shell-comments.mjs .github/steps/2-step.md exercises/book 2