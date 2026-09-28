import 'package: dio/dio.dart';
import './api_client_base.dart'

class ApiClient {
  final Dio _dio;

  ApiClient({required String baseUrl, String? apiKey})
    : _dio = Dio(BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
    )) {
      if (apiKey != null) {
        // Add an interceptor to add the Authorization header to every request
        // This is useful if the API requires authentication for every request
        // The interceptor will automatically add the Authorization header to 
        // every request made by this Dio instance
        _dio.interceptors.add(InterceptorsWrapper(
          onRequest: (options, handler) {
            options.headers['Authorization'] = 'Bearer $apiKey';
            return handler.next(options);
          },
        ));
      }
    }


  Future<Map<String, dynamic>> get(
    String path, {
      Map<String, dynamic>? queryParameters,
    }) async {
      try {
        final response = await _dio.get(path, queryParameters: queryParameters);
        return response.data as Map<String, dynamic>;
      } catch (e) {
        throw Exception('Failed to load data: $e');
      }
    }
}

