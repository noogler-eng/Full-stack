import 'package:equatable/equatable.dart';

class WeatherEntity extends Equatable {
  
  const WeatherEntity({
    required this.cityName,
    required this.main,
    required this.description,
    required this.iconCode,
    required this.temp,
    required this.pressure,
    required this.humidity,
  });

  final String cityName;
  final String main;
  final String description;
  final String iconCode;
  final double temp;
  final int pressure;
  final int humidity;

  // by default dart compares objects by refernce (memory), not by value.
  // so we need to override the props getter to compare objects by value.
  // Equatable package provides a way to do this by overriding the props 
  // getter.
  @override
  List<Object?> get props => [
    cityName,
    main,
    description,
    iconCode,
    temp,
    pressure,
    humidity,
  ];
}