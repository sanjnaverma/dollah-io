/*mongo...

it can have multiple databases
databases are a bunch of collections
collections are a bunch of objects... or documents
mongo -> db -> collection -> document
{name: value, ... etc}
mongod - database server <--- this has to be running to access your data

mongo (no d) - database client

show databases
<will show you all the databases

use moviedb
<navigated into the movie database

db
<will show you the database> >>moviedb

show collections
<show you all the collections within the moviedb>

db.moviegenres.find({name:'Thriller'})
db refers to the current moviedb
moviegenres is the particular collection that we are searching through
will return the obkect with name Thriller
find is the command to navigate

db.moviegenres.insert({whatever:'whatevz'});
>WriteResults

//need help downloading mongodb

db.moviedenres.remove({})
<remove all empty objects>


mongoose is an object to database mapper
it allows us to constrain the kinds of documents that we create
we have to define the properties and their types... for each "collection" of each documents

thing that you connect to....is the database name
schema, constructor --> collection
object --> document
*/
