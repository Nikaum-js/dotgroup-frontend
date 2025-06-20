export const formatCPF = (value: string): string => {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length <= 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }
  return cpf
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
};

export const formatPhone = (value: string): string => {
  const phone = value.replace(/\D/g, "");
  if (phone.length <= 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
  }
  return phone.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
};

export const formatZipCode = (value: string): string => {
  const cep = value.replace(/\D/g, "");
  if (cep.length <= 8) {
    return cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
  }
  return cep.slice(0, 8).replace(/(\d{5})(\d{3})/g, "$1-$2");
};
