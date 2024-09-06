const RecintosZoo = require('./recintos-zoo');

test('Deve retornar recintos viáveis para 2 macacos', () => {
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('MACACO', 2);
  
  expect(resultado.recintosViaveis).toEqual([
    "Recinto 1 (espaço livre: 5 total: 10)",
    "Recinto 2 (espaço livre: 3 total: 5)",
    "Recinto 3 (espaço livre: 2 total: 7)"
  ]);
});

test('Deve retornar erro para espécie inválida', () => {
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('UNICORNIO', 1);
  
  expect(resultado.erro).toBe('Animal inválido');
});

test('Deve retornar erro para quantidade inválida', () => {
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('MACACO', 0);
  
  expect(resultado.erro).toBe('Quantidade inválida');
});
