#!/usr/bin/env ruby

require 'net/http'
require 'json'
require 'uri'

SUPABASE_URL = 'https://wvncdusvpfbdsnclynxl.supabase.co'
SERVICE_ROLE_KEY = ENV['SUPABASE_SERVICE_ROLE'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bmNkdXN2cGZiZHNuY2x5bnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDcwNjgwMCwiZXhwIjoxOTQwMjgyODAwfQ.example'

users = [
  { email: 'smota5200@gmail.com', password: '123456' },
  { email: 'elainex2018@gmail.com', password: '123456' }
]

users.each do |user|
  uri = URI("#{SUPABASE_URL}/auth/v1/admin/users")
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Authorization'] = "Bearer #{SERVICE_ROLE_KEY}"
  request.body = JSON.generate(user_attributes: user)
  
  puts "Creating #{user[:email]}..."
  response = http.request(request)
  
  if response.code == '201'
    puts "✅ #{user[:email]} created successfully!"
  else
    puts "⚠️  #{user[:email]}: #{response.body}"
  end
end
