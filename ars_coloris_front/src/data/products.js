import zlota1 from "../assets/products/zlota_harmonia/1.jpg";
import zlota2 from "../assets/products/zlota_harmonia/logo.jpg";
import ptaki1 from "../assets/products/ptaki_wsrod_lisci/1.jpg";
import ptaki2 from "../assets/products/ptaki_wsrod_lisci/logo.jpg";
import flora1 from "../assets/products/stolik_flora/1.jpg";
import flora2 from "../assets/products/stolik_flora/logo.jpg";
import lato1 from "../assets/products/szept_lata/1.jpg";
import lato2 from "../assets/products/szept_lata/2.jpg";
import lato3 from "../assets/products/szept_lata/logo.jpg";


const products = [
    {
        id: 1,
        name: "Złota Harmonia",
        category: "Mozaiki ścienne",
        price: 350,
		availability: "Na zamówienie",
		deliveryTime: "3-15 dni roboczych",
        images: [zlota1, zlota2],
        description:
            "Ręcznie wykonana mozaika w odcieniach turkusu, złota i błękitu.",
    },
    {
        id: 2,
        name: "Ptaki wśród liści",
        category: "Mozaiki ścienne",
        price: 280,
		availability: "Dostępny",
		deliveryTime: "3-5 dni roboczych",
        images: [ptaki1, ptaki2],
        description:
            "Dekoracyjna mozaika inspirowana naturą i lekkością ptasich kształtów.",
    },
    {
        id: 3,
        name: "Stolik Flora",
        category: "Stoliki mozaikowe",
        price: 950,
		availability: "Dostępny",
		deliveryTime: "3-5 dni roboczych",
        images: [flora1, flora2],
        description:
            "Elegancki stolik mozaikowy z motywem roślinnym, idealny do wnętrza lub ogrodu.",
    },
    {
        id: 4,
        name: "Szept Lata",
        category: "Stoliki mozaikowe",
        price: 890,
		availability: "Dostępny",
		deliveryTime: "3-5 dni roboczych",
        images: [lato1, lato2, lato3],
        description:
            "Stolik mozaikowy z kwiatowym motywem inspirowanym letnim ogrodem.",
    },
];

export default products;