package main

import (
	"fmt"
	"maps"
	"slices"
	"time"
)

// we can declare outside the main function, but we cannot assign
// a value to it outside the main function.
const DEPLOYMENT_ENV = "production"

// structs
type Order struct {
	id         int
	price      float64
	name       string
	status     string
	creaetedAt time.Time
}

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

	// switch dont need to have break statement, it will automatically
	// break after.
	i := 3
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	default:
		fmt.Println("default")
	}

	// multiple cases can be combined in a single case statement.
	switch i {
	case 1, 2, 3:
		fmt.Println("one, two or three")
	default:
		fmt.Println("default")
	}

	// time package is used to work with time and date in go. Weekday()
	// method returns the day of the week for a given time.Time value.
	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println("It's the weekend!")
	default:
		fmt.Println("It's a weekday.")
	}

	// interface {} means any type, it can hold any value of any type.
	// It is similar to Object in Java or Any in Kotlin.
	whoAmI := func(i interface{}) {
		switch t := i.(type) {
		case int:
			fmt.Println("I am an int")
		case string:
			fmt.Println("I am a string")
		default:
			fmt.Printf("I don't know what I am, but I am of type %T\n", t)
		}
	}
	whoAmI("sharad")

	// array, if we dont initlize the element in array, by default it will
	// be initialized to zero value of the type.
	// - Fixed size, cannot be resized, and all elements are of the same type.
	// - Memory optmzation
	// - Constant time access to elements, O(1) time complexity.
	var arr [5]int
	arr[0] = 1
	arr[0] = 10
	fmt.Println(arr, len(arr))

	arr2 := [3]int{1, 2, 10}
	fmt.Println(arr2, len(arr2))

	arr3 := [2][2]int{{1, 2}, {3, 4}}
	fmt.Println(arr3, len(arr3))

	// slices - dynamic arrays, can be resized, and all elements are of the same type.
	// - Dynamic size, can be resized, and all elements are of the same type.
	// - Memory optimization, but not as good as arrays.
	// - Constant time access to elements, O(1) time complexity.
	// - useful inbuilt methods like append, copy, and len.
	slice := []int{1, 2, 3}
	fmt.Println(slice, len(slice), cap(slice))
	slice = append(slice, 4)
	fmt.Println(slice, len(slice), cap(slice))

	// it will not create a nil slice, but it will create a slice with length 5 and
	// capacity 10 assign value like 0.
	var nums = make([]int, 5, 10)
	fmt.Println(nums, len(nums), cap(nums))

	var nums2 = make([]int, len(nums), cap(nums))
	copy(nums2, nums)
	fmt.Println(nums, len(nums), cap(nums))
	fmt.Println(nums2, len(nums2), cap(nums2))

	fmt.Println(slice[0:2])
	// matching index wise element starting from 0 index, if any element is not matching
	// it will return false.
	fmt.Println(slices.Equal(nums, nums2))
	fmt.Println(slices.Equal(nums, slice))

	// maps
	m := make(map[string]string)
	m["name"] = "sharad"
	m["age"] = "30"
	m["isMarried"] = "false"
	fmt.Println(m, len(m))

	for key, value := range m {
		fmt.Println(key, value)
	}

	// non-existent key will gives us empty value of the type, and second return value
	// will be false.
	// remember: go can return multiple values
	_, ok := m["non-existent-key"]
	if !ok {
		fmt.Println("key does not exist")
	}

	// maps.Equal() function is used to compare two maps for equality. It returns true
	// if both maps have the same keys and values, and false otherwise.
	fmt.Println(maps.Equal(m, m))

	nums = []int{1, 2, 3, 4, 5}
	var sum int = 0
	// _ is index, we can use it if we don't want to use the index.
	// also acts same as key, value. where key is index
	for _, value := range nums {
		sum += value
		fmt.Println(value)
	}
	fmt.Println("sum of nums is", sum)

	for _, c := range "sharad" {
		fmt.Println(string(c), "unicode code point is", c)
	}

	_, _, sum = add(1, 2)
	fmt.Println("sum: ", sum)

	var lang = getLanguages()
	fmt.Println("languages: ", lang)

	for _, l := range lang {
		fmt.Println(l)
	}

	// passing a function as an argument to another function, we can use it to pass a function
	// as an argument to another function.
	// anonymous function is a function without a name, we can use it to create a function
	// without a name and pass it as an argument to another function.
	fn := func(a int) int {
		return a * 2
	}
	processIt(fn)
	// no new function will be called on calling variable multiplyBy2, it will use the same
	// function defined in returnFunc() function.
	multiplyBy2 := returnFunc()
	fmt.Println(multiplyBy2(5))
	fmt.Println(multiplyBy2(2))

	// we can pass any number of arguments to a function using varadic function, we can use
	// it to pass any number of arguments to a function.
	fmt.Println(varadicFunc(1, 2, 3, 4, 5))

	myCounterVariable := counter()
	fmt.Println(myCounterVariable())
	fmt.Println(myCounterVariable())
	fmt.Println(myCounterVariable())

	// Pointers
	var myNum int = 10
	changeNum(myNum)
	fmt.Println("num outside changeNum function: ", myNum)

	changeNumByPointer(&myNum)
	fmt.Println("num outside changeNumByPointer function: ", myNum, &myNum)

	order := Order{
		id:         1,
		price:      100.0,
		name:       "Order 1",
		status:     "pending",
		creaetedAt: time.Now(),
	}
	fmt.Println(order, order.id, order.price, order.name, order.status, order.creaetedAt)
	order.changeStatus("completed")
	fmt.Println(order, order.id, order.price, order.name, order.status, order.creaetedAt)
}

// function can return multiple values, we can use it to return multiple values
// from a function.
func add(a int, b int) (int, int, int) {
	return a, b, a + b
}

func getLanguages() []string {
	return []string{"Go", "Python", "Java", "C++"}
}

func processIt(fn func(a int) int) {
	fmt.Println(fn(5))
}

func returnFunc() func(a int) int {
	// we can implement here cachec as it is works as a global for this function,
	// but it is not a good practice to use global variables.
	fn := func(a int) int {
		return a * 2
	}

	return fn
}

// here nums in comming in form of slice, we can pass any number of arguments to
// this function. we can use interface{} for any type accepting, but it is not a
// good practice to use interface{} for any type accepting.
func varadicFunc(nums ...int) int {
	var sum int = 0
	for _, num := range nums {
		sum += num
	}
	return sum
}

func counter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

// variable num is passed by value, so any changes made to num inside the function will
// not affect the original variable outside the function.
func changeNum(num int) {
	num = 5
	fmt.Println("num inside changeNum function: ", num)
}

func changeNumByPointer(num *int) {
	*num = 1
	fmt.Println("num inside changeNumByPointer function: ", *num, num, &num)
}

// receiver function, it is a function that is associated with a type, we can use it
// to define methods for a type. receiver function can be defined for any type, including
// built-in types. we are using pointer receiver here, so that we can modify the original
// value of the struct.
func (o *Order) changeStatus(status string) {
	o.status = status
}
