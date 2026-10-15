const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

// Aqui configuramos el middleware para leer los JSON del cliente 
app.use (cors());
app.use(express.json());

// Establecemos la conexion con nuestra base de datos local 
const db = mysql.createConnection({
    host:"localhost",
    port:3033, 
    user:"root",
    password:"Hplasencia94",
    database:"mi_base_de_datos"
});

// Definimos la ruta post para registrar los datos del formulario de empleados
app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
  
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',
        [nombre, edad, pais, cargo, anios],
        (err, result)=>{
            if(err){
                console.log(err);
                // Respondemos con error para que el cliente no se quede esperando sin respuesta
                res.status(500).send("Error al registrar el empleado: " + err.sqlMessage);
            }else{
                res.send(result);
            }
        }
    );
});


app.get("/empleados", (req,res)=>{
      db.query('SELECT * FROM empleados', 
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update", (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
  
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [nombre, edad, pais, cargo, anios,id],
        (err, result)=>{
            if(err){
                console.log(err);
                // Respondemos con error para que el cliente no se quede esperando sin respuesta
                res.status(500).send("Error al registrar el empleado: " + err.sqlMessage);
            }else{
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req,res)=>{
    const id = req.params.id;
    
  
    db.query('DELETE FROM empleados WHERE id=?',id,
        (err, result)=>{
            if(err){
                console.log(err);
              
                res.status(500).send("Error al eliminar el empleado: " + err.sqlMessage);
            }else{
                res.send(result);
            }
        }
    );
});

// Levantamos el servidor en el puerto 3001 como pide el ejercicio
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
});