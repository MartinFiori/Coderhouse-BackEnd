class Usuario {
    constructor(firstName, lastName, books, pets) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = [books];
        this.pets = [pets];
    }
    static countMascotas = 0
    
    getFullName(){
        return `hola ${this.firstName} ${this.lastName}`
    }
    addMascotas(petAdded){
        this.pets.push(petAdded)
    }
    addBook(autor, book){
        this.books.push({"Autor":autor, "Libro": book})
    }
    getBookNames(){
        for (let i = 0; i < this.books.length; i++) {
            const element = this.books[i];
            console.log(element["Libro"]) 
        }
    }
}

const persona1 = new Usuario("Sancho", "Panza", {Autor:"Pedro Picapiedra", Libro: "muerte a js"}, "mara, dona");

// console.log(persona1);
// console.log(persona1.getFullName());
// persona1.addMascotas("Baki")
// console.log(persona1.pets)
// console.log(persona1.books)
persona1.addBook("Picasso", "Relato Salvaje")
persona1.addBook("asdf", "patagonia")
persona1.addBook("matakrakens", "vayne")
persona1.addBook("matakrakens1", "vayne1")
persona1.addBook("matakrakens2", "vayne2")
persona1.addBook("matakrakens3", "vayne3")
// console.log(persona1.books)
console.log(persona1.getBookNames())
console.log(persona1)
