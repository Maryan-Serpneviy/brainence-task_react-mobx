export const getProducts = (): Array<ProductType> => ([
   {
       id: 1,
       image: 'https://prm.ua/wp-content/uploads/2019/10/buckwheat-3478554_960_720.jpg',
       name: 'Гречка',
       description: 'Ухх подорожала. Раніше класно залітала з жареною ковбаскою і ряжанкою. Зараз супердорога через коронавірус',
       price: 53.4
   },
   {
       id: 2,
       image: 'https://ukrhealth.net/wp-content/uploads/2013/04/Depositphotos_1015086_s.jpg',
       name: 'Яйця',
       description: 'Ідеальний сніданок. Вибив 3 яйця, засипав приправами, захавав хлібом і ніштяк на години три',
       price: 21
   },
   {
       id: 3,
       image: 'https://upload.wikimedia.org/wikipedia/uk/thumb/2/28/%D0%9A%D0%B5%D1%84%D1%96%D1%80.jpg/1200px-%D0%9A%D0%B5%D1%84%D1%96%D1%80.jpg',
       name: 'Кефір',
       description: 'Селянський молочний продукт, з коро... з хімії. Але кого то цікаве? Пили. П\'ют. Будут пили',
       price: 26.4
   },
   {
       id: 4,
       image: 'https://i.otzovik.com/objects/b/1120000/1116883.png',
       name: 'Ковбаса докторська',
       description: 'Дієтична ковбаса родом з СРСР, легенда на ринку легкої промисловості. Непонятно з чого, але вкусна. Особливо якщо зажарити',
       price: 95
   },
   {
       id: 5,
       image: 'https://market-if.com/upload/iblock/e88/e88b98639ebfd87c18594e07b275165e.jpeg',
       name: 'Хліб',
       description: 'Просто мучний виріб. Хавається соло у вигляді бутера або в прикуску. За останніми дослідженнями - містить дофігіща глютену',
       price: 15.5
   },
   {
        id: 6,
        image: 'https://produkty24.com.ua/db_pic/products/original/img_2423160_[1573632094.7248].jpg',
        name: 'Кетчуп',
        description: 'Абсолютний хіт в холодильнику кожної господині. Шашлик-паті без нього зафейлиться. Псує шлунки студентам вже не перший десяток років',
        price: 12
    }
])

export type ProductType = {
    id: number
    image: string
    name: string
    description: string
    price: number
    isPinned?: boolean
}
