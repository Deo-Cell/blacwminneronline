const { DateTime } = require('luxon');

const dateInput = "2024-04-06T13:26:30.480313";

const dateWithoutMilliseconds = dateInput.replace(/\.\d{6}/, '');
  
  // Convertir la date en format Luxon DateTime
  const luxonDate = DateTime.fromISO(dateWithoutMilliseconds);

  // Formater la date en français
  const formattedDate = luxonDate.setLocale('fr').toFormat('cccc d LLLL yyyy');

  console.log('formattedDate:', formattedDate);