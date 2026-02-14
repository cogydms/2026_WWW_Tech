# WWW Tech Assignment 01

## A. What type of content did the server return?
The server returned JSON content. 

## B. Where do you see the resource ID?
The resource ID can be seen in the JSON field “id” : 1.

## C. Can you see the HTTP status code?
The HTTP status code is not shown with the basic curl command.

## D. What does 200 mean?
200 means the request was successful and the server returned the requested resource.

## E. What category of status code is it?
200 is a 2xx success status code.

## F. What other codes do you know?
Some common HTTP status codes are 401 and 404 – unauthorized, not found. 

## G. What would happen if Content-Type were text/html instead?
The client would treat the response as HTML not JSON. It might try to render it as a web page instead of parsing it as data. 

## H. Does the content-length match the actual size of the body?
Yes. Content-Length shows the number of bytes in the response body and it should match the actual size of the data sent by the server.

## I. Why is Connection important in high-traffic systems?
The Connection header controls whether the connection stays open or closes.
 
## J. What status code did you receive?
I received status code 404 Not Found. 

## K. Is there a response body?
Yes, there is a response body but it is empty.

## L. How does it differ from the successful case? 
In the successful case, the server returns status code 200 and a JSON resource. In this case, the server returns 404 Not Found and no meanuingful resource data. 

## M. What status code did the server return?
The server returned status code 201 Created. 

## N. What does it mean?
201 means that a new resource was successfully created on the server.

## O. What headers appear in this response?
Some headers in the response are Content-Type, Content-Length, Connection, Date and Server.
 
## P. Does this API actually validate the token?
No, this API does not actually validate the token. It is a fake testing APU and ignores the authorization header. 

## Q. What status code would a real secure API return if the token were invalid?
A real secure API would return status code 401 unauthorized. 

## R. What is the difference between 401 and 403?
401 means the client is not authenticated. 403 means the client is authenticated but not authorized to access the resource. 
 
## S. When would this be useful?
This is useful when you only want to check the headers without downloading the response body. 

## T. Why might monitoring systems use this approach?
Monitoring systems use this to check if a server is up and responding correctly without transferring large amounts of data. 

## U. Complete the following table:
| Code | Category | Meaning |
|------|----------|---------|
| 200  | Success  | OK. The action requested by the client was received, understood, and accepted |
| 201  | Success  | Created. A new resource was successfully created |
| 400  | Client Error | Bad Request. The server could not understand the request |
| 401  | Client Error | Unauthorized. Authentication is required or failed |
| 403  | Client Error | Forbidden. The client is authenticated but not allowed to access the resource |
| 404  | Client Error | Not Found. The requested resource does not exist |
| 500  | Server Error | Internal Server Error. The server encountered an unexpected error |

## V. Why is it bad practice to always return 200, even on errors?
It is bad practice because clients cannot distinguish between successful and failed requests, which breaks error handling and
