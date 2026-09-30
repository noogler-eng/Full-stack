import 'package:mockito/annotations.dart';
import 'package:wheather/domain/repositories/weather_repository.dart';
import 'package:http/http.dart' as http;

// this will simulate the behavior of the WeatherRepository class and 
// its methods, allowing us to test the GetCurrentWeatherUseCase class 
// in isolation.
@GenerateMocks([WeatherRepository], customMocks: [
  MockSpec<http.Client>(as: #MockHttpClient),
])

void main() {}