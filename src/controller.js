import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res) {
        const libro= req.body;
        try {
            const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
            if (result.length > 0) {
                res.json({"Datos del Libro": result});
            } else {
                res.status(404).json({ "Mensaje": "No se encontró el libro con el ID especificado" });
            }
} catch (error) {
            console.error("Error al buscar el libro por ID:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
    }
    
    async add(req, res){
        const libro = req.body;
        try {
            if (libro.nombre && libro.autor && libro.categoria && libro.añopublicacion && libro.isbn){ 
            const [result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,añopublicacion,ISBN) VALUES (?,?,?,?,?)`,[libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
            res.json({"id insertado": result.insertId})
         }
         else { 
      res.status(404).json ({"Mensaje": "Falta rellenar campos"})
        }
        }
        catch (error) {
            console.error("Error al buscar el libro por ID:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
    }
    async delete(req, res){
        const libro = req.body;
        try{
            const [result] = await pool.query(`SELECT * FROM libros WHERE isbn=(?)`, [libro.isbn]);
             if (result.length > 0){
                const [result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`,[libro.isbn]);
                res.json({"Libro eliminado": result.affectedRows});
             
        } else {
            res.status(404).json({ "Mensaje": "No se encontro el libro con el ISBN especificado" });
        }}
        catch (error){ 
            console.error("Error al eliminar el libro por ISBN:", error);
            res.status(500).json({ "Mensaje": "Error en el servidor" });
        }
        
    }

    async update(req, res) {

        try {
            const libro = req.body;
            if (libro.id && libro.nombre && libro.autor && libro.categoria && libro.añopublicacion && libro.isbn) {
              const query = `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, añopublicacion = ?, ISBN = ? WHERE id = ?`;
              const values = [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn, libro.id];
              const [result] = await pool.query(query, values);
              if (result.affectedRows === 0) {
                throw { error: "No se encontró ningún libro para actualizar" };
              }
              res.json({ "Registro Actualizado": result.affectedRows });
            } else {
              throw { error: "Faltan campos obligatorios" };
            }
          } catch (error) {
            res.status(400).json(error);
          }
        }
     }
export const libro = new LibroController(); 