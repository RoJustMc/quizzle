echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* justus@91.200.102.27:/var/www/91.200.102.27/

echo "Done!"