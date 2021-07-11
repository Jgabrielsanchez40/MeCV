const history = [
  {
    id: "1",
    title: "Curriculum vitae",
    detail: [ "El curriculum vitae, currículum, currículo u hoja de vida (abreviatura: CV) es un resumen del conjunto de estudios, méritos, cargos, premios, experiencia laboral que ha desarrollado u obtenido una persona a lo largo de su vida laboral o académica. Se suele exigir en forma de documento para verificar la idoneidad de un candidato al optar a un puesto de trabajo. Junto a la carta de presentación, es el documento destinado a presentar en un único lugar toda la información que puede resultar relevante en un proceso de selección de personal o en una entrevista.",
    "En la gran mayoría de casos, no debe exceder una página de longitud. El término suele aplicarse en la búsqueda de empleo. En estos casos, el aspirante a un empleo, beca o similar debe presentar un documento con todo lo que ha hecho hasta la fecha, a modo de resumen de sus méritos. Existen distintas formas de presentarlo, pero suelen incluirse los datos personales, formación académica, experiencia laboral, publicaciones y otros datos de interés como pueden ser idiomas, habilidades o competencias, siempre relacionados con el puesto al que se vaya a optar.",
]},
{
  id: "2",
  title: "Etimología",
  detail: ["Según el Diccionario panhispánico de dudas, en español es una locución derivada del latín cuya traducción literal es «carrera de la vida» y que, en su forma nominal masculina, designa «la relación de datos personales, formación académica, actividad laboral y méritos de una persona». Es una locución invariable en plural. Tampoco existe un sustantivo femenino, por lo que no se acepta el uso de currícula. De acuerdo con la nueva Ortografía (2010), las locuciones latinas «deben escribirse, de acuerdo con su carácter de expresiones foráneas, en cursiva (o entre comillas) y sin acentos gráficos, ya que estos no existen en la escritura latina».", "Este nuevo cambio suprimió la anterior recomendación (1999), que permitía acentuar gráficamente las voces extrajeras según las reglas de acentuación del español, lo que dio lugar a la grafía «currículum vítae»; en adelante, el Diccionario de la lengua española solo admite curriculum vitae (sin tilde y en itálica). La misma obra emplea «currículum» (con tilde y en redonda) como variante adaptada al lenguaje usual. Cuando se hace referencia al conjunto de asignaturas o materias que comprenden una carrera o estudio, se prefiere la palabra currículo.", "No obstante, «currículo» también se puede emplear como grafía alternativa de curriculum vitae. Ambas formas están aceptadas, pero es preferible utilizar curriculum vitae para no confundirlas. En otros idiomas, como el inglés o el francés, curriculum vitae puede abreviarse a C. V. o ser sustituida por résumé, es decir, «resumen» o su equivalente en cada idioma. Allí se suele reservar la expresión curriculum vitae o simplemente vita para los prolijos currículos académicos.",
]},
{
  id: "3",
  title: "Estructura",
  detail: ["El tipo de hoja de vida depende de su organización y formato, ya sea en papel u otro medio. Existen diversos modelos normalizados, establecidos por las instituciones oficiales.", "En 2004 la Unión Europea estableció el «Europass», un modelo común para velar por la transparencia de las cualificaciones y las competencias, aunque solo recomendable en organismos oficiales debido a su longitud. Dependiendo del modo en que organicemos la información, el curriculum vitae puede ser de diferentes tipos:", "1.	Cronológico inverso: en el que se listan datos desde el empleo más reciente, hasta el más antiguo. No es usual el modelo cronológico empezando con el empleo más antiguo.", "2.	Funcional: en el que los datos se ordenan por bloques temáticos. Es el más recomendable si la experiencia es muy dispersa o no hemos trabajado durante un tiempo.", "3.	Por proyectos: esta hoja de vida destaca los proyectos del aspirante y las competencias que ha adquirido, siempre y cuando estén relacionadas con la oferta de empleo.", "En algunos casos se puede hablar del currículum combinado o mixto, en el que se combinan distintas estructuras para destacar los aspectos más positivos. Este modelo es el más difícil de armar. Aun así, puede ser útil para personas que llevan mucho tiempo trabajando en una carrera y han logrado varios objetivos.",
]}
]

const app = document.getElementById('root')
const app2 = document.getElementById('root2')
const container = document.createElement('div')
container.setAttribute('class', 'container')

const container2 = document.createElement('div')
container2.setAttribute('class', 'container2')

app.appendChild(container)
app2.appendChild(container2)

for(let i = 0; i < history.length; i++) {
  const kcard = document.createElement('div')
  kcard.setAttribute('class', 'card')

  const kcard2 = document.createElement('div')
  kcard2.setAttribute('class', 'card2')

  const kh1 = document.createElement('h1')
  kh1.textContent = history[i].title
  container2.appendChild(kcard2)
  container.appendChild(kcard)
  kcard.appendChild(kh1)

  const dt1 = history[i].detail
  for(let j = 0; j < dt1.length; j++) {
    const kp = document.createElement('p')
    kp.textContent = dt1[j]
    kcard.appendChild(kp)

  }

};
