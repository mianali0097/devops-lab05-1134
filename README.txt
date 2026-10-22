LAB 05 — PROVIDED FILES AND PRE-LAB SETUP
DevOps Principles and Practices (2+1)


DO THIS BEFORE THE SESSION
==========================

1. INSTALL NODE.JS INSIDE WSL2 (not on Windows — they are separate systems)

     sudo apt update
     sudo apt install -y nodejs npm
     node -v
     npm -v

   You need node v20 or newer. If apt gives you something older:

     curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
     sudo apt install -y nodejs

   On macOS:  brew install node

2. CHECK YOU STILL HAVE YOUR LAB 02 WORK

     ls ~/devops/lab02/Makefile ~/devops/lab02/src

   If it is gone, use the fallback/ folder in this zip and say so in your
   report. You lose no marks for using it. You lose marks for not saying.

3. CHECK YOU CAN PUSH TO YOUR LAB 04 TEAM REPOSITORY

     cd ~/devops/devops-project-TEAMNAME
     git pull
     git status

   Task 5 delivers into this repository. If you cannot reach it, sort that
   out before the session, not during it.

4. CREATE A PERSONAL ACCESS TOKEN WITH THE write:packages SCOPE

   GitHub -> Settings -> Developer settings -> Personal access tokens ->
   Tokens (classic) -> Generate new token. Tick write:packages.

   A TOKEN IS A PASSWORD. Do not put it in a file inside a repository, in a
   commit, in a screenshot, or in a message. In this lab it goes in your home
   directory's ~/.npmrc only. If you ever leak one: delete it on GitHub and
   generate a new one. Rotating is the fix — editing the file is not, because
   the old value stays in the Git history forever.

   Everything in Task 5 has a documented fallback if the token will not work,
   so a token problem is not a reason to skip the task.


WHAT IS IN THIS ZIP
===================

  src/greeting.md          Three Markdown sources. These replace the three
  src/notes.md             .txt files from Lab 02. They are data, not code.
  src/services.md

  tools/build.js           The build program — about twenty lines of Node.
                           Given to you because it is the application, not
                           the subject of the lab. READ IT: you need to know
                           that it takes SOURCE and DEST on the command line.

  test/build.test.js       Two tests, on Node's own test runner. Task 2 asks
                           you to add a third.

  fallback/Makefile        The Lab 02 model answer, with its three .txt
  fallback/src/*.txt       sources. For Section 3.2 only.


WHAT IS NOT IN THIS ZIP, AND WHY
================================

No package.json. No Makefile (except the fallback). No .npmrc. No answers.

The outcome this lab is assessed against is L-CLO-1 at P3 — precision in
carrying out a procedure. A student who runs a finished build demonstrates
nothing at that level, so the manifest, the scripts, the Makefile rule, the
version bump, the packaging and the publishing configuration are all typed by
you. The manual gives you every line; it does not give you the file.


HOW TO START
============

  mkdir -p ~/devops/lab05
  cp -r ~/devops/lab02/Makefile ~/devops/lab02/src ~/devops/lab05/
  cd ~/devops/lab05
  make ci                      # must pass before you change anything
  unzip ~/Downloads/Lab05-student-files.zip -d .
  rm -f src/*.txt              # the .md files replace them

Then open the manual at Section 3 and work through it in order. Do not skip
ahead to Task 4 — the artifact is only correct if Tasks 1 to 3 were done.
