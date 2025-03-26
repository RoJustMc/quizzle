echo "Switching to branch master"
git checkout master

echo "Start node..."
node index.js

echo "Deploying files to server..."
scp -r * justus@91.200.102.27:/var/www/91.200.102.27/backend/

echo "Done!"