echo "seitching to master"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/school
scp -i ~/.ssh/home -r build/* root@54.236.44.210:/var/www/54.236.44.210/

echo "Done!"
