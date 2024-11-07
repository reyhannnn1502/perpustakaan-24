export class BookList {
    constructor() {
      this.booklistContainer = document.getElementById("book-list");
      this.yearFilter = document.getElementById("year-filter");
      this.resetButton = document.getElementById("reset-filter");
    }
  
    render(books, onDelete, onEdit) {
      if (books.length === 0) {
        this.booklistContainer.innerHTML = `<p class="text-center">Belum ada buku yang ditambahkan.</p>`;
        return;
      }
  
      // Form Filter Tahun
      this.booklistContainer.innerHTML = `
        <h2 class="h4 mb-3">Daftar Buku</h2>
        <div class="mb-3">
          <label for="year-filter" class="form-label">Filter berdasarkan Tahun</label>
          <select id="year-filter" class="form-select">
            <option value="">Semua Tahun</option>
            ${[...new Set(books.map(book => book.year))].map(year => 
              `<option value="${year}">${year}</option>`
            ).join('')}
          </select>
        </div>
        <div class="row" id="books-container">
          ${books
            .map(
              (book) => `
                <div class="col-md-6 mb-3">
                  <div class="card shadow-neumorphic book-card glassy">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                      <p class="card-text"><strong>Tahun:</strong> ${book.year}</p>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-warning btn-sm me-2 edit-btn shadow-neumorphic" data-id="${book.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn shadow-neumorphic" data-id="${book.id}">Hapus</button>
                      </div>
                    </div>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
      `;
    
      // Pasang event listener untuk tombol hapus dan edit
      this.booklistContainer.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => onDelete(button.dataset.id));
      });
      this.booklistContainer.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => onEdit(button.dataset.id));
      });
    
      // Filter berdasarkan tahun
      this.yearFilter.addEventListener("change", (e) => {
        const selectedYear = e.target.value;
        const filteredBooks = selectedYear ? books.filter(book => book.year === selectedYear) : books;
        this.render(filteredBooks, onDelete, onEdit);  // Render ulang dengan filter
      });
  
      // Reset Filter
      this.resetButton.addEventListener("click", () => {
        this.yearFilter.value = ""; // Reset filter ke "Semua Tahun"
        this.render(books, onDelete, onEdit); // Render ulang dengan semua buku
      });
    }
}  