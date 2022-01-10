
gh repo delete "im-sampm/exercises" --yes
rm -Rf DELETE
mkdir DELETE
cd DELETE/
gh repo fork https://github.com/im-github-training/exercises.git --clone --default-branch-only

read -p "Go to your repo and enable Actions, then press enter to continue"

cd exercises/
git switch -c lesson/1
git commit -m "I" --allow-empty
git push --set-upstream origin lesson/1
read -p "Go to your repo and enable Actions, then press enter to continue"

git switch -c lesson/2
git commit -m "I" --allow-empty
git push --set-upstream origin lesson/2
read -p "Go to your repo and enable Actions, then press enter to continue"

git switch -c lesson/3
git commit -m "I" --allow-empty
git push --set-upstream origin lesson/3
read -p "Go to your repo and enable Actions, then press enter to continue"

git switch -c lesson/4
git commit -m "I" --allow-empty
git push --set-upstream origin lesson/4
read -p "Go to your repo and enable Actions, then press enter to continue"

git switch -c lesson/5
git commit -m "I" --allow-empty
git push --set-upstream origin lesson/5
