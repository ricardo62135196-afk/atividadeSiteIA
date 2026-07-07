// Dados iniciais dos livros (apenas em memória)
const booksData = [
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        isbn: "978-85-333-0227-3",
        year: 1899,
        category: "ficcao",
        quantity: 5
    },
    {
        title: "O Senhor dos Anéis",
        author: "J.R.R. Tolkien",
        isbn: "978-85-950-8475-5",
        year: 1954,
        category: "ficcao",
        quantity: 3
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "978-85-359-0277-8",
        year: 1949,
        category: "ficcao",
        quantity: 7
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-85-760-8267-5",
        year: 2008,
        category: "tecnico",
        quantity: 4
    },
    {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        isbn: "978-85-950-8463-2",
        year: 1943,
        category: "infantil",
        quantity: 10
    },
    {
        title: "Steve Jobs",
        author: "Walter Isaacson",
        isbn: "978-85-359-2068-0",
        year: 2011,
        category: "biografia",
        quantity: 2
    }
];

// Cores para categorias
const categoryColors = {
    'ficcao': '#e74c3c',
    'nao-ficcao': '#3498db',
    'tecnico': '#2ecc71',
    'infantil': '#f39c12',
    'biografia': '#9b59b6'
};

// Nomes das categorias
const categoryNames = {
    'ficcao': 'Ficção',
    'nao-ficcao': 'Não Ficção',
    'tecnico': 'Técnico',
    'infantil': 'Infantil',
    'biografia': 'Biografia'
};

// Função para criar card de livro
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Ano:</strong> ${book.year}</p>
        <p><strong>Exemplares:</strong> ${book.quantity}</p>
        <span class="category-badge" style="background: ${categoryColors[book.category]}">
            ${categoryNames[book.category]}
        </span>
    `;
    return card;
}

// Função para renderizar livros
function renderBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    const noResults = document.getElementById('noResults');
    
    if (booksGrid) {
        booksGrid.innerHTML = '';
        
        if (books.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            books.forEach(book => {
                booksGrid.appendChild(createBookCard(book));
            });
        }
    }
}

// Função de busca
function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderBooks(booksData);
            return;
        }
        
        const filteredBooks = booksData.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.includes(searchTerm)
        );
        
        renderBooks(filteredBooks);
    }
}

// Validação de formulário
function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Limpar mensagens de erro
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    
    // Validar título
    const title = document.getElementById('title').value.trim();
    if (title.length < 2) {
        document.getElementById('titleError').textContent = 'O título deve ter pelo menos 2 caracteres.';
        isValid = false;
    }
    
    // Validar autor
    const author = document.getElementById('author').value.trim();
    if (author.length < 2) {
        document.getElementById('authorError').textContent = 'O autor deve ter pelo menos 2 caracteres.';
        isValid = false;
    }
    
    // Validar ISBN
    const isbn = document.getElementById('isbn').value.trim();
    const isbnRegex = /^\d{3}-\d{2}-\d{3}-\d{4}-\d{1}$/;
    if (!isbnRegex.test(isbn)) {
        document.getElementById('isbnError').textContent = 'Formato ISBN inválido. Use: 978-85-333-0227-3';
        isValid = false;
    }
    
    // Verificar ISBN duplicado
    const isbnExists = booksData.some(book => book.isbn === isbn);
    if (isbnExists) {
        document.getElementById('isbnError').textContent = 'Este ISBN já está cadastrado.';
        isValid = false;
    }
    
    // Validar ano
    const year = parseInt(document.getElementById('year').value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1000 || year > currentYear) {
        document.getElementById('yearError').textContent = `Ano inválido. Deve ser entre 1000 e ${currentYear}.`;
        isValid = false;
    }
    
    // Validar categoria
    const category = document.getElementById('category').value;
    if (!category) {
        document.getElementById('categoryError').textContent = 'Selecione uma categoria.';
        isValid = false;
    }
    
    // Validar quantidade
    const quantity = parseInt(document.getElementById('quantity').value);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        document.getElementById('quantityError').textContent = 'Quantidade deve ser entre 1 e 100.';
        isValid = false;
    }
    
    if (isValid) {
        // Adicionar livro ao array
        const newBook = {
            title: title,
            author: author,
            isbn: isbn,
            year: year,
            category: category,
            quantity: quantity
        };
        
        booksData.push(newBook);
        
        // Mostrar mensagem de sucesso
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Limpar formulário
        document.getElementById('bookForm').reset();
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
    
    return false;
}

// Atualizar estatísticas na página Sobre
function updateStats() {
    const totalBooksElement = document.getElementById('totalBooks');
    if (totalBooksElement) {
        totalBooksElement.textContent = booksData.length;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar livros na página index
    renderBooks(booksData);
    
    // Atualizar estatísticas na página sobre
    updateStats();
    
    // Adicionar evento de busca ao pressionar Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBooks();
            }
        });
    }
});