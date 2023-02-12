# Getting Started with Create React App

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Notes:
To create a functional component, do: 

<code>
    const component:React.FC`<Props>` = (props:Props) => {...; return render;}
</code>  


For error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type...

Wrong code: <code>array.filter(Object[field])</code>

Correct one:
 - <code>array.filter(Object[field as keyof typeof Object])</code> if the type of object is <strong>unknown</strong>
 - <code>array.filter(Object[field as keyof ObjectType])</code> if the type of object is known

useState()

- To create a state to control components, it can only be called inside the component function. 
- Similar to setters in C++, however, state != props in JSX.