echo '### Updating system ...'
sudo rm -f /etc/resolv.conf
sudo sh -c "echo nameserver 8.8.8.8 > /etc/resolv.conf"
sudo apt-get update -y
sudo apt-get install curl build-essential openssl libssl-dev git python libnotify-bin -y

echo '### Install Node Version Manager'
git clone git://github.com/creationix/nvm.git ~/.nvm
printf "\n\n# NVM\nif [ -s ~/.nvm/nvm.sh ]; then\n\tNVM_DIR=~/.nvm\n\tsource ~/.nvm/nvm.sh\nfi" >> ~/.bashrc
NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
nvm install v0.12.0
nvm alias default 0.12
nvm use 0.12

echo '### Install gulp'
npm install setup
npm install --global gulp

echo '### Install Ruby Version Manager ...'
sudo apt-get install ruby-full -y

echo '### Install Sass'
sudo gem install sass
