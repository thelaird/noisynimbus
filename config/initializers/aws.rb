AWS.config({
  access_key_id: ENV["aws_access_key_id"],
  secret_access_key: ENV["aws_secret_access_key"],
  region: 'us-west-2'
  })

S3_BUCKET = AWS::S3.new.buckets[ENV['s3_bucket']]
