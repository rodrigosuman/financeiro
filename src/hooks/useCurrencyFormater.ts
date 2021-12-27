const useCurrencyFormater = (currency: string) => {
  try {
    return new Intl.NumberFormat('pt-BR', {
      currency,
      style: 'currency',
    });
  } catch (error) {
    return { format: () => '' };
  }
};

export default useCurrencyFormater;
