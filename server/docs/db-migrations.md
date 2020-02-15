# Configuring the database
``` bash
# customize this line!
DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"
```

# Creating database
This command need to be executed from root directory of project files from inside running docker container
``` bash
php /bin/console doctrine:database:create
```

# Creating table schema
This command will create table schema and will generate a migration file in `src/Migrations` directory
``` bash
php bin/console make:migration
```
If you open the generating file under `src/Migrations` it containes table schema needed to update your dataabase! To run that SQL, execute your migration with below command:
``` bash
php bin/console doctrine:migrations:migrate
```

Note: Later if you bring any DDL change in your entity you need to re-execute above two migration commands so your new schema get reflected in migrations file and in your database.
