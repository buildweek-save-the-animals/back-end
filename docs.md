## Endpoints

-  ### Base URL: https://bw-save-the-animals.herokuapp.com
-  ### Login and register

   | Method | URL (_base:_ `/auth`) |                                                        Description |
   | :----- | :-------------------: | -----------------------------------------------------------------: |
   | POST   |     **`/login`**      | User login (accepts username OR email), returns username and token |
   | POST   |    **`/register`**    |           User registration, returns new user's username and token |

   _Example response:_

   ```
    {
        "uid": 7,
        "message": "Welcome back, Mike",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pa2UiLCJyb2xlIjoib3JnYW5pemF0aW9uIiwiaWF0IjoxNTgwNTIzNjY4LCJleHAiOjE1ODA2MTAwNjh9.Ma9DFXwRlUGcohphZW9GJ2SdXlHrmboocvJzk3JJ-uM"
    }
   ```

![View DB Schema Image](schema.JPG)
