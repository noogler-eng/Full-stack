
class ApiException implements Exception {
  final String message;
  final int? statusCode;

  ApiException(this.message, {this.statusCode});

  // Override the toString method to provide a meaningful error message
  // we can call this when we want to print the exception
  // ApiException('Error message', statusCode: 404).toString() will return
  // a string representation of the exception
  @override
  String toString() {
    return 'ApiException: $message (Status code: $statusCode)';
  }
}