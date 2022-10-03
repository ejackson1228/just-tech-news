const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

// create user model
class User extends Model {}


//define tables and columns
User.init(
    {
        // define an id column
        id: {
            //use the speicla sequelize DataTypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of sql's NOT NULL option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate values in this table
            unique: true,
            // if allowNull is set to false, we cann run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means that the password must be at least 4 characters
                len: [4]
            }
        }

    },
    {
        //TABLE CONFIG OPTIONS GO HERE 

        //PASS IN OUR IMPORTED SEQUELIZE CONNECTION (the direct connection to our database)
        sequelize,
        // dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of db table,
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so our model name stays lowercase in the db
        modelName: 'user'
    }
);

module.exports = User;