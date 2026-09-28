import 'package:flutter/material.dart';

class AppColors {
  // prevents instantiation — this is just a namespace
  // we can directly access the colors like AppColors.primaryColor
  AppColors._();

  // static gives us a namespace for our colors, so we can access 
  // them like AppColors.primaryColor
  static const primary = Color(0xFF1E88E5);
  static const background = Color(0xFFF5F7FA);
  static const gain = Color(0xFF2E7D32);  
  static const loss = Color(0xFFC62828); 
  static const textPrimary = Color(0xFF1A1A1A);
  static const textSecondary = Color(0xFF6E6E6E);
}