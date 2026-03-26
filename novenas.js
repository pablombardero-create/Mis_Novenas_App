//Listado Novenas
const novenas = [
{
id: "abandono",
nombre: "Del Abandono",
imagen: "Dolindo.jpg",
tieneOracion: true,
tieneLetanias: false
},
{
id: "sagrado_corazon",
nombre: "Al Sagrado Corazón de Jesús",
imagen: "SagradoCorazon.jpg",
tieneLetanias: true,
tieneOracion: true,
oculta: false
},
{
id: "divina_misericordia",
nombre: "A la Divina Misericordia",
imagen: "Jesus_Divina_Misericordia.jpg",
tieneLetanias: true,
tieneOracion: false,
oculta: false
},
{
id: "espiritu_santo",
nombre: "Al Espíritu Santo",
imagen: "EspirituSanto.jpg",
tieneLetanias: true,
tieneOracion: true,
oculta: false
},
{
id: "angel_custodio",
nombre: "Al Ángel Custodio",
imagen: "AngelCustodio.jpg",
tieneLetanias: false,
tieneOracion: true,
oculta: false
},
{
id: "castidad",
nombre: "Para pedir la castidad",
imagen: "Castidad.jpg",
tieneOracion: false,
tieneLetanias: false,
oculta: true
}
];

  //Ordena alfabéticamente
  novenas.sort((a,b)=>a.nombre.localeCompare(b.nombre));

//-------------
// Constantes
//-------------

//Oraciones Comunes
  const GLORIA = `Gloria al Padre, al Hijo y al Espíritu Santo, 
  como era en el principio, ahora y siempre, 
  por los siglos de los siglos. 
  Amén.`;
  const AVE_MARIA = `Dios te salve, María, 
  llena eres de gracia, 
  el Señor es contigo. 
  Bendita tú eres entre todas las mujeres, 
  y bendito es el fruto de tu vientre, Jesús. 
  Santa María, Madre de Dios, 
  ruega por nosotros pecadores, 
  ahora y en la hora de nuestra muerte. 
  Amén.`;
  const PADRE_NUESTRO = `Padre Nuestro que estás en el Cielo, 
  santificado sea tu nombre; 
  venga a nosotros tu Reino; 
  hágase tu voluntad, así en la tierra como en el cielo, 
  danos hoy nuestro pan de cada día; 
  perdona nuestras ofensas, 
  como también nosotros perdonamos a los que nos ofenden; 
  no nos dejes caer en la tentación 
  y líbranos del mal. 
  Amén.`;
  const SEÑOR_MIO = `Señor mío Jesucristo,
  Dios y hombre verdadero,
  Creador, Padre, Redentor mío:
  por ser vos quien sois, bondad infinita,
  y porque os amo sobre todas las cosas,
  me pesa de todo corazón haberos ofendido
  también me pesa porque podéis castigarme con las penas del infierno;
  por eso, ayudado de vuestra Divina Gracia
  propongo firmemente nunca más pecar
  confesarme y cumplir la penitencia que me fuere impuesta.
  Amén.`;
  // Oraciones específicas de la novena del abandono
    const AbandonoJesus = "Oh Jesús, me abandono a Ti, ¡Ocúpate Tú de todo!";
    const AbandonoJesus2= "Oh Jesús, hágase tu voluntad y sea bendito tu santo nombre";
    const AbandonoMaria = "Madre María, me refugio en ti, ocúpate Tú";
    const AbandonoMaria2 = "Oh María, Madre mía, socórreme Tú.";
  // Oraciones específicas de la novena al Sagrado Corazón
    const oracionletaníasSagradoCorazon = `Oh Dios todopoderoso y eterno, 
    mira el Corazón de tu amantísimo Hijo, 
    las alabanzas y satisfacciones que en nombre de los pecadores te ofrece 
    y concede el perdón a éstos que piden misericordia 
    en el nombre de tu mismo Hijo, Jesucristo, 
    el cual vive y reina contigo por los siglos de los siglos. 
    Amén`;
    const oracioninicionovenaSagradoCorazon = `¡Oh Corazón divinísimo de mi amado Jesús, 
    en quien la Santísima Trinidad depositó tesoros inmensos de celestiales gracias! 
    Concédeme un corazón semejante al tuyo: manso y humilde; 
    y la gracia que te pido en esta novena, 
    si es para mayor gloria de Dios, tu sagrada devoción y bien de mi alma. 
    Amén`;
    const oracionPadreEternonovenaSagradoCorazon = `¡Oh Padre Eterno! 
    Por medio del Corazón de Jesús, 
    mi Camino, mi Verdad y mi Vida, 
    llego a tu Majestad. 
    Por medio de este adorable Corazón, 
    te adoro por todos los hombres que no te adoran;
     te amo por todos los que no te aman; 
     te conozco por todos los que voluntariamente ciegos, no quieren conocerte. 
     Por este divinísimo Corazón deseo satisfacer a tu Majestad 
     todas las obligaciones que te tienen todos los hombres; 
     te ofrezco todas las almas redimidas con la preciosa Sangre de tu divino Hijo, 
     y te pido humildemente la conversión de todas por el mismo suavísimo Corazón. 
     No permitas que sea por más tiempo ignorado de ellas mi amado Jesús; 
     haz que vivan por Jesús, que murió por todas. 
     Presento también a tu Majestad, sobre este santísimo Corazón, 
     a tus siervos, mis amigos, y te pido los llenes de Tu Espíritu, 
     para que, siendo su protector el mismo deífico Corazón, 
     merezcan estar contigo eternamente. 
     Amén`;
    const oracionFinalnovenaSagradoCorazon = `¡Oh Corazón divinísimo de Jesús, 
    dignísimo de la adoración de los hombres y de los ángeles! 
    ¡Oh Corazón inefable y verdaderamente amable, 
    digno de ser adorado con infinitas alabanzas, 
    por ser fuente de todos los bienes, 
    por ser origen de todas las virtudes, 
    por ser el objeto en quien más se agrada toda la Santísima Trinidad entre todas las criaturas! 
    ¡Oh Corazón dulcísimo de Jesús! 
    Yo, profundísimamente te adoro con todo mi pobre corazón, 
    yo te alabo, yo te ofrezco las alabanzas todas 
    de los más amantes serafines y de toda Tu corte celestial 
    y todas las que te puede dar el Inmaculado Corazón de Tu Madre Santísima. 
    Amén.`;
  // Oraciones específicas de la novena a la Divina Misericordia
    const PadreEterno = `Padre Eterno, te ofrezco el Cuerpo y la Sangre, el Alma y la Divinidad 
    de tu amadísimo Hijo, nuestro Señor Jesucristo, 
    por el perdón de nuestros pecados y los del mundo entero`;
    const SuPasion = "Por su dolorosa Pasión, ten misericordia de nosotros y del mundo entero";
    const SantoDios = `Santo Dios, Santo Fuerte, Santo Inmortal, 
    ten misericordia de nosotros y del mundo entero`;
    const AguaySangre = "¡Oh Agua y Sangre que brotaste del Sagrado Corazón de Jesús como una fuente de misericordia para nosotros, en Ti confío!";
  // Oraciones específicas de la novena al Espíritu Santo
    const VenPorMaria = `"Ven Espíritu Santo, ven por María"`;
    const QueHare = `Espíritu Santo, vida mía ¿Qué haré yo sin ti?`;
    const VeniCreator = `Ven Espíritu Creador
    visita nuestra mente
    llena de tu amor
    el corazón que has creado.
    ¡Oh dulce Consolador!
    ¡Don del Padre Altísimo!
    Agua Viva, Fuego, Amor,
    Santo Crisma del Alma,
    Dedo de la mano de Dios,
    Promesa del Salvador:
    Derrama tus siete dones,
    suscita en nosotros la Palabra.
    Sé luz del intelecto,
    llama ardiente en el corazón,
    sana nuestras heridas
    con el bálsamo de tu amor.
    Defiéndenos del Enemigo,
    danos el don de la paz
    tu guía invencible
    nos preserve del mal.
    ¡Oh luz de eterna Sabiduría!
    Desvelanos del gran Misterio
    de Dios Padre y del Hijo
    Unidos en un solo amor.
    Amén.`
    const SecuenciaPentecostes =  `Ven Espíritu Divino,
    manda tu luz desde el cielo,
    Padre amoroso del pobre;
    don en tus dones espléndido;
    luz que penetra las almas;
    fuente del mayor consuelo.

    Ven, dulce huésped del alma,
    descanso de nuestro esfuerzo,
    tregua en el duro trabajo,
    brisa en las horas de fuego,
    gozo que enjuga las lágrimas
    y reconforta en los duelos.

    Entra hasta el fondo del alma,
    divina luz y enriquécenos.
    Mira el vacío del hombre
    si Tú le faltas por dentro;
    mira el poder del pecado
    cuando no envías tu aliento.

    Riega la tierra en sequía,
    sana el corazón enfermo,
    lava las manchas, 
    infunde calor de vida en el hielo,
    doma el espíritu indómito,
    guía al que tuerce el sendero.

    Reparte tus Siete Dones
    según la fe de tus siervos.
    Por tu bondad y tu gracia
    dale al esfuerzo su mérito;
    salva al que busca salvarse
    y danos tu gozo eterno.`

    //Oraciones específicas de la novena al Ángel Custodio
        // Coronilla
        const Misterio1AngelCustodio = `N. no me abandones, que sin ti me pierdo`
        const Misterio2AngelCustodio = `N. no me dejes, que sin ti no puedo`
        const Misterio3AngelCustodio = `N. vigílame, que sin ti huyo`
        const Misterio4AngelCustodio = `N. protégeme, pues el Padre me encomendó a tu cuidado`
        const Misterio5AngelCustodio = `N. cuidame para que podamos algún día reconocernos con alegría en el Reino de los Cielos`
        // Oraciones
        const OracionBerchmansAngelCustodio = `Ángel Santo, amado de Dios, que después de haberme tomado, por disposición divina, bajo vuestra bienaventurada guarda, jamás cesáis de defenderme, de iluminarme y de dirigirme: yo os venero como a protector, os amo como a custodio; me someto a vuestra dirección y me entrego todo a Vos, para ser de Vos gobernado. Os ruego, por lo tanto, y por amor de Jesucristo os suplico, que, cuando sea ingrato para con Vos y obstinadamente sordo a vuestras inspiraciones, no queráis, a pesar de esto, abandonarme; antes al contrario, ponedme pronto en el recto camino, si me he desviado de él; enseñadme, si soy ignorante; levantadme, si he caído; sostenedme, si estoy en peligro, y conducidme al cielo para poseer en él una felicidad eterna. Amén`
        const OracionFinalCoronillaAngelCustodio = `Ángel de Dios, que eres mi custodio, pues la bondad divina me ha encomendado a ti, ilumíname, dirígeme, guárdame. Amén`
    // Oraciones específicas de la novena para pedir la castidad
        // Coronilla
            const PurezaJesus1 = `Señor Jesús, tú has recibido los latigazos de la lujuria de mí, para que yo reciba la pureza de Ti`
            const PurezaJesus2 = `Por tu Sangre y Pasión, concédeme la castidad, Señor`
            const PurezaJesus3 = `Señor Jesús, que pueda amarte y servirte con todo mi cuerpo, alma y espíritu, que toda mi carne y también sexualidad estén siempre para mayor gloria tuya. Amén`
            const PurezaMaria1 = `María, Madre mía, que tu divina virginidad sea guía y modelo para mi castidad`
            const PurezaMaria2 = `Madre María, que el amor a tu Hijo apague el fuego de mis pasiones desordenadas`
            const PurezaMaria3 = `Madre mía, sé fortaleza en mi debilidad, consuelo en mi tristeza, esperanza en mi desánimo, para que, de tu mano, alcance la santidad en el cuerpo, alma y espíritu. Amén`
        // Oraciones    
            const BenditaTuPureza = `Bendita sea tu pureza, y eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza. A ti, celestial princesa, yo te ofrezco en este día, mi alma, vida y corazón. Mírame con compasión y no te alejes de mí Madre mía e intercede por mí ante Dios nuestro Señor. Amén`
            const OracionEclesiastico =`¡Oh Señor, padre y dueño de mi vida, 
                no me abandones a su capricho, 
                y no me dejes caer por su culpa! 
                ¿Quién aplicará el látigo a mis pensamientos, 
                y a mi corazón la disciplina de la sabiduría, 
                para que no queden impunes mis faltas, 
                ni se pasen por alto mis pecados? 
                No sea que mis errores aumenten 
                y se multipliquen mis pecados, 
                que yo caiga ante mis adversarios, 
                y mi enemigo se burle de mí; 
                para ellos está lejos la esperanza de tu misericordia.
                Señor, padre y Dios de mi vida, 
                no dejes que sea altiva mi mirada, 
                y aparta de mí la concupiscencia. 
                Que la sensualidad y la lujuria no se apoderen de mí, 
                no me entregues a una pasión vergonzosa.
                (Eclo 23, 1-7)`
    // Oraciones específicas de la novena para pedir perdón
        //Coronilla
            const OraciondelCorazon1 = `Señor Jesús, Hijo de Dios vivo, ten piedad de mí, que soy un pecador`
            const OraciondelCorazon2 = `Señor Jesus, hijo de David, ten piedad de mí, que soy un pecador`
        //Oraciones
            const Salmo50 = `Misericordia, Dios mío, por tu bondad, 
                por tu inmensa compasión borra mi culpa; 
                lava del todo mi delito, 
                limpia mi pecado. 
                Pues yo reconozco mi culpa, 
                tengo siempre presente mi pecado. 
                Contra ti, contra ti solo pequé, 
                cometí la maldad que aborreces. 
                En la sentencia tendrás razón, 
                en el juicio resultarás inocente. 
                Mira, en la culpa nací, 
                pecador me concibió mi madre. 
                Te gusta un corazón sincero, 
                y en mi interior me inculcas sabiduría. 
                Rocíame con el hisopo: quedaré limpio; 
                lávame: quedaré más blanco que la nieve. 
                Hazme oír el gozo y la alegría, 
                que se alegren los huesos quebrantados. 
                Aparta de mi pecado tu vista, 
                borra en mí toda culpa. 
                Oh Dios, crea en mí un corazón puro, 
                renuévame por dentro con espíritu firme. 
                No me arrojes lejos de tu rostro, 
                no me quites tu santo espíritu. 
                Devuélveme la alegría de tu salvación, 
                afiánzame con espíritu generoso. 
                Enseñaré a los malvados tus caminos, 
                los pecadores volverán a ti. 
                Líbrame de la sangre, oh Dios, 
                Dios, Salvador mío, 
                y cantará mi lengua tu justicia. 
                Señor, me abrirás los labios, 
                y mi boca proclamará tu alabanza. 
                Los sacrificios no te satisfacen: 
                si te ofreciera un holocausto, no lo querrías. 
                Mi sacrificio es un espíritu quebrantado; 
                un corazón quebrantado y humillado, 
                oh Dios, Tú no lo desprecias. 
                Señor, por tu bondad, favorece a Sión, 
                reconstruye las murallas de Jerusalén: 
                entonces aceptarás los sacrificios rituales, 
                ofrendas y holocaustos, 
                sobre tu altar se inmolarán novillos.`
//-------------------------------
//Novenas
//-------------------------------

// Novena del abandono
const coronillaAbandono = [
    // INICIO
    "Señor, sea bendito tu nombre y hágase tu voluntad.",
        // MISTERIO 1 (Jesús - 10 veces)
    ...Array(10).fill(AbandonoJesus),
    GLORIA,
    AbandonoJesus2,
        // MISTERIO 2 (María - 10 veces)
    ...Array(10).fill(AbandonoMaria),
    AVE_MARIA,
    AbandonoMaria2,
        // MISTERIO 3 (Jesús)
    ...Array(10).fill(AbandonoJesus),
    GLORIA,
    AbandonoJesus2,
        // MISTERIO 4 (María)
    ...Array(10).fill(AbandonoMaria),
    AVE_MARIA,
    AbandonoMaria2,
        // MISTERIO 5 (Jesús)
    ...Array(10).fill(AbandonoJesus),
    GLORIA,
    AbandonoJesus2,
        // FINAL
    PADRE_NUESTRO,
    `"Madre: soy tuyo, ahora y por siempre. 
    A través de ti y contigo quiero pertenecer completamente a Jesús 
    para siempre."`
];

const novenaAbandono = [
    {
    dia: 1,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 1
            ¿Por qué confundís vuestras mentes preocupándoos? Dejad que yo me ocupe de vuestros asuntos y todo estará tranquilo. Os digo de verdad que todo acto de verdadero, ciego y completo abandono a Mí, produce el efecto que deseáis y resuelve todas las situaciones difíciles.`,
        }
    ]
  },    
  {
    dia: 2,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 2
            Abandonarse a mí no significa agitarse, turbarse o perder la esperanza, ni significa ofrecerme una oración preocupada, pidiéndome que te siga y que transforme tu preocupación en oración. Preocuparse, estar agitado y querer pensar en las posibles consecuencias de todo es profundamente contrario a este acto de confianza. Una actitud así recuerda a la confusión que experimentan los niños cuando piden a su madre que les ayude en cualquier cosa, pero después intentan ocuparse ellos completamente solos, de modo que después la madre no consigue ayudarles como se debe. Abandonarse a mí significa cerrar los ojos del propio alma con serenidad, apartar los pensamientos ansiosos y dejarse en mis manos, en mi cuidado, de modo que tu obrar consista esencialmente en decir 
“ocúpate Tú”.`
        },
    ]
   },
  {
    dia: 3,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 3
            Consigo hacer tantas cosas cuando un alma, en necesidad espiritual y material me mira y me  dice “Ocúpate Tú” … después cierra los ojos y descansa. En el dolor, pedís que Yo actúe, pero que actúe según vuestro querer. Y haciendo así no os volvéis a Mí, sino que queréis que Yo me acomode a vuestras ideas. No sois enfermos que preguntan al médico qué hacer. No hagáis así sino rezad como os he enseñado en el Padre Nuestro “Sea santificado tu nombre” que para ti significa decir “Que Tú seas santificado en mi querer”. “Venga tu Reino” que significa que todo aquello que está en nosotros y en el mundo esté de acuerdo con tu voluntad, con tu reino. “Hágase tu voluntad así en la tierra como en el cielo”, que significa decir “Dios, en mi necesidad, haz lo que piensas que sea mejor para nosotros, sea para nuestra vida temporal o para la eterna”. Si me decís con sinceridad “Hágase tu voluntad”,esto equivale a decir “Encárgate tú”, Yo intervendré con toda mi omnipotencia y resolveré las situaciones más difíciles.`
        },
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 4
            ¿Veis que el mal crece en vez de debilitarse? No os preocupéis. Cierra los ojos y dime con fe:  “Hágase tu voluntad, ocúpate Tú”. Os digo que me ocuparé Yo, que intervendré como hace un médico y cumpliré cualquier milagro cuando haga falta. ¿Veis que el enfermo está empeorando? No os cabreéis, cerrad los ojos y decid “Ocúpate Tú”. Os digo que me ocuparé Yo y que no hay medicina más potente que mi intervención amorosa. Con mi amor, te prometo esto.`
        },
        ]
  },
  {
    dia: 5,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 5
            Y después os tendré que conducir por un camino distinto de aquel que veis, os prepararé, os llevaré en brazos. Lo haré de tal modo que os veréis a vosotros mismos como los niños que son adormecidos en los brazos de su madre, os encontraréis en la otra orilla del río. Aquello que os turba y que os hace sufrir tantísimo no es otra cosa que vuestra razón, vuestros pensamientos y vuestras preocupaciones, vuestro deseo de querer ocuparos a toda costa de aquello que os aflige.`
        }
    ]
  },
  {
    dia: 6,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 6
            No podéis dormir; queréis juzgarlo todo y verlo todo, y después os confiáis a las fuerzas humanas -o peor, a los hombres mismos, confiando en su ayuda-, esto es lo que obstaculiza mis palabras y mi voluntad. Oh, ¡Cuánto deseo de vosotros este acto de confianza, así podría ayudaros; y cuanto sufro cuando os veo tan agitados! Satanás quiere hacer exactamente eso: agitaros, alejaros de mi protección y arrojaros en las fauces de la iniciativa humana. Entonces, confía solo en Mí, descansa en Mí, abandónate en Mí en todo.`
        }
    ]
  },
  {
    dia: 7,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 7
            Yo realizo milagros en proporción a cuanto os abandonáis a Mí y no pensáis en vosotros mismos. Siembro tesoros de gracia cuando estáis en la pobreza más profunda. Ninguna persona sensata, ningún pensador, ha hecho jamás milagros, ni siquiera si son santos. Es quien se confía completamente a Dios quien realiza las obras divinas. Entonces, no te preocupes tú, porque tu mente es aguda y para ti es muy difícil ver el mal y después confiar en Mí y no pensar en ti mismo. Haced esto para todas vuestras necesidades, haced esto, todos vosotros, y veréis constantemente grandes milagros silenciosos. Me ocuparé de todo, te lo prometo.`
        }
    ]
  },
  {
    dia: 8,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 8
            Cerrad los ojos y dejaros llevar por la corriente de mi Gracia; cerrad los ojos y no penséis en el presente, alejad vuestro pensamiento del futuro como si lo estuvieseis apartando de la tentación. Descansad en Mí, creyendo en mi bondad, y os prometo con mi amor que si decís “Ocúpate tú”, me encargaré yo de todo; os consolaré, os libraré y os guiaré.`
        }
    ]
  },
  {
    dia: 9,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 9
            Rezad para que estéis siempre preparados a confiar y recibiréis gran paz y grandes recompensas, incluso cuando os conceda la gracia de la inmolación, del arrepentimiento y del amor. ¿Qué importancia tiene ahora el sufrimiento? ¿Tu situación te parece imposible? Cerrad los ojos y decid con toda vuestra alma: “Jesús, ocúpate tú”. No tengáis miedo, cuidaré todos vuestros asuntos y vosotros bendeciréis mi nombre haciendo un acto de humildad. Miles de oraciones no valen lo que un solo acto de abandono bien hecho, recordad bien esto. No hay ninguna novena que sea más eficaz que esta.`
        }
    ]
  }
];

const oracionAbandono = `
Jesús a las almas: ¿Por qué os confundís agitándoos? Dejadme a mí el cuidado de vuestras cosas y todo
se calmará. Os digo en verdad que cada acto de verdadero, ciego, completo abandono en mí, produce el 
efecto que deseáis y resuelve las situaciones espinosas.
Abandonarse a mí no significa romperse la cabeza, descomponerse y dispersarse, dirigiéndome después 
una oración agitada para que yo os siga, y cambiar así la agitación en oración. Abandonarse significa 
cerrar plácidamente los ojos del alma, apartar el pensamiento de la tribulación, y arrojarse en Mí para 
que yo solo haga que os encontréis, como niños dormidos en los brazos maternos, en la otra orilla.
Lo que os descompone y os hace un mal inmenso es vuestro razonamiento, vuestro pensamiento, vuestro 
apremio y el querer a toda costa proveer vosotros a eso que os aflige. ¡Cuántas cosas obro yo cuando el 
alma, tanto en sus necesidades espirituales como en las necesidades materiales, se dirige a mí, me mira, 
y diciéndome: «Ocúpate tú», ¡cierra los ojos y descansa! 
Tenéis pocas gracias cuando os agobiáis para producirlas, tenéis muchísimas cuando la oración es 
abandono total en mí. Vosotros en el sufrimiento rezais para que yo actúe, pero para que yo actúe como 
vosotros creéis... No os dirigís a mí, sino que queréis que yo me adapte a vuestras ideas; no sois enfermos 
que piden al médico la curación, sino, que se la sugieren. No hagáis así, sino rezad como os he enseñado 
en el Pater: «Sea santificado tu nombre», es decir seas glorificado en esta necesidad mía; «Venga tu Reino», 
es decir que todo concurra a tu Reino en nosotros y en el mundo; «Hágase tu Voluntad», o sea Ocúpate Tú.
Si me decís de verdad: Hágase tu Voluntad, que es lo mismo que decir: «Ocúpate Tu», yo intervengo con 
toda mi omnipotencia, y resuelvo las situaciones más cerradas. 
He aquí, ¿tú ves que la desgracia acosa en lugar de decaer? No te agites, cierra los ojos y dime con 
confianza: «Hágase tu Voluntad, ocúpate Tú». Te digo que yo me ocupo, que intervengo como médico, 
y hago incluso un milagro cuando es necesario. ¿Tú ves que el enfermo empeora? No te descompongas, 
sino cierra los ojos y di: «Ocúpate Tú». Te digo que yo me ocupo.
Es contraria al abandono la preocupación, la agitación y el querer pensar en las consecuencias de un 
hecho. Es como la confusión que causan los chicos, que pretenden que la madre piense en sus 
necesidades, y quieren ocuparse ellos, interrumpiendo con sus ideas y sus caprichos infantiles su trabajo.
Me ocupo solo cuando cerráis los ojos. Vosotros no dormís, queréis valorar todo, escrutar todo, confiando 
solo en los hombres. Vosotros queréis pensar en todo, y os abandonáis así a las fuerzas humanas, o peor 
a los hombres, confiando en su intervención. Es esto lo que interrumpe mis palabras y mis visiones de 
las cosas. ¡Oh, cómo deseo yo de vosotros este abandono para beneficiaros, y cómo me aflijo viéndoos 
agitados! Satanás tiende precisamente a esto: a agitaros para sustraeros a mi acción y arrojaros en presa 
de las iniciativas humanas. Confiad por tanto solo en Mí, reposad en Mí, abandonaos en Mí en todo. 
Yo hago milagros en proporción al pleno abandono en mí, y de que no penséis vosotros ¡Yo derramo 
tesoros de gracias cuando vosotros estáis en la plena pobreza! Si tenéis vuestros resortes, aunque sean 
pocos, o, si los buscáis, estáis en el campo natural, y seguís por tanto el recorrido natural de las cosas, que 
está con frecuencia distorsionado por Satanás. Ningún pensador o ponderador ha hecho milagros, ni 
siquiera entre los Santos. Obra divinamente quien se abandona en Dios.
Cuando ves que las cosas se complican, di con los ojos del alma cerrados: «Jesús, ocúpate Tú». Y distráete, 
porque tu mente es aguda... y para ti es difícil ver el mal. Confía en mí con frecuencia, distrayéndote de 
ti mismo. Haz así para todas tus necesidades. Haced así todos, y veréis grandes, continuos y silenciosos 
milagros. Os lo juro por mi amor. Yo me ocuparé os lo aseguro. Orad siempre con esta disposición de 
abandono, y tendréis de ella grande paz y grande fruto, incluso cuando yo os hago la gracia de la 
inmolación de reparación y de amor que impone el sufrimiento. ¿Te parece imposible? Cierra los ojos y 
di con toda el alma: «Jesús, ocúpate Tú». No temas me ocupo yo. Y tú bendecirás mi nombre 
humillándote. 
Mil oraciones no valen tanto como un acto solo de confiado abandono: recuérdalo bien. No hay novena 
más eficaz que ésta: «¡Oh Jesús me abandono en ti, ocúpate Tú!»
`;

// Novena al Sagrado Corazón
  
const oracionSagradoCorazon = [
  oracioninicionovenaSagradoCorazon,
  oracionPadreEternonovenaSagradoCorazon,
  oracionFinalnovenaSagradoCorazon
];

const letaniasSagradoCorazon = `

Señor, ten piedad
Cristo, ten piedad
Señor, ten piedad
Cristo, óyenos.
Cristo, escúchanos.

Dios, Padre Celestial, (Ten piedad de nosotros)
Dios Hijo, Redentor del mundo, 
Dios, Espíritu Santo, 
Trinidad Santa, un solo Dios, 

Corazón de Jesús, Hijo del Eterno Padre, 
Corazón de Jesús, formado en el seno de la Virgen Madre por el Espíritu Santo, 
Corazón de Jesús, formado en el seno de la Virgen Madre por el  Espíritu Santo, 
Corazón de Jesús, unido sustancialmente al Verbo de Dios, 
Corazón de Jesús, templo santo de Dios, 
Corazón de Jesús, tabernáculo del Altísimo, 
Corazón de Jesús, casa de Dios y puerta del cielo, 
Corazón de Jesús, horno ardiente de caridad, 
Corazón de Jesús, santuario de la justicia y del amor, 
Corazón de Jesús, lleno de bondad y de amor, 
Corazón de Jesús, abismo de todas las virtudes, 
Corazón de Jesús, digno de toda alabanza, 
Corazón de Jesús, Rey y centro de todos los corazones, 
Corazón de Jesús, en quien se hallan todos los tesoros de la sabiduría, y de la ciencia, 
Corazón de Jesús, en quien reside toda la plenitud de la  divinidad, 
Corazón de Jesús, en quien el Padre se complace, 
Corazón de Jesús, de cuya plenitud todos hemos recibido, 
Corazón de Jesús, deseado de los eternos collados, 
Corazón de Jesús, paciente y lleno de misericordia, 
Corazón de Jesús, generosos para todos los que te invocan, 
Corazón de Jesús, fuente de vida y santidad, 
Corazón de Jesús, propiciación por nuestros pecados, 
Corazón de Jesús, triturado por nuestros pecados, 
Corazón de Jesús, hecho obediente hasta la muerte, 
Corazón de Jesús, traspasado por una lanza, 
Corazón de Jesús, fuente de todo consuelo, 
Corazón de Jesús, vida y resurrección nuestra, 
Corazón de Jesús, paz y reconciliación nuestra, 
Corazón de Jesús, víctima por los pecadores, 
Corazón de Jesús, salvación de los que en ti esperan, 
Corazón de Jesús, esperanza de los que en ti mueren, 
Corazón de Jesús, delicia de todos los santos, 

Cordero de Dios,  que quitas el pecado del mundo -Perdónanos, Señor
Cordero de Dios, que quitas el pecado del mundo -Escúchanos, Señor
Cordero de Dios, que quitas el pecado del mundo -Ten piedad de nosotros

Jesús, manso y humilde de Corazón - haz nuestro corazón semejante al tuyo
`;
const coronillaSagradoCorazon = [
    // INICIO
    "Jesús, manso y humilde de Corazón, haz mi corazón semejante al Tuyo",
        // MISTERIO 1 
    ...Array(10).fill("Sagrado Corazón de Jesús: En Ti confío"),
   "Inmaculado Corazón de María: Sé la Salvación del alma mía",
        // MISTERIO 2 
    ...Array(10).fill("Sagrado Corazón de Jesús: En Ti confío"),
   "Inmaculado Corazón de María: Sé la Salvación del alma mía",
        // MISTERIO 3 
    ...Array(10).fill("Sagrado Corazón de Jesús: En Ti confío"),
   "Inmaculado Corazón de María: Sé la Salvación del alma mía",
        // MISTERIO 4 
    ...Array(10).fill("Sagrado Corazón de Jesús: En Ti confío"),
    "Inmaculado Corazón de María: Sé la Salvación del alma mía",
        // MISTERIO 5 
    ...Array(10).fill("Sagrado Corazón de Jesús: En Ti confío"),
    "Inmaculado Corazón de María: Sé la Salvación del alma mía",
        // FINAL
    
    `Bendito, alabado y adorado 
    sea el Sagrado Corazón de Jesús en el Santísimo Sacramento, 
    en todos los sagrarios del mundo, 
    en cada momento y hasta el fin de los tiempos. 
    Amén`,
    PADRE_NUESTRO,
    AVE_MARIA,
    GLORIA
];

const novenaSagradoCorazon = [
{
    dia: 1,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 1
            ¡Oh Corazón sacratísimo, dulcísimo y manso de Jesús, que, con ferventísimos deseos y ardentísimo amor, deseas corregir y desterrar la sequedad y tibieza, de nuestros corazones! Inflama y consume las maldades e imperfecciones del mío, para que se abrase en tu amor.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amantísimo Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén.`,
        }
    ]
  },
  {
    dia: 2,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 2
            ¡Oh Corazón sacratísimo, dulcísimo y manso de Jesús, que, con ferventísimos deseos y ardentísimo amor, deseas corregir y desterrar la sequedad y tibieza, de nuestros corazones! Inflama y consume las maldades e imperfecciones del mío, para que se abrase en tu amor.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amantísimo Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        }
    ]
  },
  {
    dia: 3,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 3
            Oh Corazón Santísimo de Jesús, camino para la mansión eterna y fuente de aguas vivas. Concédeme que siga tus sendas rectísimas para la perfección y para el cielo, y que beba de Ti el agua dulce y saludable de la verdadera virtud y devoción, que apaga la sed de todas las cosas temporales.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amantísimo Corazón, y la que ahora te pido, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        }
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 4
            Oh Corazón purísimo de Jesús, espejo cristalino en quien resplandece toda la perfección. Concédeme que yo pueda contemplarte perfectamente, para que aspire a formar mi corazón a tu semejanza, en la oración, en la acción y en todos mis pensamientos, palabras y obras. Que mire como Tú, que comprenda como Tú, que ame como Tú.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        }
    ]
  },
    {
    dia: 5,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 5
            Oh Corazón dulcísimo de Jesús, templo de la Santísima Trinidad venerada, por quien se perfeccionan todas nuestras obras. Yo te ofrezco las mías, aunque tan imperfectas, para que supliendo Tú mi negligencia, puedan aparecer muy perfectas y agradables ante el divino acatamiento.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        }
    ]
  },
  {
    dia: 6,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 6
            Oh Corazón amplísimo de Jesús, templo sagrado donde me mandas habite con toda mi alma, potencias y sentidos, gracias te doy por la inexplicable quietud, sosiego y gozo que yo he hallado en este templo hermoso de la paz, donde descansaré gustoso eternamente.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        }
    ]
  },
  {
    dia: 7,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 7
            Oh Corazón clementísimo de Jesús, bondadosamente inclinado a ayudarnos siempre, por el cual ofreció el Eterno Padre que oiría siempre nuestras oraciones, diciendo: «Pídeme por el Corazón de mi amantísimo Hijo Jesús; por este Corazón te oiré, y alcanzarás cuanto me pides». Presento sobre Ti a tu Eterno Padre todas mis peticiones, para conseguir el fruto que deseo.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        },
    ]
  },
    {
    dia: 8,
    contenido: [
        {
            tipo: "oracion",
            texto: oracioninicionovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 8
            Oh Corazón amantísimo de Jesús, trono ígneo y lucidísimo, inflamado en el amor de los hombres, a quienes deseas abrasados mutuamente en Tu amor. Yo deseo vivir siempre respirando llamas de Amor Divino en que me abrase, y con que encienda a todo el mundo, para que te responda amante y obsequioso

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, adoración y devoción tuya, y bien de mi alma. Amén`,
        },
    ]
  },
    {
    dia: 9,
    contenido: [
        {
            tipo: "oracion",
            texto: oracionPadreEternonovenaSagradoCorazon
        },
        {
            tipo: "texto",
            texto: `Día 9
            Oh Corazón dolorosísimo de Jesús, que para ablandar nuestra dureza y hacer más patente el amor con que padeciste tantos dolores y penas para salvarnos, los quisiste representar en la cruz, corona de espinas y herida de la lanza, con que te manifestaste paciente y amante al mismo tiempo.

            Dame la gracia de resarcir las injurias e ingratitudes hechas contra Ti, oh amante Corazón, y la que te pido ahora, si es para mayor gloria de Dios, culto tuyo y bien de mi alma. Amén`,
        },
    ]
  },
];
// Novena a la Divina Misericordia
 
const letaniasDivinaMisericordia = `

Señor, ten piedad 
Cristo, ten piedad 
Señor, ten piedad

Cristo, óyenos
Cristo, escúchanos 

Dios, Padre celestial - (Ten misericordia de nosotros)
Dios Hijo Redentor del mundo
Dios Espíritu Santo
Trinidad Santa, un solo Dios

Misericordia Divina, que brota del seno del Padre - (En Ti confío)
Misericordia Divina, supremo atributo de Dios
Misericordia Divina, misterio incomprensible
Misericordia Divina, fuente que brota del misterio de la Santísima Trinidad
Misericordia Divina, insondable para todo entendimiento humano o angélico
Misericordia Divina, de donde brotan toda vida y felicidad
Misericordia Divina, más sublime que los cielos
Misericordia Divina, fuente de milagros y maravillas
Misericordia Divina, que abarca todo el universo
Misericordia Divina, que baja al mundo en la Persona del Verbo Encarnado
Misericordia Divina, que emanó de la herida abierta del Corazón de Jesús
Misericordia Divina, encerrada en el Corazón de Jesús para nosotros y especialmente para los pecadores
Misericordia Divina, impenetrable en la institución de la Sagrada Hostia
Misericordia Divina, en la institución de la Santa Iglesia
Misericordia Divina, en el sacramento del Santo Bautismo
Misericordia Divina, en nuestra justificación por Jesucristo
Misericordia Divina, que nos acompaña durante toda la vida
Misericordia Divina, que nos abraza especialmente a la hora de la muerte
Misericordia Divina, que nos otorga la vida inmortal
Misericordia Divina, que nos acompaña en cada momento de nuestra vida
Misericordia Divina, que nos protege del fuego infernal
Misericordia Divina, en la conversión de los pecadores empedernidos
Misericordia Divina, asombro para los ángeles, incomprensible para los Santos
Misericordia Divina, insondable en todos los misterios de Dios
Misericordia Divina, que nos rescata de toda miseria
Misericordia Divina, fuente de nuestra felicidad y deleite
Misericordia Divina, que de la nada nos llamó a la existencia
Misericordia Divina, que abarca todas las obras de sus manos
Misericordia Divina, corona de todas las obras de Dios
Misericordia Divina, en la que estamos todos sumergidos
Misericordia Divina, dulce consuelo para los corazones angustiados
Misericordia Divina, única esperanza de las almas desesperadas
Misericordia Divina, remanso de corazones, paz ante el temor
Misericordia Divina, gozo y éxtasis de las almas santas
Misericordia Divina, que infunde esperanza, perdida ya toda esperanza

Cordero de Dios, que quitas los pecados del mundo. Perdónanos, Señor.
Cordero de Dios, que quitas los pecados del mundo. Escúchanos, Señor.
Cordero de Dios, que quitas los pecados del mundo. Ten misericordia de nosotros.

Las Misericordias de Dios son más grandes que todas sus obras. 
Por eso cantaré las Misericordias de Dios para siempre.
`;
const coronillaDivinaMisericordia = [
    // INICIO
    "Misericodia Divina, en Ti confío",
        // MISTERIO 1 
    PadreEterno,
    ...Array(10).fill(SuPasion),
    SantoDios,
        // MISTERIO 2
    PadreEterno,
    ...Array(10).fill(SuPasion),
    SantoDios,
        // MISTERIO 3
    PadreEterno,
    ...Array(10).fill(SuPasion),
    SantoDios,
        // MISTERIO 4
    PadreEterno,
    ...Array(10).fill(SuPasion),
    SantoDios,
        // MISTERIO 5
    PadreEterno,
    ...Array(10).fill(SuPasion),
    SantoDios,
        // FINAL
    AguaySangre
];

const novenaDivinaMisericordia = [
  {
    dia: 1,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 1
            Hoy, tráeme a toda la humanidad y especialmente a todos los pecadores, y sumérgelos en el mar de mi misericordia. De esta forma me consolarás de la amarga tristeza en que me sumerge la pérdida de las almas.

            Jesús tan misericordioso, cuya naturaleza es la de tener compasión de nosotros y de perdonarnos, no mires nuestros pecados, sino la confianza que depositamos en tu bondad infinita. Acógenos en la morada de tu muy compasivo Corazón y nunca nos dejes salir de Él. Te lo suplicamos por tu amor que te une al Padre y al Espíritu Santo.

            Padre eterno, mira con misericordia a toda la humanidad y especialmente a los pobres pecadores que están encerrados en el Corazón de Jesús lleno de compasión, y por su dolorosa Pasión muéstranos tu misericordia para que alabemos su omnipotencia por los siglos de los siglos. Amén.`,  
        }
    ]
  },
  
  {
    dia: 2,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 2
            Hoy, tráeme a las almas de los sacerdotes y las almas de los religiosos, y sumérgelas en mi misericordia insondable. Fueron ellas las que me dieron fortaleza para soportar mi amarga Pasión. A través de ellas, como a través de canales, mi misericordia fluye hacia la humanidad.

            Jesús misericordiosísimo, de quien procede todo bien, aumenta tu gracia en nosotros para que realicemos dignas obras de misericordia, de manera que todos aquellos que nos vean, glorifiquen al Padre de misericordia que está en el cielo.

            Padre eterno, mira con misericordia al grupo elegido de tu viña, a las almas de los sacerdotes y a las almas de los religiosos; otórgales el poder de tu bendición. Por el amor del Corazón de tu Hijo, en el cual están encerradas, concédeles el poder de tu luz para que puedan guiar a otros en el camino de la salvación, y a una sola voz canten alabanzas de tu misericordia sin límite por los siglos de los siglos. Amén.`,  
        }
    ]
  },
  {
    dia: 3,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 3
            Hoy, tráeme a todas las almas devotas y fieles, y sumérgelas en el mar de mi misericordia. Estas almas me consolaron a lo largo del Vía Crucis. Fueron una gota de consuelo en medio de un mar de amargura.

            Jesús infinitamente compasivo, que desde el tesoro de tu misericordia les concedes a todos tus gracias en gran abundancia, acógenos en la morada de tu clementísimo Corazón y nunca nos dejes escapar de Él. Te lo suplicamos por el inconcebible amor tuyo con que tu Corazón arde por el Padre celestial.

            Padre eterno, mira con misericordia a las almas fieles como herencia de tu Hijo y por su dolorosa Pasión, concédeles tu bendición y rodéalas con tu protección constante para que no pierdan el amor y el tesoro de la santa fe, sino que con toda la legión de los ángeles y los santos, glorifiquen tu infinita misericordia por los siglos de los siglos. Amén.`,
        }
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 4
            Hoy, tráeme a los paganos y aquellos que todavía no me conocen. También pensaba en ellos durante mi amarga Pasión y su futuro celo consoló mi Corazón. Sumérgelos en el mar de mi misericordia.

            Jesús compasivísimo, que eres la luz del mundo entero. Acoge en la morada de tu piadosísimo Corazón a las almas de los paganos que todavía no te conocen. Que los rayos de tu gracia las iluminen para que también ellas unidas a nosotros, ensalcen tu misericordia admirable y no las dejes salir de la morada de tu compasivísimo Corazón.

            Padre eterno, mira con misericordia a las almas de los paganos y de los que todavía no te conocen, pero que están encerrados en el muy compasivo Corazón de Jesús. Atráelas hacia la luz del Evangelio. Estas almas desconocen la gran felicidad que es amarte. Concédeles que también ellas ensalcen la generosidad de tu misericordia por los siglos de los siglos. Amén.`,
        }
    ]
  },
  {
    dia: 5,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 5
            Hoy, tráeme a las almas de los hermanos separados, y sumérgelas en el mar de mi misericordia. Durante mi amarga Pasión, desgarraron mi cuerpo y mi Corazón, es decir, mi Iglesia. Según regresan a la Iglesia, mis llagas cicatrizan y de este modo alivian mi Pasión.

            Jesús sumamente misericordioso, que eres la bondad misma, Tú no niegas la luz a quienes te la piden. Acoge en la morada de tu muy compasivo Corazón a las almas de los hermanos separados y llévalas con tu luz a la unidad con la Iglesia; no las dejes alejarse de la morada de tu compasivísimo Corazón, sino haz que también ellas glorifiquen la generosidad de tu misericordia.

            Padre eterno, mira con misericordia a las almas de los hermanos separados que han malgastado tus beneficios y han abusado de tus gracias por persistir obstinadamente en sus errores. No mires sus errores, sino el amor de tu Hijo y su amarga Pasión que sufrió por ellos ya que también ellos están acogidos en el sumamente compasivo Corazón de Jesús. Haz que también ellos glorifiquen tu gran misericordia por los siglos de los siglos. Amén.`,
        }
    ]
  },
  {
    dia: 6,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 6
            Hoy, tráeme a las almas mansas y humildes y a las almas de los niños pequeños, y sumérgelas en mi misericordia. Éstas son las almas más semejantes a mi Corazón. Ellas me fortalecieron durante mi amarga agonía. Las veía como ángeles terrestres que velarían al pie de mis altares. Sobre ellas derramo torrentes enteros de gracias. Solamente el alma humilde es capaz de receive mi gracia; concedo mi confianza a las almas humildes.

            Jesús, tan misericordioso, Tú mismo has dicho: “Aprendan de mí que soy manso y humilde de corazón”. Acoge en la morada de tu compasivísimo Corazón a las almas mansas y humildes y a las almas de los niños pequeños. Estas almas llevan a todo el cielo al éxtasis y son las preferidas del Padre celestial. Son un ramillete perfumado ante el trono de Dios, de cuyo perfume se deleita Dios mismo. Estas almas tienen una morada permanente en tu compasivísimo Corazón y cantan sin cesar un himno de amor y misericordia por la eternidad.

            Padre eterno, mira con misericordia a las almas mansas y humildes y a las almas de los niños pequeños que están encerradas en el muy compasivo Corazón de Jesús. Estas almas son las más semejantes a tu Hijo. Su fragancia asciende desde la tierra y alcanza tu trono. Padre de misericordia y de toda bondad, te suplico por el amor que tienes por estas almas y el gozo que te proporcionan, bendice al mundo entero para que todas las almas canten juntas las alabanzas de tu misericordia por los siglos de los siglos. Amén.`,
        }
    ]
  },
  {
    dia: 7,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 7
            Hoy, tráeme a las almas que veneran y glorifican mi misericordia de modo especial y sumérgelas en mi misericordia. Estas almas son las que más lamentaron mi Pasión y penetraron más profundamente en mi espíritu. Ellas son un reflejo viviente de mi Corazón compasivo. Estas almas resplandecerán con un resplandor especial en la vida futura. Ninguna de ellas irá al fuego del infierno. Defenderé de modo especial a cada una en la hora de la muerte.

            Jesús misericordiosísimo, cuyo Corazón es el amor mismo, acoge en la morada de tu compasivísimo Corazón a las almas que veneran y ensalzan de modo particular la grandeza de tu misericordia. Estas almas son fuertes con el poder de Dios mismo. En medio de toda clase de aflicciones y adversidades siguen adelante confiadas en tu misericordia, y unidas a ti, cargan sobre sus hombros a toda la humanidad. Estas almas no serán juzgadas severamente, sino que tu misericordia las protegerá en la hora de la muerte.

            Padre eterno, mira con misericordia a aquellas almas que glorifican y veneran tu mayor atributo, es decir, tu misericordia insondable y que están encerradas en el compasivísimo Corazón de Jesús. Estas almas son un Evangelio viviente, sus manos están llenas de obras de misericordia y sus corazones, desbordantes de gozo, te cantan, oh Altísimo, un cántico de misericordia. Te suplico, oh Dios, muéstrales tu misericordia según la esperanza y la confianza que han puesto en ti. Que se cumpla en ellas la promesa de Jesús quien les dijo: A las almas que veneren esta infinita misericordia mía, Yo mismo las defenderé como mi gloria durante sus vidas y especialmente en la hora de la muerte.`,
        }
    ]
  },
  {
    dia: 8,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 8
            Hoy, tráeme a las almas que están en la cárcel del purgatorio y sumérgelas en el abismo de mi misericordia. Que los torrentes de mi sangre refresquen el ardor del purgatorio. Todas estas almas son muy amadas por mí. Ellas cumplen con el justo castigo que se debe a mi justicia. Está en tu poder llevarles alivio. Haz uso de todas las indulgencias del tesoro de mi Iglesia y ofrécelas en su nombre… Oh, si conocieras los tormentos que ellas sufren ofrecerías continuamente por ellas las limosnas del espíritu y saldarías las deudas que tienen con mi justicia.

            Jesús misericordiosísimo. Tú mismo has dicho que deseas la misericordia; heme aquí que llevo a la morada de tu muy compasivo Corazón a las almas del purgatorio, almas que te son muy queridas, pero que deben pagar su culpa adeudada a tu justicia. Que los torrentes de Sangre y Agua que brotaron de tu Corazón, apaguen el fuego del purgatorio para que también allí sea glorificado el poder de tu misericordia.

            Padre eterno, mira con misericordia a las almas que sufren en el purgatorio y que están encerradas en el muy compasivo Corazón de Jesús. Te suplico por la dolorosa Pasión de Jesús, tu Hijo, y por toda la amargura con la cual su sacratísima alma fue inundada, muestra tu misericordia a las almas que están bajo tu justo escrutinio. No las mires sino a través de las heridas de Jesús, tu amadísimo Hijo, ya que creemos que tu bondad y tu compasión no tienen límites. Amén.`,
        }
    ]
  },
  {
    dia: 9,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 9
            Hoy, tráeme a las almas tibias y sumérgelas en el abismo de mi misericordia. Estas almas son las que más dolorosamente hieren mi Corazón. A causa de las almas tibias, mi alma experimentó la más intensa repugnancia en el Huerto de los Olivos. A causa de ellas dije: Padre, aleja de mí este cáliz, si es tu voluntad. Para ellas, la última tabla de salvación consiste en recurrir a mi misericordia.

            Jesús piadosísimo, que eres la compasión misma, te traigo a las almas tibias a la morada de tu piadosísimo Corazón. Que estas almas heladas que se parecen a cadáveres y te llenan de gran repugnancia se calienten con el fuego de tu amor puro. Oh Jesús tan compasivo, ejercita la omnipotencia de tu misericordia y atráelas al mismo ardor de tu amor y concédeles el amor santo, porque Tú lo puedes todo.

            Padre eterno, mira con misericordia a las almas tibias que, sin embargo, están acogidas en el piadosísimo Corazón de Jesús. Padre de la misericordia, te suplico por la amarga Pasión de tu Hijo y por su agonía de tres horas en la cruz, permite que también ellas glorifiquen el abismo de tu misericordia. Amén.`, 
        }
    ]
  },
];

// Novena al Espíritu Santo
  
const oracionEspirituSanto = VeniCreator;

const letaniasEspirituSanto = `

Señor, ten piedad de nosotros.
Cristo, ten piedad de nosotros.
Señor, ten piedad de nosotros.
Cristo, óyenos.
Cristo, escúchanos.
Dios, Padre Celestial, (TEN PIEDAD DE NOSOTROS)
Dios Hijo, Redentor del mundo, 
Dios, Espíritu Santo, 
Trinidad Santa, un solo Dios,
Divina Esencia, Dios verdadero y único,
Espíritu de verdad y de sabiduría,
Espíritu de santidad y de justicia,
Espíritu de entendimiento y de consejo,
Espíritu de caridad y de gozo,
Espíritu de paz y de paciencia,
Espíritu de longanimidad y mansedumbre,
Espíritu de benignidad y de bondad,
Amor substancial del Padre y del Hijo,
Amor y vida de las almas santas,
Fuego siempre ardiendo,
Agua viva que apagáis la sed de los corazones, 

De todo mal, (LÍBRANOS, ESPÍRITU SANTO)
De toda impureza de alma y cuerpo,
De toda gula y sensualidad,
De todo afecto a los bienes terrenos,
De todo afecto a cosas y a criaturas,
De toda hipocresía y fingimiento,
De toda imperfección y faltas deliberadas,
Del amor propio y juicio propio,
De la propia voluntad,
De la murmuración,
De la doblez a nuestros prójimos,
De nuestras pasiones y apetitos desordenados,
De no estar atentos a vuestra inspiración Santa,
Del desprecio a las cosas pequeñas,
De la glotonería y malicia,
De todo regalo y comodidad,
De querer buscar o desear algo que no seáis Vos,
De todo lo que te desagrade,
De todo pecado e imperfección y de todo mal,

Padre amantísimo,	Perdónanos.
Divino Verbo,	Ten misericordia de nosotros.
Santo y Divino Espíritu,	No nos dejes hasta ponemos en la posesión de la Divina Esencia, Cielo de los cielos.

Cordero de Dios, que quitas el pecado del mundo,	Envíanos al divino Consolador.
Cordero de Dios, que quitas el pecado del mundo,	Llenanos de los dones del Espíritu.
Cordero de Dios, que quitas el pecado del mundo,	Haz que crezcan en nosotros los frutos del Espíritu Santo.

Ven, ¡oh Santo Espíritu!, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor.

V. Envía tu Espíritu y todo será creado.
R. Y se renovará la faz de la tierra.
`;
const coronillaEspirituSanto = [
    // INICIO
    SecuenciaPentecostes,
        // MISTERIO 1 
        ...Array(10).fill(VenPorMaria),
        QueHare,
        // MISTERIO 2 
        ...Array(10).fill(VenPorMaria),
        QueHare,
        // MISTERIO 3 
        ...Array(10).fill(VenPorMaria),
        QueHare,
        // MISTERIO 4 
        ...Array(10).fill(VenPorMaria),
        QueHare,
        // MISTERIO 5 
        ...Array(10).fill(VenPorMaria),
        QueHare,
        // FINAL
    PADRE_NUESTRO,
    AVE_MARIA,
    GLORIA
];

const novenaEspirituSanto = [
  {
    dia: 1,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 1
            Ven, Espíritu Santo, por tu don Sabiduría, concédenos la gracia de apreciar y estimar los bienes del cielo y muéstranos los medios para alcanzarlos.`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
  {
    dia: 2,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 2
            Ven, Espíritu Santo, por tu don de Entendimiento, ilumina nuestras mentes respecto a los misterios de la salvación, para que podamos comprenderlos perfectamente y abrazarlos con fervor`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
  {
    dia: 3,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 3
            Ven, Espíritu Santo, por tu don de Consejo, inclina nuestros corazones a actuar con rectitud y justicia para beneficio de nosotros mismos y de nuestros semejantes. `,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 4
            Ven, Espíritu Santo, por tu don de Fortaleza, fortalécenos con tu gracia contra los enemigos de nuestra alma, para que podamos obtener la corona de la victoria.`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
  {
    dia: 5,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 5
            Ven, Espíritu Santo, por tu don de Ciencia, enséñanos a vivir entre las cosas terrenos para así no perder las eternas.`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
  {
    dia: 6,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 6
            Ven, Espíritu Santo, por tu don de Piedad, inspíranos a vivir sobria, justa, y piadosamente en esta vida, para alcanzar el cielo en la otra vida.`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
    {
    dia: 7,
    contenido: [
        {
            tipo: "oracion",
            texto: VeniCreator
        },
        {
            tipo: "texto",
            texto: `Día 7
            Ven, Espíritu Santo, por tu dónde Temor de Dios, hiere nuestros cuerpos con tu temor para así trabajar por la salvación de nuestras almas.`,
        },
        {
            tipo: "oracion",
            texto: GLORIA
        },
    ]
  },
];

// Novena al Ángel Custodio
  
const oracionAngelCustodio = [
  OracionBerchmansAngelCustodio
];

const coronillaAngelCustodio = [
    // INICIO
    SEÑOR_MIO,
        // MISTERIO 1 
        "Querido Padre, gracias por el Custodio que me has dado, que me acompaña en mis caminos para que no me pierda en las seducciones del mundo.",
        ...Array(10).fill(Misterio1AngelCustodio),
        "Gracias querido N. pues nunca me abandonas",
        // MISTERIO 2 
        "Querido Padre, gracias por el Custodio que me has dado, que me da fuerzas para vencer en el Buen Combate, huir en el pecado y crecer en la virtud",
        ...Array(10).fill(Misterio2AngelCustodio),
        "Gracias querido N. pues nunca me dejas en el combate",
        // MISTERIO 3 
        "Querido Padre, gracias por el Custodio que me has dado, que vigila mis pasos para adecuerlos a los tuyos y me asiste para que, ante la tribulación, no huya de tu voluntad.",
        ...Array(10).fill(Misterio3AngelCustodio),
        "Gracias querido N. pues me vigilas noche y día",
        // MISTERIO 4 
        "Querido Padre, gracias por el Custodio que me has dado, que me protege también en lo humano, preserva mis pies de la caída y defiende mi cuerpo, alma y espíritu frente a todo mal",
        ...Array(10).fill(Misterio4AngelCustodio),
        "Gracias querido N. pues nunca has dejado de protegerme",
        // MISTERIO 5 
        "Querido Padre, gracias por el Custodio que me has dado, compañero en esta vida con el objeto de poder encontrarnos en la Eterna",
        ...Array(10).fill(Misterio5AngelCustodio),
        "Gracias querido N. ¡Que ganas tengo de que nos veamos!",
    // FINAL
        PADRE_NUESTRO,
        AVE_MARIA,
        GLORIA,
        OracionFinalCoronillaAngelCustodio
];

const novenaAngelCustodio = [
  {
    dia: 1,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 1
            ¡Oh buen Ángel custodio! ayúdame a dar gracias al Altísimo por haberse dignado destinarte a mi guarda.
            Te pido que por intercesión de María, me alcances de Dios un fervoroso espíritu y la práctica de una oración constante para agradecer a Dios todos sus beneficios, y especialmente el de tenerte por celestial custodio mío`,
        }
    ]
  },
  {
    dia: 2,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 2
            ¡Oh Príncipe celestial!, dígnate obtenerme el perdón de todas las ofensas que os he hecho a Dios y a ti, despreciando vuestras amenazas consejos.
            Te pido que, por intercesión de María, me alcances de Dios un verdadero dolor de los pecados, que me obtenga el perdón de todas las faltas y caídas de la vida pasada`,
        }
    ]
  },
  {
    dia: 3,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 3
            ¡Oh mi Tutor amoroso!, infunde en mi alma un profundo respeto hacia ti, de tal manera que jamás tenga el atrevimiento de hacer cosa alguna que te desagrade.
            Te pido que, por intercesión de María, me alcances de Dios el recuerdo de la presencia divina y el respeto a tu presencia continua, las cuales han de guardarme del pecado`,
        }
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 4
            ¡Oh Médico compasivo!, enséñame el remedio y dame el auxilio para curar mis malos hábitos y tantas miserias como oprimen mi alma.
            Te pido que, por intercesión de María, me alcances de Dios un verdadero espíritu de mortificación, con el cual domine mis malas pasiones y la sensualidad, y obtenga la paz y la libertad de espíritu, juntamente con las demás virtudes`,
        }
    ]
  },
  {
    dia: 5,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 5
            ¡Oh, mi Guía fiel!, alcánzame fuerza para vencer todos los obstáculos que se encuentren en el camino de la existencia y para sufrir pacientemente las tribulaciones de esta miserable vida.
            Te pido que, por intercesión de María, me alcances de Dios una verdadera paciencia y conformidad en todas las contrariedades y penas de la vida que Dios pueda permitir para mi santificación`,
        }       
    ] 
},
  {
    dia: 6,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 6
            ¡Oh Intercesor eficaz cerca de Dios!, alcánzame la gracia de seguir prontamente tus santas inspiraciones y de conformar, en todo y para siempre, mi voluntad a la de Dios.
            Te pido que, por la intercesión de María, me alcances de Dios una obediencia absoluta a todos mis superiores, la cual me santifique por el cumplimiento de la voluntad divina en ella manifestada`,
        }
    ]
  },
  {
    dia: 7,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 7
            ¡Oh Espíritu purísimo, encendido todo en amor de Dios!, alcánzame este fuego divino, y al mismo tiempo una verdadera devoción a tu augusta Reina y buena Madre mía, la Virgen Santísima.
            Te pido que, por intercesión de María, me obtengas de Dios la caridad perfecta y la devoción a María, que sean para mí fuente abundantísima de méritos, camino segurísimo de salvación y el más dulce consuelo en la hora de la muerte`,
        }
    ]
  },
  {
    dia: 8,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 8
            ¡Oh invencible Protector!, asísteme a fin de corresponder dignamente a tu amor y a tus beneficios, y para trabajar con todas las fuerzas en promover tu culto y devoción.
            Igualmente te pido que, por intercesión de María, me alcances de Dios un celo fervoroso para la práctica del bien y una fervorosa devoción angélica, que sean mi propia santificación y la del prójimo`,
        }
    ]
  },
  {
    dia: 9,
    contenido: [
        {
            tipo: "oracion",
            texto: OracionBerchmansAngelCustodio
        },
        {
            tipo: "texto",
            texto: `Día 9
            ¡Oh bienaventurado ministro del Altísimo!, alcánzame de su misericordia infinita que llegue yo a ocupar un día uno de los tronos que dejaron vacíos los ángeles rebeldes.
            Te pido que, por intercesión de María, me obtengas de Dios la gracia de una muerte santa, confortado con los Santos Sacramentos, confesado y en Gracia, que me abra las puertas de la gloria eterna`,
        }
    ]
  },
];
// Novena de la castidad
const coronillaCastidad = [
    // INICIO
    BenditaTuPureza,
        // MISTERIO 1 (Jesús - 10 veces)
        PurezaJesus1,
        ...Array(10).fill(PurezaJesus2),
        PurezaJesus3,
        // MISTERIO 2 (María - 10 veces)
        PurezaMaria1,
        ...Array(10).fill(PurezaMaria2),
        PurezaMaria3,
        // MISTERIO 3 (Jesús)
        PurezaJesus1,
        ...Array(10).fill(PurezaJesus2),
        PurezaJesus3,
        // MISTERIO 4 (María)
        PurezaMaria1,
        ...Array(10).fill(PurezaMaria2),
        PurezaMaria3,
        // MISTERIO 5 (Jesús)
        PurezaJesus1,
        ...Array(10).fill(PurezaJesus2),
        PurezaJesus3,
    // FINAL
    OracionEclesiastico
];

const novenaCastidad = [
    {
    dia: 1,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 1 - José de Egipto
                Él puso todo lo que poseía en manos de José, sin preocuparse de otra cosa que del pan que comía. José era de buen tipo y bello semblante. Después de cierto tiempo, la mujer de su amo puso sus ojos en José y le dijo: «Acuéstate conmigo». Pero él rehusó, y dijo a la mujer de su amo: «Mira, mi amo no se preocupa de lo que hay en la casa y todo lo suyo lo ha puesto en mi mano. Él no ejerce más autoridad en esta casa que yo, y no se ha reservado nada sino a ti, porque eres su mujer. ¿Cómo voy a cometer yo semejante injusticia y a pecar contra Dios?». Y, aunque ella insistía un día y otro, José no accedió a acostarse ni a estar con ella. Pero cierto día entró él en casa para hacer su trabajo y no había ningún criado allí en la casa. Ella lo agarró por su vestido y le dijo: «Acuéstate conmigo». Pero él, dejando el vestido en su mano, salió afuera y huyó.
                (Gn 39, 6-12) `,
        },
        {
            tipo: "texto",
            texto: `Señor, que enseñaste a José a escapar de la tentación sin importarle las apariencias, concédeme el don de prudencia para huir de la ocasión de pecar, no por fidelidad a los hombres, sino por fidelidad a Ti, el único y buen Señor`,
        }
    ]
  },
  {
    dia: 2,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 2 - La publicana
                Un fariseo le rogaba que fuera a comer con él y, entrando en casa del fariseo, se recostó a la mesa. En esto, una mujer que había en la ciudad, una pecadora, al enterarse de que estaba comiendo en casa del fariseo, vino trayendo un frasco de alabastro lleno de perfume y, colocándose detrás junto a sus pies, llorando, se puso a regarle los pies con las lágrimas, se los enjugaba con los cabellos de su cabeza, los cubría de besos y se los ungía con el perfume. Al ver esto, el fariseo que lo había invitado se dijo: «Si este fuera profeta, sabría quién y qué clase de mujer es la que lo está tocando, pues es una pecadora». Jesús respondió y le dijo: «Simón, tengo algo que decirte». Él contestó: «Dímelo, Maestro». «Un prestamista tenía dos deudores: uno le debía quinientos denarios y el otro cincuenta. Como no tenían con qué pagar, los perdonó a los dos. ¿Cuál de ellos le mostrará más amor?». Respondió Simón y dijo: «Supongo que aquel a quien le perdonó más». Y él le dijo: «Has juzgado rectamente». Y, volviéndose a la mujer, dijo a Simón: «¿Ves a esta mujer? He entrado en tu casa y no me has dado agua para los pies; ella, en cambio, me ha regado los pies con sus lágrimas y me los ha enjugado con sus cabellos. Tú no me diste el beso de paz; ella, en cambio, desde que entré, no ha dejado de besarme los pies. Tú no me ungiste la cabeza con ungüento; ella, en cambio, me ha ungido los pies con perfume. Por eso te digo: sus muchos pecados han quedado perdonados, porque ha amado mucho, pero al que poco se le perdona, ama poco». Y a ella le dijo: «Han quedado perdonados tus pecados».
                (Lc 7, 36-48)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que no te escandalizas de los pecados de la publicana sino que los perdonas. Dame la gracia de llorar mis pecados y regar con mis lágrimas tus pies, para que habiendo sido perdonado mucho, ame mucho y comenzando una nueva vida pueda amarte, bendecirte y alabarte con todos tus santos`,
        },
    ]
   },
   {
    dia: 3,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 3 - Santa Inés
                Ya veo en lo que consiste, le dice: tu alma, insensible al dolor, ha aprendido a despreciar los suplicios; y así estimas en nada tu vida; pero puede ser que sientas más la pérdida de tu honor mismo. ¿Esa virginidad, qué has consagrado, la darás tan fácilmente como tu vida? Pues sábete que voy a hacerte llevar a un lugar de prostitución, a menos que ahora al punto no humilles tu altanera cabeza ante el altar de nuestros dioses y pidas perdón humildemente a Minerva de haberla despreciado: sábete que es una virgen como tú. Espera pues, servir de placer a una juventud descarada, que se sabe que nada gusta tanto como hallar nuevos objetos a su brutalidad. 
                No creáis, le respondió Inés, que Jesucristo abandona tan fácilmente a sus esposas. Quiérelas demasiado y las ama con mucha delicadeza para sufrir que se haga perder impunemente su pudor y está siempre pronto a socorrerlas. El os hace dueño de mi cuerpo, para dividirle en mil pedazos si gustais; pero no esperéis que os le entregue para que pueda mancharse su pureza.
                (De la narración poética del martirio de Santa Inés)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que hiciste comprende a Santa Inés que su pureza era más valiosa que su vida y que la dignidad de su carne importaba más que la integridad, concédeme defender mi castidad como a mí mismo, entendiendo que una sexualidad al servicio de Satanás y sus ángeles es mucho peor que la propia muerte`,
        },
    ]
  },
  {
    dia: 4,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 4 - Susana
                Sucedió que, mientras aguardaban ellos el día conveniente, salió ella como los tres días anteriores sola con dos criadas, y tuvo ganas de bañarse en el jardín, porque hacía mucho calor. No había allí nadie, excepto los dos ancianos escondidos y acechándola. Susana dijo a las criadas: —Traedme el perfume y las cremas y cerrad la puerta del jardín mientras me baño. Ellas hicieron lo que les dijo, cerraron la puerta del jardín y salieron por una puerta lateral a traer lo que se les había ordenado, y no vieron a los ancianos porque estaban escondidos. Apenas salieron las criadas, se levantaron los dos ancianos, corrieron hacia ella y le dijeron: —Las puertas del jardín están cerradas, nadie nos ve, y nosotros sentimos deseos de ti; así que consiente y acuéstate con nosotros. Si no, daremos testimonio contra ti diciendo que un joven estaba contigo y que por eso habías despachado a las criadas. Susana lanzó un gemido y dijo: —No tengo salida: si hago eso, mereceré la muerte; si no lo hago, no escaparé de vuestras manos. Pero prefiero no hacerlo y caer en vuestras manos antes que pecar delante del Señor.
                (Dn 13, 15-23)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que en la historia de Susana nos enseñaste que es mejor ser difamado entre los hombres que pecar ante ti, ayúdame a que no me importe mi imagen, lo que los demás piensen de mí, incluso las difamaciones o desamores; que esté dispuesto a perderlo todo para permanecer puro ante ti`,
        },
        ]
  },
  {
    dia: 5,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 5 - La adúltera
                Los escribas y los fariseos le traen una mujer sorprendida en adulterio, y, colocándola en medio, le dijeron: «Maestro, esta mujer ha sido sorprendida en flagrante adulterio. La ley de Moisés nos manda apedrear a las adúlteras; tú, ¿qué dices?». Le preguntaban esto para comprometerlo y poder acusarlo. Pero Jesús, inclinándose, escribía con el dedo en el suelo. Como insistían en preguntarle, se incorporó y les dijo: «El que esté sin pecado, que le tire la primera piedra». E inclinándose otra vez, siguió escribiendo. Ellos, al oírlo, se fueron escabullendo uno a uno, empezando por los más viejos. Y quedó solo Jesús, con la mujer en medio, que seguía allí delante. Jesús se incorporó y le preguntó: «Mujer, ¿dónde están tus acusadores?; ¿ninguno te ha condenado?». Ella contestó: «Ninguno, Señor». Jesús dijo: «Tampoco yo te condeno. Anda, y en adelante no peques más». 
                (Jn 8, 3-11)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que no condenaste a la adúltera sino que la levantaste de sus pecados, perdóname también a mí mis caídas y consuela a mi alma con esas palabras tuyas «y en adelante no peques más»`,
        }
    ]
  },
  {
    dia: 6,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 6 - Santa Margarita de Cortona
            Margarita había vivido varios años en concubinato público y tras la muerte de su amante, Dios tocó su corazón con la conversión. Margarita empezó así una vida de penitencia, oración y caridad, incorporándose a la Tercera Orden Franciscana, y Dios empezó a bendecirla con dones místicos. Cierto día, Cristo le preguntó "¿Quieres que te enseñe el lugar que tengo reservado en el Cielo para ti?" a lo que Margarita asintió con gran alegría. Entonces, Jesús le mostró el Coro de las Vírgenes, aquellas que se habían reservado para su Esposo. Acabada la visión, Margarita se entristeció y le dijo a Jesús "Jesús mío, te has debido equivocar, me has enseñado el Coro de las Vírgenes, y tú me conoces: yo no soy virgen". A lo que Jesús respondió "Eres tú quien se equivoca, mi querida hija y esposa, pues tú eres virgen. Yo hoy te hago virgen de nuevo"
            (Redacción novelada de la vida de Santa Margarita de Cortona)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que te compadeciste de Margarita y le regalaste el ser virgen de nuevo. Apiádate de mí y sana las heridas del pecado, devuélveme la alegría de tu salvación. Lávame, quedaré límpio, rocíame con el hisopo, quedaré más blanco que la nieve`,
        }
    ]
  },
  {
    dia: 7,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 7 - Tobías y Sarra
            Cuando todos hubieron salido y cerrado la puerta de la habitación, Tobías se levantó de la cama y dijo a Sara: «Levántate, mujer. Vamos a rezar pidiendo a nuestro Señor que se apiade de nosotros y nos proteja». Ella se levantó, y comenzaron a suplicar la protección del Señor. Tobías oró así: 
            «Bendito seas, Dios de nuestros padres, 
            y bendito tu nombre por siempre. 
            Que por siempre te alaben cielos y todas tus criaturas. 
            Tú creaste a Adán y le diste a Eva, su mujer, como ayuda y apoyo. 
            De ellos nació la estirpe humana. 
            Tú dijiste: “No es bueno que el hombre esté solo; 
            hagámosle una ayuda semejante a él”. 
            Al casarme ahora con esta mujer, 
            no lo hago por impuro deseo, 
            sino con la mejor intención. 
            Ten misericordia de nosotros 
            y haz que lleguemos juntos a la vejez».
            Los dos dijeron: «Amén, amén». 
            (Tb 8, 4-8)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que nos regalas la sexualidad como algo bueno para colaborar contigo en la creación del mundo, no permitas que mi concupiscencia y malos deseos empañe este regalo que tú me has dado, antes bien, hazme libre para poder servirte con todo mi ser, también con mi sexualidad`,
        }
    ]
  },
  {
    dia: 8,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 8 - San Pablo
                Todo me es lícito, pero no todo me aprovecha. Todo me es lícito, pero no me dejaré dominar por nada. (...) El cuerpo no es para la fornicación, sino para el Señor; y el Señor, para el cuerpo. Y Dios resucitó al Señor y nos resucitará también a nosotros con su poder. ¿No sabéis que vuestros cuerpos son miembros de Cristo? ¿Y voy a tomar los miembros de Cristo para hacerlos miembros de una prostituta? ¡De ningún modo! ¿O no sabéis que unirse a una prostituta es hacerse un cuerpo con ella? Porque dice: «Serán los dos una sola carne». En cambio, el que se une al Señor es un espíritu con él. Huid de la inmoralidad. Cualquier pecado que cometa el hombre queda fuera de su cuerpo. Pero el que fornica peca contra su propio cuerpo. ¿Acaso no sabéis que vuestro cuerpo es templo del Espíritu Santo, que habita en vosotros y habéis recibido de Dios? Y no os pertenecéis, pues habéis sido comprados a buen precio. Por tanto, ¡glorificad a Dios con vuestro cuerpo!
                (1 Co 6, 12-20)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que te has hecho un solo cuerpo conmigo en la eucaristía y has hecho de mi cuerpo templo de tu Espíritu: No permitas que mancille lo que Tú has comprado con tu preciosa sangre, antes bien, hazme respetar la dignidad de lo que Tú has dignificado`,
        }
    ]
  },
  {
    dia: 9,
    contenido: [
        {
            tipo: "texto",
            texto: `Día 9
                “La virtud de la castidad no es cuestión de ascética sino de fe.”
                “En la virginidad es todo gracia, don, que no nace del moralismo sino del mismo Dios.”
                “Dios llama… a la virginidad, porque es un signo escatológico del futuro”
                (Carmen Hernández, Corazón Indiviso)`,
        },
        {
            tipo: "texto",
            texto: `Señor, que nos regalas las castidad como símbolo escatológico desde tu Gracia en respuesta a nuestra fe y no a nuestros méritos: Regálame también a mí la Gracia de la Castidad, que te suplico en esta novena, de modo que con un corazón indiviso te ama con todos tus santos y goce de Ti en el Reino de los cielos. Amén`,
        }
    ]
  }
];

//Agrupación del contenido de las novenas
const contenidoNovenas = {
  abandono: {
    coronilla: coronillaAbandono,
    novena: novenaAbandono,
    oracion: oracionAbandono, 
    letanias: null
  },
  sagrado_corazon: {
    coronilla: coronillaSagradoCorazon,
    novena: novenaSagradoCorazon,
    oracion: oracionSagradoCorazon,
    letanias: letaniasSagradoCorazon
  },
  divina_misericordia: {
    coronilla: coronillaDivinaMisericordia,
    novena: novenaDivinaMisericordia,
    oracion: null,
    letanias: letaniasDivinaMisericordia
  },
  espiritu_santo: {
    coronilla: coronillaEspirituSanto,
    novena: novenaEspirituSanto,
    oracion: oracionEspirituSanto,
    letanias: letaniasEspirituSanto
  },
  angel_custodio: {
    coronilla: coronillaAngelCustodio,
    novena: novenaAngelCustodio,
    oracion: oracionAngelCustodio,
    letanias: null
  },
    castidad: {
    coronilla: coronillaCastidad,
    novena: novenaCastidad,
    oracion: null,
    letanias: null
  },
};

