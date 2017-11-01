# mern_boilerplate
MERN stack application

This server is built with MongoDB, Express and Node.js.

## Routes

### POST /customers

*This route is for saving the customer's order.*

###### Params: 
- firstname: string
- lastname: string
- order: string

Returns 200 OK on Success and 422 Unprocessable Entity in case of failure.

###### Request
```
{
  firstname: "Jane", 
  lastname: "Doe", 
  order: "1 large beach umbrella, flip flops, sun hat"
}
```
###### Response
```
{
  firstname: "Jane", 
  lastname: "Doe", 
  order: "1 large beach umbrella, flip flops, sun hat",
  _id: 59f22d23ce77b013ce254e0c
}
```
### DELETE /customers

*This route is for deleting all orders.*
