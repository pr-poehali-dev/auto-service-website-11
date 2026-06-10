import json
import os
import secrets


def handler(event: dict, context) -> dict:
    """Авторизация администратора по логину и паролю. Возвращает токен сессии."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    username = (body.get('username') or '').strip()
    password = (body.get('password') or '').strip()

    admin_user = os.environ.get('ADMIN_USERNAME', 'admin')
    admin_pass = os.environ.get('ADMIN_PASSWORD', '')

    if not admin_pass:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Сервер не настроен'})
        }

    if username != admin_user or password != admin_pass:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Неверный логин или пароль',
                'debug_user_match': username == admin_user,
                'debug_pass_match': password == admin_pass,
                'debug_got_user': repr(username),
                'debug_expected_user': repr(admin_user),
                'debug_pass_len_got': len(password),
                'debug_pass_len_expected': len(admin_pass),
            })
        }

    token = os.environ.get('ADMIN_TOKEN', '')
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'token': token})
    }