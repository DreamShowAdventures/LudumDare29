# Configure git
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis"

# Configure grunt
npm install -g grunt-cli

# Build to distribution folder
grunt prod

# Commit, push changes
cd dist
git init
git add -A
git commit -m "Build successful, build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1