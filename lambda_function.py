import json
import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    rekognition = boto3.client('rekognition')
    
    # Get bucket and object key from the event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # Use Rekognition to detect labels in the image
    response = rekognition.detect_labels(
        Image={'S3Object': {'Bucket': bucket, 'Name': key}},
        MaxLabels: 10
    )
    
    # Extract labels and return as response
    labels = [label['Name'] for label in response['Labels']]
    
    return {
        'statusCode': 200,
        'body': json.dumps(labels)
    }