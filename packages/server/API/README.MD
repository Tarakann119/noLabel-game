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
  user_id: number;
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
  "user_id": 610819,
  "first_name": "ТестТри",
  "second_name": "ТестТри",
  "login": "test3",
  "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg",
  "email": "test3@test.ru",
  "phone": "+79271234567"
}
```

Пример ответа GET /user/:user_id

```json
{
  "user_id": 610817,
  "first_name": "ТестОдин",
  "second_name": "ТестОдин",
  "login": "test1",
  "email": "test1@test.ru",
  "phone": "+79271234567",
  "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg",
  "created_at": "2023-04-14T19:37:43.546Z",
  "updated_at": "2023-04-14T19:37:43.546Z",
  "leaderboard": {
    "user_id": 610817,
    "score": 510,
    "createdAt": "2023-04-14T22:24:30.325Z",
    "updated_at": "2023-04-14T22:24:56.552Z"
  },
  "theme": {
    "user_id": 610817,
    "theme": "dark",
    "created_at": "2023-04-14T19:39:02.352Z",
    "updated_at": "2023-04-14T19:39:02.352Z"
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
  user_id: number;
  theme: string;
}
```

Пример запроса POST /theme

```json
{
  "user_id": 610817,
  "theme": "dark"
}
```

Пример ответа GET /theme

```json
{
  "user_id": 610817,
  "theme": "dark",
  "created_at": "2023-04-14T19:39:02.352Z",
  "updated_at": "2023-04-14T19:39:02.352Z"
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
  user_id: number;
  score: number;
}
```

Пример запроса POST /leaderboard

```json
{
  "user_id": 610817,
  "score": 510
}
```

Пример ответа /leaderboard/all

```json
[
  {
    "score": 525,
    "user": {
      "user_id": 610819,
      "first_name": "ТестТри",
      "second_name": "ТестТри",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg"
    }
  },
  {
    "score": 515,
    "user": {
      "user_id": 610818,
      "first_name": "ТестДва",
      "second_name": "ТестДва",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg"
    }
  },
  {
    "score": 510,
    "user": {
      "user_id": 610817,
      "first_name": "ТестОдин",
      "second_name": "ТестОдин",
      "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg"
    }
  }
]
```

Пример ответа /leaderboard/:user_id

```json
{
  "user_id": 610818,
  "score": 515,
  "createdAt": "2023-04-14T22:25:02.026Z",
  "updated_at": "2023-04-14T22:25:09.579Z",
  "user": {
    "user_id": 610818,
    "first_name": "ТестДва",
    "second_name": "ТестДва",
    "login": "test2",
    "email": "test1@test.ru",
    "phone": "+79271234567",
    "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg",
    "created_at": "2023-04-14T19:35:47.198Z",
    "updated_at": "2023-04-14T19:38:09.925Z"
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
  author: number;
}
```

Пример запроса POST /forum/topics

```json
{
  "title": "test",
  "author": 610819
}
```

Пример ответа GET /forum/topics/:topic_id

```json
{
  "id": 3,
  "title": "test",
  "author": 610819,
  "created_at": "2023-04-15T04:56:44.165Z",
  "updated_at": "2023-04-15T04:56:44.165Z",
  "author_full_data": {
    "user_id": 610819,
    "first_name": "ТестТри",
    "second_name": "ТестТри",
    "login": "test3",
    "email": "test3@test.ru",
    "phone": "+79271234567",
    "avatar": "/6b557c29-229a-45dc-8ae6-51a887ad0814/88d51a36-d4ee-4c85-8844-6d971ec2732a_ava_lite.jpg",
    "created_at": "2023-04-14T19:38:38.970Z",
    "updated_at": "2023-04-14T19:38:38.970Z"
  },
  "messages": [
    {
      "id": 33,
      "text": "text",
      "topic_id": 3,
      "author": 610818,
      "created_at": "2023-04-15T06:52:16.013Z",
      "updated_at": "2023-04-15T06:52:16.013Z"
    }
  ]
}
```

## Сообщения форума

| Метод | Путь                        | Описание                                     |
|-------|-----------------------------|----------------------------------------------|
| GET   | /forum/messages/all         | Получить информацию о всех сообщениях форума |
| GET   | /forum/messages/:message_id | Получить информацию о сообщении форума       |
| POST  | /forum/messages/            | Создать или обновить сообщение форума        |
| POST  | /forum/messages/            | Удалить сообщение форума                     |

При запросе на создание или обновление сообщения форума необходимо передать в теле данные message в формате JSON,
согласно модели:

```typescript
{
  text: string;
  author: number;
  topic_id: number;
}
```

Пример запроса POST /forum/messages/add

```json
{
  "text": "text",
  "author": 610818,
  "topic_id": 3
}
```

Пример ответа

```json
{
  "id": 453,
  "topic_id": null,
  "text": "text",
  "user_id": 54646,
  "created_at": "2023-04-11T09:56:43.894Z",
  "updated_at": "2023-04-11T09:56:43.894Z"
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
  user_id: number;
  emoji: string;
}
```

Пример запроса POST /emoji

```json
{
  "message_id": 453,
  "user_id": 610818,
  "emoji": "test2"
}
```

Пример ответа

```json
[
  {
    "id": 2,
    "user_id": 610818,
    "message_id": 453,
    "emoji": "test2",
    "created_at": "2023-04-12T05:35:13.211Z",
    "updated_at": "2023-04-12T05:35:13.211Z"
  }
]
```



