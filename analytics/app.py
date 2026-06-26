import json
import boto3
import os
from decimal import Decimal

TABLE_NAME = os.environ["TABLE_NAME"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super().default(obj)


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
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Short URL not found"
            })
        }

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(
            response["Item"],
            cls=DecimalEncoder
        )
    }