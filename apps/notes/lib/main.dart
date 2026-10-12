import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  void userTapped(){
    print("User tapped the button!");
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Color.fromARGB(255, 67, 114, 153),
        appBar: AppBar(
          title: const Text('My Flutter App'),
          backgroundColor: Colors.blueAccent,
          elevation: 0,
          // leading is a widget that appears before the title in the app bar
          leading: const Icon(Icons.menu),
          // actions is a list of widgets that appear after the title in the app bar
          actions: [
            IconButton(
              icon: const Icon(Icons.search),
              onPressed: () {},
            ),
            SizedBox(width: 10),
            Icon(Icons.more_vert),
            SizedBox(width: 10),
          ],
        ),
        body: Center(
          child: Container(
            height: 300,
            width: 300,
            // It will always remains constant, calling the constructor of EdgeInsets class
            // It is const constructor, so it will be compile time constant
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              // Colors.amber - static constant value
              color: Colors.amber,
              borderRadius: BorderRadius.circular(20),
            ),
            // Coloumn, ListView, GridView, Stack, etc. are all layout widgets in Flutter
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Expanded widget is used to make the child widget take up the remaining space 
                // in the parent widget
                Expanded(
                  flex: 1,
                  child: Center(
                    child: Text(
                      'Hello, Flutter!',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Expanded(
                  // ratio in comparison to the rest Expanded widget, so it will take up twice 
                  // the space of the first one
                  flex: 2,
                  child: Center(
                    child: Text(
                      'Welcome to my app.',
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                ),
                // ListView.builder is a widget that creates a scrollable list of widgets on demand
                // It is more efficient than ListView because it only builds the widgets that are 
                // visible on the screen
                ListView.builder(
                  itemCount: 5,
                  itemBuilder: (context, index) {
                    // automatically creates a ListTile widget for each item in the list
                    // no loop is needed, it is handled by the ListView.builder
                    return ListTile(
                      leading: Icon(Icons.note),
                      title: Text('Note ${index + 1}'),
                      subtitle: Text('This is the description of note ${index + 1}.'),
                    );
                  }
                ),
                GridView.builder(
                  itemCount: 4,
                  // shrinkWrap is used to make the GridView take up only the space it needs, 
                  // instead of expanding to fill the available space
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                  ), 
                  itemBuilder: (context, index) {
                    return Card(
                      margin: EdgeInsets.all(10),
                      child: Center(
                        child: Text('Item ${index + 1}'),
                      ),
                    );  
                  }
                ),
                GestureDetector(
                  onTap: userTapped,
                  child: Container(
                    height: 50,
                    width: 150,
                    decoration: BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Text(
                        'Tap Me',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ),
                )
              ],
            ),
          )
        )
      )
    );
  }
}
