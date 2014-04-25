# Configure git, clone repo
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis"
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/DreamShowAdventures/LudumDare29 gh-pages > /dev/null

# Commit, push changes
cd gh-pages
git add .
git commit -m "Build successful, build $TRAVIS_BUILD_NUMBER pushed to gh-pages
git push -fq origin gh-pages > /dev/null