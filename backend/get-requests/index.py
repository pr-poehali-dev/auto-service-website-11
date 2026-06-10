import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список заявок для администратора. Требует заголовок X-Admin-Token."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    expected = os.environ.get('ADMIN_TOKEN', '')
    token = event.get('headers', {}).get('X-Admin-Token') or event.get('headers', {}).get('x-admin-token') or ''
    if not expected or token != expected:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, name, phone, car_brand, car_model, selected_works, status, created_at FROM {schema}.requests ORDER BY created_at DESC LIMIT 500"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    requests = []
    for row in rows:
        requests.append({
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'car_brand': row[3],
            'car_model': row[4],
            'selected_works': row[5],
            'status': row[6],
            'created_at': row[7].isoformat() if row[7] else None
        })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'requests': requests})
    }