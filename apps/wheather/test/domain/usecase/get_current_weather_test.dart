import 'package:wheather/domain/entities/weather.dart';
import '../../helpers/test_helper.mocks.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:wheather/domain/usecase/get_current_weather.dart';
import 'package:dartz/dartz.dart';
import 'package:mockito/mockito.dart';



void main(){

  // late tells Dart: "Trust me, I'll assign this before I use it." Dart then checks 
  // at runtime instead of at compile time
  late GetCurrentWeatherUseCase getCurrentWeatherUseCase;
  late MockWeatherRepository mockWeatherRepository;

  // setUp runs before every test, so the variables are always assigned in time
  setUp((){
    mockWeatherRepository = MockWeatherRepository();
    getCurrentWeatherUseCase = GetCurrentWeatherUseCase(weatherRepository: mockWeatherRepository);
  });

  const testWeatherDetail = WeatherEntity(
    cityName: "London", 
    main: "Clouds", 
    description: "Overcast clouds", 
    iconCode: "04d", 
    temp: 15.0, 
    pressure: 1013, 
    humidity: 75
  );

  const testCityName = "London";

  // description, body
  // we are checking the connection here between the usecase and the repository layer. We are not 
  // testing the repository layer here, we are just checking if the usecase is calling the repository 
  // layer with the correct parameters and returning the correct data.
  test('should call the weather repository', () async {
    // 1. arrange
    // here we are describing to get the test data on calling repo layer method getCurrentWeather
    // with the testCityName parameter.
    when(
      mockWeatherRepository.getCurrentWeather(testCityName)
    ).thenAnswer((_) async => const Right(testWeatherDetail));

    // 2. act
    final result = await getCurrentWeatherUseCase.call(testCityName);

    // 3. assert
    expect(result, const Right(testWeatherDetail));
    verify(mockWeatherRepository.getCurrentWeather(testCityName)); 
    verifyNoMoreInteractions(mockWeatherRepository);
  });
}