"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Beew extends discord_js_1.Client {
    constructor(settings) {
        super(settings.clientOptions || {});
        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;
    }
}
exports.default = Beew;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CZWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQW9DO0FBR3BDLE1BQXFCLElBQUssU0FBUSxtQkFBTTtJQUdwQyxZQUFtQixRQUFrQjtRQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0NBQ0o7QUFURCx1QkFTQyJ9