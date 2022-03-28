# Workforce Link - Support Worker Test Data Generator

This is a Node JS script used to automatically generate Support Worker test data for the [candidate database](https://github.com/tjohnston-softdev/worklink-database) that I designed for Workforce Link's IT system. Since test data is sometimes too tedious to create manually, and most tools are relatively simple, this script had to be tailor-made for the database, it's rules, and our specific requirements.

---

## Background

After I designed the Workforce Link database, I started to implement the [back-end API](https://github.com/tjohnston-softdev/worklink-api-orig). Of course, once I had functional endpoints, I needed to populate the database with test data. For most tables, this was simple enough to do by hand or use available online tools. However, the data structure related to Support Workers was too complex for these tools to generate test data that works exactly as-is.

Rather than trying to make the best of those limitations, I set about writing my own script to generate Support Worker test data. Since the project as a whole had a hard deadline, I really did not have the time to come up with anything spectacular. The end result was very messy and unrefined. It ran primarily on [Google Sheets](https://www.google.com.au/sheets/about/), using embedded scripts to randomly choose values and create full objects. In summary, it was not my best work but it had served it's purpose.

When I decided to revisit this project for my public portfolio and come up with test data, I felt a sense of déjà vu. Most of the tables can be populated by hand but when it comes to Support Workers, an automatic generation script is necessary. The main difference is that now, I was able to sit down and write a script that I was happy with rather than just trying to tick a few boxes. Even though being unemployed in the software industry is a full-time job in itself, I still find myself having way too much free time and misplaced energy... I need help.

---

## Installing

1. Clone this repository and execute `npm install`
2. To generate test data, execute `node generate`
3. To customize different data generation parameters, see `options.json`
4. Output SQL files are saved to the `output-files` folder.

The test data generated by this script is meant to be used alongside the [Workforce Link database](https://github.com/tjohnston-softdev/worklink-database). Refer to that repository for more details on how to set up an instance.


---

## Other Documentation
* [Customization Options](./info/options.md)
* [Options File](./options.json)
* [Database](https://github.com/tjohnston-softdev/worklink-database)
* [Back-End API](https://github.com/tjohnston-softdev/worklink-api-orig)
* [Input Data Sources](./info/references.md)

---

## Further Development

As of June 2021, I have decided to start cleaning up backup files of the IT system I designed for Workforce Link. On the 5th of August, I publicly released the database design, a 'Support Worker' test data generation script, and a prototype build of the final product.

These repositories are currently based on the original prototype and, as such, are only intended for reference and not proper usage. ~~I will spend the coming months developing an improved version of the system from scratch. Revised versions of the database and test data generator will be developed and released alongside this new system.~~

I don't want anything to do with this project in the future. I have moved on with my life and working with more important things.

---

## Disclaimer

This repository is licensed under [MIT](https://opensource.org/licenses/MIT). You may use this as a basis both personal and commercial projects as long as attribution is given and the license remains intact. Although I will actively support this repository, I do not claim responsibility for if and how you use this alongside the [original prototype server](https://github.com/tjohnston-softdev/worklink-api-orig). Refer to that repository for more details. I also do not claim responsibility for your use of this data with any databases other than the one I designed for Workforce Link. The 3rd-party input used to generate Support Worker test data, such as keywords, are property of their respective owners. Care has been taken to reference them appropriately and are not covered by this project's license.

As of 6 August 2021, this repository has been officially discontinued.

As of 28 March 2022, I have withdrawn any further plans to reboot this project.
