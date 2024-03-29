# API noLabel game version: 0.5.0

### Префикс: /api/

## Пользователь

| Метод | Путь           | Описание                                   |
|-------|----------------|--------------------------------------------|
| GET   | /user/:user_id | Получить информацию о пользователе         |
| GET   | /user/all      | Получить информацию о всех пользователях   |
| POST  | /user          | Создать или обновление данных пользователя |

При создании или обновлении данных пользователя необходимо передать в теле данные user в формате JSON, согласно модели:

```typescript
{
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
}
```

Пример запроса POST /user

```json
{
  "id": 3,
  "first_name": "Три",
  "second_name": "Three",
  "login": "three",
  "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg",
  "email": "test4@test.ru",
  "phone": "+79271234569"
}
```

Пример ответа GET /user/:user_id

```json
{
  "id": 2,
  "first_name": "Два",
  "second_name": "Два",
  "login": "two",
  "email": "test@test.ru",
  "phone": "+79271234568",
  "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg",
  "created_at": "2023-04-18T14:22:30.501Z",
  "updated_at": "2023-04-18T14:23:39.049Z",
  "leaderboard": {
    "id": 2,
    "score": 520,
    "createdAt": "2023-04-18T15:27:59.929Z",
    "updated_at": "2023-04-18T15:27:59.929Z"
  },
  "theme": {
    "id": 2,
    "theme": "light",
    "created_at": "2023-04-18T14:31:36.926Z",
    "updated_at": "2023-04-18T14:31:36.926Z"
  }
}
```

## Тема оформления

| Метод | Путь            | Описание                                |
|-------|-----------------|-----------------------------------------|
| GET   | /theme/:user_id | Получить информацию о теме пользователя |
| POST  | /theme          | Установить тему пользователя            |

При создании или обновлении данных темы оформления необходимо передать в теле данные, согласно модели:

```typescript
{
  id: number;
  theme: string;
}
```

Пример запроса POST /theme

```json
{
  "id": 3,
  "theme": "light"
}
```

Пример ответа GET /theme

```json
{
  "id": 3,
  "theme": "light",
  "created_at": "2023-04-18T14:31:41.273Z",
  "updated_at": "2023-04-18T14:31:41.273Z"
}
```

## Лидерборд

| Метод | Путь                  | Описание                                   |
|-------|-----------------------|--------------------------------------------|
| GET   | /leaderboard/all      | Получение всей таблицы лидеров             |
| GET   | /leaderboard/:user_id | Получить очков пользователя по id          |
| POST  | /leaderboard          | Создать или обновление данных пользователя |

При создании или обновлении данных таблицы лидеров необходимо передать в теле данные в формате JSON, согласно модели:

```typescript
{
  id: number;
  score: number;
}
```

Пример запроса POST /leaderboard

```json
{
  "id": 2,
  "score": 520
}
```

Пример ответа /leaderboard/all

```json
[
  {
    "score": 520,
    "updated_at": "2023-04-18T15:27:59.929Z",
    "user": {
      "id": 2,
      "first_name": "Два",
      "second_name": "Два",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg"
    }
  }
]
```

Пример ответа /leaderboard/:user_id

```json
{
  "id": 2,
  "score": 520,
  "createdAt": "2023-04-18T15:27:59.929Z",
  "updated_at": "2023-04-18T15:27:59.929Z",
  "user": {
    "id": 2,
    "first_name": "Два",
    "second_name": "Два",
    "login": "two",
    "email": "test@test.ru",
    "phone": "+79271234568",
    "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg",
    "created_at": "2023-04-18T14:22:30.501Z",
    "updated_at": "2023-04-18T14:23:39.049Z"
  }
}
```

## Темы(посты) форума

| Метод  | Путь                    | Описание                                |
|--------|-------------------------|-----------------------------------------|
| GET    | /forum/topics/all       | Получить информацию о всех темах форума |
| GET    | /forum/topics/:topic_id | Получить информацию о теме форума       |
| POST   | /forum/topics           | Создать или обновить тему форума        |
| DELETE | /forum/topics/:topic_id | Удалить тему форума                     |

При создании или обновлении темы форума необходимо передать в теле данные topic в формате JSON, согласно модели:

```typescript
{
  title: string;
  author_id: number;
}
```

Пример запроса POST /forum/topics

```json
{
  "title": "test3",
  "author_id": 3
}
```

Пример ответа GET /forum/topics/:topic_id

```json
{
  "id": 3,
  "title": "test3",
  "author_id": 3,
  "created_at": "2023-04-19T09:37:41.653Z",
  "updated_at": "2023-04-19T09:37:41.653Z",
  "author": {
    "id": 3,
    "first_name": "Три",
    "second_name": "Three",
    "login": "three",
    "email": "test4@test.ru",
    "phone": "+79271234569",
    "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg",
    "created_at": "2023-04-19T09:37:17.821Z",
    "updated_at": "2023-04-19T09:37:17.821Z"
  },
  "last_message": {
    "id": 12,
    "text": "text",
    "topic_id": 3,
    "author_id": 3,
    "created_at": "2023-04-19T10:34:39.125Z",
    "updated_at": "2023-04-19T10:34:39.125Z"
  }
}
```

## Сообщения форума

| Метод | Путь                        | Описание                                     |
|-------|-----------------------------|----------------------------------------------|
| GET   | /forum/messages/all         | Получить информацию о всех сообщениях форума |
| GET   | /forum/messages/:message_id | Получить информацию о сообщении форума       |
| POST  | /forum/messages/            | Создать или обновить сообщение форума        |
| DELETE| /forum/messages/            | Удалить сообщение форума                     |

При запросе на создание или обновление сообщения форума необходимо передать в теле данные message в формате JSON,
согласно модели:

```typescript
{
  text: string;
  author_id: number;
  topic_id: number;
}
```

Пример запроса POST /forum/messages/add

```json
{
  "text": "text",
  "author_id": 1,
  "topic_id": 1
}
```

Пример ответа

```json
{
  "id": 7,
  "text": "text",
  "author_id": 1,
  "topic_id": 1,
  "updated_at": "2023-04-18T14:55:53.039Z",
  "created_at": "2023-04-18T14:55:53.039Z"
}
```

## Emoji

| Метод  | Путь                  | Описание                                                 |
|--------|-----------------------|----------------------------------------------------------|
| GET    | /emoji/all/message_id | Получение всех emoji по id сообщения                     |
| POST   | /emoji                | Создать или обновление emoji по id сообщения и id автора |
| DELETE | /emoji                | Удалить emoji по id сообщения и id автора                |

При запросе на создание или обновление emoji необходимо передать в теле данные emoji в формате JSON, согласно модели:

```typescript
{
  message_id: number;
  author_id: number;
  emoji: string;
}
```

Пример запроса POST /emoji

```json
{
  "author_id": 2,
  "message_id": 6,
  "emoji": "😂"
}
```

Пример ответа GET /emoji/message_id

```json
[
  {
    "id": 1,
    "emoji": "❤",
    "author_id": 3,
    "message_id": 6,
    "created_at": "2023-04-18T15:20:29.100Z",
    "updated_at": "2023-04-18T15:20:29.100Z",
    "author": {
      "id": 3,
      "first_name": "Три",
      "second_name": "Three",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg"
    }
  },
  {
    "id": 2,
    "emoji": "😂",
    "author_id": 2,
    "message_id": 6,
    "created_at": "2023-04-18T15:21:10.525Z",
    "updated_at": "2023-04-18T15:21:10.525Z",
    "author": {
      "id": 2,
      "first_name": "Два",
      "second_name": "Два",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51aasd36-d4ee-4c85dasdad-8844-6d971ec2732a_ava_lite.jpg"
    }
  }
]
```



