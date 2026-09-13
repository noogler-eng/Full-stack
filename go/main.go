package main

import "fmt"

// we can declare outside the main function, but we cannot assign
// a value to it outside the main function.
const DEPLOYMENT_ENV = "production"

func main() {
	fmt.Println("Hello, World!")

	// variable should be used, othwise it will give error.
	// if we don't use string, int, bool go will automatically
	// infers the type of variable based on the value assigned
	// to it.
	var name string = "sharad"
	var age int = 30
	var isMarried bool = false
	fmt.Println(name, age, isMarried)

	// shorthand declaration operator ":=" can be used to declare
	// and initialize a variable in one line.
	myName := "sharad"
	myAge := 30
	myIsMarried := false
	fmt.Println(myName, myAge, myIsMarried)

	// go has two types of floating point numbers, float32 and float64.
	// float32 has 32 bits of precision and float64 has 64 bits of
	// precision.
	var value_1 float32 = 22.0 / 7.0
	var value_2 float64 = 22.0 / 7.0
	fmt.Println(value_1, value_2)

	// constants are immutable values which are known at compile time
	// and do not change for the life of the program.
	const DEPLOYMENT_ENV = "production"
	fmt.Println(DEPLOYMENT_ENV)

	// grouping constants together using parentheses.
	const (
		PORT = 8080
		HOST = "localhost"
	)
	fmt.Println(PORT, HOST)

	// lopping through for only in go, go not have while keyword
	// same keywords like continue and break are also available in go.
	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}

	// range is used to iterate over elements in a variety of data
	// structures, including arrays, slices, maps, and strings.
	for i := range 3 {
		fmt.Println(i)
	}

	for i := range "sharad" {
		fmt.Println(i)
	}

	// if else statement in go, go does not have ternary operator.
	// we can use if else, if else if, and switch statements in go.
	// assign in same line as if statement, but the variable will be
	// scoped to the if statement.
	if age = 18; age >= 18 {
		fmt.Println("we can vote")
	} else {
		fmt.Println("we cannot vote")
	}

	// && and || are logical operators in go, && is used for logical
	// AND and || is used for logical OR.
	role := "admin"
	isAdmin := true

	if role == "admin" && isAdmin {
		fmt.Println("we can access admin panel")
	} else {
		fmt.Println("we cannot access admin panel")
	}

	if role == "admin" || isAdmin {
		fmt.Println("we can access admin panel")
	} else {
		fmt.Println("we cannot access admin panel")
	}

}
