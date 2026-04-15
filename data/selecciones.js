const SELECCIONES = [
  // GRUPO A
  { id: "mexico", nombre: "México", bandera: "🇲🇽", imagen: "img/mexico.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "sudafrica", nombre: "Sudáfrica", bandera: "🇿🇦", imagen: "img/sudafrica.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "corea_sur", nombre: "Corea del Sur", bandera: "🇰🇷", imagen: "img/corea del sur.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "A" },
  { id: "rep_a", nombre: "Chequia", bandera: "❓", imagen: "img/chequia.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA A", grupo: "A" },

  // GRUPO B
  { id: "canada", nombre: "Canadá", bandera: "🇨🇦", imagen: "img/canada.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "qatar", nombre: "Qatar", bandera: "🇶🇦", imagen: "img/qatar.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "suiza", nombre: "Suiza", bandera: "🇨🇭", imagen: "img/suiza.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "B" },
  { id: "rep_b", nombre: "Bosnia", bandera: "❓", imagen: "img/bosnia 2.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA B", grupo: "B" },

  // GRUPO C
  { id: "brasil", nombre: "Brasil", bandera: "🇧🇷", imagen: "img/brasil.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "marruecos", nombre: "Marruecos", bandera: "🇲🇦", imagen: "img/marruecos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "haiti", nombre: "Haití", bandera: "🇭🇹", imagen: "img/haiti.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },
  { id: "escocia", nombre: "Escocia", bandera: "🏴", imagen: "img/escocia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "C" },

  // GRUPO D
  { id: "estados_unidos", nombre: "Estados Unidos", bandera: "🇺🇸", imagen: "img/estados unidos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "paraguay", nombre: "Paraguay", bandera: "🇵🇾", imagen: "img/paraguay.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "australia", nombre: "Australia", bandera: "🇦🇺", imagen: "img/australia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "D" },
  { id: "rep_d", nombre: "Turquía", bandera: "❓", imagen: "img/turquia.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA D", grupo: "D" },

  // GRUPO E
  { id: "alemania", nombre: "Alemania", bandera: "🇩🇪", imagen: "img/alemania.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "curazao", nombre: "Curazao", bandera: "🇨🇼", imagen: "img/curazao.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "costa_marfil", nombre: "Costa de Marfil", bandera: "🇨🇮", imagen: "img/costa de marfil.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },
  { id: "ecuador", nombre: "Ecuador", bandera: "🇪🇨", imagen: "img/ecuador.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "E" },

  // GRUPO F
  { id: "paises_bajos", nombre: "Países Bajos", bandera: "🇳🇱", imagen: "img/paises bajos.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },
  { id: "japon", nombre: "Japón", bandera: "🇯🇵", imagen: "img/japon.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },
  { id: "rep_f", nombre: "Suecia", bandera: "❓", imagen: "img/suecia.png", personaje: "Por confirmar", descripcion: "Repechaje UEFA F", grupo: "F" },
  { id: "tunez", nombre: "Túnez", bandera: "🇹🇳", imagen: "img/tunez.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "F" },

  // GRUPO G
  { id: "belgica", nombre: "Bélgica", bandera: "🇧🇪", imagen: "img/belgica.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "egipto", nombre: "Egipto", bandera: "🇪🇬", imagen: "img/egipto.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "iran", nombre: "Irán", bandera: "🇮🇷", imagen: "img/iran.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },
  { id: "nueva_zelanda", nombre: "Nueva Zelanda", bandera: "🇳🇿", imagen: "img/nueva zelanda.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "G" },

  // GRUPO H
  { id: "españa", nombre: "España", bandera: "🇪🇸", imagen: "img/españa.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "cabo_verde", nombre: "Cabo Verde", bandera: "🇨🇻", imagen: "img/cabo verde.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "arabia_saudita", nombre: "Arabia Saudita", bandera: "🇸🇦", imagen: "img/arabia saudita.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },
  { id: "uruguay", nombre: "Uruguay", bandera: "🇺🇾", imagen: "img/uruguay.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "H" },

  // GRUPO I
  { id: "francia", nombre: "Francia", bandera: "🇫🇷", imagen: "img/francia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },
  { id: "senegal", nombre: "Senegal", bandera: "🇸🇳", imagen: "img/senegal.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },
  { id: "rep_i", nombre: "Irak", bandera: "❓", imagen: "img/irak.png", personaje: "Por confirmar", descripcion: "Repechaje Intercontinental", grupo: "I" },
  { id: "noruega", nombre: "Noruega", bandera: "🇳🇴", imagen: "img/noruega.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "I" },

  // GRUPO J
  { id: "argentina", nombre: "Argentina", bandera: "🇦🇷", imagen: "img/argentina.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "argelia", nombre: "Argelia", bandera: "🇩🇿", imagen: "img/argelia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "austria", nombre: "Austria", bandera: "🇦🇹", imagen: "img/austria.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },
  { id: "jordania", nombre: "Jordania", bandera: "🇯🇴", imagen: "img/jordania.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "J" },

  // GRUPO K
  { id: "portugal", nombre: "Portugal", bandera: "🇵🇹", imagen: "img/portugal.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },
  { id: "rep_k", nombre: "RD Congo", bandera: "❓", imagen: "img/congo.png", personaje: "Por confirmar", descripcion: "Repechaje Intercontinental", grupo: "K" },
  { id: "uzbekistan", nombre: "Uzbekistán", bandera: "🇺🇿", imagen: "img/uzbekistan.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },
  { id: "colombia", nombre: "Colombia", bandera: "🇨🇴", imagen: "img/colombia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "K" },

  // GRUPO L
  { id: "inglaterra", nombre: "Inglaterra", bandera: "🏴", imagen: "img/inglaterra.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "croacia", nombre: "Croacia", bandera: "🇭🇷", imagen: "img/croacia.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "ghana", nombre: "Ghana", bandera: "🇬🇭", imagen: "img/ghana.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
  { id: "panama", nombre: "Panamá", bandera: "🇵🇦", imagen: "img/panamá.png", personaje: "TU PERSONAJE", descripcion: "TU DESCRIPCIÓN", grupo: "L" },
];

const PARTIDOS = [
  // GRUPO A
  { id: "A1", grupo: "A", local: "mexico", visitante: "sudafrica" },
  { id: "A2", grupo: "A", local: "corea_sur", visitante: "rep_a" },
  { id: "A3", grupo: "A", local: "rep_a", visitante: "sudafrica" },
  { id: "A4", grupo: "A", local: "mexico", visitante: "corea_sur" },
  { id: "A5", grupo: "A", local: "rep_a", visitante: "mexico" },
  { id: "A6", grupo: "A", local: "sudafrica", visitante: "corea_sur" },

  // GRUPO B
  { id: "B1", grupo: "B", local: "canada", visitante: "rep_b" },
  { id: "B2", grupo: "B", local: "qatar", visitante: "suiza" },
  { id: "B3", grupo: "B", local: "suiza", visitante: "rep_b" },
  { id: "B4", grupo: "B", local: "canada", visitante: "qatar" },
  { id: "B5", grupo: "B", local: "suiza", visitante: "canada" },
  { id: "B6", grupo: "B", local: "rep_b", visitante: "qatar" },

  // GRUPO C
  { id: "C1", grupo: "C", local: "brasil", visitante: "marruecos" },
  { id: "C2", grupo: "C", local: "haiti", visitante: "escocia" },
  { id: "C3", grupo: "C", local: "escocia", visitante: "marruecos" },
  { id: "C4", grupo: "C", local: "brasil", visitante: "haiti" },
  { id: "C5", grupo: "C", local: "marruecos", visitante: "haiti" },
  { id: "C6", grupo: "C", local: "brasil", visitante: "escocia" },

  // GRUPO D
  { id: "D1", grupo: "D", local: "estados_unidos", visitante: "paraguay" },
  { id: "D2", grupo: "D", local: "australia", visitante: "rep_d" },
  { id: "D3", grupo: "D", local: "estados_unidos", visitante: "australia" },
  { id: "D4", grupo: "D", local: "rep_d", visitante: "paraguay" },
  { id: "D5", grupo: "D", local: "paraguay", visitante: "australia" },
  { id: "D6", grupo: "D", local: "rep_d", visitante: "estados_unidos" },

  // GRUPO E
  { id: "E1", grupo: "E", local: "alemania", visitante: "curazao" },
  { id: "E2", grupo: "E", local: "costa_marfil", visitante: "ecuador" },
  { id: "E3", grupo: "E", local: "alemania", visitante: "costa_marfil" },
  { id: "E4", grupo: "E", local: "ecuador", visitante: "curazao" },
  { id: "E5", grupo: "E", local: "curazao", visitante: "costa_marfil" },
  { id: "E6", grupo: "E", local: "ecuador", visitante: "alemania" },

  // GRUPO F
  { id: "F1", grupo: "F", local: "paises_bajos", visitante: "japon" },
  { id: "F2", grupo: "F", local: "rep_f", visitante: "tunez" },
  { id: "F3", grupo: "F", local: "paises_bajos", visitante: "rep_f" },
  { id: "F4", grupo: "F", local: "tunez", visitante: "japon" },
  { id: "F5", grupo: "F", local: "japon", visitante: "rep_f" },
  { id: "F6", grupo: "F", local: "tunez", visitante: "paises_bajos" },

  // GRUPO G
  { id: "G1", grupo: "G", local: "belgica", visitante: "egipto" },
  { id: "G2", grupo: "G", local: "iran", visitante: "nueva_zelanda" },
  { id: "G3", grupo: "G", local: "belgica", visitante: "iran" },
  { id: "G4", grupo: "G", local: "nueva_zelanda", visitante: "egipto" },
  { id: "G5", grupo: "G", local: "egipto", visitante: "iran" },
  { id: "G6", grupo: "G", local: "nueva_zelanda", visitante: "belgica" },

  // GRUPO H
  { id: "H1", grupo: "H", local: "españa", visitante: "cabo_verde" },
  { id: "H2", grupo: "H", local: "arabia_saudita", visitante: "uruguay" },
  { id: "H3", grupo: "H", local: "españa", visitante: "arabia_saudita" },
  { id: "H4", grupo: "H", local: "uruguay", visitante: "cabo_verde" },
  { id: "H5", grupo: "H", local: "cabo_verde", visitante: "arabia_saudita" },
  { id: "H6", grupo: "H", local: "uruguay", visitante: "españa" },

  // GRUPO I
  { id: "I1", grupo: "I", local: "francia", visitante: "senegal" },
  { id: "I2", grupo: "I", local: "rep_i", visitante: "noruega" },
  { id: "I3", grupo: "I", local: "francia", visitante: "rep_i" },
  { id: "I4", grupo: "I", local: "rep_i", visitante: "senegal" },
  { id: "I5", grupo: "I", local: "noruega", visitante: "francia" },
  { id: "I6", grupo: "I", local: "senegal", visitante: "rep_i" },

  // GRUPO J
  { id: "J1", grupo: "J", local: "argentina", visitante: "argelia" },
  { id: "J2", grupo: "J", local: "austria", visitante: "jordania" },
  { id: "J3", grupo: "J", local: "argentina", visitante: "austria" },
  { id: "J4", grupo: "J", local: "jordania", visitante: "argelia" },
  { id: "J5", grupo: "J", local: "argelia", visitante: "austria" },
  { id: "J6", grupo: "J", local: "jordania", visitante: "argentina" },

  // GRUPO K
  { id: "K1", grupo: "K", local: "portugal", visitante: "rep_k" },
  { id: "K2", grupo: "K", local: "uzbekistan", visitante: "colombia" },
  { id: "K3", grupo: "K", local: "portugal", visitante: "uzbekistan" },
  { id: "K4", grupo: "K", local: "colombia", visitante: "rep_k" },
  { id: "K5", grupo: "K", local: "colombia", visitante: "portugal" },
  { id: "K6", grupo: "K", local: "rep_k", visitante: "uzbekistan" },

  // GRUPO L
  { id: "L1", grupo: "L", local: "inglaterra", visitante: "croacia" },
  { id: "L2", grupo: "L", local: "ghana", visitante: "panama" },
  { id: "L3", grupo: "L", local: "inglaterra", visitante: "ghana" },
  { id: "L4", grupo: "L", local: "panama", visitante: "croacia" },
  { id: "L5", grupo: "L", local: "croacia", visitante: "ghana" },
  { id: "L6", grupo: "L", local: "panama", visitante: "inglaterra" },
];