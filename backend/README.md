
## API Reference

### Auth APIs
#### Register Student

```http
  POST /auth/register/student
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the Student |
| `email`    | `string` | **Required**. Email of the student|
| `password` | `string` | **Required**. Password |

#### Register Teacher

```http
  POST /auth/register/admin
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the Teacher|
| `email`    | `string` | **Required**. Email of the Teacher|
| `password` | `string` | **Required**. Password |

#### Login

```http
  POST /auth/login/student
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. Email of the Student/Teacher|
| `password` | `string` | **Required**. Password |

### Hub API

#### Authorization to Hub

```http
  POST /api/hub/access
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`    | `string` | **Required**. JWT token|

#### Upload

```http
  POST /auth/hub/upload
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`    | `Buffer` | **Required**. File to be uploaded|
| `author` | `string` | **Required**. Uploader Name |
| `topic`  | `string` | **Required**. Related topic to the file|

#### List files in the central container

```http
  GET /api/hub/list
```
#### List files in to be reviewed container

```http
  GET /api/hub/listReview
```
#### Download file

```http
  GET /api/hub/download
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the file to be downloaded|

#### Download from to be reviewed container (only teachers)

```http
  GET /api/hub/downloadTemp
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the file to be downloaded|

#### Delete file (only teachers or admin)

```http
  DELETE /api/hub/delete
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the file to be deleted|

#### Disapprove uploaded files (only teachers or admins)

```http
  DELETE /api/hub/deleteReview
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the file|

#### Search in the container

```http
  POST /api/hub/search
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `q`    | `string` | **Required**. Query to be searched in the documents|
| `top` | `number` | **Required**. Top results |
| `skip`| `number` | **Required**. number of results to skip|
| `filters`| `array`| **Required**. Filters for search |

#### Approve

```http
  POST /api/hub/move
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the file to be approved|

#### Vote

```http
  POST /api/hub/changeVotes
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of the uploader|
| `filename` | `string` | **Required**. file name |
| `topic` | `string` | **Required**. topic |
| `votes` | `number` | **Required**. votes to be changed to |

### Forum API

#### Authorize to Forum

```http
  POST /api/forum/access
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`    | `string` | **Required**. JWT token|

#### Get all posts

```http
  GET /api/posts
```

#### Get item

```http
  GET /api/posts/searchOne
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the Post to fetch |

#### Create a Post

```http
  POST /api/posts
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `author`    | `string` |**Required**. Name of the Author|
| `year` | `number` |**Required**. Post related to year|
| `branch`| `string`|**Required**. Post related to branch|
| `subject`| `string`|**Required**. Post related to subject |
| `title`| `string`|**Required**. Title of the Post|

#### Search Post

```http
  GET /api/posts/search
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `year` | `number` |Post related to year|
| `branch`| `string`|Post related to branch|
| `subject`| `string`|Post related to subject |

#### Update Post

```http
  PUT /api/posts/:id
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |**Required**. id of the post|
| `body`| `object`|**Required**. object containing the fields to be updated|

#### Vote a Post

```http
  POST /api/posts/vote/:id
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |**Required**.id of the post|
| `body`| `object`|**Required**. object containing the fields with votes to be updated|

#### Delete a Post

```http
  DELETE /api/posts/delete/:id
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |**Required**.id of the post|

#### Delete all Posts

```http
  DELETE /api/posts/
```
#### Comment on a Post

```http
  PUT /api/posts/comment/:id
```

| Parameter/Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |**Required**.id of the post|
| `author`| `string`|**Required**. Name of the commentor|
| `comment`| `string`| **Required**. Comment |




