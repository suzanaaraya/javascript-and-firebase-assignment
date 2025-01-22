function displayBirthdayMessage(dob, name) {
    const element = document.getElementById('birthday-message');
  if (!element) {
      console.error('The HTML element to display the birthday message is missing.');
      return;
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const birthDate = new Date(dob);
  const thisYearBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  
  // Reset hours to avoid hour differences affecting the date comparison
  today.setHours(0, 0, 0, 0);
  thisYearBirthday.setHours(0, 0, 0, 0);

  // If the birthday this year has already passed or is today, calculate for next year
  const nextBirthday = today > thisYearBirthday ? new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate()) : thisYearBirthday;

  // Calculate the days until the next birthday
  const timeDiff = nextBirthday - today;
  const daysUntilBirthday = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysUntilBirthday === 0) {
      fetch('https://api.adviceslip.com/advice')
          .then(response => response.json())
          .then(data => {
              const advice = data.slip.advice;
              element.innerHTML = `Happy Birthday, ${name}! <br>${advice}`;
          })
          .catch(error => {
              console.error('Error fetching advice:', error);
              element.innerText = `Happy Birthday, ${name}!`;
          });
  } else {
      element.innerText = `${daysUntilBirthday} days until your birthday, ${name}!`;
  }
}