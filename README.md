Task
Your task is to create a Restaurant Finder API in NodeJS. The system must enable the user to Create a Restaurant, Find a restaurant based on some criteria and Delete all restaurants.
Business rules
1:1
 
•	You may assume that all restaurants are in the same street, so the position is linear, and can have values from 0 to 200.
•	You must create a "Create a restaurant" API that enables users to create a Restaurant.
•	You may store your restaurants in memory in your preferred data structure. There is no need to use a Database for the sake of this exercise.
•	There can not be two restaurants in the same position. (See more about this in Validation Section)
A Restaurant is an object like this one below:
{
  "name": "123",
  "position": 200,
  "category": "Pizza",
  "rating": 5
}
•	You may also create a Get Restaurants API. This API will receive the Position of the user (also linear from 0 to 200), and your job is to return the best restaurants according to the criteria passed via the request body.
•	The user can't be in the same position as a restaurant (See more on Validation Section)
Criteria of Get Restaurants API
1.	Category: You should filter by the category contained in the user's request body.
2.	orderPriority: The user can choose between sorting by distance, in which case you must return the nearest restaurants first, and sorting by rating, in which case you must return the best rated restaurants first.
3.	distanceLimit: Optionally, the user can also choose a distanceLimit. If nothing is passed your system should set the value 30 as default. This value is bi-directional, which means that if the user is at position 100, and chooses distanceLimit 50, you should display restaurants from 50 to 150.
The API
Create a restaurant POST /restaurant
REQUEST
 {
    "name": "123",
    "position": 200,
    "category": "Pizza",
    "rating": 5
}
RESPONSE - 201
 {
    "name": "123",
    "position": 200,
    "category": "Pizza",
    "rating": 5
}
Validation
•	All four fields are mandatory. If they are not sent your API must return:
RESPONSE - 400
•	{
•	  "message": "There are missing fields"
•	}
•	Position should be an integer from 0 to 200. If that rule is not followed your API must return:
RESPONSE - 400
{
  "message": "position must be an integer from 0 to 200"
}
•	Rating must be an integer from 0 to 5. If that rules is not followed your API must return.
RESPONSE - 400
{
  "message": "rating must be an integer from 0 to 200"
}
•	There must not be two restaurants in the same position. In case of a request with an unavailable position your API must return:
RESPONSE - 400
{
  "message": "Position not available"
}
•	You can choose how to set category field.
Get restaurants POST /restaurants
REQUEST
{
    "category": "Burguer",
    "orderPriority": "distance",
    "distanceLimit": 120,
    "position": 94
}
RESPONSE - 200
[
    {
        "name": "123",
        "position": 180,
        "category": "Burguer",
        "rating": 5
    },
    {
        "name": "123",
        "position": 199,
        "category": "Burguer",
        "rating": 5
    }
]
Validation
•	Category, orderPriority and position are mandatory attributes. If they are not sent your API should return:
RESPONSE - 400
•	{
•	 "message": "There are missing fields"
•	}
•	distanceLimit is optional, and its default value in your system must be 30. If the user sends it in the API is must be an integer. If it's not your API should return:
RESPONSE - 400
•	{
•	 "message": "Distance limit should be an integer"
•	}
•	orderPriority can only receive values distance or rating. If any other value is received your API must return
RESPONSE - 400
•	{
•	 "message": "Order priority should be either distance or rating"
•	}
•	Position, like in the above API, should also be an integer between 0 and 200. If any toher value your API must return:
RESPONSE - 400
•	{
•	 "message": "position must be an integer from 0 to 200"
•	}
DELETE /restaurants
RESPONSE - 204 NO CONTENT
•	This API must delete all restaurants.
Code Organization and best practices
Your code may be evaluated manually in the future. Make sure you keep your code clean and understandable as if it were a real-life program. Project your code thinking about a production environment.
