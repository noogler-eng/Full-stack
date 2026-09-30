import '../entities/weather.dart';
import 'package:dartz/dartz.dart';
import '../../core/error/failure.dart';


// domain layer should not depend on any other layer, so we define an 
// abstract class here and implement it in the data layer.
abstract class WeatherRepository {
  Future<Either<Failure, WeatherEntity>> getCurrentWeather(String city);
}