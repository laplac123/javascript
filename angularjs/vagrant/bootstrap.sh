#/bin/bash

###############################################################################
# Linux Packages
###############################################################################
sudo apt-get update
sudo apt-get -y install build-essential vim curl git tmux phantomjs ruby-dev

###############################################################################
# Front End stuff
###############################################################################
sudo chmod 777 ~/.profile
sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh
source ~/.profile
nvm install 0.12
nvm use 0.12
sudo apt-get -y install npm
npm config set registry http://registry.npmjs.org/
npm install -g yo
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
npm install -g karma
npm install -g karma-cli
npm install -g generator-angular@0.11.1

# Help grunt serve work
sudo gem install sass
sudo gem install compass

echo 'nvm use 0.12' >> ~/.profile


echo "Install swap file to fix the Killed process error while install node_modules by npm"
echo "This error occur on "
echo "Reference to this link for more details: https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04"
sudo dd if=/dev/zero of=/swapfile bs=1024 count=256k
sudo mkswap /swapfile
sudo swapon /swapfile
sudo su -c "echo \"/swapfile       none    swap    sw      0       0 \" >> /etc/fstab"
echo 10 | sudo tee /proc/sys/vm/swappiness
echo vm.swappiness = 10 | sudo tee -a /etc/sysctl.conf
sudo chown root:root /swapfile 
sudo chmod 0600 /swapfile