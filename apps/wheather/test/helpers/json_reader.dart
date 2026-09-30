import 'dart:io';

// we have to read json from the test folder, so we need to get the current 
// directory and then read the json file from the test folder.
// example - 
// if the current directory is /Users/username/projects/wheather, then we need 
// to read the json file from /Users/username/projects/wheather/test/helper/weather.json
// if the current directory is /Users/username/projects/wheather/test, then we need
// to read the json file from /Users/username/projects/wheather/test/helper/weather.json

// readAsStringSync -
// This method reads the entire file contents as a string, and it does so synchronously. 
// This means that the program will wait for the file reading operation to complete before moving 
// on to the next line of code. It's a blocking operation, which can be useful in scenarios where 
// you need to ensure that the file has been fully read before proceeding, such as in testing or 
// initialization code. However, in a production environment, especially in UI applications, 
// it's generally better to use asynchronous file reading methods to avoid blocking the main thread.
String readJson(String name) {
  var dir = Directory.current.path;
  if(dir.endsWith('/test')) {
    dir = dir.replaceAll('test', '');
  }

  return File('$dir/test/$name').readAsStringSync();
}