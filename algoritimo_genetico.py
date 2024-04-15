import random
import numpy as np

# Definindo os alimentos disponíveis e suas informações nutricionais
foods = {
    'farinha_de_trigo': {'calorias': 44.7, 'calcio': 2, 'b12': 33.3, 'custos': 10.8},
    'leite_em_pó': {'calorias': 165, 'calcio': 19.1, 'b12': 23.5, 'custos': 20.5},
    'queijo': {'calorias': 130, 'calcio': 16.4, 'b12': 10.3, 'custos': 22.5},
    'figado': {'calorias': 100, 'calcio': 0.2, 'b12': 50.8, 'custos': 21.2},
    'batata': {'calorias': 105, 'calcio': 2.7, 'b12': 5.4, 'custos': 16.1},
    'feijão': {'calorias': 23, 'calcio': 11.4, 'b12': 24.7, 'custos': 15}
}

# Definindo os parâmetros do algoritmo genético
population_size = 100
generations = 50
mutation_rate = 0.01

# Definindo as restrições mínimas de nutrientes
min_nutrients = {'calorias': 3, 'calcio': 0.8, 'b12': 2.7}


# Função de fitness: objetivo é minimizar as calorias e maximizar a proteína
def fitness(diet):
    total_custos = sum(foods[food]['custos'] * diet[food] for food in diet)
    total_calcio = sum(foods[food]['calcio'] * diet[food] for food in diet)
    total_b12 = sum(foods[food]['b12'] * diet[food] for food in diet)
    total_carbs = sum(foods[food]['calorias'] * diet[food] for food in diet)

    # Penaliza dietas que não atendem às restrições mínimas
    penalty = sum(max(0, min_nutrients[nutrient] - total_nutrient) for nutrient, total_nutrient in [('calcio', total_calcio), ('b12', total_b12), ('calorias', total_carbs)])
    return -total_custos - total_calcio - total_b12 - total_carbs - penalty

# Função para criar uma dieta aleatória
def create_diet():
    diet = {}
    for food in foods:
        diet[food] = random.randint(0, 100)  # Quantidade de cada alimento
    return diet

# Função de mutação: altera aleatoriamente a quantidade de um alimento na dieta
def mutate(diet):
    mutated_diet = diet.copy()
    food_to_mutate = random.choice(list(mutated_diet.keys()))
    mutated_diet[food_to_mutate] += random.uniform(-10, 10)  # Mutação com um ajuste aleatório entre -10 e 10
    mutated_diet[food_to_mutate] = max(0, mutated_diet[food_to_mutate])  # Garante que não haja valores negativos
    return mutated_diet

# Função de crossover: cria uma nova dieta a partir de duas dietas pai
def crossover(parent1, parent2):
    child_diet = {}
    for food in foods:
        child_diet[food] = (parent1[food] + parent2[food]) / 2  # Média ponderada dos pais
    return child_diet

# Função principal do algoritmo genético
def genetic_algorithm():
    # Inicializa uma população aleatória de dietas
    population = [create_diet() for _ in range(population_size)]

    # Executa as gerações
    for _ in range(generations):
        # Calcula o fitness de cada dieta na população
        fitness_scores = [fitness(diet) for diet in population]

        # Seleciona os pais com base no fitness
        parents = [population[i] for i in np.argsort(fitness_scores)[:2].tolist()]

        # Cria a próxima geração
        next_generation = []

        # Aplica crossover e mutação para criar novas dietas
        for _ in range(population_size):
            child_diet = crossover(parents[0], parents[1])
            if random.random() < mutation_rate:
                child_diet = mutate(child_diet)
            next_generation.append(child_diet)

        # Atualiza a população para a próxima geração
        population = next_generation

    # Retorna a melhor dieta encontrada
    best_diet = max(population, key=lambda x: fitness(x))
    return best_diet

# Executa o algoritmo genético e imprime a melhor dieta encontrada
best_diet = genetic_algorithm()
print("Melhor dieta encontrada:")
for food, amount in best_diet.items():
    print(f"{food}: {amount}g")
