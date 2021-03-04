module.exports.validateStartupRegisterInput = (
  email,
  company,
  password,
  confirmPassword,
  industry,
  growthStage,
  location,
  imageUrl,
  fundingStage
) => {
  const errors = {};
  if (company.trim() === '') {
    errors.company = 'Company must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.password = 'Passwords must match';
  }
  if (industry.trim() === '') {
    errors.industry = 'Industry must not be empty';
  }
  if (growthStage.trim() === '') {
    errors.growthStage = 'Growth stage must not be empty';
  }
  if (location.trim() === '') {
    errors.location = 'Location must not be empty';
  }
  if (imageUrl.trim() === '') {
    errors.imageUrl = 'Image URL must not be empty';
  }
  if (fundingStage.trim() === '') {
    errors.fundingStage = 'Funding Stage URL must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateStartupLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
