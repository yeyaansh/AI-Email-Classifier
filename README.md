enviornment variables  (.env) file required in server folder or directory :

PORT =
MONGODB_URI = 
DATABASE_NAME =
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
JWT_SECRET_KEY =
JWT_EXPIRY_TIME = 
COOKIE_EXPIRY_TIME =

enviornment variables  (.env) file required in client folder or directory :
VITE_GOOGLE_CLIENT_ID = 

now manage your frontend, its routing, state, UI and so on...

note: this approach is not very secure because your client_id is still exposed on your frontend side.. so please take safety measure...