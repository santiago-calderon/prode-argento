const SELECCIONES = [
  // GRUPO A
  { id: "mexico", nombre: "México", bandera: "🇲🇽", imagen: "img/mexico.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "sudafrica", nombre: "Sudáfrica", bandera: "🇿🇦", imagen: "img/sudafrica.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "corea_sur", nombre: "Corea del Sur", bandera: "🇰🇷", imagen: "img/corea del sur.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "rep_a", nombre: "Rep. Checa / Irlanda / Dinamarca / Macedonia", bandera: "❓", imagen: "img/rep_a.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA A", grupo: "A" },

  // GRUPO B
  { id: "canada", nombre: "Canadá", bandera: "🇨🇦", imagen: "img/canada.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "qatar", nombre: "Qatar", bandera: "🇶🇦", imagen: "img/qatar.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "suiza", nombre: "Suiza", bandera: "🇨🇭", imagen: "img/suiza.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "rep_b", nombre: "Gales / Bosnia / Italia / Irlanda del Norte", bandera: "❓", imagen: "img/rep_b.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA B", grupo: "B" },

  // GRUPO C
  { id: "brasil", nombre: "Brasil", bandera: "🇧🇷", imagen: "img/brasil.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "marruecos", nombre: "Marruecos", bandera: "🇲🇦", imagen: "img/marruecos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "haiti", nombre: "Haití", bandera: "🇭🇹", imagen: "img/haiti.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "escocia", nombre: "Escocia", bandera: "🏴", imagen: "img/escocia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },

  // GRUPO D
  { id: "estados_unidos", nombre: "Estados Unidos", bandera: "🇺🇸", imagen: "img/estados_unidos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "paraguay", nombre: "Paraguay", bandera: "🇵🇾", imagen: "img/paraguay.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "australia", nombre: "Australia", bandera: "🇦🇺", imagen: "img/australia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "rep_d", nombre: "Eslovaquia / Kosovo / Turquía / Rumania", bandera: "❓", imagen: "img/rep_d.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA D", grupo: "D" },

  // GRUPO E
  { id: "alemania", nombre: "Alemania", bandera: "🇩🇪", imagen: "img/alemania.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "curazao", nombre: "Curazao", bandera: "🇨🇼", imagen: "img/curazao.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "costa_marfil", nombre: "Costa de Marfil", bandera: "🇨🇮", imagen: "img/costa_marfil.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "ecuador", nombre: "Ecuador", bandera: "🇪🇨", imagen: "img/ecuador.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },

  // GRUPO F
  { id: "paises_bajos", nombre: "Países Bajos", bandera: "🇳🇱", imagen: "img/paises_bajos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },
  { id: "japon", nombre: "Japón", bandera: "🇯🇵", imagen: "img/japon.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },
  { id: "rep_f", nombre: "Ucrania / Suecia / Polonia / Albania", bandera: "❓", imagen: "img/rep_f.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA F", grupo: "F" },
  { id: "tunez", nombre: "Túnez", bandera: "🇹🇳", imagen: "img/tunez.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },

  // GRUPO G
  { id: "belgica", nombre: "Bélgica", bandera: "🇧🇪", imagen: "img/belgica.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "egipto", nombre: "Egipto", bandera: "🇪🇬", imagen: "img/egipto.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "iran", nombre: "Irán", bandera: "🇮🇷", imagen: "img/iran.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "nueva_zelanda", nombre: "Nueva Zelanda", bandera: "🇳🇿", imagen: "img/nueva_zelanda.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },

  // GRUPO H
  { id: "españa", nombre: "España", bandera: "🇪🇸", imagen: "img/españa.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "cabo_verde", nombre: "Cabo Verde", bandera: "🇨🇻", imagen: "img/cabo_verde.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "arabia_saudita", nombre: "Arabia Saudita", bandera: "🇸🇦", imagen: "img/arabia_saudita.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "uruguay", nombre: "Uruguay", bandera: "🇺🇾", imagen: "img/uruguay.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },

  // GRUPO I
  { id: "francia", nombre: "Francia", bandera: "🇫🇷", imagen: "img/francia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },
  { id: "senegal", nombre: "Senegal", bandera: "🇸🇳", imagen: "img/senegal.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },
  { id: "rep_i", nombre: "Irak / Bolivia / Surinam", bandera: "❓", imagen: "img/rep_i.png", personaje: "Por confirmar", descripcion: "Repechaje Intercontinental", grupo: "I" },
  { id: "noruega", nombre: "Noruega", bandera: "🇳🇴", imagen: "img/noruega.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },

  // GRUPO J
  { id: "argentina", nombre: "Argentina", bandera: "🇦🇷", imagen: "img/argentina.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "argelia", nombre: "Argelia", bandera: "🇩🇿", imagen: "img/argelia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "austria", nombre: "Austria", bandera: "🇦🇹", imagen: "img/austria.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "jordania", nombre: "Jordania", bandera: "🇯🇴", imagen: "img/jordania.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },

  // GRUPO K
  { id: "portugal", nombre: "Portugal", bandera: "🇵🇹", imagen: "img/portugal.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },
  { id: "rep_k", nombre: "RD Congo / Nueva Caledonia / Jamaica", bandera: "❓", imagen: "img/rep_k.png", personaje: "Por confirmar", descripcion: "Repechaje Intercontinental", grupo: "K" },
  { id: "uzbekistan", nombre: "Uzbekistán", bandera: "🇺🇿", imagen: "img/uzbekistan.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },
  { id: "colombia", nombre: "Colombia", bandera: "🇨🇴", imagen: "img/colombia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },

  // GRUPO L
  { id: "inglaterra", nombre: "Inglaterra", bandera: "🏴", imagen: "img/inglaterra.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "croacia", nombre: "Croacia", bandera: "🇭🇷", imagen: "img/croacia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "ghana", nombre: "Ghana", bandera: "🇬🇭", imagen: "img/ghana.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "panama", nombre: "Panamá", bandera: "🇵🇦", imagen: "img/panama.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
];

const PARTIDOS = [
  // GRUPO A
  { id: "A1", grupo: "A", local: "mexico", visitante: "sudafrica" },
  { id: "A2", grupo: "A", local: "mexico", visitante: "corea_sur" },
  { id: "A3", grupo: "A", local: "mexico", visitante: "rep_a" },
  { id: "A4", grupo: "A", local: "sudafrica", visitante: "corea_sur" },
  { id: "A5", grupo: "A", local: "sudafrica", visitante: "rep_a" },
  { id: "A6", grupo: "A", local: "corea_sur", visitante: "rep_a" },

  // GRUPO B
  { id: "B1", grupo: "B", local: "canada", visitante: "qatar" },
  { id: "B2", grupo: "B", local: "canada", visitante: "suiza" },
  { id: "B3", grupo: "B", local: "canada", visitante: "rep_b" },
  { id: "B4", grupo: "B", local: "qatar", visitante: "suiza" },
  { id: "B5", grupo: "B", local: "qatar", visitante: "rep_b" },
  { id: "B6", grupo: "B", local: "suiza", visitante: "rep_b" },

  // GRUPO C
  { id: "C1", grupo: "C", local: "brasil", visitante: "marruecos" },
  { id: "C2", grupo: "C", local: "brasil", visitante: "haiti" },
  { id: "C3", grupo: "C", local: "brasil", visitante: "escocia" },
  { id: "C4", grupo: "C", local: "marruecos", visitante: "haiti" },
  { id: "C5", grupo: "C", local: "marruecos", visitante: "escocia" },
  { id: "C6", grupo: "C", local: "haiti", visitante: "escocia" },

  // GRUPO D
  { id: "D1", grupo: "D", local: "estados_unidos", visitante: "paraguay" },
  { id: "D2", grupo: "D", local: "estados_unidos", visitante: "australia" },
  { id: "D3", grupo: "D", local: "estados_unidos", visitante: "rep_d" },
  { id: "D4", grupo: "D", local: "paraguay", visitante: "australia" },
  { id: "D5", grupo: "D", local: "paraguay", visitante: "rep_d" },
  { id: "D6", grupo: "D", local: "australia", visitante: "rep_d" },

  // GRUPO E
  { id: "E1", grupo: "E", local: "alemania", visitante: "curazao" },
  { id: "E2", grupo: "E", local: "alemania", visitante: "costa_marfil" },
  { id: "E3", grupo: "E", local: "alemania", visitante: "ecuador" },
  { id: "E4", grupo: "E", local: "curazao", visitante: "costa_marfil" },
  { id: "E5", grupo: "E", local: "curazao", visitante: "ecuador" },
  { id: "E6", grupo: "E", local: "costa_marfil", visitante: "ecuador" },

  // GRUPO F
  { id: "F1", grupo: "F", local: "paises_bajos", visitante: "japon" },
  { id: "F2", grupo: "F", local: "paises_bajos", visitante: "rep_f" },
  { id: "F3", grupo: "F", local: "paises_bajos", visitante: "tunez" },
  { id: "F4", grupo: "F", local: "japon", visitante: "rep_f" },
  { id: "F5", grupo: "F", local: "japon", visitante: "tunez" },
  { id: "F6", grupo: "F", local: "rep_f", visitante: "tunez" },

  // GRUPO G
  { id: "G1", grupo: "G", local: "belgica", visitante: "egipto" },
  { id: "G2", grupo: "G", local: "belgica", visitante: "iran" },
  { id: "G3", grupo: "G", local: "belgica", visitante: "nueva_zelanda" },
  { id: "G4", grupo: "G", local: "egipto", visitante: "iran" },
  { id: "G5", grupo: "G", local: "egipto", visitante: "nueva_zelanda" },
  { id: "G6", grupo: "G", local: "iran", visitante: "nueva_zelanda" },

  // GRUPO H
  { id: "H1", grupo: "H", local: "españa", visitante: "cabo_verde" },
  { id: "H2", grupo: "H", local: "españa", visitante: "arabia_saudita" },
  { id: "H3", grupo: "H", local: "españa", visitante: "uruguay" },
  { id: "H4", grupo: "H", local: "cabo_verde", visitante: "arabia_saudita" },
  { id: "H5", grupo: "H", local: "cabo_verde", visitante: "uruguay" },
  { id: "H6", grupo: "H", local: "arabia_saudita", visitante: "uruguay" },

  // GRUPO I
  { id: "I1", grupo: "I", local: "francia", visitante: "senegal" },
  { id: "I2", grupo: "I", local: "francia", visitante: "rep_i" },
  { id: "I3", grupo: "I", local: "francia", visitante: "noruega" },
  { id: "I4", grupo: "I", local: "senegal", visitante: "rep_i" },
  { id: "I5", grupo: "I", local: "senegal", visitante: "noruega" },
  { id: "I6", grupo: "I", local: "rep_i", visitante: "noruega" },

  // GRUPO J
  { id: "J1", grupo: "J", local: "argentina", visitante: "argelia" },
  { id: "J2", grupo: "J", local: "argentina", visitante: "austria" },
  { id: "J3", grupo: "J", local: "argentina", visitante: "jordania" },
  { id: "J4", grupo: "J", local: "argelia", visitante: "austria" },
  { id: "J5", grupo: "J", local: "argelia", visitante: "jordania" },
  { id: "J6", grupo: "J", local: "austria", visitante: "jordania" },

  // GRUPO K
  { id: "K1", grupo: "K", local: "portugal", visitante: "rep_k" },
  { id: "K2", grupo: "K", local: "portugal", visitante: "uzbekistan" },
  { id: "K3", grupo: "K", local: "portugal", visitante: "colombia" },
  { id: "K4", grupo: "K", local: "rep_k", visitante: "uzbekistan" },
  { id: "K5", grupo: "K", local: "rep_k", visitante: "colombia" },
  { id: "K6", grupo: "K", local: "uzbekistan", visitante: "colombia" },

  // GRUPO L
  { id: "L1", grupo: "L", local: "inglaterra", visitante: "croacia" },
  { id: "L2", grupo: "L", local: "inglaterra", visitante: "ghana" },
  { id: "L3", grupo: "L", local: "inglaterra", visitante: "panama" },
  { id: "L4", grupo: "L", local: "croacia", visitante: "ghana" },
  { id: "L5", grupo: "L", local: "croacia", visitante: "panama" },
  { id: "L6", grupo: "L", local: "ghana", visitante: "panama" },
];