Основные компоненты:
App: Этот компонент является точкой входа в приложение. Он содержит основную структуру и вызывает компонент ImageGallery.

ImageGallery: Этот компонент отображает галерею изображений, полученных с помощью API Unsplash. Он делится изображениями на две колонки для лучшего пользовательского опыта используя для этого компонент GalleryColumn. Также он предзагружает критически важные изображения и собирает данные о времени загрузки приложения и изображений.

GalleryColumn: Этот компонент отображает одну колонку изображений, полученных с помощью API Unsplash. Для отображаения фотографий используется компонент Image.

Image: Этот компонент используется для отображения фотографий.

fetchPhotos: Этот модуль экспортирует функцию, которая используется для получения случайных изображений из API Unsplash.

Методы оптимизации:
Intersection Observer: Используется для отслеживания видимых изображений и загрузки их по мере необходимости, что снижает количество одновременно загружаемых изображений и улучшает производительность.

Предзагрузка критически важных изображений: Критически важные изображения предзагружаются, чтобы они были доступны мгновенно, когда пользователь начинает просматривать галерею, улучшая восприятие скорости загрузки.

Выводы:
Применение Intersection Observer позволило значительно улучшить производительность при загрузке изображений, так как изображения загружаются по мере необходимости при прокрутке пользователем.

Предзагрузка критически важных изображений позволила улучшить восприятие скорости загрузки галереи, что сделало пользовательский опыт более плавным и удобным.

