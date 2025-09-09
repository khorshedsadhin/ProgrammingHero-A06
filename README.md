1) What is the difference between var, let, and const?
        
        var -> function scoped, allows redeclare $ reassign
        let → Block-scoped, no redeclare, allows reassign
        const → Block-scoped, no redeclare, no reassign

2) What is the difference between map(), forEach(), and filter()?

        map() → Transforms each element and returns a new array of the same length.
        forEach() → Executes a function on each element.
        filter() → Returns a new array with elements that pass the given condition.
   
3) What are arrow functions in ES6?

        Arrow functions are a shorter syntax for function expressions.
   
4) How does destructuring assignment work in ES6?

        Destructuring assignment in ES6 lets you unpack values from arrays or objects into variables in a short way.
        const [a, b] = [10, 20];
        // here a = 10 & b = 20
   
5) Explain template literals in ES6. How are they different from string concatenation?

        Template literals are cleaner, easier, and more powerful than string concatenation.
        -> uses backticks instead of quotes.
        -> can embed variables with ${ } (no need for +).
        -> support multi-line strings without \n.
