const About = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <p className="text-gray-600">
          Мы - компания, специализирующаяся на продаже качественной мебели и предметов интерьера. 
          Наша миссия - помочь каждому клиенту создать уютное и стильное пространство для жизни.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Качество</h3>
            <p className="text-gray-600">
              Мы тщательно отбираем поставщиков и проверяем каждый товар перед отправкой
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Сервис</h3>
            <p className="text-gray-600">
              Наши специалисты всегда готовы помочь с выбором и ответить на все вопросы
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Гарантия</h3>
            <p className="text-gray-600">
              На все товары предоставляется гарантия качества
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;