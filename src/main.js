import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

const bookForm = new BookForm();
const bookList = new BookList();
const libraryController = new LibraryController(bookForm, bookList);

bookForm.render(libraryController.addBook.bind(libraryController));
bookList.render(
  libraryController.books,
  libraryController.deleteBook.bind(libraryController),
  libraryController.editBook.bind(libraryController)
);

// Filter berdasarkan tahun
document.getElementById("year-filter").addEventListener("change", (e) => {
    const selectedYear = e.target.value;
    libraryController.filterBooksByYear(selectedYear); // Filter berdasarkan tahun yang dipilih
});  

// Tombol Reset Filter
document.getElementById("reset-filter").addEventListener("click", () => {
  const yearFilter = document.getElementById("year-filter");
  yearFilter.value = ""; // Reset filter ke "Semua Tahun"
  bookList.render(libraryController.books, libraryController.deleteBook.bind(libraryController), libraryController.editBook.bind(libraryController)); // Render ulang dengan semua buku
});

document
  .getElementById("theme-toggle")
  .addEventListener(
    "click",
    libraryController.toggleTheme.bind(libraryController)
  );

libraryController.initTheme();
