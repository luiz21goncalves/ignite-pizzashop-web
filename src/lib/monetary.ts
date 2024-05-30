export function formatCentsInMonetary(cents: number): string {
  const value = cents / 100

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
