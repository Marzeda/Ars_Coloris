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
            "Ręcznie wykonana mozaika w odcieniach turkusu, złota i błękitu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus, arcu et gravida pretium, quam magna consectetur sapien, nec posuere massa risus sed erat."
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
            "Dekoracyjna mozaika inspirowana naturą i lekkością ptasich kształtów. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus, arcu et gravida pretium, quam magna consectetur sapien, nec posuere massa risus sed erat. Ut venenatis quam finibus pretium convallis. Mauris iaculis fermentum nunc nec consequat. Vivamus eleifend, ligula et pharetra imperdiet, nisi leo aliquet ex, eleifend ullamcorper ipsum risus nec ipsum. Nam eu faucibus lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tincidunt nisi sed metus tempus, vitae hendrerit ante mattis. Duis tincidunt, turpis vel faucibus volutpat, justo leo elementum nunc, id bibendum mi nulla quis urna. Vestibulum ut mi arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae nulla eros. Phasellus molestie iaculis ligula, eget tempus ipsum auctor in. Mauris id mauris et lacus posuere convallis sit amet nec odio. Duis placerat, lacus a finibus fringilla, felis urna tristique ante, in luctus urna arcu a nulla. Cras non vehicula augue, rhoncus dapibus neque.Sed rhoncus lectus nisl, quis bibendum libero bibendum non. Aliquam erat volutpat. Vivamus at dapibus orci, vitae vulputate lacus. Aliquam fringilla mattis magna euismod maximus. Proin hendrerit nec ipsum sed placerat. Fusce cursus nisl sit amet velit rhoncus ullamcorper. Nulla non risus non libero elementum vehicula eget pulvinar tortor. Pellentesque et vulputate nisl. Vivamus et arcu dictum, tincidunt felis sed, luctus lorem. Pellentesque tempus elit in hendrerit tristique. In ipsum mi, lobortis quis fermentum non, faucibus quis nulla.",
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
        name: "Stolik Szept Lata",
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