import os
from django.core.management.base import BaseCommand
from django.core.files import File
from products.models import Product
from django.conf import settings

class Command(BaseCommand):
    help = 'Popula o banco com produtos iniciais'

    def handle(self, *args, **options):
        products_data = [
            {
                "id": 1,
                "name": "Airpods 2 Pro",
                "description": "Fone de ouvido sem fio com cancelamento de ruído e som de alta qualidade.",
                "category": "Eletrônicos",
                "price": 299.08,
                "stock": 98,
                "image_url": "/media/products/airpods.jpeg",
            },
            {
                "id": 2,
                "name": "Macbook Air Pro",
                "description": "Laptop de última geração, leve e potente, ideal para produtividade e edição.",
                "category": "Eletrônicos",
                "price": 8099.00,
                "stock": 112,
                "image_url": "/media/products/macbook.jpeg",
            },
            {
                "id": 3,
                "name": "Smart TV 55\" 4K",
                "description": "Televisor LED 4K com HDR, acesso a apps de streaming e design slim.",
                "category": "Eletrônicos",
                "price": 2899.90,
                "stock": 45
            },
            {
                "id": 4,
                "name": "Geladeira Frost Free",
                "description": "Geladeira duplex frost free com baixo consumo de energia e amplo espaço interno.",
                "category": "Eletrodomésticos",
                "price": 2199.50,
                "stock": 27
            },
            {
                "id": 5,
                "name": "Fogão 4 Bocas",
                "description": "Fogão à gás com forno autolimpante e acabamento em inox.",
                "category": "Eletrodomésticos",
                "price": 749.90,
                "stock": 35
            },
            {
                "id": 6,
                "name": "Sofá 3 Lugares",
                "description": "Sofá retrátil e reclinável, estofado em tecido de alta durabilidade.",
                "category": "Móveis",
                "price": 1599.00,
                "stock": 20
            },
            {
                "id": 7,
                "name": "Mesa de Jantar 6 Lugares",
                "description": "Mesa em madeira maciça com cadeiras estofadas, perfeita para salas de jantar.",
                "category": "Móveis",
                "price": 1299.00,
                "stock": 15
            },
            {
                "id": 8,
                "name": "Smartphone Galaxy S23",
                "description": "Smartphone com câmera tripla, tela AMOLED e performance avançada.",
                "category": "Eletrônicos",
                "price": 4599.00,
                "stock": 50
            },
            {
                "id": 9,
                "name": "Micro-ondas 30L",
                "description": "Micro-ondas com grill, funções pré-programadas e painel digital intuitivo.",
                "category": "Eletrodomésticos",
                "price": 499.90,
                "stock": 40
            },
            {
                "id": 10,
                "name": "Cadeira Gamer",
                "description": "Cadeira ergonômica com ajuste de altura, apoio de braços e design moderno.",
                "category": "Móveis",
                "price": 899.00,
                "stock": 25
            },
            {
                "id": 11,
                "name": "Fone Bluetooth Noise Cancelling",
                "description": "Fone de ouvido sem fio com redução de ruído ativa e bateria de longa duração.",
                "category": "Eletrônicos",
                "price": 499.90,
                "stock": 60
            },
            {
                "id": 12,
                "name": "Notebook Gamer RTX 3060",
                "description": "Notebook potente com placa de vídeo dedicada, ideal para jogos e design gráfico.",
                "category": "Eletrônicos",
                "price": 9999.00,
                "stock": 30
            },
            {
                "id": 13,
                "name": "Ar Condicionado Split 12.000 BTUs",
                "description": "Ar condicionado split frio com baixo consumo energético e operação silenciosa.",
                "category": "Eletrodomésticos",
                "price": 1899.00,
                "stock": 22
            },
            {
                "id": 14,
                "name": "Lavadora de Roupas 12kg",
                "description": "Lavadora automática com múltiplos programas e função econômica de água e energia.",
                "category": "Eletrodomésticos",
                "price": 1799.50,
                "stock": 18
            },
            {
                "id": 15,
                "name": "Cama Box Casal",
                "description": "Cama box casal com colchão ortopédico de alta densidade e tecido respirável.",
                "category": "Móveis",
                "price": 1299.00,
                "stock": 12
            },
            {
                "id": 16,
                "name": "Estante Modular",
                "description": "Estante em MDF com múltiplas prateleiras e design moderno para sala ou escritório.",
                "category": "Móveis",
                "price": 749.00,
                "stock": 25
            },
            {
                "id": 17,
                "name": "Relógio Smartwatch",
                "description": "Smartwatch com monitoramento de atividades físicas, notificações e resistência à água.",
                "category": "Eletrônicos",
                "price": 799.90,
                "stock": 55
            },
            {
                "id": 18,
                "name": "Cafeteira Elétrica",
                "description": "Cafeteira com programação automática, jarra térmica e funções de preparo rápido.",
                "category": "Eletrodomésticos",
                "price": 349.90,
                "stock": 40
            },
            {
                "id": 19,
                "name": "Mesa de Escritório",
                "description": "Mesa em madeira MDF com gavetas, ideal para home office ou estudo.",
                "category": "Móveis",
                "price": 499.90,
                "stock": 20
            },
            {
                "id": 20,
                "name": "Câmera Digital 24MP",
                "description": "Câmera compacta com zoom óptico 10x, gravação em Full HD e conectividade Wi-Fi.",
                "category": "Eletrônicos",
                "price": 1299.00,
                "stock": 15
            },
            { "id": 21, "name": "iPhone 15", "description": "Smartphone premium.", "category": "Eletrônicos", "price": "6999.99", "stock": 55},
            { "id": 22, "name": "Cafeteira Expresso", "description": "Para café gourmet em casa.", "category": "Casa", "price": "499.50", "stock": 40},
            { "id": 23, "name": "Sofá 3 lugares", "description": "Sofá confortável de tecido.", "category": "Casa", "price": "1200.00", "stock": 12},
            { "id": 24, "name": "Tênis Corrida", "description": "Leve e resistente.", "category": "Esportes", "price": "350.75", "stock": 60},
            { "id": 25, "name": "Bicicleta Aro 26", "description": "Ideal para trilhas.", "category": "Esportes", "price": "1200.00", "stock": 25},
            { "id": 26, "name": "Vestido Casual", "description": "Vestido confortável e estiloso.", "category": "Moda", "price": "180.99", "stock": 75},
            { "id": 27, "name": "Camisa Polo", "description": "Algodão premium.", "category": "Moda", "price": "120.00", "stock": 100},
            { "id": 28, "name": "Kit Lego Star Wars", "description": "Blocos de montar para todas as idades.", "category": "Brinquedos", "price": "450.00", "stock": 20},
            { "id": 29, "name": "Boneca Barbie", "description": "Boneca fashion com acessórios.", "category": "Brinquedos", "price": "199.99", "stock": 45},
            { "id": 30, "name": "Perfume Masculino", "description": "Fragrância marcante.", "category": "Beleza", "price": "350.00", "stock": 30},
            { "id": 31, "name": "Perfume Feminino", "description": "Aromático e sofisticado.", "category": "Beleza", "price": "320.00", "stock": 35},
            { "id": 32, "name": "Livro 'Python Avançado'", "description": "Para programadores experientes.", "category": "Livros", "price": "120.50", "stock": 80},
            { "id": 33, "name": "Livro 'Django Completo'", "description": "Do básico ao avançado.", "category": "Livros", "price": "150.00", "stock": 70},
            { "id": 34, "name": "Cadeira Gamer", "description": "Conforto e ergonomia para longas sessões.", "category": "Casa", "price": "950.00", "stock": 15},
            { "id": 35, "name": "Monitor 27'' 4K", "description": "Alta resolução para designers.", "category": "Eletrônicos", "price": "2500.00", "stock": 20},
            { "id": 36, "name": "Fone Bluetooth", "description": "Sem fio e com ótima bateria.", "category": "Eletrônicos", "price": "299.99", "stock": 50},
            { "id": 37, "name": "Relógio Smart", "description": "Monitora atividades físicas.", "category": "Eletrônicos", "price": "799.00", "stock": 40},
            { "id": 38, "name": "Bolsa de Couro", "description": "Estilosa e resistente.", "category": "Moda", "price": "450.00", "stock": 30},
        ]

        image_path = os.path.join(settings.BASE_DIR, "media", "products", "teste.jpg")

        if not os.path.exists(image_path):
            self.stdout.write(self.style.ERROR(f"Imagem não encontrada: {image_path}"))
            return

        with open(image_path, "rb") as f:
            image_file = File(f, name="teste.jpg")

            for p in products_data:
                product_obj, created = Product.objects.update_or_create(
                    name=p["name"],
                    defaults={
                        "description": p["description"],
                        "category": p["category"],
                        "price": p["price"],
                        "stock": p["stock"],
                        "image": image_file
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Produto criado: {p['name']}"))
                else:
                    self.stdout.write(self.style.SUCCESS(f"Produto atualizado: {p['name']}"))

        self.stdout.write(self.style.SUCCESS("Seed de produtos finalizado!"))