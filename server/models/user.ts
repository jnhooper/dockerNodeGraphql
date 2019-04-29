import bcrypt from 'bcrypt';
import { Model, BuildOptions, Sequelize } from 'sequelize';
import { number } from 'prop-types';

interface iUser extends Model {
  readonly id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  generatePasswordHash: Function;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): iUser;
  associate;
  findByLogin;
};

const user = (sequelize, DataTypes) => {
  const User = <UserStatic>sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'An email cannot be empty.',
        },
        isEmail: {
          args: true,
          msg: 'Not a valid email.',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty',
        },
        len: {
          args: [7, 42],
          msg: 'password must be between 7 and 42 characters',
        },
      },
    },

    role: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, {
      onDelete: 'CASCADE',
    });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
