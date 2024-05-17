/* eslint-disable no-console */
import { connection } from "../boot.js";
import ProductSeeder from "./migrations/seeders/ProductSeeder.js";
import ReviewSeeder from "./migrations/seeders/ReviewSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    await ProductSeeder.seed()

    await ReviewSeeder.seed()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
