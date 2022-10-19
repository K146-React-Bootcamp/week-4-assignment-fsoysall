# React Components

- React class component kullanımı
- class Component nedir?
- life cycle metotları nelerdir?
- Niçin Function componenler class componenterinin yerini aldı?

## ReactJs Component Nedir ?

Basite indirgemek gerekirse React Component ‘leri kullanıcı arayüzünü şekillendiren, belirli görevleri olan, class veya fonksiyon olarak tanımlanmış, geriye react elementleri döndüren (bir önceki yazımızda bahsettiğimiz JSX), opsiyonel olarak parametre (daha sonra bunlara prop diyeceğiz) alan yapı taşlarıdır.

## Class-Based Components  (Sınıf Tabanlı)

React kütüphanesi içerisindeki “Component” class ‘ından extend olan javascript class ‘ları olarak tanımlayabiliriz. Bu class ‘lar React Component ‘ten extend olduğu için Component Lifecycle süreçlerini de barındırır.

* Oluşturucu bir başlangıç noktası ile yaşam döngüsüne girer (Constructor) , 
* Aktifleşti Mi ? (didMount), 
* Pasifleşecek ( DidUnMounted ) gibi özellikleri vardır
* yaşam döngüsü olduğu için this.nnn ifadeleri kullanılır


## life cycle metotları nelerdir?

react class'lar için geçerli olan ;
* doğuş / constructing , 
* yaşam : living
* varlık sebebinin sonuna ulaşmak : end of life cycle
faktörsel senaryo ile ; 
* bir işi görmesi için yaratılması
* işi görmesi
* app'nin online yaşam sürecinden çıkartılması ( yok edilmesi ) ve   kırıntılarının da temizlenmesi süreçlerini içerir

https://medium.com/software-development-turkey/react-lifecycle-ya%C5%9Fam-d%C3%B6ng%C3%BCs%C3%BC-d650ab78ab4f 'a göre

* Mounting
   * init'ing
   * component will mount
   * render
   * component did mount
* Updating
   * component will receive props
   * should component update
   * component will update
   * render
   * component did Update
* Un-Mounting
   * component Will Un-Mount



## Niçin Function componenler class componenterinin yerini aldı?
   Yaşam döngüsü, constructing ,state management gibi kullanımsal fonksiyonlarının masraflı ve ağır yüklü olması nedeni ile

