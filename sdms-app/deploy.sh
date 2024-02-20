echo "switching to master"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/school
scp -i ~/.ssh/school -o StrictHostKeyChecking=no -r build/* ubuntu@54.236.44.210:/var/www/54.236.44.210/

echo "Done!"
