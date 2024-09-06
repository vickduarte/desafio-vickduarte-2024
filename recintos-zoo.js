class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(especie, quantidade) {
    if (!this.animais[especie]) {
      return { erro: 'Animal inválido' };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const animal = this.animais[especie];
    let recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      let espacoOcupado = recinto.animais.reduce((acc, { especie, quantidade }) => {
        return acc + this.animais[especie].tamanho * quantidade;
      }, 0);

      if (recinto.animais.length > 0 && !recinto.animais.some((a) => a.especie === especie)) {
        espacoOcupado += 1;
      }

      const espacoDisponivel = recinto.tamanho - espacoOcupado;
      const espacoNecessario = animal.tamanho * quantidade;

      const biomaValido = animal.biomas.includes(recinto.bioma) || (animal.biomas.includes('savana') && recinto.bioma === 'savana e rio');
      const coabitacaoValida = recinto.animais.every(({ especie: especieExistente }) => {
        const animalExistente = this.animais[especieExistente];
        if (animal.carnivoro || animalExistente.carnivoro) {
          return especieExistente === especie;
        }
        if (especie === 'HIPOPOTAMO' || especieExistente === 'HIPOPOTAMO') {
          return recinto.bioma === 'savana e rio';
        }
        return true;
      });

      const macacoRegra = especie === 'MACACO' ? recinto.animais.length > 0 || quantidade > 1 : true;

      if (biomaValido && espacoDisponivel >= espacoNecessario && coabitacaoValida && macacoRegra) {
        recintosViaveis.push({
          numero: recinto.numero,
          espacoLivre: espacoDisponivel - espacoNecessario,
          total: recinto.tamanho,
        });
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    return {
      recintosViaveis: recintosViaveis.map(
        (recinto) => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`
      ),
    };
  }
}

module.exports = RecintosZoo;