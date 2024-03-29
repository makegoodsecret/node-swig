
#bash "run node inspector" do
 # code <<-EOH
 #   su -l vagrant -c node /vagrant/node_modules/.bin/node-inspector
 # EOH
#end#
# Cookbook Name:: node-inspector
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#

# stops nodeinspector service if running
 service 'nodeapp' do
   action :stop
   provider Chef::Provider::Service::Upstart
 end


template "/etc/init/nodeapp.conf" do
  source "nodeapp.conf.erb"
  mode 0440
end

# starts nodeinspector service
service 'nodeapp' do
	action :start
	provider Chef::Provider::Service::Upstart
end
