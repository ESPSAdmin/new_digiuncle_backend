const { DataTypes } = require('sequelize');
const sequelize = require("../connection/Dbconnect");

const UserTable = sequelize.define('user_table', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'type cannot be null'
      },
      notEmpty: {
        msg: 'type name required'
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name cannot be null'
      },
      notEmpty: {
        msg: 'First name required'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Last name cannot be empty'
      }
    }

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email address already in use'
    },
    validate: {
      isEmail: {
        msg: 'Invalid email address'
      }
    }
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'Mobile number must contain only digits'
      },
      len: {
        args: [10],
        msg: 'Mobile number must be between 10 and 15 digits'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,

  }
}, {

});

module.exports = UserTable