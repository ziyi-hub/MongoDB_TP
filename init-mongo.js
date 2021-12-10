db.createUser (
    {
        user : "mongo",
        pwd : "mongopass",
        roles : [
            {
                role : "readWrite", db : "mongodb"
            }
        ]
    }
)

db.auth('mongo', 'mongopass')