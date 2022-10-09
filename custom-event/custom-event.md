# JAVA SCRIPT CUSTOM EVENT

( bu dosya içerisinde ödevi yapabilirsiniz. )

## Event ( Olay ); Bir çok literatürde kullanılan "event" tabiri bir alınan, oluşan , oluşturalan olayın tetik veya bilgilendirilmesi senaryolarında kullanılır

Web Gezginlerinde ise scripting aksiyonlarında component vb aktörlerin başka component ve kullanıcı ile etkileşim sağlanası alanlarda / faktörlerde kullanılır.
Bir çoğu fabrikasyon yani imalatcı olan component ve literatürleri tanımlayanlar tarafından hali-hazırda kabul görmüş olarak gelir.

Bunların yeterli olmadı yerlerde ise  "Custom Event" 'lar kullanılır.

### Event oluşturmak için

* new CustomEvent(type)
* new CustomEvent(type, options)

type : event'ın adı.
options : event'a dair ekstra, bütünleyici veya içerik bilgiler;

### Örnek

[Mozilla DOCs](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)

```
// create custom events
const catFound = new CustomEvent('animalfound', {  detail: {    name: 'cat'  }});
const dogFound = new CustomEvent('animalfound', {  detail: {    name: 'dog'  }});

// add an appropriate event listener
obj.addEventListener('animalfound', (e) => console.log(e.detail.name));

// dispatch the events
obj.dispatchEvent(catFound);
obj.dispatchEvent(dogFound);

// "cat" and "dog" logged in the console
```

"Hayvan Bulundu" olayı üzerinden , kedi veya köpek bulunduğuna dair bilgiyi
obj.dispatchEvent(..Found) ile tetikleyip, consola bilgi yazdırıyoruz.

## Event Oluşturma veya Tetikleme

### **EventTarget.dispatchEvent() Metodu ile;**

```
const event = new Event('build');

// Listen for the event.
elem.addEventListener('build', (e) => { /* … */ }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

### **Ekstra Bilgi Ekleme;**

```
const event = new CustomEvent('build', { detail: elem.dataset.time });
```

Akabinde ekstra bilgi ile event listener'daki bilgiye ulaşılabilir

```
function eventHandler(e) {  console.log(`The time is: ${e.detail}`);}
```

### Eski Model yöntem

```
// Create the event.
const event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
elem.addEventListener('build', (e) => {
  // e.target matches elem
}, false);

// target can be any Element or other EventTarget.
elem.dispatchEvent(event);

```

### Event Bubblin

```
<form>
  <textarea></textarea>
</form>
```

```
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => textarea.value }
});

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
form.addEventListener('awesome', (e) => console.log(e.detail.text()));

// As the user types, the textarea inside the form dispatches/triggers the event to fire, and uses itself as the starting point
textarea.addEventListener('input', (e) => e.target.dispatchEvent(eventAwesome));
```
