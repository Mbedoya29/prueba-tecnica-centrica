Ejercicio 3: Debugging y Performance

Tras revisar el componente encontré tres problemas principales:

1. Función ejecutándose desde el template
Se está llamando expensiveCalculation(item) directamente en el template. Angular ejecuta estas funciones en cada ciclo de change detection, incluso ante eventos pequeños como clicks o cambios de estado. Si la función es costosa, esto afecta el rendimiento rápidamente. Lo correcto sería precalcular ese valor o usar un resultado cacheado.

2. Uso de Math.random() en el render
La función retorna un valor diferente en cada ejecución, lo que hace que el resultado nunca sea estable entre renders. Esto puede provocar renders innecesarios y comportamientos inconsistentes en la vista.

3. ngFor sin trackBy
El *ngFor no usa trackBy, por lo que Angular no puede identificar los elementos de la lista cuando hay cambios y termina recreando el DOM completo. Con trackBy solo se actualizan los elementos modificados.