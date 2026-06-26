import json
import boto3
import os
from decimal import Decimal

TABLE_NAME = os.environ["TABLE_NAME"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

sqs = boto3.client("sqs")

QUEUE_URL = "https://sqs.ap-south-1.amazonaws.com/387512138365/ClickAnalyticsQueue"


def lambda_handler(event, context):

    short_code = event["pathParameters"]["shortCode"]

    response = table.get_item(
        Key={
            "short_code": short_code
        }
    )

    if "Item" not in response:
        return {
            "statusCode": 404,
            "body": json.dumps({
                "error": "Short URL not found"
            })
        }

    item = response["Item"]

    table.update_item(
        Key={
            "short_code": short_code
        },
        UpdateExpression="SET clicks = clicks + :inc",
        ExpressionAttributeValues={
            ":inc": 1
        }
    )

    sqs.send_message(
        QueueUrl=QUEUE_URL,
        MessageBody=json.dumps({
            "short_code": short_code
        })
    )

    return {
        "statusCode": 302,
        "headers": {
            "Location": item["long_url"]
        }
    }