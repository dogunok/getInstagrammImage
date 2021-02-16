# Сервер для получение данных фотографий из instagram

### Начало работы
`Node.js > 10`

`npm install` устанавливаем зависимости

`npm start` запуск проекта

### Необходимые файлы

Нужно создать файл `config.js` в корне проекта, с данными описанными ниже
  ```json
  {
  "serverPort":"Ваш порт", // порт на котором откроется сервер
  "limit_image":12, // количество загружаемых фотографий
  "max_size_users":5000000, // Максимальный размер папки users, при превышение которого папка удалется
  "mediaHost":"https://graph.instagram.com/me/media", // host instagram для получения ссылок на медиа файлы
  "updateHost":"https://graph.instagram.com/refresh_access_token", // обновление токена
  "serverHost": "", // домен на котором откроется ваш сервер
  "token":"Ваш токен", // Нужен для получения файлов из instagram
  "siteHost": "доменное имя вашего сайта", // Имя вашего домена, нужно для прописания cors параметров
  "fieldsParams": "media_url,permalink,thumbnail_url" // параметры которые вы хотите получать из API instagram
}
  ```
