"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Beew_1 = require("./Beew");
const config_1 = require("../config");
dotenv.config();
const client = new Beew_1.default(config_1.default);
client.login(client.settings.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsaUNBQTBCO0FBQzFCLHNDQUFpQztBQUVqQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxNQUFNLEdBQVMsSUFBSSxjQUFJLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9