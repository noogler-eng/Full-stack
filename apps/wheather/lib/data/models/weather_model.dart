

class WeatherModel {
  final String cityName;
  final String main;
  final String description;
  final String iconCode;
  final double temp;
  final int pressure;
  final int humidity;

  const WeatherModel({
    required this.cityName,
    required this.main,
    required this.description,
    required this.iconCode,
    required this.temp,
    required this.pressure,
    required this.humidity
  });

  // factory constructor is a constructor that can return an instance of the class 
  // or a subclass of the class. It is used when we want to return an instance of the 
  // class based on some condition. In this case, we are returning an instance of 
  // WeatherModel from a JSON map.
  factory WeatherModel.fromJson(Map<String, dynamic> json) {
    return WeatherModel(
      cityName: json['name'],
      main: json['weather'][0]['main'],
      description: json['weather'][0]['description'],
      iconCode: json['weather'][0]['icon'],
      temp: (json['main']['temp'] as num).toDouble(),
      pressure: json['main']['pressure'],
      humidity: json['main']['humidity']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': cityName,
      'weather': [
        {
          'main': main,
          'description': description,
          'icon': iconCode
        }
      ],
      'main': {
        'temp': temp,
        'pressure': pressure,
        'humidity': humidity
      }
    };
  }
}