/**
 * Calcula o preço de um filme baseado em sua avaliação média
 *
 * O cálculo é feito da seguinte forma:
 * - Preço base: R$ 20,00 para todos os filmes
 * - Adicional por avaliação: Até R$ 30,00 baseado na nota do filme (0-10)
 *
 * Exemplos:
 * - Nota 10: R$ 50,00 (20 + 30)
 * - Nota 7.5: R$ 42,50 (20 + 22,50)
 * - Nota 5: R$ 35,00 (20 + 15)
 *
 * @param voteAverage - Nota média do filme (0-10)
 * @returns Preço calculado em reais, arredondado para baixo com 2 casas decimais
 */
export const calculateMoviePrice = (voteAverage: number): number => {
  const basePrice = 20;
  const maxAdditional = 30;
  const additional = (voteAverage / 10) * maxAdditional;
  // Arredonda para baixo e mantém 2 casas decimais
  return Number((Math.floor((basePrice + additional) * 100) / 100).toFixed(2));
};

/**
 * Formata um número para o formato de moeda brasileira (R$)
 *
 * @param value - Valor a ser formatado
 * @returns String formatada (ex: "R$ 42,50")
 */
export const formatPrice = (value: number): string => {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
};
