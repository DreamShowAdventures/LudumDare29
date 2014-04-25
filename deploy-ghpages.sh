# Configure git, clone repo
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis"

# Build to deploy folder
grunt

# Commit, push changes
cd deploy
git init
git remote add origin https://github.com/DreamShowAdventures/LudumDare29.git
git add .
git commit -m "Build successful, build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
git push -fq origin gh-pages > /dev/null