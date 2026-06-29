import json
import boto3
import random
import string
import os

TABLE_NAME = os.environ["TABLE_NAME"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def generate_short_code(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))


def lambda_handler(event, context):

    body = json.loads(event.get("body", "{}"))

    long_url = body.get("url")

    if not long_url:
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
            },
            "body": json.dumps({
                "error": "URL is required"
            })
        }

    short_code = generate_short_code()

    # Default values
    user_id = None
    email = None

    # Read Cognito claims if API Gateway Authorizer is enabled
    try:
        claims = event["requestContext"]["authorizer"]["claims"]

        user_id = claims.get("sub")
        email = claims.get("email")

    except Exception:
        # API still public or authorizer not configured
        pass

    table.put_item(
        Item={
            "short_code": short_code,
            "long_url": long_url,
            "clicks": 0,
            "user_id": user_id,
            "email": email
        }
    )

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        "body": json.dumps({
            "short_code": short_code,
            "short_url": f"https://i67u8mzkhj.execute-api.ap-south-1.amazonaws.com/Prod/{short_code}"
        })
    }