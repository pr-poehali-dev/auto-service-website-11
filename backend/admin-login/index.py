import json
import os


def handler(event: dict, context) -> dict:
    """Авторизация администратора. Логин: admin, пароль = значение ADMIN_TOKEN."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    username = (body.get('username') or '').strip()
    password = (body.get('password') or '').strip()

    admin_token = os.environ.get('ADMIN_TOKEN', '')

    if not admin_token:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Сервер не настроен: нет ADMIN_TOKEN'})
        }

    # Логин: admin, пароль = ADMIN_TOKEN
    if username != 'admin' or password != admin_token:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный логин или пароль'})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'token': admin_token})
    }