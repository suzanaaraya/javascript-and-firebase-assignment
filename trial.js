function daysUntilBirthday(birthday) {
    const today = new Date(); // Current date
    const birthDate = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // If the birthday has already passed this year, use the next year
    if (birthDate < today) {
        birthDate.setFullYear(today.getFullYear() + 1);
    }

    // Calculate the difference in milliseconds
    const diffInMs = birthDate - today;

    // Convert milliseconds to days
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

// Example usage
const birthday = new Date(1990, 0, 21); // Month is 0-based, so 6 = July
console.log(`Days until birthday: ${daysUntilBirthday(birthday)}`);