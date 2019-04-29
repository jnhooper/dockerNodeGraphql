import { Sequelize, Model, BuildOptions } from 'sequelize';

interface IMessage extends Model {
  readonly id?: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type MessageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IMessage;
  associate: (model) => any;
};

const message = (sequelize, DataTypes) => {
  const Message = <MessageStatic>sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        },
      },
    },
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
