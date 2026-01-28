import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Setting from "../models/Setting";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";
import Whatsapp from "../models/Whatsapp";
import ContactCustomField from "../models/ContactCustomField";
import Message from "../models/Message";
import Queue from "../models/Queue";
import WhatsappQueue from "../models/WhatsappQueue";
import UserQueue from "../models/UserQueue";
import QuickAnswer from "../models/QuickAnswer";
import Tenant from "../models/Tenant";

// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

sequelize.addModels([
  Tenant,
  User,
  Queue,
  Whatsapp,
  Contact,
  Ticket,
  Message,
  QuickAnswer,
  Setting,
  ContactCustomField,
  UserQueue,
  WhatsappQueue
  // ...otros modelos
]);

export default sequelize;
