## Endpoints

-  ### Base URL: https://bw-save-the-animals.herokuapp.com
-  ### Login and register

   | Method | URL (_base:_ `/auth`) |                                              Description |
   | :----- | :-------------------: | -------------------------------------------------------: |
   | POST   |     **`/login`**      |                   User login, returns username and token |
   | POST   |    **`/register`**    | User registration, returns new user's username and token |

   _Example response:_

   ```
    {
        "uid": 7,
        "message": "Welcome back, Mike",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pa2UiLCJyb2xlIjoib3JnYW5pemF0aW9uIiwiaWF0IjoxNTgwNTIzNjY4LCJleHAiOjE1ODA2MTAwNjh9.Ma9DFXwRlUGcohphZW9GJ2SdXlHrmboocvJzk3JJ-uM"
    }
   ```

-  ### Campaigns

   | Method | URL (_base:_ `/campaigns`) |                                                   Description |
   | :----- | :------------------------: | ------------------------------------------------------------: |
   | GET    |         **`/:id`**         | Find campaign by ID, returns campaign with array of donations |

   _Example response:_

   ```
   {
   "id": 2,
   "title": "Stray dogs in Ludington",
   "location": "Ludington, MI",
   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
   "urgency": "low",
   "funding_goal": 10000,
   "created_at": "Sat Feb 01 2020",
   "created_by": "jackson",
   "total_donations": [
    {
      "donation": 25,
      "donated_at": "Sat Feb 01 2020",
      "donated_by": "mark"
    },
    {
      "donation": 250,
      "donated_at": "Sat Feb 01 2020",
      "donated_by": "mark"
    }
   ]
   }
   ```

![View DB Schema Image](schema.JPG)
