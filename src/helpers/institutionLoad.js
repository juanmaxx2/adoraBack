const { Association } = require("../db");

const institutionLoad = async () => {
    const assositions = await Association.findAll();
    
    if (assositions && assositions.length != 0) return;

    const DocentesDelReino = await Association.create({
        name: "Docentes del Reino",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });
    const Adora = await Association.create({
        name: "Adora",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const SonaryPlantarEscuelas = await Association.create({
        name: "Sonar y Plantar escuelas",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const JubiladosyApasionados = await Association.create({
        name: "Jubilados y Apasionados",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const AsistentesdelReino = await Association.create({
        name: "Asistentes del Reino",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const EscritoresdelReino = await Association.create({
        name: "Escritores del Reino",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const JornadasdeOracionNacional = await Association.create({
        name: "Jornadas de Oracion Nacional",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const RevisionCurricular = await Association.create({
        name: "Revision Curricular",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    const ASI = await Association.create({
        name: "ASI",
        history: "Historia",
        introduction: "introduccion",
        mail: "mail",
        direction: "direccion",
        phone: "telefono",
        action: "acciones",
        objetive: "objetivos"
    });

    return { DocentesDelReino, Adora, SonaryPlantarEscuelas, JubiladosyApasionados, AsistentesdelReino, EscritoresdelReino, JornadasdeOracionNacional, RevisionCurricular, ASI }
};


module.exports = institutionLoad;