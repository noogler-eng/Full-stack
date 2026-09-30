import 'package:flutter_test/flutter_test.dart';
import 'package:wheather/data/models/weather_model.dart';
import '../../helpers/json_reader.dart';
import 'dart:convert';

void main(){

  const testWeatherModel = WeatherModel(
    cityName: "London", 
    main: "Clouds", 
    description: "Overcast clouds", 
    iconCode: "04d", 
    temp: 15.0, 
    pressure: 1013, 
    humidity: 75
  );

  final expectedJsonMap = {
    "name": "London",
    "weather": [
      {
        "main": "Clouds",
        "description": "Overcast clouds",
        "icon": "04d"
      }
    ],
    "main": {
      "temp": 15.0,
      "pressure": 1013,
      "humidity": 75
    }
  };

  test('should be a subclass of weather entity', () async {
    // assert
    // matching the model with the entity class to check if the model is a 
    // subclass of the entity class.
    expect(testWeatherModel, isA<WeatherModel>());
  });

  test('should return a valid model from json', () async {
    final Map<String, dynamic> jsonMap = json.decode(readJson('helper/weather.json'));
      final result = WeatherModel.fromJson(jsonMap);
      expect(result, testWeatherModel);
  });

  test('should return a valid json map from model', () async {
    final result = testWeatherModel.toJson();
    expect(result, expectedJsonMap);
  });
}