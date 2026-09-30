import '../repositories/weather_repository.dart';
import 'package:dartz/dartz.dart';
import '../../core/error/failure.dart';
import '../entities/weather.dart';

class GetCurrentWeatherUseCase {  
  GetCurrentWeatherUseCase({required this.weatherRepository});
  final WeatherRepository weatherRepository;

  // Either is a type that represents a value of one of two possible 
  // types (a disjoint union). left side is used for failure and right 
  // side is used for success.
  Future<Either<Failure, WeatherEntity>> call(String city) async {
    return await weatherRepository.getCurrentWeather(city);
  }
}