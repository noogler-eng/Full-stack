import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  // static function to return a light theme for 
  // the app, returning a ThemeData object that 
  // can be used in the MaterialApp widget
  static ThemeData light(){
    // return a ThemeData object with the following properties:
    // useMaterial3: true, 
    // colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple), 
    // scaffoldBackgroundColor: Colors.white
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),  
      scaffoldBackgroundColor: Colors.white
    );
  }
}