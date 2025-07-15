type Product = {
  ProductID: number;
  Title: string;
  ProductImage: string;
  Description: string;
  Category: { CategoryFA: string; CategoryEN: string };
  Price: { CurrentPrice: number; PrevPrice: number };
  Quantity: number;
};

export const products: Product[] = [
  {
    ProductID: 1,
    Title: "قهوه اسپرسو",
    ProductImage: "../../public/images/product-sample.png",
    Description: "اسپرسویی غلیظ و خوش‌طعم برای شروع روز.",
    Category: {
      CategoryFA: "نوشیدنی گرم",
      CategoryEN: "Hot Drink",
    },
    Price: {
      CurrentPrice: 450,
      PrevPrice: 500,
    },
    Quantity: 50,
  },
  {
    ProductID: 2,
    Title: "لاته",
    ProductImage: "../../public/images/product-sample.png",
    Description: "قهوه با شیر بخار داده شده و فوم خوشمزه.",
    Category: {
      CategoryFA: "نوشیدنی گرم",
      CategoryEN: "Hot Drink",
    },
    Price: {
      CurrentPrice: 550,
      PrevPrice: 600,
    },
    Quantity: 40,
  },
  {
    ProductID: 3,
    Title: "کاپوچینو",
    ProductImage: "../../public/images/product-sample.png",
    Description: "مخلوطی خوشمزه از اسپرسو، شیر و فوم.",
    Category: {
      CategoryFA: "نوشیدنی گرم",
      CategoryEN: "Hot Drink",
    },
    Price: {
      CurrentPrice: 520,
      PrevPrice: 570,
    },
    Quantity: 30,
  },
  {
    ProductID: 4,
    Title: "قهوه فرانسه",
    ProductImage: "../../public/images/product-sample.png",
    Description: "قهوه‌ای ملایم و مناسب برای مصرف روزانه.",
    Category: {
      CategoryFA: "نوشیدنی گرم",
      CategoryEN: "Hot Drink",
    },
    Price: {
      CurrentPrice: 480,
      PrevPrice: 520,
    },
    Quantity: 45,
  },
  {
    ProductID: 5,
    Title: "موکا",
    ProductImage: "../../public/images/product-sample.png",
    Description: "ترکیب قهوه و شکلات برای طعمی دلنشین.",
    Category: {
      CategoryFA: "نوشیدنی گرم",
      CategoryEN: "Hot Drink",
    },
    Price: {
      CurrentPrice: 600,
      PrevPrice: 600,
    },
    Quantity: 25,
  },
  {
    ProductID: 6,
    Title: "آیس لاته",
    ProductImage: "../../public/images/product-sample.png",
    Description: "قهوه‌ای خنک و شیرین برای روزهای گرم.",
    Category: {
      CategoryFA: "نوشیدنی سرد",
      CategoryEN: "Cold Drink",
    },
    Price: {
      CurrentPrice: 580,
      PrevPrice: 630,
    },
    Quantity: 20,
  },
  {
    ProductID: 7,
    Title: "آیس موکا",
    ProductImage: "../../public/images/product-sample.png",
    Description: "موکای خنک با شکلات و یخ فراوان.",
    Category: {
      CategoryFA: "نوشیدنی سرد",
      CategoryEN: "Cold Drink",
    },
    Price: {
      CurrentPrice: 620,
      PrevPrice: 670,
    },
    Quantity: 18,
  },
  {
    ProductID: 8,
    Title: "چای ماسالا",
    ProductImage: "../../public/images/product-sample.png",
    Description: "چای هندی با ادویه‌های گرم و معطر.",
    Category: {
      CategoryFA: "نوشیدنی سنتی",
      CategoryEN: "Traditional Drink",
    },
    Price: {
      CurrentPrice: 530,
      PrevPrice: 580,
    },
    Quantity: 22,
  },
  {
    ProductID: 9,
    Title: "آب‌میوه طبیعی پرتقال",
    ProductImage: "../../public/images/product-sample.png",
    Description: "آب پرتقال تازه و طبیعی بدون شکر افزوده.",
    Category: {
      CategoryFA: "نوشیدنی طبیعی",
      CategoryEN: "Natural Drink",
    },
    Price: {
      CurrentPrice: 400,
      PrevPrice: 450,
    },
    Quantity: 30,
  },
  {
    ProductID: 10,
    Title: "آب‌میوه سیب",
    ProductImage: "../../public/images/product-sample.png",
    Description: "آب سیب طبیعی و خنک، مناسب برای تمامی سنین.",
    Category: {
      CategoryFA: "نوشیدنی طبیعی",
      CategoryEN: "Natural Drink",
    },
    Price: {
      CurrentPrice: 390,
      PrevPrice: 420,
    },
    Quantity: 28,
  },
  {
    ProductID: 11,
    Title: "کیک شکلاتی",
    ProductImage: "../../public/images/product-sample.png",
    Description: "کیکی نرم و خوش‌طعم با لایه‌های شکلاتی.",
    Category: {
      CategoryFA: "دسر",
      CategoryEN: "Dessert",
    },
    Price: {
      CurrentPrice: 480,
      PrevPrice: 500,
    },
    Quantity: 10,
  },
  {
    ProductID: 12,
    Title: "چیزکیک توت‌فرنگی",
    ProductImage: "../../public/images/product-sample.png",
    Description: "چیزکیکی خوشمزه با لایه‌ای از توت‌فرنگی تازه.",
    Category: {
      CategoryFA: "دسر",
      CategoryEN: "Dessert",
    },
    Price: {
      CurrentPrice: 520,
      PrevPrice: 570,
    },
    Quantity: 12,
  },
  {
    ProductID: 13,
    Title: "براونی",
    ProductImage: "../../public/images/product-sample.png",
    Description: "براونی شکلاتی با بافتی نرم و خوش‌طعم.",
    Category: {
      CategoryFA: "دسر",
      CategoryEN: "Dessert",
    },
    Price: {
      CurrentPrice: 460,
      PrevPrice: 490,
    },
    Quantity: 15,
  },
  {
    ProductID: 14,
    Title: "بیسکوییت جو",
    ProductImage: "../../public/images/product-sample.png",
    Description: "بیسکوییتی سالم با جو پرک و عسل طبیعی.",
    Category: {
      CategoryFA: "میان‌وعده",
      CategoryEN: "Snack",
    },
    Price: {
      CurrentPrice: 350,
      PrevPrice: 380,
    },
    Quantity: 20,
  },
  {
    ProductID: 15,
    Title: "کوکی شکلاتی",
    ProductImage: "../../public/images/product-sample.png",
    Description: "کوکی پر از چیپس شکلات، مناسب با قهوه.",
    Category: {
      CategoryFA: "میان‌وعده",
      CategoryEN: "Snack",
    },
    Price: {
      CurrentPrice: 330,
      PrevPrice: 360,
    },
    Quantity: 18,
  },
  {
    ProductID: 16,
    Title: "قهوه ترک",
    ProductImage: "../../public/images/product-sample.png",
    Description: "قهوه‌ای غلیظ با عطر و طعم سنتی.",
    Category: {
      CategoryFA: "نوشیدنی سنتی",
      CategoryEN: "Traditional Drink",
    },
    Price: {
      CurrentPrice: 500,
      PrevPrice: 550,
    },
    Quantity: 20,
  },
  {
    ProductID: 17,
    Title: "شیک شکلات",
    ProductImage: "../../public/images/product-sample.png",
    Description: "شیک شکلاتی غلیظ با بستنی و شیر تازه.",
    Category: {
      CategoryFA: "نوشیدنی سرد",
      CategoryEN: "Cold Drink",
    },
    Price: {
      CurrentPrice: 590,
      PrevPrice: 640,
    },
    Quantity: 22,
  },
  {
    ProductID: 18,
    Title: "شیک موز",
    ProductImage: "../../public/images/product-sample.png",
    Description: "شیک موزی انرژی‌زا با طعم طبیعی موز.",
    Category: {
      CategoryFA: "نوشیدنی سرد",
      CategoryEN: "Cold Drink",
    },
    Price: {
      CurrentPrice: 570,
      PrevPrice: 600,
    },
    Quantity: 19,
  },
  {
    ProductID: 19,
    Title: "ساندویچ مرغ گریل",
    ProductImage: "../../public/images/product-sample.png",
    Description: "ساندویچی سالم و خوشمزه با مرغ گریل شده.",
    Category: {
      CategoryFA: "غذای سبک",
      CategoryEN: "Light Meal",
    },
    Price: {
      CurrentPrice: 850,
      PrevPrice: 900,
    },
    Quantity: 14,
  },
  {
    ProductID: 20,
    Title: "پانینی سبزیجات",
    ProductImage: "../../public/images/product-sample.png",
    Description: "پانینی گرم با سبزیجات تازه و پنیر موزارلا.",
    Category: {
      CategoryFA: "غذای سبک",
      CategoryEN: "Light Meal",
    },
    Price: {
      CurrentPrice: 780,
      PrevPrice: 830,
    },
    Quantity: 16,
  },
];
