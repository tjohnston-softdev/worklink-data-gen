# Options

| Name | Description | Data Type | Example |
|---|---|---|---|
| supportWorkerCount | Total number of Support Worker entries to generate. This only affects the number of 'SupportWorker' rows and does not necessarily indicate the number of rows that will be generated for child tables. | Integer | 2000 |
| minRegDate | The earliest date that a Support Worker can be registered into the system. Date strings should be used, but any supported value will work, such as a millisecond count. Only the date component will be used and times are ignored. | Date | "2017-11-02" |
| encryption.enabled | If this is True, sensitive data fields will be encrypted. The original plain text will be backed up and exported to a separate file. Please keep in mind that this will take a long time to complete. | Boolean | true |
| encryption.key | This string is the key that will be used to encrypt the sensitive data fields. | String | "EXAMPLE" |
| encryption.checkMatch | If this is True, encrypted strings will be validated against their original counterparts. If they do not match, there will be an error. Comparing results will take extra time on top of the encryption itself so feel free to disable this if accuracy is not as important. | Boolean | true |
| genders.distribution | Affects the gender distribution between Male and Female support workers that identify as binary. Higher values result in more Females while lower values result in more Males. Using 0.5 will result in an even chance between both genders. | Percentage | 0.5 |
| genders.otherChance | Affects the chance that a Support Worker will identify as an 'other' gender as opposed to Male or Female. This does not directly affect binary gender distribution. | Percentage | 0.17 |
| age.min | Minimum age of the Support Worker as of their registration date. | Integer | 18 |
| age.max | Maximum age of the Support Worker as of their registration date. | Integer | 70 |
| age.feelsLikeChance | The percentage chance at a Support Worker will choose a 'feels like' age. | Percentage | 0.55 |
| age.maxOffset | The maximum multiplication difference between a Support Worker's chronological and 'feels like' age. This applies on both sides so if 0.25 is entered, the 'feels like' age will fall between 0.75 and 1.25 times the chronological age. The final number will be rounded to the nearest whole. | Decimal | 0.25 |
| aboutQuotes | The number of quotes that will be chosen from the [input](../input-data/quotes.txt) file to form a Support Worker's 'about me' text. This number is fixed, but the quotes themselves will be random. | Integer | 3 |
| skillDescription.minKeywords | The minimum number of keywords that will be chosen from the [input](../input-data/ing-forms.txt) file to write a Support Worker's skill description text. | Integer | 3 |
| skillDescription.maxKeywords | The minimum number of keywords that will be chosen to write a Support Worker's skill description text. | Integer | 10 |
| apperanceDescription.chance | The chance that an appearance description will be written for a Support Worker. Using the example value, this is guaranteed. | Percentage | 1 |
| apperanceDescription.minKeywords | The minimum number of keywords that will be chosen from the [input](../input-data/encouraging-words.txt) file to write a Support Worker's appearance description text. | Integer | 2 |
| apperanceDescription.maxKeywords | The maximum number of keywords that will be chosen to write a Support Worker's appearance description text. | Integer | 8 |
| travelTime.min | The minimum time in minutes that a Support Worker is willing to travel. | Integer | 5 |
| travelTime.max | The maximum time in minutes that a Support Worker is willing to travel. | Integer | 90 |
| baseChances.english | The chance that English will be a Support Worker's primary language. | Percentage | 0.85 |
| baseChances.sign | The chance that a Support Worker will be able to use sign language | Percentage | 0.10 |
| baseChances.vegetarian | The chance that a Support Worker will be vegetarian | Percentage | 0.15 |
| baseChances.petFriendly | The chance that a Support Worker will be pet-friendly. This does not affect whether they have pets of their own, or whether they will have a description. | Percentage | 0.8 |
| baseChances.smoking | The chance that a Support Worker will be a smoker. | Percentage | 0.05 |
| baseChances.swim | The chance that a Support Worker will be able to swim. | Percentage | 0.9 |
| baseChances.seasick | The chance that a Support Worker will be prone to seasickness | Percentage | 0.03 |
| baseChances.wageSubsidy | The chance that wage subsidies will be available for hiring this Support Worker | Percentage | 0.40 |
| baseChances.video | The chance that a Support Worker will have a video tied to their profile. | Percentage | 0.6 |
| viewsPerDay.min | The minimum average views per day that a Support Worker profile has. The total view count is the chosen average multiplied by the number of days since registration. | Integer | 0 |
| viewsPerDay.max | The maximum average views per day that a Support Worker profile has. | Integer | 8 |
| otherLanguages.chance | The chance that a Support Worker will speak other languages. Rows will be added to 'SupportWorkerOtherLanguages' for that Support Worker. | Percentage | 0.15 |
| otherLanguages.min | The minimum number of 'OtherLanguages' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| otherLanguages.max | The maximum number of 'OtherLanguages' entries that will be tied to this Support Worker. | Integer | 3 |
| checksClearances.chance | The chance that a Support Worker will have checks and clearances. Rows will be added to 'SupportWorkerChecks' for that Support Worker. | Percentage | 0.75 |
| checksClearances.min | The minimum number of 'CheckClearance' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| checksClearances.max | The maximum number of 'CheckClearance' entries that will be tied to this Support Worker. | Integer | 4 |
| checksClearances.showWillingness | If this is True, the "Willing to obtain" CheckClearance will be added to the Support Worker if 'chance' fails. There is also a 50% chance to add "Will Pass" as well. | Boolean | true |
| personality.min | The minimum number of 'SupportWorkerPersonality' rows that will be added for this Support Worker. | Integer | 2 |
| personality.max | The maximum number of 'SupportWorkerPersonality' rows that will be added for this Support Worker. | Integer | 5 |
| hobbies.min | The minimum number of 'SupportWorkerHobbies' rows that will be added for this Support Worker. | Integer | 3 |
| hobbies.max | The maximum number of 'SupportWorkerHobbies' rows that will be added for this Support Worker. | Integer | 8 |
| gaming.chance | The chance that a Support Worker will have gaming preferences. Rows will be added to 'SupportWorkerGaming' for that Support Worker. | Percentage | 0.55 |
| gaming.min | The minimum number of 'GamingConsole' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| gaming.max | The maximum number of 'GamingConsole' entries that will be tied to this Support Worker. | Integer | 3 |
| allergies.chance | The chance that a Support Worker will have known allergies. Rows will be added to 'SupportWorkerAllergies' for that Support Worker. | Percentage | 0.08 |
| allergies.min | The minimum number of 'Allergy' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| allergies.max | The maximum number of 'Allergy' entries that will be tied to this Support Worker. | Integer | 3 |
| fearsPhobias.chance | The chance that a Support Worker will have fears and phobias. Rows will be added to 'SupportWorkerFears' for that Support Worker. | Percentage | 0.03 |
| fearsPhobias.min | The minimum number of 'FearPhobia' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| fearsPhobias.max | The maximum number of 'FearPhobia' entries that will be tied to this Support Worker. | Integer | 3 |
| technology.min | The minimum number of 'SupportWorkerTechnology' rows that will be added for this Support Worker. | Integer | 1 |
| technology.max | The maximum number of 'SupportWorkerTechnology' rows that will be added for this Support Worker. | Integer | 5 |
| qualifications.chance | The chance that a Support Worker will have relevant study qualifications. Rows will be added to 'SupportWorkerQualifications' for that Support Worker. | Percentage | 0.67 |
| qualifications.min | The minimum number of 'Qualification' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| qualifications.max | The maximum number of 'Qualification' entries that will be tied to this Support Worker. | Integer | 2 |
| experienceAreas.min | The minimum number of 'SupportWorkerExperienceAreas' rows that will be added for this Support Worker. | Integer | 1 |
| experienceAreas.max | The maximum number of 'SupportWorkerExperienceAreas' rows that will be added for this Support Worker. | Integer | 8 |
| pets.chance | The chance that a Support Worker will have pets. Rows will be added to 'SupportWorkerPets' for that Support Worker. | Percentage | 0.65 |
| pets.minAnimals | The minimum number of 'DomesticAnimal' entries that will be tied to this Support Worker if 'chance' passes. | Integer | 1 |
| pets.maxAnimals | The maximum number of 'DomesticAnimal' entries that will be tied to this Support Worker. | Integer | 3 |
| pets.minCount | The minimum number of that particular animal that the Support Worker will own. | Integer | 1 |
| pets.maxCount | The maximum number of that particular animal that the Support Worker will own. | Integer | 5 |
| previousExperience.chance | The chance that a Support Worker will have past professinal experience. Rows will be added to 'SupportWorkerPreviousExperience' for that Support Worker. | Percentage | 0.80 |
| previousExperience.minPositions | The minimum number of previous job positions that a Support Worker will have if 'chance' passes | Integer | 1 |
| previousExperience.maxPositions | The maximum number of previous job positions that a Support Worker will have. | Integer | 5 |
| previousExperience.minWorkAge | The minimum age in years before a Support Worker will start working at their previous jobs. This is completely separate from the age requirements at register. | Integer | 15 |
| previousExperience.minLengthMonths | The minimum length of a job role in months. 12 months is 1 year. | Integer | 3 |
| previousExperience.maxLengthMonths | The maximum length of a job role in months. | Integer | 240 |
| previousExperience.ongoingChance | If a job's end date is in the future, this will affect the likelihood that the job role will be considered current. If this chance fails, the end date will be set to today's date instead. | Percentage | 0.40 |
| availability.minWeeklyHours | The minimum number of hours that a Support Worker must mark themselves as available per week. Mind you, this does not reflect their 'true' working hours. Just their approx. availability. | Integer | 8 |
| availability.maxWeeklyHours | The maximum number of hours that a Support Worker can mark themselves as available per week. | Integer | 60 |
| availability.minBlockHours | The minimum number of hours that will be allocated sequentially in a block. | Integer | 1 |
| availability.maxBlockHours | The maximum number of hours that will be allocated sequentially. | Integer | 16 |
| otherSpecific.chance | The chance that an 'other' description will be written for a specific topic such as 'otherHobbies' in a 'SupportWorkerOther' entry. | Percentage | 0.50 |
| otherSpecific.minKeywords | The minimum number of keywords that will be chosen from the corresponding input file to write a Support Worker's other description text if 'chance' passes. | Integer | 5 |
| otherSpecific.maxKeywords | The maximum number of keywords that will be chosen to write a Support Worker's other description text. | Integer | 20 |
| otherGeneral.chance | The chance that an 'otherGeneral' description will be written for a 'SupportWorkerOther' entry. | Percentage | 1 |
| otherGeneral.minKeywords | The minimum number of keywords that will be chosen to write a Support Worker's 'otherGeneral' text. | Integer | 10 |
| otherGeneral.maxKeywords | The maximum number of keywords that will be chosen to write a Support Worker's 'otherGeneral' text. | Integer | 20 |

---

**Originally Written:** 30 June 2021  
**Last Updated:** 1 August 2021


[Return to index](../readme.md)