/* eslint-disable no-console */
import { connection } from "../boot.js";
import ProductSeeder from "./migrations/seeders/ProductSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    await ProductSeeder.seed()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
