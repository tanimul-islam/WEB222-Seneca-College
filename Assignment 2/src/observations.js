/**
 * WEB222 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: Tanimul Islam
 *      Student ID: 129414223
 *      Date: 14/06/2023
 *
 * Please see all unit tests in the files problem-01.test.js, problem-02.test.js, etc.
 */

/*******************************************************************************
 * Problem 0: learn how to work with the cases data.
 *
 * Welcome to Assignment 2! In this assignment, you're going to be practicing
 * different ways of working with JavaScript Objects, both built-in Objects
 * like Array and String, and also working with custom Objects you create.
 *
 * Before you dive into all the problems below, let's spend a minute helping you
 * learn how to work with the sample user data included in this assignment.
 *
 * We've included an extra file in this assignment: `data.js`.  This is data
 * that was obtained from the iNaturalist API.  iNaturalist is available at
 * https://www.inaturalist.org/ and lets people around the world share and track
 * sightings and helps identify plants, animals, insects, and other organisms.
 * It's a phenomenal tool for scientists and curious naturalists alike.
 *
 * The iNaturalist data is typical of a lot of data we use on the web: it's formatted
 * as an Object, with key/value pairs to express the data.  We use strings, numbers,
 * boolean, as well as Arrays and even Objects.  Learning how to traverse and
 * manipulate this data is important.
 *
 * Take a look at src/data.js now to get a sense of what the data looks like. This
 * data includes 10 observations for an area of 1km around the Seneca Newnham campus.
 */

/*******************************************************************************
 * Problem 00: Learning to write our tests
 *
 * Each of the functions below will be passed a `data` argument, which is
 * an Object returned by calling the iNaturalist API.  It looks something like
 * this:
 *
 * {
 *   total_results: 125,
 *   page: 1,
 *   per_page: 10,
 *   results: [
 *       ...observation results here...
 *   ]
 * }
 *
 * The data includes `total_results` (how many results there are). The results
 * are "paged," meaning that you are only seeing a subset of the total.  The
 * `page` indicates which page we are on, and `per_page` how many items there
 * are on each page. It also includes the Array of `results`.
 *
 * To get you started, write a function that accepts a full `data` Object and returns
 * only the `total_results` Number.
 *
 * You can try running this test using the following command:
 *
 * npm test problem-00
 *
 * See if you can get this test to pass by fixing the bug in the code below.
 ******************************************************************************/
function getTotalResults(data) {
  return data.total_results;
}

/*******************************************************************************
 * Problem 01 Part 1: use a for-loop to iterate over Arrays
 *
 * Write a function named `observationSummary(data)` that loops over every
 * observation Object in the results array, and calls `console.log()`, passing
 * it a formatted String that looks like this:
 *
 * `ID-67868131 "Muskrat" (Date: 2021-01-10)`
 *
 * The formatted String above is made up of the following observation properties:
 *
 *   - id
 *   - species_guess
 *   - observed_on_details and date
 *
 * In your solution, make use of a for-loop to iterate over results in data
 *
 * Your function shouldn't return anything, just call console.log()
 ******************************************************************************/
function observationSummary(data) {
  var results = data.results;
  var length = results.length;

  for (var i = 0; i < length; i++) {
    var observation = results[i];
    var ID = observation.id;
    var species = observation.species_guess;
    var date = observation.observed_on_details.date;

    var summary = 'ID-' + ID + ' "' + species + '" (Date: ' + date + ')';
    console.log(summary);
  }
}

/*******************************************************************************
 * Problem 01 Part 2: use forEach() to iterate over Arrays
 *
 * Rewrite your code from `observationSummary(data)` above to use a forEach()
 * function instead of a for-loop.  Everything else should be identical.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 ******************************************************************************/
function observationSummary2(data) {
  var results = data.results;

  results.forEach(function (observation) {
    var ID = observation.id;
    var species = observation.species_guess;
    var date = observation.observed_on_details.date;

    var summary = 'ID-' + ID + ' "' + species + '" (Date: ' + date + ')';
    console.log(summary);
  });
}

/*******************************************************************************
 * Problem 02: observationsByGeoPrivacy(data, geoPrivacy)
 *
 * iNaturalist users can hide or alter the geolocation coordinate data for an
 * observation they make.  For example, I might see a butterfly in my backyard,
 * but don't want to share the location of my home.
 *
 * Write a function that takes Observation data, as well as a geoPrivacy value.
 * The geoPrivacy value describes whether the geolocation data is "open",
 * "obscured", "private", or null (i.e., unspecified).
 *
 * If the geoPrivacy value isn't one of "open", "obscured", "private", or null
 * throw an error.  Make sure you deal with UPPER- and lower-case versions of the
 * strings when checking.
 *
 * Return a new Array with only those observation Objects that contain a geoprivacy
 * value that matches the geoPrivacy argument to your function.  For example:
 *
 * observationsByGeoPrivacy(data, "open") would return an Array of observation
 * objects that have `geoprivacy: "open"`.
 *
 * observationsByGeoPrivacy(data, null) would return an Array of observation
 * objects that have `geoprivacy: null`.
 *
 * observationsByGeoPrivacy(data, "OPEN") would return an Array of observation
 * objects that have `geoprivacy: "open"` (i.e., UPPERCASE geoPrivacy values
 * should be converted to lowercase).
 *
 * In your solution, make use of the following:
 *
 *  - make sure that geoPrivacy is of the right type and value, or throw an Error
 *  - create an empty array
 *  - use a for...of loop to loop over all Objects in results
 *  - if an observation includes the given geoprivacy value, add the observation
 *    Object to the empty Array. Make sure you deal with both UPPER and lowercase
 *    geoPrivacy values: all geoprivacy values on the observations are lowercase.
 *
 * Your function should return the newly created Array.
 ******************************************************************************/

function observationsByGeoPrivacy(data, geoprivacy) {
  let newArray = [];

  if (!/(open|obscured|private|null)/gi.test(String(geoprivacy))) {
    throw new Error();
  } else {
    for (const result of data.results) {
      if (
        String(geoprivacy).toLocaleLowerCase() === String(result.geoprivacy).toLocaleLowerCase()
      ) {
        newArray.push(result);
      }
    }
    return newArray;
  }
}

/*******************************************************************************
 * Problem 3 Part I: transformObservation(original) and transformObservations(cases)
 *
 * Write functions to transform results into a new Object format.
 *
 * The `transformObservation(original)` function takes an observation Object that
 * looks like the values in src/data.js, and transforms the data into a new Object
 * that looks like this (see comments on right-hand side with details):
 *
 * {
 *   id: 67868131,                           // copy the id over without modification
 *   speciesGuess: 'Muskrat',                // species_guess renamed
 *   isResearchQuality: true,                // true if quality_grade is 'research', false otherwise
 *   coords: [-79.3565522733, 43.798774894], // location converted to Array of Numbers, longitude first
 *   photos: [                               // modify photos to be Array of URLs
 *     'https://static.inaturalist.org/photos/109762131/square.jpg?1610308133'
 *   ],
 *   photosCount: 1,                         // the number of photo URLs included in photos
 *   user: '@dridgen'                        // the user's login_exact name with @ prefix added
 * }
 ******************************************************************************/
function transformObservation(original) {
  let newObj = {
    id: '',
    speciesGuess: '',
    isResearchQuality: '',
    coords: '',
    photos: '',
    photosCount: '',
    user: ''
  };

  newObj.id = original.id;
  newObj.speciesGuess = original.species_guess;

  if (original.quality_grade === 'research') {
    newObj.isResearchQuality = true;
  } else {
    newObj.isResearchQuality = false;
  }

  let locationSplits = original.location.split(',');
  let coordsArray = [parseFloat(locationSplits[1]), parseFloat(locationSplits[0])];
  newObj.coords = coordsArray;

  let photoArray = original.photos.map((element) => element.url);
  newObj.photos = photoArray;

  newObj.photosCount = newObj.photos.length;
  newObj.user = `@${original.user.login_exact}`;
  return newObj;
}

/*******************************************************************************
 * Problem 3 Part II: transformObservations(data) with iteration
 *
 * The `transformObservations(data)` function takes observation data and uses it
 * to create and return a new Array of transformed observation Objects,
 * calling the transformObservation() function you wrote above on each one.
 *
 * In your solution, make use of the following:
 *
 *  - create a new empty Array to hold all the transformed cases
 *  - use a for-loop or .forEach() method to loop over all Objects in the data results Array
 *  - pass each observation Object to your transformObservation() function to get a new Object
 *  - add the new, transformed Object to your array
 *  - return the new Array containing all the transformed Objects
 ******************************************************************************/
function transformObservations(data) {
  let transformedArray = Array();

  data.results.forEach((element) => transformedArray.push(transformObservation(element)));

  return transformedArray;
}

/*******************************************************************************
 * Problem 3 Part III: transformObservations2(data) with .map()
 *
 * Rewrite your transformObservations() function from above a second time using
 * the Array .map() method see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 *
 * In your solution, make use of the following:
 *
 *  - use the .map() method of the data results Array to create a new Array
 *  - In the .map() method's function, call your transformObservation() function
 *  - return the Array created by the .map() method
 ******************************************************************************/
function transformObservations2(data) {
  let transformedArray = [];

  transformedArray = data.results.map((element) => transformObservation(element));

  return transformedArray;
}

/*******************************************************************************
 * Problem 04: getObservationsById()
 *
 * Write function to get the observation Object(s) for a given ID, or list of IDs.
 *
 * Calling getObsesrvationsById() with a single `id` value should return the
 * observation Object that has that ID. For example:
 *
 * getObservationById(data, 161020) would return the single Object in the results
 * Array with an id property matching 161020.
 *
 * Similarly, if a single unknown id value is passed, return null:
 *
 * getObservationById(data, -12341234) would return null.
 *
 * Finally, getObservationById(data, 161020, 161021) would return an Array of 2
 * observation Objects, whose id properties matches the id values specified. If
 * any of the ids in the list are unknown, skip this id and don't add anything to
 * the returned Array.
 *
 * For example, the following would return an Array of 2 observation Objects,
 * ignoring the unknown third id:
 *
 * getObservationById(data, 161020, 161021, -12341234)
 *
 * In your solution, make use of the following:
 *
 *  - use the .forEach() method to iterate over all ids passed to your function
 *  - use the .find() method to locate items by id, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 ******************************************************************************/
function getObservationsById(data, ...ids) {
  if (ids.length > 1) {
    let dataArray = Array();

    ids.forEach(function (element) {
      if (element > 0) {
        var idData = data.results.find(({ id }) => id === element);
        dataArray.push(idData);
      }
    });
    return dataArray;
  }

  let newResult = null;
  if (data.results.find(({ id }) => id === ids)) {
    newResult = data.results.find(({ id }) => id === ids);
  }
  return newResult;
}

/*******************************************************************************
 * Problem 05: getObservationsByPositionalAccuracy()
 *
 * Write a function that filters observations according to their positional
 * accuracy. iNaturalist allows users to give an accuracy level in meters for
 * the location.
 *
 * Your function should accept iNaturalist data, and an options Object, which
 * may contain various filtering options.  The return value is an Array of
 * observations, whose positional_accuracy value matches the options provided.
 * For example:
 *
 * getObservationsByPositionalAccuracy(data, { eq: 135 }) means only return
 * observations whose positional_accuracy is equal to 135 exactly.
 *
 * getObservationsByPositionalAccuracy(data, { gt: 35 }) means only return
 * observations whose positional_accuracy is greater than or equal to 35.
 *
 * getObservationsByPositionalAccuracy(data, { max: 1035 }) means only return
 * observations whose positional_accuracy is less than or equal to 1035.
 *
 * getObservationsByPositionalAccuracy(data, { gt: 35, lt: 1035 }) means only
 * return observations whose positional_accuracy is greater than or equal to 35
 * AND less than or equal to 1035.
 *
 * If no options object is given, or none of the expect values are present (i.e.
 * equal, min, max), then return all values.  If all of eq, gt, and lt
 * are given, prefer eq (i.e., ignore lt and gt).
 *
 * Use the Array .filter() function in your solution.
 ******************************************************************************/

function getObservationsByPositionalAccuracy(data, options = {}) {
  let newElement = Object.keys(options);
  let newValues = Object.values(options);
  let i = 0;

  if (newElement.length > 0) {
    let arr = Array();

    if (newElement.length === 3) {
      for (i in newElement) {
        if (newElement[i] === 'eq')
          var sector = data.results.filter(
            ({ positional_accuracy }) => positional_accuracy === newValues[i]
          );
        break;
      }
      for (i in sector) arr.push(sector[i]);
    } else if (newElement.length === 2) {
      newValues.sort();

      if (newElement[0] !== newElement[1])
        var section = data.results.filter(
          ({ positional_accuracy }) =>
            positional_accuracy >= newValues[0] && positional_accuracy <= newValues[1]
        );

      for (i in section) arr.push(section[i]);
    } else {
      switch (newElement[0]) {
        case 'eq':
          var sector1 = data.results.filter(
            ({ positional_accuracy }) => positional_accuracy === newValues[0]
          );
          for (i in sector1) arr.push(sector1[i]);
          break;

        case 'gt':
          var sector2 = data.results.filter(
            ({ positional_accuracy }) => positional_accuracy >= newValues[0]
          );
          for (i in sector2) arr.push(sector2[i]);
          break;

        case 'lt':
          var sector3 = data.results.filter(
            ({ positional_accuracy }) => positional_accuracy <= newValues[0]
          );
          for (i in sector3) arr.push(sector3[i]);
          break;

        default:
          break;
      }
    }
    return arr;
  }
  return data.results;
}

/*******************************************************************************
 * Problem 06: getPlaces()
 *
 * Write a function to create URLs for looking up observations for specific
 * places using the iNaturalist results data and place_ids.
 *
 * When users record observations, they include information about the location.
 * Within iNaturalist's database, all places have a numeric id called a `place_id`.
 * For example:
 *
 *  - Canada = 6712
 *  - Ontario = 6883
 *  - Toronto = 134748
 *
 * An observation will usually include many place_ids.  For example, you might
 * record an observation in Toronto, which is also in Ontario, which is also in
 * Canada, etc.
 *
 * The results data includes a property named `place_ids` that lists all of the
 * relevant place_ids for the observation:
 *
 * place_ids: [
 *       6712, 6883, 9853, 27593, 57637, 59613, 59651, 59954, 59956, 61551,
 *       64422, 64423, 66741, 82257, 97394, 129309, 130989, 134744, 134748
 * ]
 *
 * Convert each observation's place_ids into an object with each key being
 * the place_id, and the value being a URL of the following form:
 *
 *      https://www.inaturalist.org/observations?place_id={place_id}
 *
 * For example, all observations for the City of Toronto are available at:
 *
 *      https://www.inaturalist.org/observations?place_id=134748
 *
 * The object you create will look like this:
 *
 * {
 *   6712: 'https://www.inaturalist.org/observations?place_id=6712',
 *   6883: 'https://www.inaturalist.org/observations?place_id=6883',
 *   134748: 'https://www.inaturalist.org/observations?place_id=134748',
 *   ...and so on
 * }
 *
 * Your function should return an Array of these new Objects:
 ******************************************************************************/
function getPlaces(data) {
  let result = [];

  for (let i = 0; i < data.results.length; i++) {
    const placeIDs = data.results[i].place_ids;
    const observation = {};

    for (let j = 0; j < placeIDs.length; j++) {
      const placeID = placeIDs[j];

      const url = `https://www.inaturalist.org/observations?place_id=${placeID}`;
      observation[placeID] = url;
    }

    result.push(observation);
  }
  return result;
}

/*******************************************************************************
 * Problem 07: getUserStats()
 *
 * Write function to get user statistics for iNaturalist users in the data results
 * Array. Each user has count information, for example:
 *
 * {
 *   user: {
 *     id: 216168,
 *     login: 'psweet',
 *     spam: false,
 *     suspended: false,
 *     created_at: '2016-04-13T21:54:34+00:00',
 *     login_autocomplete: 'psweet',
 *     login_exact: 'psweet',
 *     name: '',
 *     name_autocomplete: '',
 *     orcid: null,
 *     icon: 'https://static.inaturalist.org/attachments/users/icons/216168/thumb.jpg?1478731222',
 *     observations_count: 19096,
 *     identifications_count: 173355,
 *     journal_posts_count: 8,
 *     activity_count: 192459,
 *     species_count: 4960,
 *     universal_search_rank: 19096,
 *     roles: ['curator'],
 *     site_id: 1,
 *     icon_url: 'https://static.inaturalist.org/attachments/users/icons/216168/medium.jpg?1478731222'
 *   }
 * }
 *
 * In the above example, the user has the following counts that we are
 * interested in collecting:
 *
 * observations_count: 19096,            // number of observations
 * journal_posts_count: 8,               // number of journal posts
 * species_count: 4960,                  // number of species
 *
 * Your function should loop through all observation Objects and get the `user`
 * property.  Using the `user`, get the observations_count, identifications_count,
 * and species_count, and use them to create totals and a final average.  Your
 * function should return an Object with these stats, which looks like this:
 *
 * {
 *   count: 10,                         // the total number of users in this sample
 *   totals: {
 *     observations: 1234,              // the total observations for all users in this sample
 *     journals: 8,                     // the total journal posts  for all users in this sample
 *     species: 1234                    // the total species for all users in this sample
 *   },
 *   averages: {
 *     observations: 12,                // the average observations for all users in this sample
 *     journals: 2,                     // the average journal posts for all users in this sample
 *     species: 12                      // the average species for all users in this sample
 *   }
 * }
 ******************************************************************************/

function getUserStats(data) {
  let newObject = {
    count: 0,
    totals: {
      observations: 0,
      journals: 0,
      species: 0
    },
    averages: {
      observations: 0,
      journals: 0,
      species: 0
    }
  };

  data.results.forEach(function (element) {
    let userKeys = Object.keys(element.user);
    let userValues = Object.values(element.user);

    newObject.count++;

    for (let i = 0; i < userKeys.length; i++) {
      switch (userKeys[i]) {
        case 'observations_count':
          newObject.totals.observations += userValues[i];
          break;

        case 'journal_posts_count':
          newObject.totals.journals += userValues[i];
          break;

        case 'species_count':
          newObject.totals.species += userValues[i];
          break;

        default:
          break;
      }
    }
  });

  newObject.averages.observations = newObject.totals.observations / newObject.count;
  newObject.averages.journals = newObject.totals.journals / newObject.count;
  newObject.averages.species = newObject.totals.species / newObject.count;

  return newObject;
}

/**
 * Problem 08: Part 1 - extractTimeZones()
 *
 * Write a function to extract all time zones from the iNaturalist observation results.
 * The time zones are available in each result's `created_time_zone` and
 * `observed_time_zone` properties.
 *
 * Your function should loop through all of the results in `data` and get the
 * time zone values, placing them in an Array.
 *
 * You should not put any duplicate values in your new Array.
 *
 * When you have processed all results, and collected all unique time zone values,
 * return the Array of time zones.
 */
function extractTimeZones(data) {
  let timeZoneValues = [];
  for (let i = 0; i < data.results.length; i++) {
    if (!timeZoneValues.includes(data.results[i].created_time_zone)) {
      timeZoneValues.push(data.results[i].created_time_zone);
    }
    if (!timeZoneValues.includes(data.results[i].observed_time_zone)) {
      timeZoneValues.push(data.results[i].observed_time_zone);
    }
  }

  return timeZoneValues;
}

/**
 * Problem 08: Part 2 - extractTimeZones2()
 *
 * Rewrite your `extractTimeZones` function from above, but do not use an Array
 * to hold the time zones.  Instead, use a Set, see:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *
 * Your function should store all unique time zones in a Set, and when you are done
 * processing all results, convert your Set to an Array and return it. See:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 */

function extractTimeZones2(data) {
  let set = new Set();

  for (let i = 0; i < data.results.length; i++) {
    set.add(data.results[i].created_time_zone);
    set.add(data.results[i].observed_time_zone);
  }

  return Array.from(set);
}

// Our unit test files need to access the functions we defined
// above, so we export them here.
exports.getTotalResults = getTotalResults;
exports.observationSummary = observationSummary;
exports.observationSummary2 = observationSummary2;
exports.observationsByGeoPrivacy = observationsByGeoPrivacy;
exports.transformObservation = transformObservation;
exports.transformObservations = transformObservations;
exports.transformObservations2 = transformObservations2;
exports.getObservationsById = getObservationsById;
exports.getObservationsByPositionalAccuracy = getObservationsByPositionalAccuracy;
exports.getPlaces = getPlaces;
exports.getUserStats = getUserStats;
exports.extractTimeZones = extractTimeZones;
exports.extractTimeZones2 = extractTimeZones2;
