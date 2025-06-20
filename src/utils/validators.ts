export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const numericPhone = phone.replace(/\D/g, "");
  return numericPhone.length === 11;
};

export const validateZipCode = (zipCode: string): boolean => {
  const numericZipCode = zipCode.replace(/\D/g, "");
  return numericZipCode.length === 8;
};

export const validateCPF = (cpf: string): boolean => {
  const numericCPF = cpf.replace(/\D/g, "");

  if (numericCPF.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(numericCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numericCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(numericCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numericCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(numericCPF.charAt(10))) return false;

  return true;
};
